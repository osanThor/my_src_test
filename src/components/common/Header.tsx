import { Logo } from '@/src/assets/Images';
import { theme } from '@/styles/theme';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeaderBlock>
      <TopHeader />
      <TopHeaderSpacer />
      <GnbHeader>
        <div className="main_logo">
          <Link href="/">
            <a>
              <Image src={Logo} alt="main_logo" />
            </a>
          </Link>
        </div>
        <div className="gnb"></div>
      </GnbHeader>
      <MainContainer>
        <GnbHeaderSpacer />
        {children}
      </MainContainer>
    </HeaderBlock>
  );
};

const HeaderBlock = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const TopHeader = styled.div`
  width: calc(100% - 228px);
  height: 80px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 990;
  box-shadow: ${theme.boxShadow};
`;
const TopHeaderSpacer = styled.div`
  width: 100%;
  height: 80px;
`;
const GnbHeader = styled.div`
  width: 228px;
  height: 100%;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  border-right: 1px solid #e9eaec;
  z-index: 991;

  .main_logo {
    width: 100%;
    height: 80px;
    padding: 1rem 20px;

    a {
      display: block;
      position: relative;
    }
  }
`;
const GnbHeaderSpacer = styled.div`
  width: 228px;
  height: 100%;
`;
const MainContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  display: flex;

  & > div:nth-child(2) {
    flex: 1;
  }
`;

export default Header;
