import React from 'react';
import AuthLayout from '@/src/components/auth/AuthLayout';
import ExplaneService from '@/src/components/auth/telegram/ExplaneService';
import TelegramLayout from '@/src/components/auth/telegram/TelegramLayout';
import ConectTelegram from '@/src/components/auth/telegram/ConectTelegram';
import FuncModal from '@/src/components/common/FuncModal';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import { userActions } from '@/src/store/reducers';

const Telegram = () => {
  // 텔레그램 상태관리
  const dispatch = useDispatch();
  const { username } = useSelector(({ user }: RootState) => ({
    username: user.username,
  }));

  const handleChangeUserNameField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(userActions.changeTelegramField({ username: value }));
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
    btnTxt: '나중에',
  };
  const dubBtn = true;
  const onClose = () => {
    setOpen(false);
  };
  const handleModalEvent = () => {
    Router.push('/');
  };
  return (
    <AuthLayout type="telegram">
      <TelegramLayout setOpen={setOpen}>
        {changeType ? (
          <ConectTelegram onChange={handleChangeUserNameField} username={username} />
        ) : (
          <ExplaneService onClick={handleChangeType} />
        )}
      </TelegramLayout>
      <FuncModal open={open} onClose={onClose} message={message} dubBtn={dubBtn} onClick={handleModalEvent} />
    </AuthLayout>
  );
};

export default Telegram;
