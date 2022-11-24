import colors from '@/src/assets/Colors';
import { Lock, Notice, Profile1 } from '@/src/assets/Images';
import { axiosInstance } from '@/src/store/api';
import { RootState } from '@/src/store/configureStore';
import { authActions, localActions, userActions } from '@/src/store/reducers';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../common/Button';
import Modal from '../../common/Modal';
import DeleteUserWin from './DeleteUserWin';
import ImageFileModal from './ImageFileModal';
import ImageModal from './ImageModal';

const EditMyProfile = () => {
  const dispatch = useDispatch();

  const {
    oldPw,
    newPw,
    pwConfirm,
    photoUrl,
    nickname,
    nicknamePrev,
    introduction,
    styles,
    loadUserDone,
    loadUserError,
  } = useSelector(({ user }: RootState) => ({
    oldPw: user.oldPw,
    newPw: user.newPw,
    pwConfirm: user.pwConfirm,
    photoUrl: user.photoUrl,
    nickname: user.nickname,
    nicknamePrev: user.nicknamePrev,
    introduction: user.introduction,
    styles: user.styles,
    loadUserDone: user.loadUserDone,
    loadUserError: user.loadUserError,
  }));

  // update profile state
  const [profileImg, setProfileImg] = useState('');
  const [nicknameSt, setNicknameSt] = useState('');
  const [introSt, setIntroSt] = useState('');
  const [stylesSt, setStylesSt] = useState<string[]>([]);

  // default icon modal
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const handleCloseImageModal = () => {
    setImageModalOpen(false);
  };
  // image file modal
  const [imagefileModalOpen, setImageFileModalOpen] = useState(false);
  const handleCloseImageFileModal = () => {
    setImageFileModalOpen(false);
  };

  useEffect(() => {
    setProfileImg(photoUrl);
    setNicknameSt(nickname);
    setIntroSt(introduction);
    setStylesSt(styles);
  }, [photoUrl, nickname, introduction, styles]);

  const handleChangeMyProfile = (e: React.ChangeEvent<any>) => {
    const { name, value, checked }: { name: string; value: any; checked: boolean; type: string } = e.target;
    if (name === 'nickname') {
      setNicknameSt(value);
    } else if (name === 'introduction') {
      console.log(value);
      console.log(typeof value);
      setIntroSt(value);
    } else if (name === 'styles') {
      if (checked) {
        setStylesSt([value, ...stylesSt]);
      } else {
        setStylesSt(stylesSt.filter((val) => val != value));
      }
    }
  };
  //nicknamepev
  const [isNicknamePrev, setIsNicknamePrev] = useState(false);

  useEffect(() => {
    if (nicknamePrev) {
      setIsNicknamePrev(true);
    }
  }, [nicknamePrev]);

  // api request
  const handleUpdateUserProfile = () => {
    console.log(profileImg, nicknameSt, stylesSt, introSt);
    if (!nicknameSt) {
      setModalOpen(true);
      setModalMessage('닉네임을 입력해주세요');
      setModalErr(true);
      return;
    } else if (nicknameSt.length < 3 || nicknameSt.length > 8) {
      setModalOpen(true);
      setModalMessage('닉네임은 최소 3자, 최대 8자이며 한글, 영문, 숫자로만 이루어질 수 있어요');
      setModalErr(true);
      return;
    } else if (introSt.length < 5 || introSt.length > 100) {
      setModalOpen(true);
      setModalMessage('소개는 최소 5자, 최대 100자이며 한글, 영문, 숫자로만 이루어질 수 있어요');
      setModalErr(true);
      return;
    } else if (!nicknamePrev) {
      return axiosInstance
        .get(`/users/nickname/exist?nickname=${nicknameSt}`)
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            setModalOpen(true);
            setModalMessage('이미 사용되고 있는 닉네임이에요');
            setModalErr(true);
            return;
          } else {
            dispatch(
              userActions.updateUserProfile({
                photoUrl: profileImg,
                nickname: nicknameSt,
                styles: stylesSt,
                introduction: introSt,
              }),
            );
          }
        })
        .catch((err) => alert(err));
    } else {
      dispatch(
        userActions.updateUserProfile({
          photoUrl: profileImg,
          nickname: nicknameSt,
          styles: stylesSt,
          introduction: introSt,
        }),
      );
    }
  };

  // change pw
  const [changePw, setChangePw] = useState(false);

  const handleChangePwForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let oldPwSt = oldPw;
    let newPwSt = newPw;
    let pwConfirmSt = pwConfirm;
    if (name === 'oldPw') {
      oldPwSt = value;
    } else if (name === 'newPw') {
      newPwSt = value;
    } else if (name === 'pwConfirm') {
      pwConfirmSt = value;
    }
    dispatch(
      userActions.ChangePwForm({
        oldPw: oldPwSt,
        newPw: newPwSt,
        pwConfirm: pwConfirmSt,
      }),
    );
  };
  // pw 유효성 검사
  const [pwErr, setPwErr] = React.useState(true);
  const [pwErrMessage, setPwErrMessage] = React.useState('');
  const [clickAble, setClickAble] = useState(false);
  useEffect(() => {
    if (newPw.length <= 0) {
      setPwErr(false);
    }
  }, [newPw]);

  useEffect(() => {
    if (!oldPw || !newPw || !pwConfirm) {
      setClickAble(false);
    } else {
      if (!pwErr) {
        setClickAble(true);
      }
    }
  }, [oldPw, newPw, pwConfirm]);

  const handlePwBlur = () => {
    var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (newPw.length != 0) {
      if (newPw.length < 8 || newPw.length > 20) {
        setPwErr(true);
        setPwErrMessage('비밀번호는 최소 8자, 최대 20자로 설정할 수 있어요');
      } else if (reg.test(newPw) === false) {
        setPwErr(true);
        setPwErrMessage('영문 대/소문자, 숫자, 특수문자 중 3종류 이상 섞어주세요');
      } else {
        setPwErr(false);
        setPwErrMessage('');
      }
    } else {
      setPwErr(false);
      setPwErrMessage('');
    }
  };

  const handleChangePw = () => {
    if (!oldPw || !newPw || !pwConfirm) {
      return;
    } else if (oldPw === newPw) {
      setModalOpen(true);
      setModalMessage('현재와 같은 비밀번호에요.');
      setModalErr(true);
      return;
    } else if (newPw != pwConfirm) {
      setModalOpen(true);
      setModalMessage('비밀번호가 일치하지 않아요.');
      setModalErr(true);
      return;
    }
    dispatch(userActions.ChangePw({ oldPw, newPw }));
  };

  useEffect(() => {
    if (profileImg) {
      if (loadUserError) {
        setModalOpen(true);
        setModalMessage(loadUserError);
        setModalErr(true);
        return;
      }
    }
    if (loadUserDone === 'NO_MATCH_USER') {
      if (changePw) {
        setModalOpen(true);
        setModalMessage('비밀번호가 일치하지 않아요.');
        setModalErr(true);
        return;
      } else {
        setModalOpen(true);
        setModalMessage('정보가 일치하지 않아요');
        setModalErr(true);
        return;
      }
    } else if (loadUserDone === 'CHANGED') {
      if (changePw) {
        setModalOpen(true);
        setModalMessage('비밀번호가 변경되었어요.');
        setModalErr(false);
        setChangePw(false);
      } else {
        setModalOpen(true);
        setModalMessage('프로필이 변경되었어요.');
        setModalErr(false);
      }
    } else if (loadUserDone === 'DELETED') {
      setDeleteUserDone(true);
      localStorage.clear();
      delete axiosInstance.defaults.headers.common['Authorization'];
      dispatch(authActions.initializeAuthForm());
      dispatch(userActions.initializeUserForm());
    }
  }, [loadUserDone, loadUserError]);

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalErr, setModalErr] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // delete user
  const [deleteUser, setDeleteUser] = useState(false);
  const [deleteUserDone, setDeleteUserDone] = useState(false);
  const deleteRef = useRef<HTMLDivElement>(null);
  const handleOpenDeleteUser = () => {
    setDeleteUser(true);
    dispatch(localActions.isLocalBgBlur());
  };
  const handleCloseDeleteUser = () => {
    setDeleteUser(false);
    dispatch(localActions.isNotLocalBgBlur());
  };
  // const handleClickOutSide = (e: any) => {
  //   if (deleteUser && !deleteRef.current.contains(e.target)) {
  //     setDeleteUser(false);
  //     dispatch(localActions.isNotLocalBgBlur());
  //   }
  // };
  // useEffect(() => {
  //   if (deleteUser) document.addEventListener('mousedown', handleClickOutSide);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutSide);
  //   };
  // });

  //google
  const [isGoogle, setIsGoogle] = useState(false);
  useEffect(() => {
    const gId = localStorage.getItem('gId');
    if (gId) {
      setIsGoogle(true);
    }
  }, []);

  useEffect(() => {
    dispatch(userActions.initializeUserForm());
  }, [dispatch]);

  return (
    <>
      <EditMyProfileBlock>
        <div className="open_info">
          <div className="profile">
            <div className="title">
              <h2>공개정보</h2>
              <span>이 정보는 모든 유저에게 공개해요</span>
            </div>
            <div className="profile_image">
              <div className="profile_thumbnail">
                <Image
                  src={profileImg && profileImg != 'default.com' ? profileImg : Profile1[1]}
                  alt="profile"
                  layout="fill"
                />
              </div>
              <div className="profile_con">
                <div className="description">JPG, GIF 또는 PNG 최대크기 700KB</div>
                <div className="profile_ctrl">
                  <Button onClick={() => setImageModalOpen(true)}>이미지 변경</Button>
                  <Button onClick={() => setImageFileModalOpen(true)}>이미지 업로드</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="nickname">
            <div className="title">
              <h2>닉네임</h2>
              <span>유저네임은 딱 한번만 바꿀 수 있어요</span>
            </div>
            <div className="nickname_con">
              <StyledInput
                name="nickname"
                onChange={handleChangeMyProfile}
                value={nicknameSt}
                disabled={isNicknamePrev}
              />
            </div>
          </div>
          <div className="introduce">
            <div className="title">
              <h2>내 소개</h2>
              <span></span>
            </div>
            <div className="introduce_con">
              <StyledTextarea
                name="introduction"
                onChange={handleChangeMyProfile}
                placeholder="내 소개를 적어주세요."
                value={introSt || ''}
              />
            </div>
          </div>
        </div>
        <div className="trading">
          <div className="trading_style">
            <div className="title">
              <h2>트레이딩 스타일</h2>
              <span>최소 1가지의 트레이딩 스타일을 선택해주세요</span>
            </div>
            <div className="select_styles">
              <label>
                <input
                  type="checkbox"
                  name="styles"
                  value="SCALPING"
                  onChange={handleChangeMyProfile}
                  checked={stylesSt.includes('SCALPING')}
                />
                <span>#스캘핑</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="styles"
                  value="Day_Trading"
                  onChange={handleChangeMyProfile}
                  checked={stylesSt.includes('Day_Trading')}
                />
                <span>#단타</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="styles"
                  value="Swing"
                  onChange={handleChangeMyProfile}
                  checked={stylesSt.includes('Swing')}
                />
                <span>#스윙</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="styles"
                  value="Trend_Following"
                  onChange={handleChangeMyProfile}
                  checked={stylesSt.includes('Trend_Following')}
                />
                <span>#추세매매</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="styles"
                  value="Counter_Trend"
                  onChange={handleChangeMyProfile}
                  checked={stylesSt.includes('Counter_Trend')}
                />
                <span>#역추세매매</span>
              </label>
            </div>
          </div>
          <div className="change_pw">
            {changePw && (
              <>
                <div className="title">
                  <h2>비밀번호 변경</h2>
                  <span>비밀번호는 공개되지 않아요</span>
                </div>
                <div className="change_pw_con">
                  <div className="change_pw_form">
                    <div className="input">
                      <StyledPwInput
                        name="oldPw"
                        type="password"
                        placeholder="기존 비밀번호를 확인할게요"
                        onChange={handleChangePwForm}
                        value={oldPw || ''}
                      />
                    </div>
                    <div className="input">
                      <StyledPwInput
                        name="newPw"
                        type="password"
                        placeholder="비밀번호를 변경해요"
                        onChange={handleChangePwForm}
                        value={newPw || ''}
                        onBlur={handlePwBlur}
                      />
                    </div>
                    <div className="input">
                      <StyledPwInput
                        name="pwConfirm"
                        type="password"
                        placeholder="다시한번 비밀번호를 작성해요"
                        onChange={handleChangePwForm}
                        value={pwConfirm || ''}
                      />
                    </div>
                    {pwErr && (
                      <div className="pw_error">
                        <div className="notice">
                          <Image src={Notice[1]} alt="공지" />
                        </div>
                        {pwErrMessage}
                      </div>
                    )}
                  </div>
                  <StyledButton blue onClick={handleChangePw} disabled={!clickAble}>
                    변경하기
                  </StyledButton>
                </div>
              </>
            )}
            <div className="ctrl_btns">
              {!isGoogle && (
                <div className={changePw ? 'change_pw_btn on' : 'change_pw_btn'} onClick={() => setChangePw(!changePw)}>
                  비밀번호 변경하기
                </div>
              )}
              <div className="change_pw_btn" onClick={handleOpenDeleteUser}>
                탈퇴하기
              </div>
            </div>
          </div>
        </div>
      </EditMyProfileBlock>
      <BottomBtn>
        <Button blue onClick={handleUpdateUserProfile}>
          변경내용 저장하기
        </Button>
      </BottomBtn>
      <ImageModal
        open={imageModalOpen}
        onClose={handleCloseImageModal}
        photoUrl={profileImg}
        setProfileImg={setProfileImg}
      />
      <ImageFileModal
        open={imagefileModalOpen}
        onClose={handleCloseImageFileModal}
        photoUrl={profileImg}
        setProfileImg={setProfileImg}
      />
      <Modal open={modalOpen} close={handleCloseModal} message={modalMessage} error={modalErr} />
      {deleteUser && (
        <DeleteUserWin
          deleteRef={deleteRef}
          onClose={handleCloseDeleteUser}
          setModalOpen={setModalOpen}
          setModalMessage={setModalMessage}
          setModalErr={setModalErr}
          deleteUserDone={deleteUserDone}
        />
      )}
    </>
  );
};

const EditMyProfileBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  & > div {
    width: 100%;
    border-radius: 14px;
    background-color: ${colors.gray[0]};
    padding: 40px;
    &:first-child {
      margin-right: 20px;
    }
    & > div {
      margin-bottom: 40px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .title {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    h2 {
      font-size: 18px;
      color: ${colors.gray[5]};
      margin-right: 8px;
    }
    span {
      font-size: 14px;
      color: ${colors.gray[3]};
    }
  }
  .profile_image {
    width: 100%;
    display: flex;
    align-items: center;
    .profile_thumbnail {
      width: 88px;
      min-width: 88px;
      height: 88px;
      position: relative;
      margin-right: 16px;
      border-radius: 50%;
      overflow: hidden;
      background-color: ${colors.blue[2]};
    }
    .profile_con {
      .description {
        color: ${colors.gray[4]};
        margin-bottom: 12px;
      }
      .profile_ctrl {
        display: flex;
        button {
          width: 100%;
          max-width: 120px;
          padding: 0;
          background-color: white;
          min-height: auto;
          height: 32px;
          font-size: 14px;
          border: 1px solid;
          color: ${colors.blue[2]};
          &:hover {
            background-color: ${colors.gray[2]};
          }
          &:first-child {
            margin-right: 12px;
          }
        }
      }
    }
  }
  .trading {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .trading_style {
      width: 100%;
      margin-bottom: 40px;
      .select_styles {
        width: 100%;
        display: flex;

        label {
          width: 100%;
          max-width: 122.8px;
          margin-right: 12px;

          span {
            display: inline-block;
            width: 100%;
            cursor: pointer;
            height: 40px;
            background-color: white;
            border: 1px solid;
            padding: 8px;
            text-align: center;
            color: ${colors.gray[5]};
            border-radius: 28px;
            transition: all 0.2s;

            &:hover {
              opacity: 0.7;
            }
          }
          input {
            display: none;
          }

          input:checked + span {
            color: ${colors.blue[2]};
          }
        }
      }
    }
    .change_pw_con {
      width: 100%;
      display: flex;
      align-items: flex-end;
      margin-bottom: 28px;
      position: relative;
      .change_pw_form {
        flex: 1;
        margin-right: 16px;

        .input {
          position: relative;
          margin-bottom: 12px;
          &:nth-child(3) {
            margin-bottom: 0;
          }

          &::after {
            content: '';
            width: 24px;
            height: 24px;
            position: absolute;
            top: 50%;
            right: 26px;
            transform: translateY(-50%);
            background: url(${Lock[0].src}) no-repeat 50% / cover;
          }
        }
      }
      .pw_error {
        position: absolute;
        width: 100%;
        display: flex;
        font-size: 14px;
        color: ${colors.red[2]};
        top: 100%;
        transform: translateY(50%);
        .notice {
          margin-right: 8px;
          position: relative;
        }
      }
    }
    .ctrl_btns {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      & > div {
        cursor: pointer;
        transition: all 0.2s;
        color: ${colors.gray[3]};
        &:hover {
          color: ${colors.gray[4]};
        }
        &:first-child {
          margin-right: 9px;
        }
        &.on {
          color: ${colors.gray[5]};
        }
      }
    }
  }
  ${media.tablet} {
    flex-direction: column;
    & > div {
      padding: 16px;
      &:first-child {
        margin-right: 0;
        margin-bottom: 20px;
      }
    }
    .title {
      h2 {
        font-size: 16px;
      }
    }
    .profile_image {
      width: 100%;
      display: flex;
      align-items: center;
      .profile_thumbnail {
        width: 64px;
        min-width: 64px;
        height: 64px;
        position: relative;
        margin-right: 16px;
        border-radius: 50%;
        overflow: hidden;
        background-color: ${colors.blue[2]};
      }
      .profile_con {
        .description {
          font-size: 12px;
        }
        .profile_ctrl {
          display: flex;
          button {
            border-radius: 28px;
          }
        }
      }
    }
    .trading {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .trading_style {
        width: 100%;
        margin-bottom: 40px;
        .title {
          flex-wrap: wrap;
        }
        .select_styles {
          width: 100%;
          display: flex;
          flex-wrap: wrap;

          label {
            width: 100%;
            max-width: 122.8px;
            margin-right: 12px;
            margin-bottom: 12px;

            span {
              display: inline-block;
              width: 100%;
              cursor: pointer;
              height: 40px;
              background-color: white;
              border: 1px solid;
              padding: 8px;
              text-align: center;
              color: ${colors.gray[5]};
              border-radius: 28px;
              transition: all 0.2s;

              &:hover {
                opacity: 0.7;
              }
            }
            input {
              display: none;
            }

            input:checked + span {
              color: ${colors.blue[2]};
            }
          }
        }
      }
      .change_pw_con {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-bottom: 28px;
        position: relative;
        .change_pw_form {
          width: 100%;
          flex: 1;
          margin-right: 0;
          margin-bottom: 16px;
          .input {
            position: relative;
            margin-bottom: 12px;
            &:nth-child(3) {
              margin-bottom: 0;
            }

            &::after {
              content: '';
              width: 24px;
              height: 24px;
              position: absolute;
              top: 50%;
              right: 26px;
              transform: translateY(-50%);
              background: url(${Lock[0].src}) no-repeat 50% / cover;
            }
          }
        }
        .pw_error {
          position: absolute;
          width: 100%;
          display: flex;
          font-size: 14px;
          color: ${colors.red[2]};
          top: 100%;
          transform: translateY(50%);
          .notice {
            margin-right: 8px;
            position: relative;
          }
        }
      }
      .ctrl_btns {
        width: 100%;
        display: flex;
        justify-content: flex-end;

        & > div {
          cursor: pointer;
          transition: all 0.2s;
          color: ${colors.gray[3]};
          &:hover {
            color: ${colors.gray[4]};
          }
          &:first-child {
            margin-right: 9px;
          }
          &.on {
            color: ${colors.gray[5]};
          }
        }
      }
    }
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 24px;
  border: 1px solid ${colors.gray[2]};
  border-radius: 8px;
  transition: all 0.2s;
  font-size: 14px;
  color: ${colors.gray[5]};
  &:focus {
    outline: none;
    border-color: ${colors.gray[3]};
  }
  &:disabled {
    background-color: white;
    color: ${colors.blue[2]};
  }
`;

const StyledPwInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 24px;
  border: 1px solid ${colors.gray[2]};
  border-radius: 8px;
  transition: all 0.2s;
  font-size: 14px;
  color: ${colors.gray[5]};
  position: relative;
  &:focus {
    border-color: ${colors.gray[3]};
    outline: none;
  }
  &::placeholder {
    color: ${colors.gray[3]};
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 64px;
  padding: 12px 24px;
  border: 1px solid ${colors.gray[2]};
  border-radius: 8px;
  transition: all 0.2s;
  font-size: 14px;
  color: ${colors.gray[5]};
  &:focus {
    outline: none;
    border-color: ${colors.gray[3]};
  }

  &::placeholder {
    color: ${colors.gray[3]};
  }
`;

const BottomBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  button {
    border-radius: 8px;
    min-height: auto;
    height: 50px;
  }

  ${media.tablet} {
    button {
      width: 100%;
    }
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 148px;
  min-height: auto;
  height: 48px;
  border-radius: 8px;

  &:disabled {
    background-color: ${colors.gray[2]};
    color: ${colors.gray[3]};
  }
  ${media.tablet} {
    width: 100%;
    max-width: none;
  }
`;

export default EditMyProfile;
