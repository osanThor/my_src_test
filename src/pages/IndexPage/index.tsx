import React, { useEffect } from 'react';
import { NextPage } from 'next';

import UserLayout from '@/src/components/layout/UserLayout';
import IndexLayout from '@/src/components/index/IndexLayout';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import { indexActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';

const IndexPage: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadBoardsLoading, CertifiedDone, RankDone, UserStrategyDone, DiscussionDone, QuantroStrategyDone } =
    useSelector(({ index }: RootState) => ({
      loadBoardsLoading: index.loadBoardsLoading,
      CertifiedDone: index.CertifiedDone,
      RankDone: index.RankDone,
      UserStrategyDone: index.UserStrategyDone,
      DiscussionDone: index.DiscussionDone,
      QuantroStrategyDone: index.QuantroStrategyDone,
    }));

  useEffect(() => {
    dispatch(
      indexActions.getIndexBoards({
        category: 'CERTIFIED_STRATEGY',
        page: 1,
        title: '',
        user: '',
        comment: '',
      }),
    );
  }, []);
  useEffect(() => {
    if (CertifiedDone) {
      dispatch(
        indexActions.getIndexBoards({
          category: 'USER_STRATEGY',
          page: 1,
          title: '',
          user: '',
          comment: '',
        }),
      );
    }
  }, [CertifiedDone]);
  useEffect(() => {
    if (UserStrategyDone) {
      dispatch(
        indexActions.getIndexBoards({
          category: 'DISCUSSION',
          page: 1,
          title: '',
          user: '',
          comment: '',
        }),
      );
    }
  }, [UserStrategyDone]);
  useEffect(() => {
    if (DiscussionDone) {
      dispatch(
        indexActions.getIndexBoards({
          category: 'QUANTRO_STRATEGY',
          page: 1,
          title: '',
          user: '',
          comment: '',
        }),
      );
    }
  }, [DiscussionDone]);

  return (
    <UserLayout>
      <IndexLayout />
    </UserLayout>
  );
};

export default IndexPage;
