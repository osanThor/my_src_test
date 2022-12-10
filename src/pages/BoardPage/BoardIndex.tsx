import BoardDetailLayout from '@/src/components/board/detail/BoardDetailLayout';
import Modal from '@/src/components/common/modals/Modal';
import UserLayout from '@/src/components/layout/UserLayout';
import { RootState } from '@/src/store/configureStore';
import { boardsActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import BoardDiscussionPage from './BoardDiscussionPage';

const BoardIndex = () => {
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

  const { boardId, getBoardDone, isCollect, isLike } = useSelector(({ boards }: RootState) => ({
    boardId: boards.boardId,
    getBoardDone: boards.getBoardDone,
    isCollect: boards.isCollect,
    isLike: boards.isLike,
  }));

  //not user Event handler
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) router.push('/auth/login');
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
  // get board
  useEffect(() => {
    if (once) {
      if (boardIdSt != 0) {
        dispatch(boardsActions.getBoard({ boardId: boardIdSt }));
      }
    }
  }, [once]);

  //** board detail router */
  const { category } = getBoardDone;
  useEffect(() => {
    if (!router.query.state) {
      if (category === 'DISCUSSION') {
        router.replace(`/board/${boardId}?state=community&category=DISCUSSION`);
      }
    }
  }, [router, category]);
  //** !--board detail router */

  // writer check
  const { user } = getBoardDone;
  const [identity, setIdentity] = useState(false);
  useEffect(() => {
    if (user) {
      if (nickname === user.nickname) {
        setIdentity(true);
      }
    }
  }, [nickname, user]);

  // collection, likes
  const { collectors, likes } = getBoardDone;
  //collection
  useEffect(() => {
    if (collectors && likes) {
      if (collectors.length != 0) {
        dispatch(boardsActions.isCollectors());
      }
      if (likes.length != 0) {
        dispatch(boardsActions.isLikes());
      }
    }
  }, [collectors, likes]);
  const handleSetBoardCollection = () => {
    dispatch(boardsActions.setBoardCollection({ boardId, isCollect: !isCollect }));
  };
  // like
  const handleSetBoardLike = () => {
    dispatch(boardsActions.setBoardLike({ boardId, isLike: !isLike }));
  };
  // copy url
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
          {router.query.category === 'DISCUSSION' && (
            <BoardDiscussionPage
              identity={identity}
              handleSetBoardLike={handleSetBoardLike}
              copyURL={copyURL}
              handleSetBoardCollection={handleSetBoardCollection}
            />
          )}
        </BoardDetailLayout>
      </UserLayout>
      <Modal open={modalOpen} close={handleModalClose} message={modalMessage} error={modalError} />
    </>
  );
};

export default BoardIndex;
