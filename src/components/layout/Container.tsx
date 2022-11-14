import { media } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';
const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <MainContainerBlock>
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
`;
const MainContainer = styled.div`
  width: 100%;
  overflow-y: auto;
  display: flex;

  & > div:nth-child(2) {
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
export default Container;
