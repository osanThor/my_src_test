import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useDispatch } from 'react-redux';
import BasicContainer from '../../layouts/BasicContainer';
import { adminBannersActions, adminUsersActions } from '@/src/store/reducers';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import { useRouter } from 'next/router';
import DetailCommonTop from '../../components/common/DetailCommonTop';
import UserDetailBox from '../../components/user/detail/UserDetailBox';
import UserMiddleBox from '../../components/user/detail/UserMiddleBox';
import FuncModal from '@/src/components/common/modals/FuncModal';
import Loading from '@/src/components/common/Loading';
import AcountTable from '../../components/user/detail/AcountTable';
import BannerTop from '../../components/banners/detail/BannerTop';
import BannerBottom from '../../components/banners/detail/BannerBottom';

const BannerDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));
  const { id, loadAdminBannersLoading } = useSelector(({ adminBanners }: RootState) => ({
    id: adminBanners.id,
    loadAdminBannersLoading: adminBanners.loadAdminBannersLoading,
  }));
  //admin auth
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
    if (router.query.id) {
      if (isAdmin) {
        dispatch(adminBannersActions.getAdminBannerDetail({ id: parseInt(router.query.id as string) }));
      }
    }
  }, [router, isAdmin]);

  //function modal
  const [fModalOpen, setFModalOpen] = useState(false);
  const handleDeleteModalOpen = () => {
    setFModalOpen(true);
  };
  const handleModalClose = () => {
    setFModalOpen(false);
  };

  return (
    <>
      <AdminLayout>
        <BasicContainer>
          <DetailCommonTop handleDeleteModalOpen={handleDeleteModalOpen} />
          <BannerTop />
          <BannerBottom />
        </BasicContainer>
      </AdminLayout>
      <FuncModal
        open={fModalOpen}
        onClose={handleModalClose}
        message={{
          title: '해당 배너를 삭제하시겠습니까?',
          description: '',
          btnTxt: '삭제하기',
        }}
        dubBtn={true}
        onClick={() => alert('임시')}
        onClick2={handleModalClose}
      />
      {loadAdminBannersLoading && <Loading />}
    </>
  );
};

export default BannerDetail;
