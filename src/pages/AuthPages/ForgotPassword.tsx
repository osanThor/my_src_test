import ForgotPwLayout from '@/src/components/auth/forgotPw/ForgotPwLayout';
import VerifyEmail from '@/src/components/auth/forgotPw/VerifyEmail';
import { authActions, userActions } from '@/src/store/reducers';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout from '../../components/auth/AuthLayout';
import { RootState } from '@/src/store/configureStore';
import { NextPage } from 'next';
import Modal from '@/src/components/common/Modal';
import ResetPw from '@/src/components/auth/forgotPw/ResetPw';
import ForgotPwLastPage from '@/src/components/auth/forgotPw/ForgotPwLastPage';

const ForgotPassword: NextPage = () => {
  const dispatch = useDispatch();
  const [firstPage, setFirstPage] = useState(true);
  const [secondPage, setSecondPage] = useState(false);
  const [lastPage, setLastPage] = useState(false);

  const handleGoToSec = () => {
    setFirstPage(false);
    setSecondPage(true);
  };
  const handleGoToLast = () => {
    setSecondPage(false);
    setLastPage(true);
  };

  // auth 상태 관리
  const { loadAuthLoading, loadAuthDone } = useSelector(({ auth }: RootState) => ({
    loadAuthLoading: auth.loadAuthLoading,
    loadAuthDone: auth.loadAuthDone,
  }));
  // user 상태 관리
  const { email, pw, pwConfirm, verifyCode } = useSelector(({ user }: RootState) => ({
    email: user.email,
    pw: user.pw,
    pwConfirm: user.pwConfirm,
    verifyCode: user.verifyCode,
  }));
  const handleChangeForgetPWField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: any } = e.target;
    let emailVal = email;
    let pwVal = pw;
    let pwConVal = pwConfirm;
    let verVal = verifyCode;
    if (name === 'email') {
      emailVal = value;
    } else if (name === 'pw') {
      pwVal = value;
    } else if (name === 'pwConfirm') {
      pwConVal = value;
    } else if (name === 'verifyCode') {
      verVal = parseInt(value);
      setVerifyErr(false);
    }
    dispatch(
      userActions.changeRegisterField({
        email: emailVal,
        pw: pwVal,
        pwConfirm: pwConVal,
        verifyCode: verVal,
        nickname: '',
        photoUrl: '',
      }),
    );
  };
  // 이메일 인증
  const [operEmail, setOperEmail] = React.useState(false);
  const [min, setMin] = React.useState(3);

  const handleReqVerify = () => {
    dispatch(authActions.sendVerifyEmail({ email, isExistTrigger: true }));
  };

  React.useEffect(() => {
    if (!loadAuthLoading) {
      if (loadAuthDone.message === 'SEND_VERIFY') {
        setMoOpen(true);
        setMoMessage('인증메일을 전송했어요');
        setMoSt(false);
        setOperEmail(true);
        setverifyAble(false);
        setMin(3);
      } else if (loadAuthDone.message === 'NOT_FOUND_USER') {
        setMoOpen(true);
        setMoMessage('사용자를 찾을 수 없어요');
        setMoSt(true);
        return;
      }
    }
  }, [loadAuthLoading, loadAuthDone]);

  // 인증번호 input 활성화
  const [veriftAble, setverifyAble] = React.useState(true);

  // 시간이 초과되면 코드인증 버튼 비활성화
  const [timerErr, setTimerErr] = React.useState(false);
  React.useEffect(() => {
    if (timerErr === true) {
      setverifyAble(true);
      setOperEmail(false);
    }
  }, [verifyCode, timerErr]);

  // 인증코드 인증
  const [verifyErr, setVerifyErr] = React.useState(false);
  const [nextBtn, setNextBtn] = useState(false);

  const hadleCheckVerifyCode = () => {
    dispatch(authActions.checkVerifyCode({ email, verifyCode }));
  };
  useEffect(() => {
    if (loadAuthDone.message === 'WRONG_CODE') {
      setMoOpen(true);
      setMoMessage('인증 코드를 다시 한번 확인해주세요');
      setMoSt(true);
      setVerifyErr(true);
      return;
    } else if (loadAuthDone.message === 'VERIFIED') {
      setMoOpen(true);
      setMoMessage('이메일 인증이 되었어요');
      setMoSt(false);
      setVerifyErr(false);
      setverifyAble(true);
      setNextBtn(true);
    }
  }, [loadAuthDone]);

  // 모달
  const [moOpen, setMoOpen] = React.useState(false);
  const [moMessage, setMoMessage] = React.useState('');
  const [moSt, setMoSt] = React.useState(false);
  const onCloseMo = () => {
    setMoOpen(false);
  };

  React.useEffect(() => {
    dispatch(userActions.initializeUserForm());
  }, [dispatch]);

  return (
    <AuthLayout type="forgot-password">
      <ForgotPwLayout firstPage={firstPage}>
        {firstPage && (
          <VerifyEmail
            onChange={handleChangeForgetPWField}
            operEmail={operEmail}
            veriftAble={veriftAble}
            verifyErr={verifyErr}
            nextBtn={nextBtn}
            handleReqVerify={handleReqVerify}
            min={min}
            timerErr={timerErr}
            setTimerErr={setTimerErr}
            hadleCheckVerifyCode={hadleCheckVerifyCode}
            handleGoToSec={handleGoToSec}
          />
        )}
        {secondPage && <ResetPw onChange={handleChangeForgetPWField} handleGoToLast={handleGoToLast} />}
        {lastPage && <ForgotPwLastPage />}
      </ForgotPwLayout>
      <Modal open={moOpen} close={onCloseMo} message={moMessage} error={moSt} />
    </AuthLayout>
  );
};

export default ForgotPassword;
