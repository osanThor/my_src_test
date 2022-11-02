import AuthLayout from '@/src/components/auth/AuthLayout';
import TelegramLayout from '@/src/components/auth/telegram/telegramLayout';
import React from 'react';

const Telegram = () => {
  return (
    <AuthLayout type="telegram">
      <TelegramLayout />
    </AuthLayout>
  );
};

export default Telegram;
