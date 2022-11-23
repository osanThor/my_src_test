import UserLayout from '@/src/components/layout/UserLayout';
import MyPageLayout from '@/src/components/mypage/MyPageLayout';
import React from 'react';

const MypageIndex = () => {
  return (
    <UserLayout>
      <MyPageLayout>마이페이지</MyPageLayout>
    </UserLayout>
  );
};

export default MypageIndex;
