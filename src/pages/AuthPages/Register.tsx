import RegisterForm from '@/src/components/auth/register/RegisterForm';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { RootState } from '@/src/store/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import AuthLayout from '../../components/auth/AuthLayout';
import { userActions } from '@/src/store/reducers';

const Register: NextPage = () => {
  const dispatch = useDispatch();
  const { email, pw, nickname, photoUrl } = useSelector(({ user }: RootState) => ({
    email: user.email,
    pw: user.pw,
    nickname: user.nickname,
    photoUrl: user.photoUrl,
  }));

  const handleChangeRegisterForm = (e: any) => {
    const { name, value } = e.target;
    let emailVal = email;
    let pwVal = pw;
    let nickVal = nickname;
    let photoVal = photoUrl;
    if (name === 'email') {
      emailVal = value;
    } else if (name === 'pw') {
      pwVal = value;
    } else if (name === 'nickname') {
      nickVal = value;
    } else if (name === 'photoUrl') {
      photoVal = value;
    }
    dispatch(
      userActions.changeRegisterFiled({
        email: emailVal,
        pw: pwVal,
        nickname: nickVal,
        photoUrl: photoVal,
      }),
    );
  };

  const handleSubmitRegisterForm = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(userActions.initializeUserForm());
  }, [dispatch]);

  return (
    <AuthLayout type="register">
      <RegisterForm
        email={email}
        pw={pw}
        nickname={nickname}
        photoUrl={photoUrl}
        onChange={handleChangeRegisterForm}
        onSubmit={handleSubmitRegisterForm}
      />
    </AuthLayout>
  );
};

export default Register;
