import UserLayout from '@/src/components/layout/UserLayout';
import StrategistLayout from '@/src/components/strategy/user/StrategistLayout';
import WriteCertifiedCon from '@/src/components/strategy/write/certified/WriteCertifiedCon';
import { NextPage } from 'next';
import React from 'react';

const WriteCertified: NextPage = () => {
  return (
    <UserLayout>
      <StrategistLayout>
        <WriteCertifiedCon />
      </StrategistLayout>
    </UserLayout>
  );
};

export default WriteCertified;
