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

const WriteGuide = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));
  const { createGuide, loadAdminCustomersError, loadAdminCustomersDone } = useSelector(
    ({ adminCustomers }: RootState) => ({
      createGuide: adminCustomers.createGuide,
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
        adminCustomersActions.changeAdminGuideField({
          isVisible: false,
          group: '',
          title: '',
          content: '',
        }),
      );
    }
  }, [router, isAdmin]);
  //function modal
  const [fModalOpen, setFModalOpen] = useState(false);
  const [fModalMessage, setFModalMessage] = useState('');
  const [fModalBtnTxt, setFModalBtnTxt] = useState('');

  const handleOpenSubmitNotice = () => {
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
    setFModalMessage('공지를 등록하시겠습니까?');
    setFModalBtnTxt('등록하기');
  };
  const handleModalClose = () => {
    setFModalOpen(false);
  };

  //event handler
  useEffect(() => {
    if (loadAdminCustomersError) {
      alert(loadAdminCustomersError);
      return;
    }

    if (loadAdminCustomersDone) {
      if (loadAdminCustomersDone.message === 'CREATED') {
        alert('이용안내 등록이 완료되었어요.');
        router.back();
      }
    }
  }, [loadAdminCustomersError, loadAdminCustomersDone]);

  return (
    <>
      <AdminLayout>
        <BasicContainer>
          <DetailCommonTop handleDeleteModalOpen={null} handleUpdate={null} handleSubmit={handleOpenSubmitNotice} />
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
        onClick={() => dispatch(adminCustomersActions.createAdminGuideDetail(createGuide))}
        onClick2={handleModalClose}
      />
    </>
  );
};

export default WriteGuide;
