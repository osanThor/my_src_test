import CommunityLayout from '@/src/components/community/CommunityLayout';
import BoardsTable from '@/src/components/community/table/BoardsTable';
import UserLayout from '@/src/components/layout/UserLayout';
import { RootState } from '@/src/store/configureStore';
import { localActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const CommunityWrite = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <UserLayout>
      <CommunityLayout>
        <div className="">글쓰기</div>
      </CommunityLayout>
    </UserLayout>
  );
};

export default CommunityWrite;
