import UserLayout from '@/src/components/layout/UserLayout';
import StrategyLayout from '@/src/components/strategy/StrategyLayout';
import CertifiedBoardsTable from '@/src/components/strategy/table/CertifiedBoardsTable';
import QuantroIndicatorTable from '@/src/components/strategy/table/QuantroIndicatorTable';
import QuantroStrategyTable from '@/src/components/strategy/table/QuantroStrategyTable';
import UserStrategyTable from '@/src/components/strategy/table/UserStrategyTable';
import { RootState } from '@/src/store/configureStore';
import { boardsActions, localActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const StratgyIndex: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(boardsActions.initializeBoardsForm());
  }, [dispatch]);
  const { strategyCertifiedStrategy, strategyUserStrategy, strategyQuantroStrategy, strategyQuantroIndicator } =
    useSelector(({ local }: RootState) => ({
      strategyCertifiedStrategy: local.strategyCertifiedStrategy,
      strategyUserStrategy: local.strategyUserStrategy,
      strategyQuantroStrategy: local.strategyQuantroStrategy,
      strategyQuantroIndicator: local.strategyQuantroIndicator,
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
  }, [dispatch]);

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
    if (router.query.category === 'certified') {
      dispatch(localActions.gotoStraCertifiedStrategy());
    } else if (router.query.category === 'user') {
      dispatch(localActions.gotoStraUserStrategy());
    } else if (router.query.category === 'quantro_strategy') {
      dispatch(localActions.gotoStraQuantroStrategy());
    } else if (router.query.category === 'quantro_Indicator') {
      dispatch(localActions.gotoStraQuantroIndicator());
    }
  }, [router]);

  useEffect(() => {
    if (strategyCertifiedStrategy) {
      dispatch(boardsActions.getBoards({ category: 'CERTIFIED_STRATEGY', page, user, title, comment }));
      if (isUser) {
        dispatch(boardsActions.getNotices({ category: 'CERTIFIED_STRATEGY' }));
      }
    } else if (strategyUserStrategy) {
      dispatch(boardsActions.getBoards({ category: 'USER_STRATEGY', page, user, title, comment }));
      if (isUser) {
        dispatch(boardsActions.getNotices({ category: 'USER_STRATEGY' }));
      }
    } else if (strategyQuantroStrategy) {
      dispatch(boardsActions.getBoards({ category: 'QUANTRO_STRATEGY', page, user, title, comment }));
      if (isUser) {
        dispatch(boardsActions.getNotices({ category: 'QUANTRO_STRATEGY' }));
      }
    } else if (strategyQuantroIndicator) {
      dispatch(boardsActions.getBoards({ category: 'QUANTRO_INDICATOR', page, user, title, comment }));
      if (isUser) {
        dispatch(boardsActions.getNotices({ category: 'QUANTRO_INDICATOR' }));
      }
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
    setUser(false);
  }, [
    router,
    isUser,
    category,
    page,
    user,
    title,
    comment,
    strategyCertifiedStrategy,
    strategyUserStrategy,
    strategyQuantroStrategy,
    strategyQuantroIndicator,
  ]);

  return (
    <UserLayout>
      <StrategyLayout>
        {strategyCertifiedStrategy && <CertifiedBoardsTable />}
        {strategyUserStrategy && <UserStrategyTable />}
        {strategyQuantroStrategy && <QuantroStrategyTable />}
        {strategyQuantroIndicator && <QuantroIndicatorTable />}
      </StrategyLayout>
    </UserLayout>
  );
};

export default StratgyIndex;
