import NotUserModal from '@/src/components/common/NotUserModal';
import UserLayout from '@/src/components/layout/UserLayout';
import MessageContainer from '@/src/components/orderAndError/MessageContainer';
import MessageTop from '@/src/components/orderAndError/MessageTop';
import NoMessageBox from '@/src/components/orderAndError/NoMessageBox';
import OrderAndErrorLayout from '@/src/components/orderAndError/OrderAndErrorLayout';
import { RootState } from '@/src/store/configureStore';
import { localActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const OrderAndErrorIndex = () => {
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
        <OrderAndErrorLayout>
          <MessageTop />
          <MessageContainer>
            <NoMessageBox />
          </MessageContainer>
        </OrderAndErrorLayout>
      </UserLayout>
      <NotUserModal open={noUserModal} onClose={handleCloseNoUserModal} />
    </>
  );
};

export default OrderAndErrorIndex;
