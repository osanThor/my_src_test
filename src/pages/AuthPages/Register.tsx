import RegisterForm from '@/src/components/auth/register/RegisterForm';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { RootState } from '@/src/store/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import AuthLayout from '../../components/auth/AuthLayout';
import { userActions } from '@/src/store/reducers';
import ImageModal from '@/src/components/auth/register/ImageModal';
import Modal from '@/src/components/common/Modal';

const Register: NextPage = () => {
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState('');

  // user 상태 관리
  const { email, pw, pwConfirm, verifyCode, nickname, checkNicknameResult, photoUrl } = useSelector(
    ({ user }: RootState) => ({
      email: user.email,
      pw: user.pw,
      pwConfirm: user.pwConfirm,
      verifyCode: user.verifyCode,
      nickname: user.nickname,
      checkNicknameResult: user.checkNicknameResult,
      photoUrl: user.photoUrl,
    }),
  );

  // auth 상태관리

  // 회원가입 실시간 상태관리
  const handleChangeRegisterForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: any } = e.target;
    let emailVal = email;
    let pwVal = pw;
    let pwConVal = pwConfirm;
    let verVal = verifyCode;
    let nickVal = nickname;
    let photoVal = photoUrl;
    if (name === 'email') {
      emailVal = value;
    } else if (name === 'pw') {
      pwVal = value;
    } else if (name === 'pwConfirm') {
      pwConVal = value;
    } else if (name === 'verifyCode') {
      verVal = parseInt(value);
    } else if (name === 'nickname') {
      nickVal = value;
    } else if (name === 'photoUrl') {
      photoVal = value;
    }
    dispatch(
      userActions.changeRegisterFiled({
        email: emailVal,
        pw: pwVal,
        pwConfirm: pwConVal,
        verifyCode: verVal,
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

  // 이메일 인증, 모달 상태
  const [verify, setVerify] = useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [message, setMessage] = useState('');
  const [modalSt, setModalSt] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // 닉네임 체크
  const handleCheckNickname = () => {
    dispatch(userActions.checkNickName({ nickname }));
    if (checkNicknameResult) {
      setModalOpen(true);
      setMessage('이미 사용중인 닉네임이에요.');
      setModalSt(true);
    } else {
      setModalOpen(true);
      setMessage('사용가능한 닉네임이에요');
      setModalSt(false);
    }
  };

  // 인증번호 요청하기
  const handleReqVerify = () => {
    setVerify(true);
    setModalOpen(true);
    setMessage('인증메일을 전송했어요');
    setModalSt(false);
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
        profileImg={profileImg}
        verify={verify}
        handleCheckNickname={handleCheckNickname}
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
      <Modal open={modalOpen} close={handleModalClose} message={message} error={modalSt} />
    </AuthLayout>
  );
};

export default Register;
