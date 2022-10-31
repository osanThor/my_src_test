import RegisterForm from '@/src/components/auth/register/RegisterForm';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { RootState } from '@/src/store/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import AuthLayout from '../../components/auth/AuthLayout';
import { userActions } from '@/src/store/reducers';
import ImageModal from '@/src/components/auth/register/ImageModal';
import FuncModal from '@/src/components/common/FuncModal';

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

  // 회원가입 실시간 상태관리
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

  //이미지 모달
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // 이메일 인증
  const [verify, setVerify] = useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // 인증번호 요청하기
  const handleReqVerify = () => {
    setVerify(true);
    setModalOpen(true);
  };

  // 회원가입
  const handleSubmitRegisterForm = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // 회원가입폼 상태 초기화
  useEffect(() => {
    dispatch(userActions.initializeUserForm());
  }, [dispatch]);

  return (
    <AuthLayout type="register">
      <RegisterForm
        email={email}
        pw={pw}
        nickname={nickname}
        checkNicknameResult={checkNicknameResult}
        profileImg={profileImg}
        photoUrl={photoUrl}
        verify={verify}
        handleReqVerify={handleReqVerify}
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
      <FuncModal open={modalOpen} close={handleModalClose} message="테스트 입니다." error={true} />
    </AuthLayout>
  );
};

export default Register;
