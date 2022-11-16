import { media } from '@/styles/theme';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [dashBoard, setDashBoard] = useState(false);

  useEffect(() => {
    if (router.pathname === '/dashboard') {
      setDashBoard(true);
    } else {
      setDashBoard(false);
    }
  }, []);
  return (
    <DashboardLayoutBlock className="container">
      {dashBoard && <DashboardHeaderSpacer />}
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
