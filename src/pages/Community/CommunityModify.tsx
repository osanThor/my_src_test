import Modal from '@/src/components/common/modals/Modal';
import CommunityWriteLayout from '@/src/components/community/CommunityWriteLayout';
import CommunityEditor from '@/src/components/community/Editor/CommunityEditor';
import UserLayout from '@/src/components/layout/UserLayout';
import { RootState } from '@/src/store/configureStore';
import { boardsActions, localActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const CommunityModify: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { boardId, content, category, title, fileUrls, getBoardDone, loadBoardsDone, loadBoardsError } = useSelector(
    ({ boards }: RootState) => ({
      boardId: boards.boardId,
      content: boards.content,
      category: boards.category,
      title: boards.title,
      fileUrls: boards.fileUrls,
      getBoardDone: boards.getBoardDone,
      loadBoardsDone: boards.loadBoardsDone,
      loadBoardsError: boards.loadBoardsError,
    }),
  );
  //not user Event handler
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) router.push('/auth/login');
  }, []);

  useEffect(() => {
    dispatch(
      boardsActions.changeBoardsField({
        content: getBoardDone.content,
        category: 'DISCUSSION',
        title: getBoardDone.title,
        fileUrls,
      }),
    );
    if (category === 'DISCUSSION') {
      dispatch(localActions.gotoComDiscussion());
    }
  }, [getBoardDone, category]);

  // title event
  const handleChangeCreateBoardsField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      dispatch(
        boardsActions.changeBoardsField({
          content,
          category,
          title: value,
          fileUrls,
        }),
      );
    }
  };

  //editor event
  const handleChangeContent = (val: string) => {
    dispatch(
      boardsActions.changeBoardsField({
        content: val,
        category,
        title,
        fileUrls,
      }),
    );
  };

  //submit
  const handleUpdateBoards = () => {
    if (!category) {
      setModalOpen(true);
      setModalMessage('게시판을 선택해주세요');
      setModalErr(true);
      return;
    } else if (!title) {
      setModalOpen(true);
      setModalMessage('제목을 입력해주세요');
      setModalErr(true);
      return;
    } else if (!content || content === '<p><br></p>') {
      setModalOpen(true);
      setModalMessage('내용을 입력해주세요');
      setModalErr(true);
      return;
    }
    dispatch(
      boardsActions.updateBoard({
        boardId,
        content,
        category,
        title,
        fileUrls,
      }),
    );
  };

  useEffect(() => {
    if (loadBoardsError) {
      setModalOpen(true);
      setModalMessage(loadBoardsError);
      setModalErr(true);
      return;
    }
    if (loadBoardsDone) {
      if (loadBoardsDone.message === 'UPDATED') {
        router.push(`/community/board/${boardId}`);
      }
    }
  }, [loadBoardsDone, loadBoardsError]);

  //modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalErr, setModalErr] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <UserLayout>
      <CommunityWriteLayout>
        <CommunityEditor
          handleChangeCreateBoardsField={handleChangeCreateBoardsField}
          handleChangeContent={handleChangeContent}
          handleCreateBoards={handleUpdateBoards}
        />
      </CommunityWriteLayout>
      <Modal open={modalOpen} close={handleCloseModal} message={modalMessage} error={modalErr} />
    </UserLayout>
  );
};

export default CommunityModify;
