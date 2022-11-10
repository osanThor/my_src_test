import AuthLayout from '@/src/components/auth/AuthLayout';
import TermsLayOut from '@/src/components/auth/terms/TermLayout';
import { NextPage } from 'next';
import React from 'react';

const AuthTerms: NextPage = () => {
  return (
    <AuthLayout type="terms">
      <TermsLayOut />
    </AuthLayout>
  );
};

export default AuthTerms;
