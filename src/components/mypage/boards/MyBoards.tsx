import colors from '@/src/assets/Colors';
import React from 'react';
import styled from 'styled-components';
import MyBoardTab from './MyBoardTab';

const MyBoards = () => {
  return (
    <MyBoardsBlock>
      <MyBoardTab />
    </MyBoardsBlock>
  );
};

const MyBoardsBlock = styled.div`
  width: 100%;
`;

export default MyBoards;
