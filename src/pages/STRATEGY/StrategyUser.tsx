import BoardsTable from '@/src/components/community/table/BoardsTable';
import UserLayout from '@/src/components/layout/UserLayout';
import StrategistBox from '@/src/components/strategy/user/StrategistBox';
import StrategistContrl from '@/src/components/strategy/user/StrategistContrl';
import StrategistLayout from '@/src/components/strategy/user/StrategistLayout';
import { RootState } from '@/src/store/configureStore';
import { boardsActions, localActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const StrategyUser: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(boardsActions.initializeBoardsForm());
  }, [dispatch]);
  const { communityDiscussion, strategyUserStrategy } = useSelector(({ local }: RootState) => ({
    communityDiscussion: local.communityDiscussion,
    strategyUserStrategy: local.strategyUserStrategy,
  }));
  const { loadAuthLoading, loadAuthDone } = useSelector(({ auth }: RootState) => ({
    loadAuthLoading: auth.loadAuthLoading,
    loadAuthDone: auth.loadAuthDone,
  }));
  const { category, page, user, title, comment } = useSelector(({ boards }: RootState) => ({
    category: boards.category,
    page: boards.page,
    user: boards.user,
    title: boards.title,
    comment: boards.comment,
  }));

  const [isUser, setUser] = useState(false);
  useEffect(() => {
    dispatch(boardsActions.initializeBoardsForm());
  }, [router, dispatch]);

  useEffect(() => {
    setUser(false);
  }, [router]);

  useEffect(() => {
    if (!loadAuthLoading) {
      if (loadAuthDone) {
        if (loadAuthDone.accessToken) {
          setUser(true);
        }
      }
    }
  }, [loadAuthLoading, loadAuthDone]);

  useEffect(() => {
    setUser(false);
    if (router.query.category === 'discussion') {
      dispatch(localActions.gotoComDiscussion());
    } else if (router.query.category === 'user') {
      dispatch(localActions.gotoStraUserStrategy());
    }
  }, [router]);

  useEffect(() => {
    if (isUser) {
      dispatch(boardsActions.getUserByNickname({ nickname: router.query.user as string }));
    }
    if (communityDiscussion) {
      dispatch(boardsActions.getBoards({ category: 'DISCUSSION', page, user, title, comment }));
    } else if (strategyUserStrategy) {
      dispatch(boardsActions.getBoards({ category: 'USER_STRATEGY', page, user, title, comment }));
    }
    if (router.query.title) {
      dispatch(boardsActions.changeTitle({ title: router.query.title as string }));
    } else {
      dispatch(boardsActions.changeTitle({ title: '' }));
    }
    if (router.query.user) {
      dispatch(boardsActions.changeUser({ user: router.query.user as string }));
    } else {
      dispatch(boardsActions.changeUser({ user: '' }));
    }
    if (router.query.comment) {
      dispatch(boardsActions.changeComment({ comment: router.query.comment as string }));
    } else {
      dispatch(boardsActions.changeComment({ comment: '' }));
    }
    if (router.query.page) {
      dispatch(boardsActions.changePage({ page: parseInt(router.query.page as string) }));
    } else {
      dispatch(boardsActions.changePage({ page: 1 }));
    }
  }, [router, isUser, category, page, user, title, comment]);
  return (
    <UserLayout>
      <StrategistLayout>
        <StrategistBox />
        <StrategistContrl />
        {communityDiscussion && <BoardsTable />}
      </StrategistLayout>
    </UserLayout>
  );
};

export default StrategyUser;
