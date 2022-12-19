import FuncModal from '@/src/components/common/modals/FuncModal';
import { RootState } from '@/src/store/configureStore';
import { adminBoardsActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WriteNoticeCon from '../../components/boards/write/WriteNoticeCon';
import CommentsLayout from '../../components/common/Comments/CommentsLayout';
import DetailCommonTop from '../../components/common/DetailCommonTop';
import AdminLayout from '../../layouts/AdminLayout';
import BasicContainer from '../../layouts/BasicContainer';

const BoardsNotice = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));
  const { loadAdminBoardsError, loadAdminBoardsDone, getAdminNoticeDetailResult, createAdminNotice } = useSelector(
    ({ adminBoards }: RootState) => ({
      loadAdminBoardsError: adminBoards.loadAdminBoardsError,
      loadAdminBoardsDone: adminBoards.loadAdminBoardsDone,
      getAdminNoticeDetailResult: adminBoards.getAdminNoticeDetailResult,
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
      dispatch(
        adminBoardsActions.getAdminNoticeDetail({
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

  useEffect(() => {
    if (getAdminNoticeDetailResult) {
      dispatch(
        adminBoardsActions.changeAdminNoticeField({
          title: getAdminNoticeDetailResult?.title,
          content: getAdminNoticeDetailResult?.content,
          // targetCategory 내려주면 수정
          targetCategory: getAdminNoticeDetailResult?.notice?.targetCategories?.map(({ category }) => category),
        }),
      );
    }
  }, [getAdminNoticeDetailResult]);
  //function modal
  const [isComment, setisComment] = useState(false);

  const [fModalOpen, setFModalOpen] = useState(false);
  const [fModalMessage, setFModalMessage] = useState('');
  const [fModalBtnTxt, setFModalBtnTxt] = useState('');
  const handleDeleteModalOpen = () => {
    setFModalOpen(true);
    setFModalMessage('해당 내용을 삭제하시겠습니까?');
    setFModalBtnTxt('삭제하기');
    setisComment(false);
    setIsUpdate(false);
  };
  const [commentId, setCommentId] = useState(0);
  const handleDeleteComments = (id: number | null) => {
    setFModalOpen(true);
    setFModalMessage('해당 댓글을 삭제하시겠습니까?');
    setFModalBtnTxt('삭제하기');
    setisComment(true);
    setCommentId(id);
    setIsUpdate(false);
  };

  const [isUpdate, setIsUpdate] = useState(false);
  const handleOpenUpdate = () => {
    setFModalOpen(true);
    setFModalMessage('변경된 내용을 등록하시겠습니까?');
    setFModalBtnTxt('등록하기');
    setisComment(false);
    setIsUpdate(true);
  };
  const handleModalClose = () => {
    setFModalOpen(false);
    setisComment(false);
    setCommentId(0);
    setIsUpdate(false);
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
        setFModalOpen(false);
        if (isComment) {
          dispatch(
            adminBoardsActions.getAdminNoticeDetail({
              boardId: parseInt(router.query.id as string),
            }),
          );
          dispatch(
            adminBoardsActions.getAdminBoardComments({
              boardId: parseInt(router.query.id as string),
            }),
          );
        } else {
          router.back();
        }
      }
      if (loadAdminBoardsDone.message === 'DELETED') {
        alert('업데이트 되었습니다');
        dispatch(
          adminBoardsActions.getAdminNoticeDetail({
            boardId: parseInt(router.query.id as string),
          }),
        );
        dispatch(
          adminBoardsActions.getAdminBoardComments({
            boardId: parseInt(router.query.id as string),
          }),
        );
      }
    }
  }, [loadAdminBoardsError, loadAdminBoardsDone]);

  const handleDelete = () => {
    if (isComment) {
      dispatch(adminBoardsActions.deleteAdminComment({ commentId }));
    } else {
      dispatch(adminBoardsActions.deleteAdminBoard({ boardId: parseInt(router.query.id as string) }));
    }
  };
  const handleUpdate = () => {
    dispatch(
      adminBoardsActions.updateAdminNotice({
        boardId: parseInt(router.query.id as string),
        title: createAdminNotice?.title,
        content: createAdminNotice?.content,
        targetCategory: createAdminNotice?.targetCategory,
      }),
    );
  };
  return (
    <>
      <AdminLayout>
        <BasicContainer>
          <DetailCommonTop
            handleDeleteModalOpen={handleDeleteModalOpen}
            handleUpdate={handleOpenUpdate}
            handleSubmit={null}
          />
          <WriteNoticeCon />
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
        onClick={isUpdate ? handleUpdate : handleDelete}
        onClick2={handleModalClose}
      />
    </>
  );
};

export default BoardsNotice;
