import RegisterForm from '@/src/components/auth/register/RegisterForm';
import React from 'react';
import AuthLayout from '../../components/auth/AuthLayout';

const Register = () => {
  return (
    <AuthLayout type="register">
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
