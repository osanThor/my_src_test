import React from 'react';
import styled from 'styled-components';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardLayoutBlock className="container">{children}</DashboardLayoutBlock>;
};

const DashboardLayoutBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default DashboardLayout;
