import colors from '@/src/assets/Colors';
import { Profile1, ResetIcon } from '@/src/assets/Images';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Balance from './Balance';
import MyExchangeArea from './MyExchangeArea';
import NoticeArea from './NoticeArea';

const DashboardLayout = () => {
  return (
    <DashboardLayoutBlock className="container">
      <NoticeArea />
      <MyExchangeArea />
      <Balance />
    </DashboardLayoutBlock>
  );
};

const DashboardLayoutBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default DashboardLayout;
