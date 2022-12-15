import FuncModal from '@/src/components/common/modals/FuncModal';
import { RootState } from '@/src/store/configureStore';
import { adminBoardsActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardsList from '../../components/boards/BoardsList';
import BoardsTop from '../../components/boards/BoardsTop';
import DetailCommonTop from '../../components/common/DetailCommonTop';
import AdminLayout from '../../layouts/AdminLayout';
import BasicContainer from '../../layouts/BasicContainer';

const BoardsDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));
  const { page, category, title, user } = useSelector(({ adminBoards }: RootState) => ({
    page: adminBoards.page,
    category: adminBoards.category,
    title: adminBoards.title,
    user: adminBoards.user,
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
    dispatch(adminBoardsActions.initializeAdminBoardsForm());
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
        adminBoardsActions.getAdminAllBoards({
          page,
          category,
          title,
          user,
        }),
      );
    }
  }, [router, isAdmin]);
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

  return (
    <>
      <AdminLayout>
        <BasicContainer>
          <DetailCommonTop
            handleDeleteModalOpen={handleDeleteModalOpen}
            handleUpdate={handleUpdateOpen}
            handleSubmit={null}
          />
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
        onClick={isDelete ? () => alert('임시') : () => alert('임시')}
        onClick2={handleModalClose}
      />
    </>
  );
};

export default BoardsDetail;
