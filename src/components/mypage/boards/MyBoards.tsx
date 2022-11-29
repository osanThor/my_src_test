import { RootState } from '@/src/store/configureStore';
import { localActions, userActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
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
  const { category, page, getUserBoardsDone } = useSelector(({ user }: RootState) => ({
    category: user.category,
    page: user.page,
    getUserBoardsDone: user.getUserBoardsDone,
  }));
  const { loadAuthDone } = useSelector(({ auth }: RootState) => ({
    loadAuthDone: auth.loadAuthDone,
  }));

  useEffect(() => {
    if (loadAuthDone.message) {
      if (!router.query.board) {
        dispatch(localActions.gotoMyWritenBoards());
        if (myWritenBoards) {
          if (getUserBoardsDone.boards.length === 0) {
            dispatch(userActions.getUserBoards({ category, page }));
          }
        }
      }
      if (router.query.board === 'comments') {
        dispatch(localActions.gotoMyComments());
        // if (myWritenBoards) {
        //   if (getUserBoardsDone.length === 0) {
        //     dispatch(userActions.getUserBoards({ category, page }));
        //   }
        // }
      }
      if (router.query.board === 'likes') {
        dispatch(localActions.gotoMyLikes());
        // if (myWritenBoards) {
        //   if (getUserBoardsDone.length === 0) {
        //     dispatch(userActions.getUserBoards({ category, page }));
        //   }
        // }
      }
      if (router.query.board === 'collections') {
        dispatch(localActions.gotoMyCollections());
        // if (myWritenBoards) {
        //   if (getUserBoardsDone.length === 0) {
        //     dispatch(userActions.getUserBoards({ category, page }));
        //   }
        // }
      }
      if (router.query.board === 'inquiries') {
        dispatch(localActions.gotoMyInquiries());
        // if (myWritenBoards) {
        //   if (getUserBoardsDone.length === 0) {
        //     dispatch(userActions.getUserBoards({ category, page }));
        //   }
        // }
      }
    }
  }, [loadAuthDone, router, myWritenBoards, myComments, myLikes, myCollections, myInquiries]);

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
