import CommunityLayout from '@/src/components/community/CommunityLayout';
import BoardsTable from '@/src/components/community/table/BoardsTable';
import UserLayout from '@/src/components/layout/UserLayout';
import { RootState } from '@/src/store/configureStore';
import { localActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const CommunityIndex: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { communityDiscussion, communityNotice } = useSelector(({ local }: RootState) => ({
    communityDiscussion: local.communityDiscussion,
    communityNotice: local.communityNotice,
  }));
  useEffect(() => {
    if (router.query.category === 'discussion') {
      dispatch(localActions.gotoComDiscussion());
    } else if (router.query.category === 'notice') {
      dispatch(localActions.gotoComNotice());
    }
  }, [router]);
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
