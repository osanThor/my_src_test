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
  const { getAdminStrategyDetailResult, certifiedStrategyPayload, loadAdminStrategiesDone, loadAdminStrategiesError } =
    useSelector(({ adminStrategies }: RootState) => ({
      getAdminStrategyDetailResult: adminStrategies.getAdminStrategyDetailResult,
      certifiedStrategyPayload: adminStrategies.certifiedStrategyPayload,
      loadAdminStrategiesDone: adminStrategies.loadAdminStrategiesDone,
      loadAdminStrategiesError: adminStrategies.loadAdminStrategiesError,
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

  // 초기 상태 저장
  useEffect(() => {
    if (getAdminStrategyDetailResult) {
      dispatch(adminStrategiesActions.changeContent({ content: getAdminStrategyDetailResult?.content }));
    }
  }, [getAdminStrategyDetailResult]);

  //function modal
  const [isDelete, setIsDelete] = useState(false);

  const [fModalOpen, setFModalOpen] = useState(false);
  const [fModalMessage, setFModalMessage] = useState('');
  const [fModalBtnTxt, setFModalBtnTxt] = useState('');
  const handleDeleteModalOpen = () => {
    setFModalOpen(true);
    setFModalMessage('해당 내용을 삭제하시겠습니까?');
    setFModalBtnTxt('삭제하기');
    setIsDelete(true);
  };
  const handleModalClose = () => {
    setFModalOpen(false);
  };

  const handleUpdateOpen = () => {
    setFModalOpen(true);
    setFModalMessage('변경된 내용을 등록하시겠습니까?');
    setFModalBtnTxt('등록하기');
    setIsDelete(false);
  };

  const handleUpdateStrategy = () => {
    if (router.query.category === 'CERTIFIED_STRATEGY') {
      dispatch(adminStrategiesActions.updateCertifiedStrategy(certifiedStrategyPayload));
    }
  };

  //eventHandler
  useEffect(() => {
    if (loadAdminStrategiesError) {
      alert(loadAdminStrategiesError);
      return;
    }

    if (loadAdminStrategiesDone) {
      if (loadAdminStrategiesDone.message === 'UPDATED') {
        setFModalOpen(false);
        dispatch(
          adminStrategiesActions.getAdminStrategyDetail({
            id: parseInt(router.query.id as string),
            category: router.query.category as string,
          }),
        );
      }
    }
  }, [loadAdminStrategiesError, loadAdminStrategiesDone]);

  return (
    <>
      <AdminLayout>
        <BasicContainer>
          <DetailCommonTop
            handleDeleteModalOpen={handleDeleteModalOpen}
            handleUpdate={handleUpdateOpen}
            handleSubmit={null}
          />
          {router.query.category === 'CERTIFIED_STRATEGY' && <CertifiedContainer />}
        </BasicContainer>
      </AdminLayout>
      <FuncModal
        open={fModalOpen}
        onClose={handleModalClose}
        message={{
          title: fModalMessage,
          description: '',
          btnTxt: fModalBtnTxt,
        }}
        dubBtn={true}
        onClick={isDelete ? () => alert('임시') : handleUpdateStrategy}
        onClick2={handleModalClose}
      />
    </>
  );
};

export default Detail;
