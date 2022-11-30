import UserLayout from '@/src/components/layout/UserLayout';
import { useRouter } from 'next/router';
import React from 'react';

const CommunityBoard = () => {
  const router = useRouter();
  const { id } = router.query;

  return <UserLayout>글 상세 {id}</UserLayout>;
};

export default CommunityBoard;
