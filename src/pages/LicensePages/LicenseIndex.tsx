import Modal from '@/src/components/common/modals/Modal';
import NotUserModal from '@/src/components/common/modals/NotUserModal';
import UserLayout from '@/src/components/layout/UserLayout';
import AddApiKeyCon from '@/src/components/licenses/AddApiKeyCon';
import LicenseCenterLayout from '@/src/components/licenses/LicenseCenterLayout';
import LicensesLayout from '@/src/components/licenses/LicensesLayout';
import LicensesTop from '@/src/components/licenses/LicensesTop';
import LicenseExchange from '@/src/components/licenses/process/LicenseExchange';
import LicenseIndex from '@/src/components/licenses/process/LicenseIndex';
import { RootState } from '@/src/store/configureStore';
import { exchangeActions, localActions, userActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const LicensePageIndex: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { licenseIndex, licenseExchange, licenseRegular, licensePremium } = useSelector(({ local }: RootState) => ({
    licenseIndex: local.licenseIndex,
    licenseExchange: local.licenseExchange,
    licenseRegular: local.licenseRegular,
    licensePremium: local.licensePremium,
  }));
  const { loadAuthLoading, loadAuthDone } = useSelector(({ auth }: RootState) => ({
    loadAuthLoading: auth.loadAuthLoading,
    loadAuthDone: auth.loadAuthDone,
  }));
  const { exchange, apiKeyObj, loadExchangeLoading, loadExchangeDone, loadExchangeError } = useSelector(
    ({ exchange }: RootState) => ({
      exchange: exchange.exchange,
      apiKeyObj: exchange.apiKeyObj,
      loadExchangeLoading: exchange.loadExchangeLoading,
      loadExchangeDone: exchange.loadExchangeDone,
      loadExchangeError: exchange.loadExchangeError,
    }),
  );
  const [isUser, setUser] = useState(false);
  const [noUserModal, setNoUserModal] = useState(false);
  const handleCloseNoUserModal = () => {
    setNoUserModal(false);
    router.push('/');
  };

  useEffect(() => {
    dispatch(exchangeActions.initializeExchangeState());
  }, [router, dispatch]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!loadAuthLoading) {
      if (loadAuthDone) {
        if (loadAuthDone.accessToken) {
          setUser(true);
        } else {
          if (!user) {
            dispatch(localActions.isLocalBgBlur());
            setNoUserModal(true);
          }
        }
      }
    }
  }, [loadAuthLoading, loadAuthDone]);

  useEffect(() => {
    setUser(false);

    if (router.query) {
      if (router.query.state === 'index') {
        dispatch(localActions.gotoLicenseIndex());
      } else if (router.query.state === 'exchange') {
        dispatch(localActions.gotolicenseExchange());
      } else if (router.query.state === 'regular') {
        dispatch(localActions.gotolicenseRegular());
      } else if (router.query.state === 'premium') {
        dispatch(localActions.gotolicensePremium());
      }
    }
  }, [router]);

  useEffect(() => {
    if (isUser) {
      dispatch(exchangeActions.getAllExchange());
    }
  }, [isUser]);

  // 텔레그램 상태관리
  useEffect(() => {
    dispatch(userActions.loadUserDoneClear());
  }, [router]);
  const { username, loadUserDone } = useSelector(({ user }: RootState) => ({
    username: user.username,
    loadUserDone: user.loadUserDone,
  }));

  const handleChangeUserNameField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(userActions.changeTelegramField({ username: value }));
  };

  // 텔레그램 사용자명 등록 요청
  const handlePutTelegram = () => {
    if (username.length <= 0) {
      setMoOpen(true);
      setMoMessage('텔레그램 사용자명를 입력해주세요');
      setMoSt(false);
      return;
    }
    dispatch(userActions.telegramUsername({ username }));
  };
  React.useEffect(() => {
    if (loadUserDone === 'NOT_FOUND_TELEGRAM') {
      setMoOpen(true);
      setMoMessage('텔레그램 사용자명를 찾을 수 없어요');
      setMoSt(true);
      return;
    } else if (loadUserDone === 'CHANGED') {
      setMoOpen(true);
      setMoMessage('텔레그램이 연동되었어요~! 텔레그램 환영메세지를 확인해주세요.');
      setMoSt(false);
    }
  }, [loadUserDone]);

  // api key 값이 없을 때 이용권 등록 alret
  const handleNoLicenseClick = () => {
    setMoOpen(true);
    setMoMessage('이용권을 등록해주세요');
    setMoSt(false);
    return;
  };

  //createUpdateApiKey
  const handleCreateUpdateKey = () => {
    if (!apiKeyObj.alias) {
      setMoOpen(true);
      setMoMessage('계정명을 등록해주세요');
      setMoSt(true);
      return;
    } else if (!apiKeyObj.apiKey) {
      setMoOpen(true);
      setMoMessage('Api Key를 등록해주세요');
      setMoSt(true);
      return;
    } else if (!apiKeyObj.apiSecret) {
      setMoOpen(true);
      setMoMessage('Api Secret을 등록해주세요');
      setMoSt(true);
      return;
    }
    dispatch(
      exchangeActions.createApiKey({
        exchange,
        apiKeyObj,
      }),
    );
  };

  //loadExchangeDone
  useEffect(() => {
    if (loadExchangeError) {
      setMoOpen(true);
      setMoMessage(loadExchangeError);
      setMoSt(true);
      return;
    }

    if (loadExchangeDone) {
      if (loadExchangeDone.message === 'WRONG_API_KEY') {
        setMoOpen(true);
        setMoMessage('API Key 입력값을 확인해주세요');
        setMoSt(true);
        return;
      } else if (loadExchangeDone.message === 'ALREADY_EXIST') {
        setMoOpen(true);
        setMoMessage('이미 존재하는 KEY입니다');
        setMoSt(true);
        return;
      } else if (loadExchangeDone.message === 'UPDATED') {
        setMoOpen(true);
        setMoMessage('API Key가 업데이트 되었어요');
        setMoSt(false);
        router.push('/licenses?state=index');
      } else if (loadExchangeDone.message === 'CREATED') {
        setMoOpen(true);
        setMoMessage('API Key 등록이 완료되었어요');
        setMoSt(false);
        router.push('/licenses?state=index');
      }
    }
  }, [loadExchangeDone, loadExchangeError]);

  // 일반 모달
  const [moOpen, setMoOpen] = React.useState(false);
  const [moMessage, setMoMessage] = React.useState('');
  const [moSt, setMoSt] = React.useState(false);
  const onCloseMo = () => {
    setMoOpen(false);
  };

  return (
    <>
      <UserLayout>
        <LicensesLayout>
          <LicensesTop onChange={handleChangeUserNameField} onSubmit={handlePutTelegram} />
          <LicenseCenterLayout>
            {licenseIndex && <LicenseIndex />}
            {licenseExchange && <LicenseExchange />}
          </LicenseCenterLayout>
          <AddApiKeyCon handleNoLicenseClick={handleNoLicenseClick} handleCreateUpdateKey={handleCreateUpdateKey} />
        </LicensesLayout>
      </UserLayout>
      <Modal open={moOpen} close={onCloseMo} message={moMessage} error={moSt} />
      <NotUserModal open={noUserModal} onClose={handleCloseNoUserModal} />
    </>
  );
};

export default LicensePageIndex;
