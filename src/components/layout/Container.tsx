import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
const Container = ({ children }: { children: React.ReactNode }) => {
  const { bgBlur } = useSelector(({ local }: RootState) => ({
    bgBlur: local.bgBlur,
  }));
  return (
    <MainContainerBlock>
      {bgBlur && <BgBlurBlock />}
      <TopHeaderSpacer />
      <MainContainer>
        <GnbHeaderSpacer />
        {children}
      </MainContainer>
    </MainContainerBlock>
  );
};
const MainContainerBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .container {
    width: 100%;
    padding: 48px 48px 100px;
    overflow: hidden;
    & > div {
      max-width: 1504px;
    }
  }

  ${media.tablet} {
    width: 100%;
    .container {
      width: 100%;
      padding: 8px 16px 60px;
    }
  }
`;
const MainContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  display: flex;

  & > div:nth-child(2) {
    width: calc(100% - 228px);
    flex: 1;
  }
`;
const TopHeaderSpacer = styled.div`
  width: 100%;
  height: 80px;
  ${media.tablet} {
    display: none;
  }
`;
const GnbHeaderSpacer = styled.div`
  width: 228px;
  height: 100%;
  ${media.tablet} {
    display: none;
  }
`;

const BgBlurBlock = styled.div`
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 980;
`;
export default Container;
