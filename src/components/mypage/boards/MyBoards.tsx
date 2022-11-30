import { RootState } from '@/src/store/configureStore';
import { authActions, boardsActions, localActions, userActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MyBoardTab from './MyBoardTab';
import BoardsTable from './table/BoardsTable';
import MyCollectionsTable from './table/MyCollectionsTable';
import MyCommentsTable from './table/MyCommentsTable';
import MyInquiriesTable from './table/MyInquiriesTable';
import MyLikesTable from './table/MyLikesTable';

const MyBoards = () => {
  const router = useRouter();
  const dispatch = useDispatch();

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
      {myComments && <MyCommentsTable />}
      {myLikes && <MyLikesTable />}
      {myCollections && <MyCollectionsTable />}
      {myInquiries && <MyInquiriesTable />}
    </MyBoardsBlock>
  );
};

const MyBoardsBlock = styled.div`
  width: 100%;
`;

export default MyBoards;
