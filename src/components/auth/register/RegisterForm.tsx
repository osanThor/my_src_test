import colors from '@/src/assets/Colors';
import { CameraBlue, Email, Lock, Logo, Notice, Profile } from '@/src/assets/Images';
import { IRegisterType } from '@/src/interfaces/iAuth/iRegister';
import { userActions } from '@/src/store/reducers';
import { media } from '@/styles/theme';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import Button from '../../common/Button';

const RegisterForm = ({ email, pw, nickname, profileImg, handleClickOpen, onChange, onSubmit }: IRegisterType) => {
  const dispatch = useDispatch();
  const handleCheckNickname = () => {
    dispatch(userActions.checkNickName({ nickname }));
  };

  return (
    <>
      <RegisterFormBlock>
        <h1 className="logo">
          <Link href="/">
            <a>
              <Image src={Logo} alt="main_logo" />
            </a>
          </Link>
        </h1>
        <form onSubmit={onSubmit}>
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
                <StyleInput name="nickname" placeholder="닉네임을 입력해요" icon={Profile} onChange={onChange} />
                <Button blue disabled={nickname ? false : true} onClick={handleCheckNickname}>
                  중복확인
                </Button>
              </div>
              <div>
                <StyleInput placeholder="이메일을 입력해요" icon={Email} />
                <Button disabled>메일전송</Button>
                <div className="notice">
                  <div>
                    <Image src={Notice} alt="notice" />
                  </div>
                  <span>텔레그램 @quantro 봇을 등록해야 이메일을 찾을 수 있어요</span>
                </div>
              </div>
            </div>
          </div>
          <div className="register_bottom">
            <StyleInput type="password" placeholder="비밀번호를 설정해요" icon={Lock} />
            <StyleInput type="password" placeholder="비밀번호를 한번 더 설정해요" icon={Lock} />
          </div>
        </form>
        <Button fullWidth blue disabled onClick={onSubmit}>
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
    width: 170px;
    cursor: pointer;
    margin-bottom: 20px;
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
      cursor: pointer;

      .selectImage {
        &.blue {
          background-color: ${colors.blue[2]};
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
            margin-bottom: 0.5rem;
          }

          .notice {
            width: 100%;
            max-width: none;
            font-size: 14px;
            color: ${colors.gray[3]};
            display: flex;
            align-items: center;
            & > div {
              margin-right: 0.5rem;
              transform: translateY(2px);
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
      }
    }
  }

  ${media.tablet} {
    width: calc(100% - 64px);
    overflow-y: auto;
    justify-content: flex-start;
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
            .notice {
              align-items: flex-start;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
`;

const StyleInput = (props: any) => {
  const { icon, onChange } = props;
  return (
    <StyledInputBlock>
      <StyledInput onChange={onChange} {...props} />
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
  @media (max-width: 768px) {
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
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border: 1px solid ${colors.blue[2]};
  }

  &::placeholder {
    color: ${colors.blue[1]};
  }
  @media (max-width: 768px) {
    height: 56px;
    font-size: 14px;
    padding: 0 1rem;
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

export default RegisterForm;
