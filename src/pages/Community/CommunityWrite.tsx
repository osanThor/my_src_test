import Button from '@/src/components/common/Button';
import CommunityWriteLayout from '@/src/components/community/CommunityWriteLayout';
import CommunityEditor from '@/src/components/community/Editor/CommunityEditor';
import UserLayout from '@/src/components/layout/UserLayout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const CommunityWrite: NextPage = () => {
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
