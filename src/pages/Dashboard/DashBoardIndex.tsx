import NotUserModal from '@/src/components/common/NotUserModal';
import Balance from '@/src/components/dashboard/Balance';
import DashboardLayout from '@/src/components/dashboard/DashboardLayout';
import MyExchangeArea from '@/src/components/dashboard/MyExchangeArea';
import MyPositionArea from '@/src/components/dashboard/MyPositionArea';
import NoticeArea from '@/src/components/dashboard/NoticeArea';
import UserLayout from '@/src/components/layout/UserLayout';
import { RootState } from '@/src/store/configureStore';
import { localActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DashBoardIndex: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loadAuthLoading, loadAuthDone } = useSelector(({ auth }: RootState) => ({
    loadAuthLoading: auth.loadAuthLoading,
    loadAuthDone: auth.loadAuthDone,
  }));

  const [noUserModal, setNoUserModal] = useState(false);
  const handleCloseNoUserModal = () => {
    setNoUserModal(false);
    router.push('/');
  };

  useEffect(() => {
    if (!loadAuthLoading) {
      if (loadAuthDone) {
        if (loadAuthDone.accessToken) {
        } else {
          dispatch(localActions.isLocalBgBlur());
          setNoUserModal(true);
        }
      }
    }
  }, [loadAuthLoading, loadAuthDone]);

  return (
    <>
      <UserLayout>
        <DashboardLayout>
          <NoticeArea />
          <MyExchangeArea />
          <Balance />
          <MyPositionArea />
        </DashboardLayout>
      </UserLayout>
      <NotUserModal open={noUserModal} onClose={handleCloseNoUserModal} />
    </>
  );
};

export default DashBoardIndex;
