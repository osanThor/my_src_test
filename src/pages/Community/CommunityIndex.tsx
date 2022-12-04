import CommunityLayout from '@/src/components/community/CommunityLayout';
import RankLayout from '@/src/components/community/rank/RankLayout';
import BoardsTable from '@/src/components/community/table/BoardsTable';
import CommissionsTable from '@/src/components/community/table/CommissionsTable';
import NoticeTable from '@/src/components/community/table/NoticeTable';
import UserLayout from '@/src/components/layout/UserLayout';
import { RootState } from '@/src/store/configureStore';
import { authActions, boardsActions, localActions } from '@/src/store/reducers';
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
    if (router.query.title) {
      dispatch(boardsActions.changeTitle({ title: router.query.title as string }));
    }
    if (router.query.user) {
      dispatch(boardsActions.changeUser({ user: router.query.user as string }));
    }
    if (router.query.comment) {
      dispatch(boardsActions.changeComment({ comment: router.query.comment as string }));
    }
  }, [router]);

  useEffect(() => {
    if (communityDiscussion) {
      dispatch(boardsActions.getBoards({ category: 'DISCUSSION', page, user, title, comment }));
      if (isUser) {
        console.log('두번 나오면 뒤진다');
        dispatch(boardsActions.getNotices({ category: 'DISCUSSION' }));
      }
    } else if (communityCommission) {
      dispatch(boardsActions.getBoards({ category: 'COMMISSION', page, user, title, comment }));
      if (isUser) {
        console.log('두번 나오면 뒤진다');
        dispatch(boardsActions.getNotices({ category: 'COMMISSION' }));
      }
    } else if (communityRank) {
      dispatch(boardsActions.getBoards({ category: 'COMMISSION', page, user, title, comment }));
      if (isUser) {
        dispatch(boardsActions.getNotices({ category: 'COMMISSION' }));
      }
    } else if (communityNotice) {
      dispatch(boardsActions.getBoards({ category: 'NOTICE', page, user, title, comment }));
      if (isUser) {
        dispatch(boardsActions.getNotices({ category: 'NOTICE' }));
      }
    }
    if (router.query.page) {
      dispatch(boardsActions.changePage({ page: parseInt(router.query.page as string) }));
    } else {
      dispatch(boardsActions.changePage({ page: 1 }));
    }
  }, [router, isUser, category, page, user, title, comment]);

  return (
    <UserLayout>
      <CommunityLayout>
        {communityDiscussion && <BoardsTable />}
        {communityCommission && <CommissionsTable />}
        {communityRank && <RankLayout />}
        {communityNotice && <NoticeTable />}
      </CommunityLayout>
    </UserLayout>
  );
};

export default CommunityIndex;
