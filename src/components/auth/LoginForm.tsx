import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import colors from "../../assets/Colors";
import { CloseRed, Email, Google, Lock } from "../../assets/Images";
import Button from "../common/Button";
import StyledCheckBox from "../common/StyledCheckBox";
import { Logo } from "../../assets/Images";

const LoginForm = () => {
  const [idError, setIdError] = useState(false);
  const [pwError, setPwError] = useState(false);
  const ref = useRef(null);
  const onChange = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <LoginFormBlock>
      <h1 className="logo">
        <Link href="/">
          <a>
            <Image src={Logo} alt="main_logo" />
          </a>
        </Link>
      </h1>
      <GoogleLoginButon>
        구글 계정을 사용할래요{" "}
        <div className="icon">
          <Image src={Google} alt="google" />
        </div>
      </GoogleLoginButon>
      <span className="or">or</span>
      <StyleInput
        type="text"
        onChange={onChange}
        placeholder="이메일 입력해요"
        icon={idError ? CloseRed : Email}
        error={idError ? true : false}
      />
      <StyleInput
        type="password"
        onChange={onChange}
        placeholder="비밀번호를 입력해요"
        icon={pwError ? CloseRed : Lock}
        error={pwError ? true : false}
      />
      <div className="check">
        <StyledCheckBox style="round" />
        편리한 자동 로그인
      </div>
      <Button blue fullWidth style={{ marginBottom: "1rem" }}>
        로그인
      </Button>
      <div className="bottom">
        <Link href="/auth/terms">회원가입</Link>
        <Link href="/auth/forgot-password">이메일 or 비밀번호 몰라요</Link>
      </div>
    </LoginFormBlock>
  );
};

const LoginFormBlock = styled.form`
  width: 100%;
  max-width: 400px;
  color: ${colors.gray[4]};
  display: flex;
  flex-direction: column;
  align-items: center;

  h1.logo {
    width: 170px;
    cursor: pointer;
    margin-bottom: 20px;
    img {
      width: 100%;
    }
  }

  span.or {
    font-family: "GmarketSansBold";
    font-size: 24px;
    text-align: center;
    margin-bottom: 30px;
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
    width: calc(100% - 64px);
    span.or {
      font-size: 24px;
      margin-bottom: 20px;
    }
    .check {
      margin-bottom: 20px;
    }
  }
`;

const GoogleLoginButon = styled(Button)`
  width: 100%;
  height: 72px;
  text-align: left;
  position: relative;
  margin-bottom: 30px;

  .icon {
    position: absolute;
    top: 50%;
    right: 36px;
    transform: translateY(-50%);
    display: flex;
  }
  @media (max-width: 768px) {
    height: 56px;
    margin-bottom: 20px;
  }
`;

const StyleInput = (props) => {
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
    color: ${colors.blue[2]};
  }
  @media (max-width: 768px) {
    height: 56px;
    font-size: 14px;
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
