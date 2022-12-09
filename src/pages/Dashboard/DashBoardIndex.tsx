import NotUserModal from '@/src/components/common/modals/NotUserModal';
import Balance from '@/src/components/dashboard/Balance';
import DashboardLayout from '@/src/components/dashboard/DashboardLayout';
import SelectExchangeWin from '@/src/components/dashboard/item/SelectExchangeWin';
import MyExchangeArea from '@/src/components/dashboard/MyExchangeArea';
import MyPositionArea from '@/src/components/dashboard/MyPositionArea';
import NoticeArea from '@/src/components/dashboard/NoticeArea';
import UserLayout from '@/src/components/layout/UserLayout';
import { RootState } from '@/src/store/configureStore';
import { boardsActions, localActions } from '@/src/store/reducers';
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
  const { page, user, title, comment } = useSelector(({ boards }: RootState) => ({
    page: boards.page,
    user: boards.user,
    title: boards.title,
    comment: boards.comment,
  }));

  //not user modal
  const [noUserModal, setNoUserModal] = useState(false);
  const handleCloseNoUserModal = () => {
    setNoUserModal(false);
    router.push('/');
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!loadAuthLoading) {
      if (loadAuthDone) {
        if (loadAuthDone.accessToken) {
        } else {
          if (!user) {
            dispatch(localActions.isLocalBgBlur());
            setNoUserModal(true);
          }
        }
      }
    }
  }, [loadAuthLoading, loadAuthDone]);

  // notice list request
  useEffect(() => {
    dispatch(boardsActions.initializeBoardsForm());
    dispatch(boardsActions.getBoards({ category: 'NOTICE', page, user, title, comment }));
  }, []);

  // choose exchange
  const [selectOpen, setSelectOpen] = useState(true);
  const handleCloseSelectWin = () => {
    setSelectOpen(false);
  };

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
      <SelectExchangeWin open={selectOpen} onClose={handleCloseSelectWin} />
    </>
  );
};

export default DashBoardIndex;
