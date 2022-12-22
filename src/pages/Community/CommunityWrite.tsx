import Modal from '@/src/components/common/modals/Modal';
import CommunityWriteLayout from '@/src/components/community/CommunityWriteLayout';
import CommunityEditor from '@/src/components/community/Editor/CommunityEditor';
import UserLayout from '@/src/components/layout/UserLayout';
import { RootState } from '@/src/store/configureStore';
import { boardsActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const CommunityWrite: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { communityDiscussion, communityCommission } = useSelector(({ local }: RootState) => ({
    communityDiscussion: local.communityDiscussion,
    communityCommission: local.communityCommission,
  }));
  const { content, category, title, fileUrls, refBoardId, loadBoardsDone, loadBoardsError } = useSelector(
    ({ boards }: RootState) => ({
      content: boards.content,
      category: boards.category,
      title: boards.title,
      fileUrls: boards.fileUrls,
      refBoardId: boards.refBoardId,
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
    dispatch(boardsActions.initializeBoardsForm());
  }, [dispatch]);

  useEffect(() => {
    if (communityDiscussion) {
      dispatch(
        boardsActions.changeBoardsField({
          content,
          category: 'DISCUSSION',
          title,
          fileUrls,
        }),
      );
    } else if (communityCommission) {
      dispatch(
        boardsActions.changeCreateCommissionField({
          content,
          category: 'COMMISSION',
          title,
          fileUrls,
          refBoardId,
        }),
      );
    } else {
      dispatch(
        boardsActions.changeBoardsField({
          content,
          category: '',
          title,
          fileUrls,
        }),
      );
    }
  }, [communityDiscussion, communityCommission]);

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

  //refCommissionBoard
  const handleSelectRefCommission = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'refBoardId') {
      dispatch(
        boardsActions.changeCreateCommissionField({
          content,
          category: 'COMMISSION',
          title,
          fileUrls,
          refBoardId: Number(value),
        }),
      );
    }
  };

  //submit
  const handleCreateBoards = () => {
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
    if (communityDiscussion) {
      dispatch(
        boardsActions.createBoards({
          content,
          category,
          title,
          fileUrls,
        }),
      );
    } else if (communityCommission) {
      dispatch(
        boardsActions.CreateCommissionField({
          content,
          category,
          title,
          fileUrls,
          refBoardId,
        }),
      );
    }
  };

  useEffect(() => {
    if (loadBoardsError) {
      setModalOpen(true);
      setModalMessage(loadBoardsError);
      setModalErr(true);
      return;
    }
    if (loadBoardsDone) {
      if (loadBoardsDone.message === 'CREATED') {
        router.push('/community?category=discussion');
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
          handleCreateBoards={handleCreateBoards}
          handleSelectRefCommission={handleSelectRefCommission}
        />
      </CommunityWriteLayout>
      <Modal open={modalOpen} close={handleCloseModal} message={modalMessage} error={modalErr} />
    </UserLayout>
  );
};

export default CommunityWrite;
