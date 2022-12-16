import FuncModal from '@/src/components/common/modals/FuncModal';
import { RootState } from '@/src/store/configureStore';
import { adminBoardsActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardContents from '../../components/boards/detail/BoardContents';
import BoardTop from '../../components/boards/detail/BoardTop';
import WriteNoticeCon from '../../components/boards/write/WriteNoticeCon';
import CommentsLayout from '../../components/common/Comments/CommentsLayout';
import DetailCommonTop from '../../components/common/DetailCommonTop';
import AdminLayout from '../../layouts/AdminLayout';
import BasicContainer from '../../layouts/BasicContainer';

const BoardsWriteNotice = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));
  const { loadAdminBoardsError, loadAdminBoardsDone, createAdminNotice } = useSelector(
    ({ adminBoards }: RootState) => ({
      loadAdminBoardsError: adminBoards.loadAdminBoardsError,
      loadAdminBoardsDone: adminBoards.loadAdminBoardsDone,
      createAdminNotice: adminBoards.createAdminNotice,
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
    }
  }, [router, isAdmin]);
  //function modal
  const [fModalOpen, setFModalOpen] = useState(false);
  const [fModalMessage, setFModalMessage] = useState('');
  const [fModalBtnTxt, setFModalBtnTxt] = useState('');

  const handleOpenSubmitNotice = () => {
    if (!createAdminNotice?.title) {
      alert('제목을 입력해주세요.');
      return;
    } else if (!createAdminNotice?.content) {
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
    if (loadAdminBoardsError) {
      alert(loadAdminBoardsError);
      return;
    }

    if (loadAdminBoardsDone) {
      if (loadAdminBoardsDone.message === 'DELETED') {
        alert('삭제가 완료되었습니다.');
        router.back();
      }
    }
  }, [loadAdminBoardsError, loadAdminBoardsDone]);

  return (
    <>
      <AdminLayout>
        <BasicContainer>
          <DetailCommonTop handleDeleteModalOpen={null} handleUpdate={null} handleSubmit={handleOpenSubmitNotice} />
          <WriteNoticeCon />
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
        onClick={() => dispatch(adminBoardsActions.createAdminNotice(createAdminNotice))}
        onClick2={handleModalClose}
      />
    </>
  );
};

export default BoardsWriteNotice;
