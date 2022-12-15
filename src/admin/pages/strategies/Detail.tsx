import FuncModal from '@/src/components/common/modals/FuncModal';
import { RootState } from '@/src/store/configureStore';
import { adminStrategiesActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailCommonTop from '../../components/common/DetailCommonTop';
import CertifiedTop from '../../components/strategies/detail/certified/CertifiedTop';
import CertifiedContainer from '../../containers/strategies/CertifiedContainer';
import AdminLayout from '../../layouts/AdminLayout';
import BasicContainer from '../../layouts/BasicContainer';

const Detail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));
  const { getAdminStrategyDetailResult } = useSelector(({ adminStrategies }: RootState) => ({
    getAdminStrategyDetailResult: adminStrategies.getAdminStrategyDetailResult,
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
  }, [dispatch, router]);

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (loadAdminAuthDone) {
      if (loadAdminAuthDone.accessToken) {
        setIsAdmin(true);
      }
    }
  }, [loadAdminAuthDone]);

  useEffect(() => {
    if (getAdminStrategyDetailResult) {
      dispatch(adminStrategiesActions.changeContent({ content: getAdminStrategyDetailResult?.content }));
    }
  }, [getAdminStrategyDetailResult]);

  useEffect(() => {
    if (router.query.id && router.query.category) {
      if (isAdmin) {
        dispatch(
          adminStrategiesActions.getAdminStrategyDetail({
            id: parseInt(router.query.id as string),
            category: router.query.category as string,
          }),
        );
      }
    }
  }, [router, isAdmin]);

  //function modal
  const [fModalOpen, setFModalOpen] = useState(false);
  const [fModalMessage, setFModalMessage] = useState('');
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
          <DetailCommonTop handleDeleteModalOpen={null} handleSubmit={handleDeleteModalOpen} />
          {router.query.category === 'CERTIFIED_STRATEGY' && <CertifiedContainer />}
        </BasicContainer>
      </AdminLayout>
      <FuncModal
        open={fModalOpen}
        onClose={handleModalClose}
        message={{
          title: fModalMessage,
          description: '',
          btnTxt: '등록하기',
        }}
        dubBtn={true}
        onClick={() => alert('임시')}
        onClick2={handleModalClose}
      />
    </>
  );
};

export default Detail;
