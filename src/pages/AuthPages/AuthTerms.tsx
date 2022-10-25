import React from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import Terms from "../../components/auth/terms/Terms";

const AuthTerms = () => {
  return (
    <AuthLayout type="terms">
      <Terms />
    </AuthLayout>
  );
};

export default AuthTerms;
