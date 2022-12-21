import colors from '@/src/assets/Colors';
import { CameraBlue, Email, Key, Lock, Logo, Notice, Profile } from '@/src/assets/Images';
import { IRegisterType } from '@/src/interfaces/iAuth/iRegister';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import Button from '../../common/Button';
import Timer from '../../common/Timer';

const RegisterForm = ({
  handleCheckNickname,
  profileImg,
  verify,
  existEmail,
  setExistEmial,
  readOnlyEmail,
  handleReqVerify,
  handleClickOpen,
  onChange,
  onSubmit,
  veriAble,
  ReadOnltVerify,
  timerErr,
  min,
  setTimerErr,
  timerVisible,
  handleCheckVerify,
  pwError,
  pwErrMessage,
  handlePwBlur,
}: IRegisterType) => {
  //google 회원가입 인지 확인
  const [googleRegister, setGoogleRegister] = useState(false);
  useEffect(() => {
    const gId = localStorage.getItem('gId');
    if (gId) {
      setGoogleRegister(true);
    } else {
      setGoogleRegister(false);
    }
    console.log(`gId is ${gId}`);
  }, []);
  // 상태관리
  const { email, pw, pwConfirm, nickname, checkNicknameResult, verifyCode, isDark } = useSelector(
    ({ user }: RootState) => ({
      email: user.email,
      pw: user.pw,
      pwConfirm: user.pwConfirm,
      verifyCode: user.verifyCode,
      nickname: user.nickname,
      checkNicknameResult: user.checkNicknameResult,
      isDark: user.isDark,
    }),
  );

  // 이메일 실시간 유효성검사
  const [emailError, setEmailError] = useState<boolean>(Boolean);
  const [emailErrMessage, setEmailErrMessage] = useState<string>('이메일 형식이 잘못 되었어요');
  useEffect(() => {
    if (email.length <= 0) {
      setEmailError(true);
    }
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (existEmail) {
      setEmailError(true);
      setEmailErrMessage('이미 등록된 이메일주소예요');
      if (!emailRegex.test(email)) {
        setEmailErrMessage('이메일 형식이 잘못 되었어요');
        setExistEmial(false);
      }
    } else {
      setEmailErrMessage('이메일 형식이 잘못 되었어요');
      if (!emailRegex.test(email)) {
        setEmailError(true);
        setExistEmial(false);
      } else {
        setEmailError(false);
        setExistEmial(false);
      }
    }
  }, [email, existEmail]);

  // 회원가입 버튼 활성화
  const [registerAble, setRegisterAble] = useState(false);

  useEffect(() => {
    if (googleRegister) {
      if (profileImg && nickname && checkNicknameResult === false && checkNicknameResult != null) {
        setRegisterAble(true);
      } else {
        setRegisterAble(false);
      }
    } else {
      if (profileImg && nickname && email && verifyCode && pw && pwConfirm && pwError === false) {
        setRegisterAble(true);
      } else {
        setRegisterAble(false);
      }
    }
  }, [profileImg, nickname, checkNicknameResult, email, pw, pwConfirm, verifyCode, pwError]);

  return (
    <>
      <RegisterFormBlock>
        <h1 className="logo">
          <Link href="/">
            <a>
              <Image src={isDark ? Logo[1] : Logo[0]} alt="main_logo" />
            </a>
          </Link>
        </h1>
        <form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
          <div className="register_top">
            <div className={`${profileImg ? 'selectImage blue' : 'selectImage'}`} onClick={handleClickOpen}>
              {profileImg ? (
                <>
                  <Image src={profileImg} alt="preview" layout="fill" />
                  <span className="txt white">사진 바꾸기</span>
                </>
              ) : (
                <>
                  <Image src={CameraBlue} alt="previewImage" />
                  <span className="txt">사진 바꾸기</span>
                </>
              )}
            </div>
            <div className="reguster_auth">
              <div>
                <StyleInput
                  name="nickname"
                  placeholder="닉네임을 입력해요"
                  icon={Profile}
                  value={nickname}
                  onChange={onChange}
                />
                <StyledButton blue disabled={nickname ? false : true} onClick={handleCheckNickname}>
                  중복확인
                </StyledButton>
              </div>
              <div>
                <StyleInput
                  name="email"
                  placeholder="이메일을 입력해요"
                  icon={Email}
                  value={email}
                  readOnly={readOnlyEmail ? true : false}
                  onChange={onChange}
                />
                <StyledButton blue disabled={emailError || readOnlyEmail ? true : false} onClick={handleReqVerify}>
                  메일전송
                </StyledButton>
                {!verify && (
                  <div className="notice">
                    {email.length <= 0 ? (
                      <>
                        <div>
                          <Image src={Notice[0]} alt="notice" />
                        </div>
                        <span>텔레그램 @quantro_alarm_bot을 등록해야 이메일을 찾을 수 있어요</span>
                      </>
                    ) : emailError ? (
                      <>
                        <div>
                          <Image src={Notice[1]} alt="notice" />
                        </div>
                        <span className="error">{emailErrMessage}</span>
                      </>
                    ) : (
                      <>
                        <div>
                          <Image src={Notice[0]} alt="notice" />
                        </div>
                        <span>텔레그램 @quantro_alarm_bot을 등록해야 이메일을 찾을 수 있어요</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {!googleRegister && (
            <div className="register_bottom">
              {verify && (
                <div className={ReadOnltVerify || !timerVisible ? 'emailVerify readOnly' : 'emailVerify '}>
                  {timerVisible && <Timer error={timerErr} setError={setTimerErr} min={min} />}
                  <StyleInput
                    name="verifyCode"
                    type="number"
                    placeholder="인증번호를 입력해요"
                    value={verifyCode}
                    icon={Key}
                    onChange={onChange}
                    readOnly={ReadOnltVerify ? true : false}
                  />
                  <StyledButton blue disabled={veriAble ? false : true} onClick={handleCheckVerify}>
                    인증확인
                  </StyledButton>
                </div>
              )}
              <StyleInput
                name="pw"
                type="password"
                placeholder="비밀번호를 설정해요"
                value={pw}
                icon={Lock[1]}
                onChange={onChange}
                onBlur={handlePwBlur}
              />
              <StyleInput
                name="pwConfirm"
                type="password"
                placeholder="비밀번호를 한번 더 설정해요"
                value={pwConfirm}
                icon={Lock[1]}
                onChange={onChange}
              />
              {pwError && (
                <div className="pwErr">
                  <div>
                    <Image src={Notice[1]} alt="notice" />
                  </div>
                  <span className="error">{pwErrMessage}</span>
                </div>
              )}
            </div>
          )}
        </form>
        <Button fullWidth blue disabled={registerAble ? false : true} onClick={onSubmit}>
          회원가입
        </Button>
      </RegisterFormBlock>
    </>
  );
};

const RegisterFormBlock = styled.div`
  width: 100%;
  max-width: 616px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1.logo {
    width: 230px;
    cursor: pointer;
    margin-bottom: 40px;
    a {
      display: block;
    }
    img {
      width: 100%;
    }
  }

  form {
    width: 100%;

    .register_top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;

      .selectImage {
        cursor: pointer;
        &.blue {
          background-color: ${colors.gray[2]};
        }
        width: 30%;
        max-width: 160px;
        position: relative;
        height: 160px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: ${colors.blue[0]};
        border-radius: 12px;
        color: ${colors.blue[2]};
        span.txt {
          margin-top: 12px;
          position: relative;
          z-index: 7;
        }
        span.white {
          position: absolute;
          bottom: 5px;
          color: white;
        }
      }

      .reguster_auth {
        max-width: 440px;
        display: flex;
        flex-direction: column;

        & > div {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          & > div {
            max-width: 320px;
          }
          &:last-child > div:first-child {
            margin-bottom: 0;
            margin-right: 1rem;
          }

          .notice {
            width: 100%;
            max-width: none;
            font-size: 12px;
            color: ${colors.gray[3]};
            display: flex;
            align-items: center;
            margin-top: 0.5rem;
            & > div {
              width: 18px;
              height: 18px;
              margin-right: 0.5rem;
            }

            span.error {
              color: ${colors.red[2]};
            }
          }
        }
      }

      button {
        padding: 0 21px;
      }
    }
    .register_bottom {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 1rem;
      & > div:last-child {
        margin-bottom: 0;
        transform: translateY(2px);
      }
      .emailVerify {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 2.7rem;
        position: relative;
        &.readOnly {
          margin-bottom: 1rem;
        }
        & > div {
          width: 81%;
          max-width: 496px;
          margin-bottom: 0;
        }

        button {
          width: 17%;
          padding: 0 21px;
        }
      }
    }
    .pwErr {
      width: 100%;
      display: flex;
      font-size: 14px;
      color: ${colors.red[2]};
      & > div {
        margin-right: 0.5rem;
      }
    }
  }

  ${media.tablet} {
    width: calc(100% - 32px);
    overflow-y: auto;
    justify-content: flex-start;
    h1.logo {
      width: 210px;
    }
    form {
      margin-bottom: 1rem;

      .register_top {
        flex-direction: column;
        align-items: center;

        .selectImage {
          width: 50%;
          width: 120px;
          height: 120px;
          margin-bottom: 1rem;
        }
        .reguster_auth {
          max-width: none;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          & > div {
            width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            & > div:first-child {
              max-width: none;
              flex: 1;
              margin-right: 0.5rem;
            }
            &:last-child > div:first-child {
              margin-bottom: 0;
              margin-right: 0.5rem;
            }
            .notice {
              align-items: flex-start;
              font-size: 12px;
            }
          }
        }
      }
      .register_bottom {
        .emailVerify {
          & > div {
            width: auto;
            max-width: none;
            flex: 1;
            margin-right: 0.5rem;
          }
          button {
            width: 95.88px;
          }
        }
      }
      button {
        height: 56px;
        min-height: 56px;
      }
    }
  }
`;

const StyleInput = (props: any) => {
  const { icon, onChange } = props;
  const inputRef = useRef(null);

  return (
    <StyledInputBlock>
      <StyledInput ref={inputRef} onChange={onChange} {...props} autoComplete="on" />
      {icon && (
        <div className="inputIcon">
          <Image src={icon} alt="icon" />
        </div>
      )}
    </StyledInputBlock>
  );
};

const StyledInputBlock = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 1rem;

  .inputIcon {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    right: 36px;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: text;
  }
  ${media.tablet} {
    margin-bottom: 1rem;
    .inputIcon {
      right: 1rem;
    }
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 72px;
  border-radius: 14px;
  border: none;
  background: ${colors.blue[0]};
  color: ${colors.blue[2]};
  padding: 0 36px;
  padding-right: 80px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border: 1px solid ${colors.blue[2]};
  }

  &::placeholder {
    color: ${colors.blue[1]};
  }
  ${media.tablet} {
    height: 56px;
    font-size: 14px;
    padding: 0 1rem;
    padding-right: 2.9rem;
  }
  ${(props: any) =>
    props.error &&
    css`
      color: ${colors.red[2]};
      background: ${colors.red[0]};
      border: 1px solid ${colors.red[1]};
      &::placeholder {
        color: ${colors.red[2]};
      }
      &:focus {
        outline: none;
        border: 1px solid ${colors.red[1]};
      }
    `}
`;

const StyledButton = styled(Button)`
  height: 72px;
`;

export default RegisterForm;
