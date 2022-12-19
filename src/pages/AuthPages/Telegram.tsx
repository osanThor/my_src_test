import React from 'react';
import AuthLayout from '@/src/components/auth/AuthLayout';
import ExplaneService from '@/src/components/auth/telegram/ExplaneService';
import TelegramLayout from '@/src/components/auth/telegram/TelegramLayout';
import ConectTelegram from '@/src/components/auth/telegram/ConectTelegram';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import { userActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import FuncModal from '@/src/components/common/modals/FuncModal';
import Modal from '@/src/components/common/modals/Modal';

const Telegram: NextPage = () => {
  // 텔레그램 상태관리
  const dispatch = useDispatch();
  const { username, loadUserDone } = useSelector(({ user }: RootState) => ({
    username: user.username,
    loadUserDone: user.loadUserDone,
  }));

  const handleChangeUserNameField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(userActions.changeTelegramField({ username: value }));
  };
  // 텔레그램 사용자명 등록 요청
  const handlePutTelegram = () => {
    if (username.length <= 0) {
      setMoOpen(true);
      setMoMessage('텔레그램 사용자명를 입력해주세요');
      setMoSt(false);
      return;
    }
    dispatch(userActions.telegramUsername({ username }));
  };
  React.useEffect(() => {
    if (loadUserDone === 'NOT_FOUND_TELEGRAM' || loadUserDone === 'WRONG_USERNAME') {
      setMoOpen(true);
      setMoMessage('텔레그램 사용자명를 찾을 수 없어요');
      setMoSt(true);
      return;
    } else if (loadUserDone === 'ALREADY_EXIST') {
      setMoOpen(true);
      setMoMessage('이미 등록된 텔레그램 사용자명이에요');
      setMoSt(true);
      return;
    } else if (loadUserDone === 'CHANGED') {
      setMoOpen(true);
      setMoMessage('텔레그램이 연동되었어요~! 텔레그램 환영메세지를 확인해주세요.');
      setMoSt(false);
      telegramSuccess();
    }
  }, [loadUserDone]);

  const telegramSuccess = () => {
    if (moOpen === false) {
      Router.push('/');
    }
  };
  // 텔레그램 레이아웃
  const [changeType, setChangeType] = React.useState(false);
  const handleChangeType = () => {
    setChangeType(true);
  };
  // Function 모달
  const [open, setOpen] = React.useState(false);
  const message = {
    title: '이용권 등록 페이지에서 나중에 연동 가능해요~!',
    description: '',
    btnTxt: '나중에',
  };
  const dubBtn = true;
  const onClose = () => {
    setOpen(false);
  };
  const handleModalEvent = () => {
    Router.push('/');
  };

  // 일반 모달
  const [moOpen, setMoOpen] = React.useState(false);
  const [moMessage, setMoMessage] = React.useState('');
  const [moSt, setMoSt] = React.useState(false);
  const onCloseMo = () => {
    setMoOpen(false);
  };
  return (
    <AuthLayout type="telegram">
      <TelegramLayout setOpen={setOpen}>
        {changeType ? (
          <ConectTelegram
            onChange={handleChangeUserNameField}
            username={username}
            handlePutTelegram={handlePutTelegram}
          />
        ) : (
          <ExplaneService onClick={handleChangeType} />
        )}
      </TelegramLayout>
      <FuncModal
        open={open}
        onClose={onClose}
        message={message}
        dubBtn={dubBtn}
        onClick={handleModalEvent}
        onClick2={onClose}
      />
      <Modal open={moOpen} close={onCloseMo} message={moMessage} error={moSt} />
    </AuthLayout>
  );
};

export default Telegram;
