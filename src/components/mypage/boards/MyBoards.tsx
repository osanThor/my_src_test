import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import { userActions } from '@/src/store/reducers';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MyBoardTab from './MyBoardTab';
import BoardsTable from './table/BoardsTable';

const MyBoards = () => {
  const dispatch = useDispatch();
  const { myWritenBoards, myComments, myLikes, myCollections, myInquiries } = useSelector(({ local }: RootState) => ({
    myWritenBoards: local.myWritenBoards,
    myComments: local.myComments,
    myLikes: local.myLikes,
    myCollections: local.myCollections,
    myInquiries: local.myInquiries,
  }));
  const { category, page } = useSelector(({ user }: RootState) => ({
    category: user.category,
    page: user.page,
  }));

  useEffect(() => {
    if (myWritenBoards) {
      dispatch(userActions.getUserBoards({ category, page }));
    }
  }, [myWritenBoards, myComments, myLikes, myCollections, myInquiries]);

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
