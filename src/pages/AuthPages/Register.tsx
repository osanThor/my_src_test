import RegisterForm from '@/src/components/auth/register/RegisterForm';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { RootState } from '@/src/store/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import AuthLayout from '../../components/auth/AuthLayout';
import { userActions } from '@/src/store/reducers';
import ImageModal from '@/src/components/auth/register/ImageModal';

const Register: NextPage = () => {
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState('');

  const { email, pw, nickname, checkNicknameResult, photoUrl } = useSelector(({ user }: RootState) => ({
    email: user.email,
    pw: user.pw,
    nickname: user.nickname,
    checkNicknameResult: user.checkNicknameResult,
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

  const handleSubmitRegisterForm = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(userActions.initializeUserForm());
  }, [dispatch]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AuthLayout type="register">
      <RegisterForm
        email={email}
        pw={pw}
        nickname={nickname}
        checkNicknameResult={checkNicknameResult}
        profileImg={profileImg}
        photoUrl={photoUrl}
        handleClickOpen={handleClickOpen}
        onChange={handleChangeRegisterForm}
        onSubmit={handleSubmitRegisterForm}
      />
      <ImageModal
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        photoUrl={photoUrl}
        open={open}
        setProfileImg={setProfileImg}
        handleChangeRegisterForm={handleChangeRegisterForm}
      />
    </AuthLayout>
  );
};

export default Register;
