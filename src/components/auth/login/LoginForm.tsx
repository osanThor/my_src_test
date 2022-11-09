import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import colors from '../../../assets/Colors';
import { CloseRed, Email, Lock } from '../../../assets/Images';
import Button from '../../common/Button';
import StyledCheckBox from '../../common/StyledCheckBox';
import { Logo } from '../../../assets/Images';
import { ILoginSubmit } from '@/src/interfaces/iAuth/iLogin';
import GoogleLoginBtn from './GoogleLoginBtn';

const LoginForm = ({ email, pw, onChange, autoLogin, handleAutoLogin, onSubmit }: ILoginSubmit) => {
  const [idError, setIdError] = useState(false);
  const [pwError, setPwError] = useState(false);

  return (
    <LoginFormBlock>
      <h1 className="logo">
        <Link href="/">
          <a>
            <Image src={Logo[0]} alt="main_logo" />
          </a>
        </Link>
      </h1>
      <GoogleLoginBtn />
      <span className="or">or</span>
      <form onSubmit={onSubmit}>
        <StyleInput
          type="text"
          name="email"
          onChange={onChange}
          placeholder="이메일 입력해요"
          icon={idError ? CloseRed : Email}
          error={idError ? true : false}
          value={email}
        />
        <StyleInput
          type="password"
          name="pw"
          onChange={onChange}
          placeholder="비밀번호를 입력해요"
          icon={pwError ? CloseRed : Lock}
          error={pwError ? true : false}
          value={pw}
        />
        <div className="check">
          <StyledCheckBox style="round" autoLogin={autoLogin} handleAutoLogin={handleAutoLogin} />
          편리한 자동 로그인
        </div>
        <Button blue fullWidth style={{ marginBottom: '1rem' }} onClick={onSubmit}>
          로그인
        </Button>
      </form>
      <div className="bottom">
        <Link href="/auth/terms">회원가입</Link>
        <Link href="/auth/forgot-password">이메일 or 비밀번호 모르겠어요</Link>
      </div>
    </LoginFormBlock>
  );
};

const LoginFormBlock = styled.div`
  width: 100%;
  max-width: 400px;
  height: 100%;
  color: ${colors.gray[4]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1.logo {
    width: 190px;
    cursor: pointer;
    margin-bottom: 20px;
    img {
      width: 100%;
    }
  }

  span.or {
    font-family: 'GmarketSansBold';
    font-size: 24px;
    text-align: center;
    margin-bottom: 30px;
  }
  form {
    width: 100%;
  }
  .check {
    display: flex;
    width: 100%;
    margin-bottom: 40px;
  }
  .bottom {
    width: 100%;
    text-align: right;
    display: flex;
    justify-content: space-between;
    a:first-child {
      margin-right: 1rem;
    }
  }
  @media (max-width: 768px) {
    width: calc(100% - 32px);
    justify-content: flex-start;
    span.or {
      font-size: 24px;
      margin-bottom: 20px;
    }
    .check {
      margin-bottom: 20px;
    }
  }
`;

const StyleInput = (props: any) => {
  const { icon, onChange } = props;
  return (
    <StyledInputBlock>
      <StyledInput onChange={onChange} {...props} autoComplete="on" />
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
  margin-bottom: 20px;

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
export default LoginForm;
