import CommunityWriteLayout from '@/src/components/community/CommunityWriteLayout';
import CommunityEditor from '@/src/components/community/Editor/CommunityEditor';
import UserLayout from '@/src/components/layout/UserLayout';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const CommunityWrite = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <UserLayout>
      <CommunityWriteLayout>
        <CommunityEditor />
      </CommunityWriteLayout>
    </UserLayout>
  );
};

export default CommunityWrite;
