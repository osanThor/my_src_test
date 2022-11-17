import { media } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayoutBlock className="container">
      <DashboardHeaderSpacer />
      {children}
    </DashboardLayoutBlock>
  );
};

const DashboardLayoutBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const DashboardHeaderSpacer = styled.div`
  ${media.tablet} {
    width: 100%;
    height: 40px;
  }
`;

export default DashboardLayout;
