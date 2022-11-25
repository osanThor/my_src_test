import CommunityLayout from '@/src/components/community/CommunityLayout';
import UserLayout from '@/src/components/layout/UserLayout';
import { RootState } from '@/src/store/configureStore';
import { localActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const CommunityIndex = () => {
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
        {communityDiscussion && <div>전략토론</div>}
        {communityNotice && <div>공지</div>}
      </CommunityLayout>
    </UserLayout>
  );
};

export default CommunityIndex;
