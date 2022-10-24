import React from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  return (
    <AuthLayout type="login">
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
