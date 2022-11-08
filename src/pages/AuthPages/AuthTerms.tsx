import AuthLayout from '@/src/components/auth/AuthLayout';
import TermsLayOut from '@/src/components/auth/terms/TermLayout';
import React from 'react';

const AuthTerms = () => {
  return (
    <AuthLayout type="terms">
      <TermsLayOut />
    </AuthLayout>
  );
};

export default AuthTerms;
