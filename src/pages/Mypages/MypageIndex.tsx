import UserLayout from '@/src/components/layout/UserLayout';
import MyBoards from '@/src/components/mypage/boards/MyBoards';
import EditMyProfile from '@/src/components/mypage/edit/EditMyProfile';
import MyPageLayout from '@/src/components/mypage/MyPageLayout';
import { RootState } from '@/src/store/configureStore';
import { boardsActions, localActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const MypageIndex: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loadAuthLoading, loadAuthDone } = useSelector(({ auth }: RootState) => ({
    loadAuthLoading: auth.loadAuthLoading,
    loadAuthDone: auth.loadAuthDone,
  }));
  const { editMyProfile, myBoards } = useSelector(({ local }: RootState) => ({
    editMyProfile: local.editMyProfile,
    myBoards: local.myBoards,
  }));
  const { category, page } = useSelector(({ boards }: RootState) => ({
    category: boards.category,
    page: boards.page,
  }));

  const [isUser, setisUser] = useState(false);
  useEffect(() => {
    setisUser(false);
  }, [router]);

  useEffect(() => {
    if (!loadAuthLoading) {
      if (loadAuthDone) {
        if (loadAuthDone.accessToken) {
          setisUser(true);
        }
      }
    }
  }, [loadAuthLoading, loadAuthDone]);

  useEffect(() => {
    dispatch(boardsActions.initializeBoardsForm());
  }, [dispatch]);

  useEffect(() => {
    if (router.query.state === 'edit') {
      if (isUser) {
        dispatch(localActions.gotoEditMyProfile());
      }
    } else if (router.query.state === 'boards') {
      dispatch(localActions.gotoMyBoards());
    }
  }, [router, isUser]);

  useEffect(() => {
    if (isUser) {
      if (!router.query.board) {
        dispatch(localActions.gotoMyWritenBoards());
        dispatch(boardsActions.getUserBoards({ category, page }));
      }
      if (router.query.board === 'comments') {
        dispatch(localActions.gotoMyComments());
        dispatch(boardsActions.getUserComments({ category, page }));
      }
      if (router.query.board === 'likes') {
        dispatch(localActions.gotoMyLikes());
        dispatch(boardsActions.getUserLikes({ category, page }));
      }
      if (router.query.board === 'collections') {
        dispatch(localActions.gotoMyCollections());
        dispatch(boardsActions.getUserCollections({ category, page }));
      }
      if (router.query.board === 'inquiries') {
        dispatch(localActions.gotoMyInquiries());
        dispatch(boardsActions.getUserInquiries({ page }));
      }
    }
    setisUser(false);
    if (router.query.page) {
      dispatch(boardsActions.changePage({ page: parseInt(router.query.page as string) }));
    } else {
      dispatch(boardsActions.changePage({ page: 1 }));
    }

    if (router.query.category) {
      dispatch(boardsActions.changeCategory({ category: router.query.category as string }));
    } else {
      dispatch(boardsActions.changeCategory({ category: '' }));
    }
  }, [router, isUser, category, page, myBoards]);

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
