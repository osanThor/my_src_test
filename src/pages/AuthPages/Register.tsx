import RegisterForm from '@/src/components/auth/register/RegisterForm';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { RootState } from '@/src/store/configureStore';
import { useSelector, useDispatch } from 'react-redux';
import AuthLayout from '../../components/auth/AuthLayout';
import { authActions, userActions } from '@/src/store/reducers';
import ImageModal from '@/src/components/auth/register/ImageModal';
import Modal from '@/src/components/common/Modal';
import { useRouter } from 'next/router';

const Register: NextPage = () => {
  const dispatch = useDispatch();
  const [profileImg, setProfileImg] = useState('');

  // user 상태 관리
  const { email, pw, pwConfirm, verifyCode, nickname, checkNicknameResult, photoUrl, user, userError } = useSelector(
    ({ user }: RootState) => ({
      email: user.email,
      pw: user.pw,
      pwConfirm: user.pwConfirm,
      verifyCode: user.verifyCode,
      nickname: user.nickname,
      checkNicknameResult: user.checkNicknameResult,
      photoUrl: user.photoUrl,
      user: user.user,
      userError: user.userError,
    }),
  );

  // auth 상태관리
  const { isExistTrigger, loadAuthLoading, loadAuthDone, auth, authError } = useSelector(({ auth }: RootState) => ({
    isExistTrigger: auth.isExistTrigger,
    loadAuthLoading: auth.loadAuthLoading,
    loadAuthDone: auth.loadAuthDone,
    auth: auth.auth,
    authError: auth.authError,
  }));

  // 회원가입 form 실시간 변화 상태관리
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
      setExistEmial(false);
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
      userActions.changeRegisterField({
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
  };
  useEffect(() => {
    if (nickname.length > 0) {
      if (checkNicknameResult === true) {
        setModalOpen(true);
        setMessage('이미 사용중인 닉네임이에요.');
        setModalSt(true);
        dispatch(userActions.resetCheckNicknameResult(null));
      } else if (checkNicknameResult === false) {
        setModalOpen(true);
        setMessage('사용 가능한 닉네임이에요. 닉네임은 최초설정 이후 최대 1번만 재설정이 가능해요.');
        setModalSt(false);
      }
    }
  }, [checkNicknameResult]);

  // 인증번호 요청하기
  const handleReqVerify = () => {
    dispatch(authActions.sendVerifyEmail({ email, isExistTrigger }));
  };
  let min: number = 3;
  const [existEmail, setExistEmial] = useState(false);
  useEffect(() => {
    if (!loadAuthLoading) {
      if (loadAuthDone.message === 'SEND_VERIFY') {
        setVerify(false);
        min = 3;
        setModalOpen(true);
        setMessage('인증메일을 전송했어요');
        setModalSt(false);
        setVerify(true);
        setExistEmial(false);
      } else if (loadAuthDone.message === 'EXIST_EMAIL') {
        setModalOpen(true);
        setMessage('이미 등록된 이메일주소예요');
        setModalSt(true);
        setExistEmial(true);
      }
    }
  }, [loadAuthLoading, loadAuthDone]);

  // 인증코드 타이머
  const [veriAble, setVeriAble] = useState(false);
  const [readOnltVerify, setReadOnltVerify] = useState(false);
  const [timerErr, setTimerErr] = useState(false);

  // 시간이 초과되면 코드인증 버튼 비활성화
  useEffect(() => {
    if (timerErr === true) {
      setVeriAble(false);
    } else {
      if (verifyCode.toString().length === 4) {
        setVeriAble(true);
      } else {
        setVeriAble(false);
      }
    }
  }, [verifyCode, timerErr]);

  // 인증이 완료되면 타이머 사라지고 인증버튼 비활성화
  const [timerVisible, setTimerVisible] = useState(true);

  // 인증번호 검사
  const handleCheckVerify = () => {
    dispatch(authActions.checkVerifyCode({ email, verifyCode }));
  };

  useEffect(() => {
    if (!loadAuthLoading) {
      if (loadAuthDone.message === 'VERIFIED') {
        setModalOpen(true);
        setMessage('메일 인증이 되었어요.');
        setModalSt(false);
        setReadOnltVerify(true);
        setTimerVisible(false);
        setVeriAble(false);
      } else if (loadAuthDone.message === 'WRONG_CODE') {
        setModalOpen(true);
        setMessage('인증 코드를 다시 한번 확인해주세요');
        setModalSt(true);
      } else if (loadAuthDone.message === '') {
      }
    }
  }, [loadAuthLoading, loadAuthDone]);

  // 회원가입
  const handleSubmitRegisterForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (photoUrl === '') {
      setModalOpen(true);
      setMessage('프로필 사진을 선택해주세요.');
      setModalSt(true);
      return;
    } else if (nickname === '') {
      setModalOpen(true);
      setMessage('닉네임을 확인해주세요.');
      setModalSt(true);
      return;
    } else if (checkNicknameResult === true || checkNicknameResult === null) {
      setModalOpen(true);
      setMessage('닉네임 중복을 확인해주세요.');
      setModalSt(true);
      return;
    } else if (email === '') {
      setModalOpen(true);
      setMessage('이메일을 확인해주세요.');
      setModalSt(true);
      return;
    } else if (readOnltVerify != true) {
      setModalOpen(true);
      setMessage('인증확인을 확인해주세요.');
      setModalSt(true);
      return;
    }
    //회원가입
    dispatch(userActions.userRegister({ email, pw, nickname, photoUrl }));
  };

  // 회원가입 성공 시 자동로그인
  useEffect(() => {
    if (auth) {
      console.log('인증됨');
      dispatch(authActions.userLogin({ email, pw }));
    }
    if (authError) {
      console.log('인증 실패');
      setModalOpen(true);
      setMessage('회원가입에에 실패했어요. 다시 시도해주세요.');
      setModalSt(true);
      return;
    }
  }, [auth, authError]);

  // 자동로그인 성공 시 user확인
  const router = useRouter();
  useEffect(() => {
    if (userError) {
      setModalOpen(true);
      setMessage('자동로그인에 실패했어요. 다시 시도해주세요.');
      setModalSt(true);
      return;
    }

    if (user) {
      router.push('/auth/telegram');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log(e);
      }
    }
  }, [user, userError]);

  // 회원가입폼 상태 초기화
  useEffect(() => {
    dispatch(userActions.initializeUserForm());
  }, [dispatch]);
  useEffect(() => {
    try {
      const user = localStorage.getItem('user');
      if (!user) return;

      dispatch(userActions.userSuccess());
    } catch (e) {
      console.log(e);
    }
  }, [userActions, user, dispatch]);

  return (
    <AuthLayout type="register">
      <RegisterForm
        profileImg={profileImg}
        verify={verify}
        existEmail={existEmail}
        setExistEmial={setExistEmial}
        handleCheckNickname={handleCheckNickname}
        handleReqVerify={handleReqVerify}
        handleClickOpen={handleClickOpen}
        onChange={handleChangeRegisterForm}
        onSubmit={handleSubmitRegisterForm}
        veriAble={veriAble}
        ReadOnltVerify={readOnltVerify}
        timerErr={timerErr}
        min={min}
        setTimerErr={setTimerErr}
        timerVisible={timerVisible}
        handleCheckVerify={handleCheckVerify}
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
