import Modal from '@/src/components/common/Modal';
import NotUserModal from '@/src/components/common/NotUserModal';
import UserLayout from '@/src/components/layout/UserLayout';
import WriteQuantBottom from '@/src/components/writeQuant/WriteQuantBottom';
import WriteQuantLayout from '@/src/components/writeQuant/WriteQuantLayout';
import Basic from '@/src/components/writeQuant/writeQuantProccess/Basic';
import Option from '@/src/components/writeQuant/writeQuantProccess/Option';
import OrderInfo from '@/src/components/writeQuant/writeQuantProccess/OrderInfo';
import Quantity from '@/src/components/writeQuant/writeQuantProccess/Quantity';
import WriteQuantTop from '@/src/components/writeQuant/WriteQuantTop';
import { RootState } from '@/src/store/configureStore';
import { localActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const WriteQuantIndex: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { basic, order, quantity, option } = useSelector(({ local }: RootState) => ({
    basic: local.basic,
    order: local.order,
    quantity: local.quantity,
    option: local.option,
  }));
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
    dispatch(localActions.initializeAuthForm());
  }, [dispatch]);

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

  // 일반 모달
  const [moOpen, setMoOpen] = React.useState(false);
  const [moMessage, setMoMessage] = React.useState('');
  const [moSt, setMoSt] = React.useState(false);
  const onCloseMo = () => {
    setMoOpen(false);
  };
  // webhook copy
  const webhookRef = useRef<HTMLInputElement>(null);
  const handleCopyWebhook = () => {
    const el = webhookRef.current;
    el.select();
    document.execCommand('copy');
    setMoOpen(true);
    setMoMessage('웹훅 URL을 복사했어요');
    setMoSt(false);
  };
  //message copy
  const messageRef = useRef<HTMLInputElement>(null);
  const handleCopyMessage = () => {
    const el = messageRef.current;
    console.log(el.value);
    if (!el.value) {
      setMoOpen(true);
      setMoMessage('주문메세지 작성을 해주세요');
      setMoSt(false);
      return;
    } else {
      el.select();
      document.execCommand('copy');
      setMoOpen(true);
      setMoMessage('주문메세지 작성결과를 복사했어요');
      setMoSt(false);
    }
  };

  return (
    <>
      <UserLayout>
        <WriteQuantLayout>
          <WriteQuantTop
            webhookRef={webhookRef}
            handleCopyWebhook={handleCopyWebhook}
            messageRef={messageRef}
            handleCopyMessage={handleCopyMessage}
          />
          <WriteQuantBottom>
            {basic && <Basic />}
            {order && <OrderInfo />}
            {quantity && <Quantity />}
            {option && <Option />}
          </WriteQuantBottom>
        </WriteQuantLayout>
      </UserLayout>
      <Modal open={moOpen} close={onCloseMo} message={moMessage} error={moSt} />
      <NotUserModal open={noUserModal} onClose={handleCloseNoUserModal} />
    </>
  );
};

export default WriteQuantIndex;
