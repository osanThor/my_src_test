import colors from '@/src/assets/Colors';
import { Logo } from '@/src/assets/Images';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const TelegramLayout = () => {
  return (
    <LoginFormBlock>
      <h1 className="logo">
        <Link href="/">
          <a>
            <Image src={Logo} alt="main_logo" />
          </a>
        </Link>
      </h1>
      <div>
        <h2>텔레그램 연동성의 중요성~!</h2>
      </div>
    </LoginFormBlock>
  );
};
const LoginFormBlock = styled.form`
  width: 100%;
  max-width: 400px;
  height: 100%;
  color: ${colors.gray[5]};
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
`;

export default TelegramLayout;
