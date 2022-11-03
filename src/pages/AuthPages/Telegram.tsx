import React from 'react';
import AuthLayout from '@/src/components/auth/AuthLayout';
import ExplaneService from '@/src/components/auth/telegram/ExplaneService';
import TelegramLayout from '@/src/components/auth/telegram/TelegramLayout';
import ConectTelegram from '@/src/components/auth/telegram/ConectTelegram';
import FuncModal from '@/src/components/common/FuncModal';
import Router from 'next/router';

const Telegram = () => {
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
        {changeType ? <ConectTelegram /> : <ExplaneService onClick={handleChangeType} />}
      </TelegramLayout>
      <FuncModal open={open} onClose={onClose} message={message} dubBtn={dubBtn} onClick={handleModalEvent} />
    </AuthLayout>
  );
};

export default Telegram;
