import CommentsLayout from '@/src/components/common/boards/Comments/CommentsLayout';
import FuncModal from '@/src/components/common/FuncModal';
import Modal from '@/src/components/common/Modal';
import BoardContents from '@/src/components/community/detail/BoardContents';
import BoardDetailLayout from '@/src/components/community/detail/BoardDetailLayout';
import BoardTop from '@/src/components/community/detail/BoardTop';
import UserLayout from '@/src/components/layout/UserLayout';
import { RootState } from '@/src/store/configureStore';
import { boardsActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const CommunityBoard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [boardIdSt, setBoardIdSt] = useState(0);

  const { loadAuthLoading, loadAuthDone } = useSelector(({ auth }: RootState) => ({
    loadAuthLoading: auth.loadAuthLoading,
    loadAuthDone: auth.loadAuthDone,
  }));

  const { nickname } = useSelector(({ user }: RootState) => ({
    nickname: user.nickname,
  }));
  const { boardId, getBoardDone, commentId, isCollect, isLike, loadBoardsDone, loadBoardsError } = useSelector(
    ({ boards }: RootState) => ({
      boardId: boards.boardId,
      getBoardDone: boards.getBoardDone,
      commentId: boards.commentId,
      isCollect: boards.isCollect,
      isLike: boards.isLike,
      loadBoardsDone: boards.loadBoardsDone,
      loadBoardsError: boards.loadBoardsError,
    }),
  );
  //not user
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) router.push('/');
  }, []);

  // api request once
  const [once, setOnce] = useState(false);
  useEffect(() => {
    setOnce(false);
  }, [router]);

  useEffect(() => {
    if (!loadAuthLoading) {
      if (loadAuthDone) {
        if (loadAuthDone.accessToken) {
          setOnce(true);
        }
      }
    }
  }, [loadAuthLoading, loadAuthDone]);

  //reset
  useEffect(() => {
    dispatch(boardsActions.initializeBoardsForm());
  }, [router]);

  // local baordId
  const { bId } = router.query;
  useEffect(() => {
    setOnce(false);
    if (bId) {
      setBoardIdSt(parseInt(bId as string));
    }
  }, [bId]);

  useEffect(() => {
    if (once) {
      if (boardIdSt != 0) {
        dispatch(boardsActions.getBoard({ boardId: boardIdSt }));
      }
    }
  }, [once]);

  const { user } = getBoardDone;
  const [identity, setIdentity] = useState(false);
  useEffect(() => {
    if (user) {
      if (nickname === user.nickname) {
        setIdentity(true);
      }
    }
  }, [nickname, user]);

  const [fModalOpen, setFModalOpen] = useState(false);
  const [fModalMessage, setFModalMessage] = useState('');
  const handleFunctionModalClose = () => {
    setFModalOpen(false);
    dispatch(boardsActions.changeCommentId({ commentId: 0 }));
  };
  const handleOpenDeleteBoard = () => {
    setFModalOpen(true);
    setFModalMessage('게시글을 삭제할까요?');
  };

  const handleDleteBoard = () => {
    dispatch(boardsActions.deleteBoard({ boardId }));
  };
  const [isComment, setIsComment] = useState(false);
  const handleOpenDleteComment = () => {
    setFModalOpen(true);
    setFModalMessage('댓글을 삭제할까요?');
    setIsComment(true);
  };
  const handleDleteComment = () => {
    dispatch(boardsActions.deleteComment({ commentId }));
  };

  useEffect(() => {
    if (loadBoardsError) {
      alert(loadBoardsError);
      return;
    }

    if (loadBoardsDone) {
      if (loadBoardsDone.message === 'DELETED') {
        handleFunctionModalClose();
        dispatch(boardsActions.getBoard({ boardId }));
        if (isComment) {
        } else {
          router.push('/community?category=discussion');
        }
      } else if (loadBoardsDone.message === 'CREATED') {
        dispatch(boardsActions.getBoard({ boardId }));
        dispatch(boardsActions.initialCommentState());
      } else if (loadBoardsDone.message === 'UPDATED') {
        dispatch(boardsActions.getBoard({ boardId }));
        dispatch(boardsActions.initialCommentState());
        dispatch(boardsActions.changeCommentId({ commentId: 0 }));
      }
    }
  }, [loadBoardsDone, loadBoardsError]);

  // collection
  const handleSetBoardCollection = () => {
    dispatch(boardsActions.setBoardCollection({ boardId, isCollect: true }));
  };
  // like
  const handleSetBoardLike = () => {
    dispatch(boardsActions.setBoardLike({ boardId, isLike: !isLike }));
  };

  const copyURL = () => {
    let currentUrl = window.document.location.href;
    let t = document.createElement('textarea');
    document.body.appendChild(t);
    t.value = currentUrl;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);

    setModalOpen(true);
    setModalMessage('링크가 복사되었습니다.');
    setModalError(false);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalError, setModalError] = useState(false);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <UserLayout>
        <BoardDetailLayout>
          <BoardTop copyURL={copyURL} handleSetBoardCollection={handleSetBoardCollection} />
          <BoardContents
            identity={identity}
            handleOpenDeleteBoard={handleOpenDeleteBoard}
            handleSetBoardLike={handleSetBoardLike}
          />
          <CommentsLayout handleOpenDleteComment={handleOpenDleteComment} />
        </BoardDetailLayout>
      </UserLayout>
      <FuncModal
        open={fModalOpen}
        onClose={handleFunctionModalClose}
        message={{
          title: fModalMessage,
          description: '',
          btnTxt: '삭제하기',
        }}
        dubBtn={true}
        onClick={isComment ? handleDleteComment : handleDleteBoard}
        onClick2={handleFunctionModalClose}
      />
      <Modal open={modalOpen} close={handleModalClose} message={modalMessage} error={modalError} />
    </>
  );
};

export default CommunityBoard;
