import FuncModal from '@/src/components/common/modals/FuncModal';
import { RootState } from '@/src/store/configureStore';
import { adminCustomersActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailCommonTop from '../../components/common/DetailCommonTop';
import WriteGuideCon from '../../components/customers/write/WriteGuideCon';
import AdminLayout from '../../layouts/AdminLayout';
import BasicContainer from '../../layouts/BasicContainer';

const GuideDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));
  const { createGuide, getGuideDetailResult, loadAdminCustomersError, loadAdminCustomersDone } = useSelector(
    ({ adminCustomers }: RootState) => ({
      createGuide: adminCustomers.createGuide,
      getGuideDetailResult: adminCustomers.getGuideDetailResult,
      loadAdminCustomersError: adminCustomers.loadAdminCustomersError,
      loadAdminCustomersDone: adminCustomers.loadAdminCustomersDone,
    }),
  );

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      alert('권한이 없습니다');
      router.push('/admin/login');
    }
  }, []);

  useEffect(() => {
    setIsAdmin(false);
    dispatch(adminCustomersActions.initializeAdminCustomersForm());
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
        adminCustomersActions.getAdminGuideDetail({
          guideId: parseInt(router.query.id as string),
        }),
      );
    }
  }, [router, isAdmin]);
  useEffect(() => {
    if (getGuideDetailResult) {
      dispatch(
        adminCustomersActions.changeAdminGuideField({
          group: getGuideDetailResult?.group,
          title: getGuideDetailResult?.title,
          content: getGuideDetailResult?.content,
          isVisible: getGuideDetailResult?.isVisible,
        }),
      );
    }
  }, [getGuideDetailResult]);
  //function modal
  const [fModalOpen, setFModalOpen] = useState(false);
  const [fModalMessage, setFModalMessage] = useState('');
  const [fModalBtnTxt, setFModalBtnTxt] = useState('');

  const [isUpdate, setIsUpdate] = useState(false);
  const handleOpenUpdateGuide = () => {
    if (!createGuide?.title) {
      alert('제목을 입력해주세요.');
      return;
    } else if (!createGuide?.group) {
      alert('카테고리를 선택해주세요.');
      return;
    } else if (!createGuide?.content) {
      alert('내용을 입력해주세요.');
      return;
    }
    setFModalOpen(true);
    setFModalMessage('변경된 내용을 등록하시겠습니까?');
    setFModalBtnTxt('등록하기');
    setIsUpdate(true);
  };

  const handleOpenDeleteGuide = () => {
    setFModalOpen(true);
    setFModalMessage('해당 이용안내를 삭제하시겠습니까?');
    setFModalBtnTxt('삭제하기');
    setIsUpdate(false);
  };
  const handleModalClose = () => {
    setFModalOpen(false);
    setIsUpdate(false);
  };

  //event handler
  useEffect(() => {
    if (loadAdminCustomersError) {
      alert(loadAdminCustomersError);
      return;
    }

    if (loadAdminCustomersDone) {
      if (loadAdminCustomersDone.message === 'UPDATED') {
        alert('이용안내 수정이 완료되었어요.');
        setFModalOpen(false);
        dispatch(
          adminCustomersActions.getAdminGuideDetail({
            guideId: parseInt(router.query.id as string),
          }),
        );
      }
      if (loadAdminCustomersDone.message === 'DELETED') {
        alert('이용안내 삭제가 완료되었어요.');
        router.back();
      }
    }
  }, [loadAdminCustomersError, loadAdminCustomersDone]);

  return (
    <>
      <AdminLayout>
        <BasicContainer>
          <DetailCommonTop
            handleDeleteModalOpen={handleOpenDeleteGuide}
            handleUpdate={handleOpenUpdateGuide}
            handleSubmit={null}
          />
          <WriteGuideCon />
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
        onClick={
          isUpdate
            ? () =>
                dispatch(
                  adminCustomersActions.updateAdminGuideDetail({
                    guideId: parseInt(router.query.id as string),
                    group: createGuide?.group,
                    title: createGuide?.title,
                    content: createGuide?.content,
                    isVisible: createGuide?.isVisible,
                  }),
                )
            : () =>
                dispatch(adminCustomersActions.deleteAdminGuideDetail({ guideId: parseInt(router.query.id as string) }))
        }
        onClick2={handleModalClose}
      />
    </>
  );
};

export default GuideDetail;
