import AuthLayout from '@/src/components/auth/AuthLayout';
import TermsLayOut from '@/src/components/auth/terms/TermLayout';
import { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import React, { useEffect } from 'react';

const AuthTerms: NextPage = () => {
  //next auth session reset
  useEffect(() => {
    signOut({ redirect: false });
  }, []);
  return (
    <AuthLayout type="terms">
      <TermsLayOut />
    </AuthLayout>
  );
};

export default AuthTerms;
