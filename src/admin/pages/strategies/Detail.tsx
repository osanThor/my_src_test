import Loading from '@/src/components/common/Loading';
import FuncModal from '@/src/components/common/modals/FuncModal';
import { RootState } from '@/src/store/configureStore';
import { adminStrategiesActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailCommonTop from '../../components/common/DetailCommonTop';
import CertifiedContainer from '../../containers/strategies/CertifiedContainer';
import CommissionContainer from '../../containers/strategies/CommissionContainer';
import IndicatorContainer from '../../containers/strategies/IndicatorContainer';
import PublicContainer from '../../containers/strategies/PublicContainer';
import UserStrategyContainer from '../../containers/strategies/UserStrategyContainer';
import AdminLayout from '../../layouts/AdminLayout';
import BasicContainer from '../../layouts/BasicContainer';

const Detail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));
  const {
    getAdminStrategyDetailResult,
    getAdminCommissionDetailResult,
    certifiedStrategyPayload,
    quantroStrategyPayload,
    quantroIndicatorPayload,
    answer,
    loadAdminStrategiesLoading,
    loadAdminStrategiesDone,
    loadAdminStrategiesError,
  } = useSelector(({ adminStrategies }: RootState) => ({
    getAdminStrategyDetailResult: adminStrategies.getAdminStrategyDetailResult,
    getAdminCommissionDetailResult: adminStrategies.getAdminCommissionDetailResult,
    certifiedStrategyPayload: adminStrategies.certifiedStrategyPayload,
    quantroStrategyPayload: adminStrategies.quantroStrategyPayload,
    quantroIndicatorPayload: adminStrategies.quantroIndicatorPayload,
    answer: adminStrategies.answer,
    loadAdminStrategiesLoading: adminStrategies.loadAdminStrategiesLoading,
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
    } else if (getAdminCommissionDetailResult) {
      dispatch(adminStrategiesActions.changeContent({ content: getAdminCommissionDetailResult?.content }));
    }
  }, [getAdminStrategyDetailResult, getAdminCommissionDetailResult]);

  //function modal

  const [fModalOpen, setFModalOpen] = useState(false);
  const [fModalMessage, setFModalMessage] = useState('');
  const [fModalBtnTxt, setFModalBtnTxt] = useState('');

  const [isDelete, setIsDelete] = useState(false);
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

  const handleClickStrategyModal = () => {
    if (router.query.category === 'CERTIFIED_STRATEGY') {
      dispatch(adminStrategiesActions.updateCertifiedStrategy(certifiedStrategyPayload));
    }

    if (router.query.category === 'USER_STRATEGY') {
      alert(new Error());
    }

    if (router.query.category === 'COMMISSION') {
      dispatch(adminStrategiesActions.updateAdminCommission({ id: parseInt(router.query.id as string), answer }));
    }

    if (router.query.category === 'QUANTRO_STRATEGY') {
      dispatch(
        adminStrategiesActions.updateQuantroStrategy({
          id: parseInt(router.query.id as string),
          category: quantroStrategyPayload?.category,
          title: quantroStrategyPayload?.title,
          content: quantroStrategyPayload?.content,
          platform: quantroStrategyPayload?.platform,
          symbol: quantroStrategyPayload?.symbol,
          chartCycle: quantroStrategyPayload?.chartCycle,
          profitPct: quantroStrategyPayload?.profitPct,
          fileUrls: quantroStrategyPayload?.fileUrls,
        }),
      );
    }

    if (router.query.category === 'QUANTRO_INDICATOR') {
      dispatch(
        adminStrategiesActions.updateQuantroIndicator({
          id: parseInt(router.query.id as string),
          category: quantroIndicatorPayload?.category,
          title: quantroIndicatorPayload?.title,
          content: quantroIndicatorPayload?.content,
          fileUrls: quantroIndicatorPayload?.fileUrls,
        }),
      );
    }

    if (isDelete) {
      dispatch(adminStrategiesActions.deleteAdminStrategy({ id: parseInt(router.query.id as string) }));
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
        alert('변경되었습니다.');
        setFModalOpen(false);
        dispatch(
          adminStrategiesActions.getAdminStrategyDetail({
            id: parseInt(router.query.id as string),
            category: router.query.category as string,
          }),
        );
      }
      if (loadAdminStrategiesDone.message === 'DELETED') {
        alert('삭제가 완료됐습니다');
        router.back();
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
          {router.query.category === 'USER_STRATEGY' && <UserStrategyContainer />}
          {router.query.category === 'COMMISSION' && <CommissionContainer />}
          {router.query.category === 'QUANTRO_STRATEGY' && <PublicContainer />}
          {router.query.category === 'QUANTRO_INDICATOR' && <IndicatorContainer />}
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
        onClick={handleClickStrategyModal}
        onClick2={handleModalClose}
      />
      {loadAdminStrategiesLoading && <Loading />}
    </>
  );
};

export default Detail;
