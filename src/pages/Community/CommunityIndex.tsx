import CommunityLayout from '@/src/components/community/CommunityLayout';
import BoardsTable from '@/src/components/community/table/BoardsTable';
import CommissionsTable from '@/src/components/community/table/CommissionsTable';
import NoticeTable from '@/src/components/community/table/NoticeTable';
import UserLayout from '@/src/components/layout/UserLayout';
import { RootState } from '@/src/store/configureStore';
import { boardsActions, localActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const CommunityIndex: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(boardsActions.initializeBoardsForm());
  }, [dispatch]);
  const { communityDiscussion, communityCommission, communityRank, communityNotice } = useSelector(
    ({ local }: RootState) => ({
      communityDiscussion: local.communityDiscussion,
      communityCommission: local.communityCommission,
      communityRank: local.communityRank,
      communityNotice: local.communityNotice,
    }),
  );
  const { loadAuthDone } = useSelector(({ auth }: RootState) => ({
    loadAuthDone: auth.loadAuthDone,
  }));
  const { category, page, user, title, comment } = useSelector(({ boards }: RootState) => ({
    category: boards.category,
    page: boards.page,
    user: boards.user,
    title: boards.title,
    comment: boards.comment,
  }));
  useEffect(() => {
    dispatch(boardsActions.initializeBoardsForm());
    if (router.query.category === 'discussion') {
      dispatch(localActions.gotoComDiscussion());
    } else if (router.query.category === 'commission') {
      dispatch(localActions.gotoComCommission());
    } else if (router.query.category === 'rank') {
      dispatch(localActions.gotoComRank());
    } else if (router.query.category === 'notice') {
      dispatch(localActions.gotoComNotice());
    }
  }, [router]);

  const [isUser, setUser] = useState(false);

  useEffect(() => {
    if (loadAuthDone.accessToken) {
      setUser(true);
    }
  }, [loadAuthDone]);

  useEffect(() => {
    if (communityDiscussion) {
      dispatch(boardsActions.getBoards({ category: 'DISCUSSION', page, user, title, comment }));
      if (isUser) {
        dispatch(boardsActions.getNotices({ category: 'DISCUSSION' }));
      }
    } else if (communityCommission) {
      dispatch(boardsActions.getBoards({ category: 'COMMISSION', page, user, title, comment }));
      if (isUser) {
        dispatch(boardsActions.getNotices({ category: 'COMMISSION' }));
      }
    } else if (communityRank) {
      // if (isUser) {
      //   dispatch(boardsActions.getNotices({ category: 'NOTICE' }));
      // }
      // dispatch(boardsActions.getBoards({ category: 'NOTICE', page, user, title, comment }));
    } else if (communityNotice) {
      dispatch(boardsActions.getBoards({ category: 'NOTICE', page, user, title, comment }));
      if (isUser) {
        dispatch(boardsActions.getNotices({ category: 'NOTICE' }));
      }
    }
  }, [category, page, user, title, comment, communityDiscussion, communityNotice, isUser]);
  return (
    <UserLayout>
      <CommunityLayout>
        {communityDiscussion && <BoardsTable />}
        {communityCommission && <CommissionsTable />}
        {communityRank && <BoardsTable />}
        {communityNotice && <NoticeTable />}
      </CommunityLayout>
    </UserLayout>
  );
};

export default CommunityIndex;
