import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useDispatch } from 'react-redux';
import BasicContainer from '../../layouts/BasicContainer';
import { adminStrategiesActions } from '@/src/store/reducers';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import { useRouter } from 'next/router';
import StrategyTop from '../../components/strategies/StrategyTop';
import StrategiesList from '../../components/strategies/StrategiesList';

const StrategiesIndex = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));
  const { page, category, title, nickname, email, confirmStatus } = useSelector(({ adminStrategies }: RootState) => ({
    page: adminStrategies.page,
    category: adminStrategies.category,
    title: adminStrategies.title,
    nickname: adminStrategies.nickname,
    email: adminStrategies.email,
    confirmStatus: adminStrategies.confirmStatus,
  }));

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      alert('권한이 없습니다');
      router.push('/admin/login');
    }
  }, []);

  useEffect(() => {
    setIsAdmin(false);
    dispatch(adminStrategiesActions.initializeAdminStrategiesForm());
  }, [dispatch]);

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (loadAdminAuthDone) {
      if (loadAdminAuthDone.accessToken) {
        setIsAdmin(true);
      }
    }
  }, [loadAdminAuthDone]);

  useEffect(() => {
    if (isAdmin) {
      dispatch(
        adminStrategiesActions.getAllAdminStrategies({
          page,
          category,
          title,
          nickname,
          email,
          confirmStatus,
        }),
      );

      if (router.query.page) {
        dispatch(adminStrategiesActions.changePage({ page: parseInt(router.query.page as string) }));
      } else {
        dispatch(adminStrategiesActions.changePage({ page: 1 }));
      }
      if (!router.query.category) {
        dispatch(adminStrategiesActions.changeCategory({ category: '' }));
      } else {
        if (router.query.category === 'CERTIFIED') {
          dispatch(adminStrategiesActions.changeCategory({ category: 'CERTIFIED_STRATEGY' }));
        } else if (router.query.category === 'USER') {
          dispatch(adminStrategiesActions.changeCategory({ category: 'USER_STRATEGY' }));
        } else if (router.query.category === 'COMMISION') {
          dispatch(adminStrategiesActions.changeCategory({ category: 'COMMISSION' }));
        } else if (router.query.category === 'PUBLIC') {
          dispatch(adminStrategiesActions.changeCategory({ category: 'QUANTRO_STRATEGY' }));
        } else if (router.query.category === 'INDICATOR') {
          dispatch(adminStrategiesActions.changeCategory({ category: 'QUANTRO_INDICATOR' }));
        }
      }
      if (!router.query.nickname) {
        dispatch(adminStrategiesActions.changeNickname({ nickname: '' }));
      } else {
        dispatch(adminStrategiesActions.changeNickname({ nickname: router.query.nickname as string }));
      }

      if (!router.query.title) {
        dispatch(adminStrategiesActions.changeTitle({ title: '' }));
      } else {
        dispatch(adminStrategiesActions.changeTitle({ title: router.query.title as string }));
      }
      if (!router.query.email) {
        dispatch(adminStrategiesActions.changeEmail({ email: '' }));
      } else {
        dispatch(adminStrategiesActions.changeEmail({ email: router.query.email as string }));
      }

      if (!router.query.confirmStatus) {
        dispatch(adminStrategiesActions.changeConfirmStatus({ confirmStatus: '' }));
      } else {
        dispatch(adminStrategiesActions.changeConfirmStatus({ confirmStatus: router.query.email as string }));
      }
    }
  }, [router, isAdmin, page, category, title, nickname, email, confirmStatus]);
  return (
    <AdminLayout>
      <BasicContainer>
        <StrategyTop />
        <StrategiesList />
      </BasicContainer>
    </AdminLayout>
  );
};

export default StrategiesIndex;
