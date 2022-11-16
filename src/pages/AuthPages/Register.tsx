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
import AuthService from '@/src/utils/auth_service';

const Register: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const authSevice = new AuthService();

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
      user: user.user,
      userError: user.userError,
    }),
  );

  // auth 상태관리
  const { isExistTrigger, loadAuthLoading, loadAuthDone, loadAuthError, auth, authError } = useSelector(
    ({ auth }: RootState) => ({
      isExistTrigger: auth.isExistTrigger,
      loadAuthLoading: auth.loadAuthLoading,
      loadAuthDone: auth.loadAuthDone,
      loadAuthError: auth.loadAuthError,
      auth: auth.auth,
      authError: auth.authError,
    }),
  );

  // 회원가입 form 실시간 변화 상태관리
  const [profileImg, setProfileImg] = useState('');
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
  const [min, setMin] = useState(3);
  const [existEmail, setExistEmial] = useState(false);
  const [readOnlyEmail, setOnltReadEmial] = useState(false);
  useEffect(() => {
    if (!loadAuthLoading) {
      if (loadAuthDone.message === 'SEND_VERIFY') {
        setModalOpen(true);
        setMessage('인증메일을 전송했어요');
        setModalSt(false);
        setVerify(false);
        setOnltReadEmial(true);
        setExistEmial(false);
        setTimerErr(false);
        setVerify(true);
        setMin(3);
        setTimerVisible(true);
      } else if (loadAuthDone.message === 'EXIST_EMAIL') {
        setModalOpen(true);
        setMessage('이미 등록된 이메일주소예요');
        setModalSt(true);
        setExistEmial(true);
      }
    }
  }, [loadAuthLoading, loadAuthDone]);

  // 인증코드 state 타이머 error state
  const [veriAble, setVeriAble] = useState(false);
  const [readOnltVerify, setReadOnltVerify] = useState(false);
  const [timerErr, setTimerErr] = useState(false);

  // 시간이 초과되면 코드인증 버튼 비활성화
  useEffect(() => {
    if (timerErr === true) {
      setVeriAble(false);
      setOnltReadEmial(false);
      setTimerVisible(false);
    } else {
      if (verifyCode.toString().length === 4) {
        setVeriAble(true);
      } else {
        setVeriAble(false);
      }
    }
  }, [verifyCode, timerErr]);

  // 인증이 완료되면 타이머 사라지고 인증버튼 비활성화
  // 기본으로 타이머는 숨겨진 component 안에 보이기 때문에 true
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
    const gId = localStorage.getItem('gId');
    if (gId) {
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
      }
      // Google 회원가입
      dispatch(userActions.userGoogleRegister({ email, pw, nickname, photoUrl }));
    } else {
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
    }
  };

  // 회원가입 성공 시 자동로그인
  useEffect(() => {
    if (authError) {
      setModalOpen(true);
      setMessage('회원가입에에 실패했어요. 다시 시도해주세요.');
      setModalSt(true);
      return;
    }

    if (auth) {
      const gId = localStorage.getItem('gId');
      if (gId) {
        let accessToken;
        accessToken = loadAuthDone.accessToken;
        dispatch(authActions.googleLogin({ accessToken }));
        authSevice.userLogin(loadAuthDone);
      } else {
        dispatch(authActions.userLogin({ email, pw }));
        authSevice.userLogin(loadAuthDone);
      }
    }
  }, [auth, authError]);

  // 자동로그인 성공 시 user확인
  useEffect(() => {
    if (loadAuthError) {
      setModalOpen(true);
      setMessage(loadAuthError);
      setModalSt(true);
      return;
    }

    if (loadAuthDone.message === 'LOGGED_IN') {
      try {
        localStorage.setItem('Authorization', loadAuthDone.accessToken);
        router.push('/auth/telegram');
      } catch (e) {
        console.log(e);
        return;
      }
    }
  }, [loadAuthDone, loadAuthError]);

  // 회원가입폼 상태 초기화
  useEffect(() => {
    dispatch(userActions.initializeUserForm());
  }, [dispatch]);

  //google register
  useEffect(() => {
    const gId = localStorage.getItem('gId');
    if (gId) {
      setOnltReadEmial(true);
      dispatch(
        userActions.changeRegisterField({
          email: gId,
          pw: '',
          pwConfirm: '',
          verifyCode: '',
          nickname: '',
          photoUrl: '',
        }),
      );
    }
  }, []);
  return (
    <AuthLayout type="register">
      <RegisterForm
        profileImg={profileImg}
        verify={verify}
        existEmail={existEmail}
        setExistEmial={setExistEmial}
        readOnlyEmail={readOnlyEmail}
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
