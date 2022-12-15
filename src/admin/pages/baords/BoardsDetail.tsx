import FuncModal from '@/src/components/common/modals/FuncModal';
import { RootState } from '@/src/store/configureStore';
import { adminBoardsActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardContents from '../../components/boards/detail/BoardContents';
import BoardTop from '../../components/boards/detail/BoardTop';
import CommentsLayout from '../../components/common/Comments/CommentsLayout';
import DetailCommonTop from '../../components/common/DetailCommonTop';
import AdminLayout from '../../layouts/AdminLayout';
import BasicContainer from '../../layouts/BasicContainer';

const BoardsDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));
  // const { page, category, title, user } = useSelector(({ adminBoards }: RootState) => ({
  //   page: adminBoards.page,
  //   category: adminBoards.category,
  //   title: adminBoards.title,
  //   user: adminBoards.user,
  // }));

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
        adminBoardsActions.getAdminBoardDetail({
          boardId: parseInt(router.query.id as string),
        }),
      );
      dispatch(
        adminBoardsActions.getAdminBoardComments({
          boardId: parseInt(router.query.id as string),
        }),
      );
    }
  }, [router, isAdmin]);
  //function modal
  const [isComment, setisComment] = useState(false);

  const [fModalOpen, setFModalOpen] = useState(false);
  const [fModalMessage, setFModalMessage] = useState('');
  const [fModalBtnTxt, setFModalBtnTxt] = useState('');
  const handleDeleteModalOpen = () => {
    setFModalOpen(true);
    setFModalMessage('해당 내용을 삭제하시겠습니까?');
    setFModalBtnTxt('삭제하기');
    setisComment(true);
  };
  const handleDeleteComments = () => {
    setFModalOpen(true);
    setFModalMessage('해당 댓글을 삭제하시겠습니까?');
    setFModalBtnTxt('삭제하기');
  };
  const handleModalClose = () => {
    setFModalOpen(false);
  };

  return (
    <>
      <AdminLayout>
        <BasicContainer>
          <DetailCommonTop handleDeleteModalOpen={handleDeleteModalOpen} handleUpdate={null} handleSubmit={null} />
          <BoardTop />
          <BoardContents handleSetBoardLike={() => alert('사용자 권한이 필요합니다.')} />
          <CommentsLayout handleOpenDleteComment={handleDeleteComments} />
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
        onClick={isComment ? () => alert('임시') : () => alert('임시')}
        onClick2={handleModalClose}
      />
    </>
  );
};

export default BoardsDetail;
