import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { Logo } from "../../assets/Images";

const AuthLayout = ({ children }: any) => {
  return (
    <AuthLayoutBlock>
      <AuthHead>
        <h1 className="logo">
          <Image src={Logo} alt="main Logo" />
        </h1>
      </AuthHead>
      {children}
    </AuthLayoutBlock>
  );
};

const AuthLayoutBlock = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AuthHead = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    width: 170px;
  }
`;

export default AuthLayout;
