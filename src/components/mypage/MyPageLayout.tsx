import { media } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';
import MyProfileBox from './MyProfileBox';

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MyPageLayoutBlock className="container">
      <MyPageHeaderSpacer />
      <MyProfileBox />
      {children}
    </MyPageLayoutBlock>
  );
};

const MyPageLayoutBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const MyPageHeaderSpacer = styled.div`
  ${media.tablet} {
    width: 100%;
    height: 56px;
  }
`;
export default MyPageLayout;
