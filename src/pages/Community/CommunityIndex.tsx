import CommunityLayout from '@/src/components/community/CommunityLayout';
import BoardsTable from '@/src/components/community/table/BoardsTable';
import UserLayout from '@/src/components/layout/UserLayout';
import { RootState } from '@/src/store/configureStore';
import { boardsActions, localActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const CommunityIndex: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(boardsActions.initializeBoardsForm());
  }, [dispatch]);
  const { communityDiscussion, communityNotice } = useSelector(({ local }: RootState) => ({
    communityDiscussion: local.communityDiscussion,
    communityNotice: local.communityNotice,
  }));
  const { category, page, user, title, comment } = useSelector(({ boards }: RootState) => ({
    category: boards.category,
    page: boards.page,
    user: boards.user,
    title: boards.title,
    comment: boards.comment,
  }));
  useEffect(() => {
    if (router.query.category === 'discussion') {
      dispatch(localActions.gotoComDiscussion());
    } else if (router.query.category === 'notice') {
      dispatch(localActions.gotoComNotice());
    }
  }, [router]);

  useEffect(() => {
    if (communityDiscussion) {
      dispatch(boardsActions.getBoards({ category: 'DISCUSSION', page, user, title, comment }));
    } else if (communityNotice) {
      dispatch(boardsActions.getBoards({ category: 'NOTICE', page, user, title, comment }));
    }
  }, [router, communityDiscussion, communityNotice]);
  return (
    <UserLayout>
      <CommunityLayout>
        {communityDiscussion && <BoardsTable />}
        {communityNotice && <BoardsTable />}
      </CommunityLayout>
    </UserLayout>
  );
};

export default CommunityIndex;
