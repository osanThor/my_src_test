import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import colors from "../../assets/Colors";
import { Email, Google, Lock } from "../../assets/Images";
import Button from "../common/Button";
import StyledCheckBox from "../common/StyledCheckBox";
import StyleInput from "../common/StyleInput";

const LoginForm = () => {
  return (
    <LoginFormBlock>
      <GoogleLoginButon>
        구글 계정을 사용할래요{" "}
        <div className="icon">
          <Image src={Google} alt="google" />
        </div>
      </GoogleLoginButon>
      <span className="or">or</span>
      <StyleInput type="text" placeholder="이메일 입력해요" icon={Email} />
      <StyleInput
        type="password"
        placeholder="비밀번호를 입력해요"
        icon={Lock}
      />
      <div className="check">
        <StyledCheckBox style="round" />
        편리한 자동 로그인
      </div>
      <Button blue fullWidth style={{ marginBottom: "1rem" }}>
        로그인
      </Button>
      <div className="bottom">
        <Link href="/auth/register">회원가입</Link>
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
    a:first-child {
      margin-right: 1rem;
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
`;

export default LoginForm;
