import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useDispatch } from 'react-redux';
import BasicContainer from '../../layouts/BasicContainer';
import { adminBannersActions } from '@/src/store/reducers';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import { useRouter } from 'next/router';
import BannersTop from '../../components/banners/BannersTop';
import BannersList from '../../components/banners/BannersList';

const BannersIndex = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));
  const { page } = useSelector(({ adminBanners }: RootState) => ({
    page: adminBanners.page,
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
    dispatch(adminBannersActions.initializeAdminBannersForm());
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
      if (!router.query.zone) {
        dispatch(
          adminBannersActions.getAdminAllBanners({
            page,
            bannerPosition: '',
            isAllSubscribe: '',
          }),
        );
      } else if (router.query.zone === 'MAIN') {
        dispatch(
          adminBannersActions.getAdminAllBanners({
            page,
            bannerPosition: 'MAIN',
            isAllSubscribe: '',
          }),
        );
      } else if (router.query.zone === 'SUBSCRIBE') {
        if (!router.query.sub) {
          dispatch(
            adminBannersActions.getAdminAllBanners({
              page,
              bannerPosition: '',
              isAllSubscribe: true,
            }),
          );
        } else if (router.query.sub) {
          if (router.query.sub === 'BYBIT') {
            dispatch(
              adminBannersActions.getAdminAllBanners({
                page,
                bannerPosition: 'SUBSCRIBE_BYBIT',
                isAllSubscribe: '',
              }),
            );
          } else if (router.query.sub === 'BINANCE') {
            dispatch(
              adminBannersActions.getAdminAllBanners({
                page,
                bannerPosition: 'SUBSCRIBE_BINANCE',
                isAllSubscribe: '',
              }),
            );
          } else if (router.query.sub === 'BITGET') {
            dispatch(
              adminBannersActions.getAdminAllBanners({
                page,
                bannerPosition: 'SUBSCRIBE_BITGET',
                isAllSubscribe: '',
              }),
            );
          }
        }
      }

      if (router.query.page) {
        dispatch(adminBannersActions.changePage({ page: parseInt(router.query.page as string) }));
      } else {
        dispatch(adminBannersActions.changePage({ page: 1 }));
      }
    }
  }, [router, isAdmin, page]);
  return (
    <AdminLayout>
      <BasicContainer>
        <BannersTop />
        <BannersList />
      </BasicContainer>
    </AdminLayout>
  );
};

export default BannersIndex;
