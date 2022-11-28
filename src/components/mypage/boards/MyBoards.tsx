import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MyBoardTab from './MyBoardTab';
import BoardsTable from './table/BoardsTable';

const MyBoards = () => {
  const { myWritenBoards, myComments, myLikes, myCollections, myInquiries } = useSelector(({ local }: RootState) => ({
    myWritenBoards: local.myWritenBoards,
    myComments: local.myComments,
    myLikes: local.myLikes,
    myCollections: local.myCollections,
    myInquiries: local.myInquiries,
  }));
  return (
    <MyBoardsBlock>
      <MyBoardTab />
      {myWritenBoards && <BoardsTable />}
    </MyBoardsBlock>
  );
};

const MyBoardsBlock = styled.div`
  width: 100%;
`;

export default MyBoards;
