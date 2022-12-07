import UserLayout from '@/src/components/layout/UserLayout';
import AddApiKeyCon from '@/src/components/licenses/AddApiKeyCon';
import LicenseCenterLayout from '@/src/components/licenses/LicenseCenterLayout';
import LicensesLayout from '@/src/components/licenses/LicensesLayout';
import LicensesTop from '@/src/components/licenses/LicensesTop';
import LicenseExchange from '@/src/components/licenses/process/LicenseExchange';
import LicenseIndex from '@/src/components/licenses/process/LicenseIndex';
import { RootState } from '@/src/store/configureStore';
import { exchangeActions, localActions } from '@/src/store/reducers';
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
  const [isUser, setUser] = useState(false);

  useEffect(() => {
    dispatch(exchangeActions.initializeExchangeState());
  }, [router, dispatch]);

  useEffect(() => {
    if (!loadAuthLoading) {
      if (loadAuthDone) {
        if (loadAuthDone.accessToken) {
          setUser(true);
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

  return (
    <UserLayout>
      <LicensesLayout>
        <LicensesTop />
        <LicenseCenterLayout>
          {licenseIndex && <LicenseIndex />}
          {licenseExchange && <LicenseExchange />}
        </LicenseCenterLayout>
        <AddApiKeyCon />
      </LicensesLayout>
    </UserLayout>
  );
};

export default LicensePageIndex;
