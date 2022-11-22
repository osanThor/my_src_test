import colors from '@/src/assets/Colors';
import React from 'react';
import styled from 'styled-components';

const NoMessageBox = () => {
  return <NoMessageBoxBlock>주문내역이 없습니다</NoMessageBoxBlock>;
};
const NoMessageBoxBlock = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  font-size: 24px;
  justify-content: center;
  color: ${colors.gray[4]};
  align-items: center;
`;

export default NoMessageBox;
