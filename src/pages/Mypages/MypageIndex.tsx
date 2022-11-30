import UserLayout from '@/src/components/layout/UserLayout';
import MyBoards from '@/src/components/mypage/boards/MyBoards';
import EditMyProfile from '@/src/components/mypage/edit/EditMyProfile';
import MyPageLayout from '@/src/components/mypage/MyPageLayout';
import { RootState } from '@/src/store/configureStore';
import { boardsActions, localActions, userActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const MypageIndex: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { editMyProfile, myBoards } = useSelector(({ local }: RootState) => ({
    editMyProfile: local.editMyProfile,
    myBoards: local.myBoards,
  }));
  const { _count } = useSelector(({ user }: RootState) => ({
    _count: user._count,
  }));
  const { category, page } = useSelector(({ boards }: RootState) => ({
    category: boards.category,
    page: boards.page,
  }));

  useEffect(() => {
    dispatch(userActions.getUserProfile());
    dispatch(localActions.initializeAuthForm());
  }, [dispatch]);

  useEffect(() => {
    dispatch(boardsActions.initializeBoardsForm());
  }, [router]);

  useEffect(() => {
    if (router.query.state === 'edit') {
      dispatch(localActions.gotoEditMyProfile());
    } else if (router.query.state === 'boards') {
      dispatch(localActions.gotoMyBoards());
    }
  }, [router]);

  useEffect(() => {
    if (myBoards) {
      if (!router.query.board) {
        if (_count.boards) {
          console.log('야 되냐?');
          dispatch(localActions.gotoMyWritenBoards());
          dispatch(boardsActions.getUserBoards({ category, page }));
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
  }, [router, category, page, myBoards, _count]);

  return (
    <UserLayout>
      <MyPageLayout>
        {editMyProfile && <EditMyProfile />}
        {myBoards && <MyBoards />}
      </MyPageLayout>
    </UserLayout>
  );
};

export default MypageIndex;
