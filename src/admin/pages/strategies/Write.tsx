import FuncModal from '@/src/components/common/modals/FuncModal';
import { RootState } from '@/src/store/configureStore';
import { adminStrategiesActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailCommonTop from '../../components/common/DetailCommonTop';
import IndicatorWrite from '../../components/strategies/write/IndicatorWrite';
import PublicWrite from '../../components/strategies/write/PublicWrite';
import StrategyWriteTop from '../../components/strategies/write/StrategyWriteTop';
import AdminLayout from '../../layouts/AdminLayout';
import BasicContainer from '../../layouts/BasicContainer';

const WritePublic = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));
  const { quantroIndicatorPayload, quantroStrategyPayload, loadAdminStrategiesDone, loadAdminStrategiesError } =
    useSelector(({ adminStrategies }: RootState) => ({
      quantroIndicatorPayload: adminStrategies.quantroIndicatorPayload,
      quantroStrategyPayload: adminStrategies.quantroStrategyPayload,
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
  //function modal
  const [fModalOpen, setFModalOpen] = useState(false);
  const [fModalMessage, setFModalMessage] = useState('');
  const handleSubmitModalOpen = () => {
    if (router.query.category === 'PUBLIC') {
      if (!quantroStrategyPayload) {
        alert('값을 입력해주세요');
        return;
      }
      if (!quantroStrategyPayload?.title) {
        alert('제목을 입력해주세요');
        return;
      }
      if (!quantroStrategyPayload?.content || quantroStrategyPayload?.content === '<p><br></p>') {
        alert('내용을 입력해주세요');
        return;
      }
      if (
        !quantroStrategyPayload?.symbol ||
        !quantroStrategyPayload?.platform ||
        !quantroStrategyPayload?.chartCycle ||
        !quantroStrategyPayload?.profitPct
      ) {
        alert('빈 값이 있습니다. 값을 채워주세요');
        return;
      }
      setFModalMessage('해당 전략을 등록하시겠습니까?');
    } else {
      if (!quantroIndicatorPayload) {
        alert('값을 입력해주세요');
        return;
      }
      if (!quantroIndicatorPayload?.title) {
        alert('제목을 입력해주세요');
        return;
      }
      if (!quantroIndicatorPayload?.content || quantroIndicatorPayload?.content === '<p><br></p>') {
        alert('내용을 입력해주세요');
        return;
      }
      setFModalMessage('해당 지표을 등록하시겠습니까?');
    }
    setFModalOpen(true);
  };
  const handleModalClose = () => {
    setFModalOpen(false);
  };

  useEffect(() => {
    if (loadAdminStrategiesError) {
      alert(loadAdminStrategiesError);
      return;
    }

    if (loadAdminStrategiesDone) {
      if (loadAdminStrategiesDone?.message === 'CREATED') {
        alert('등록이 완료되었습니다');
        router.push('/admin/strategies');
      }
    }
  }, [loadAdminStrategiesError, loadAdminStrategiesDone]);

  return (
    <>
      <AdminLayout>
        <BasicContainer>
          <DetailCommonTop handleDeleteModalOpen={null} handleSubmit={handleSubmitModalOpen} />
          <StrategyWriteTop />
          {router.query.category === 'PUBLIC' && <PublicWrite />}
          {router.query.category === 'INDICATOR' && <IndicatorWrite />}
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
        onClick={
          router.query.category === 'PUBLIC'
            ? () => dispatch(adminStrategiesActions.createQuantroStrategy(quantroStrategyPayload))
            : () => dispatch(adminStrategiesActions.createQuantroIndicator(quantroIndicatorPayload))
        }
        onClick2={handleModalClose}
      />
    </>
  );
};

export default WritePublic;
