import colors from '@/src/assets/Colors';
import { Lock, Profile1 } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { userActions } from '@/src/store/reducers';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../common/Button';
import ImageFileModal from './ImageFileModal';
import ImageModal from './ImageModal';

const EditMyProfile = () => {
  const dispatch = useDispatch();
  const { pw, pwConfirm, photoUrl, nickname, introduction, styles } = useSelector(({ user }: RootState) => ({
    pw: user.pw,
    pwConfirm: user.pwConfirm,
    photoUrl: user.photoUrl,
    nickname: user.nickname,
    introduction: user.introduction,
    styles: user.styles,
  }));
  const [changePw, setChangePw] = useState(false);

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
    const { name, value, checked }: { name: string; value: any; checked: boolean } = e.target;
    let pwVal = pw;
    let pwConVal = pwConfirm;
    // let nickVal = nickname;
    // let photoVal = photoUrl;
    // let introVal = introduction;
    // let styleVal = styles;
    if (name === 'pw') {
      pwVal = value;
    } else if (name === 'pwConfirm') {
      pwConVal = value;
    } else if (name === 'nickname') {
      setNicknameSt(value);
    } else if (name === 'photoUrl') {
      setProfileImg(value);
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
                <Image src={photoUrl ? photoUrl : Profile1[1]} alt="profile" layout="fill" />
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
              <StyledInput name="nickname" onChange={handleChangeMyProfile} value={nicknameSt} />
            </div>
          </div>
          <div className="introduce">
            <div className="title">
              <h2>내 소개</h2>
              <span>내 소개를 작성해요</span>
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
                      <StyledPwInput placeholder="기존 비밀번호를 확인할게요" />
                    </div>
                    <div className="input">
                      <StyledPwInput placeholder="새 비밀번호를 입력해요" />
                    </div>
                    <div className="input">
                      <StyledPwInput placeholder="다시한번 비밀번호를 작성해요" />
                    </div>
                  </div>
                  <StyledButton blue>변경하기</StyledButton>
                </div>
              </>
            )}
            <div className="ctrl_btns">
              <div className={changePw ? 'change_pw_btn on' : 'change_pw_btn'} onClick={() => setChangePw(!changePw)}>
                비밀번호 변경하기
              </div>
              <div className="change_pw_btn">탈퇴하기</div>
            </div>
          </div>
        </div>
      </EditMyProfileBlock>
      <BottomBtn>
        <Button blue>변경내용 저장하기</Button>
      </BottomBtn>
      <ImageModal
        open={imageModalOpen}
        onClose={handleCloseImageModal}
        photoUrl={profileImg}
        setProfileImg={setProfileImg}
        handleChangeMyProfile={handleChangeMyProfile}
      />
      <ImageFileModal
        open={imagefileModalOpen}
        onClose={handleCloseImageFileModal}
        photoUrl={profileImg}
        setProfileImg={setProfileImg}
        handleChangeMyProfile={handleChangeMyProfile}
      />
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
      .change_pw_form {
        flex: 1;
        margin-right: 16px;

        .input {
          position: relative;
          margin-bottom: 12px;
          &:last-child {
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
    min-height: auto;
    height: 50px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 148px;
  min-height: auto;
  height: 48px;
`;

export default EditMyProfile;
