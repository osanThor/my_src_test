import colors from '@/src/assets/Colors';
import React from 'react';
import styled from 'styled-components';
import MyBoardTab from './MyBoardTab';
import BoardsTable from './table/BoardsTable';

const MyBoards = () => {
  return (
    <MyBoardsBlock>
      <MyBoardTab />
      <BoardsTable />
    </MyBoardsBlock>
  );
};

const MyBoardsBlock = styled.div`
  width: 100%;
`;

export default MyBoards;
