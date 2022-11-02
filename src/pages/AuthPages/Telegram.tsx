import React from 'react';
import AuthLayout from '@/src/components/auth/AuthLayout';
import ExplaneService from '@/src/components/auth/telegram/ExplaneService';
import TelegramLayout from '@/src/components/auth/telegram/TelegramLayout';
import ConectTelegram from '@/src/components/auth/telegram/ConectTelegram';
import FuncModal from '@/src/components/common/FuncModal';

const Telegram = () => {
  const [changeType, setChangeType] = React.useState(false);
  const handleChangeType = () => {
    setChangeType(true);
  };
  return (
    <AuthLayout type="telegram">
      <TelegramLayout>{changeType ? <ConectTelegram /> : <ExplaneService onClick={handleChangeType} />}</TelegramLayout>
      <FuncModal />
    </AuthLayout>
  );
};

export default Telegram;
