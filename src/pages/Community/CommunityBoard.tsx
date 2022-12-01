import CommentsLayout from '@/src/components/common/boards/Comments/CommentsLayout';
import FuncModal from '@/src/components/common/FuncModal';
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

  const { loadAuthDone } = useSelector(({ auth }: RootState) => ({
    loadAuthDone: auth.loadAuthDone,
  }));

  const { nickname } = useSelector(({ user }: RootState) => ({
    nickname: user.nickname,
  }));
  const { boardId, getBoardDone, loadBoardsDone, loadBoardsError } = useSelector(({ boards }: RootState) => ({
    boardId: boards.boardId,
    getBoardDone: boards.getBoardDone,
    loadBoardsDone: boards.loadBoardsDone,
    loadBoardsError: boards.loadBoardsError,
  }));
  //not user
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) router.push('/');
  }, []);
  //reset
  useEffect(() => {
    dispatch(boardsActions.initializeBoardsForm());
  }, [router]);

  // local baordId
  const { bId } = router.query;
  useEffect(() => {
    if (bId) {
      setBoardIdSt(parseInt(bId as string));
    }
  }, [bId]);

  // api request once
  const [once, setOnce] = useState(false);
  useEffect(() => {
    if (loadAuthDone.accessToken) {
      setOnce(true);
    }
  }, [loadAuthDone]);

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
    if (nickname === user.nickname) {
      setIdentity(true);
    }
  }, [nickname, user]);

  const [fModalOpen, setFModalOpen] = useState(false);
  const [fModalMessage, setFModalMessage] = useState('');
  const handleFunctionModalClose = () => {
    setFModalOpen(false);
  };
  const handleOpenDeleteBoard = () => {
    setFModalOpen(true);
    setFModalMessage('게시글을 삭제할까요?');
  };

  useEffect(() => {
    if (loadBoardsError) {
      alert(loadBoardsError);
      return;
    }

    if (loadBoardsDone) {
      if (loadBoardsDone.message === 'DELETED') {
        router.push('/community?category=discussion');
      }
    }
  }, [loadBoardsDone, loadBoardsError]);

  const copyURL = () => {
    let currentUrl = window.document.location.href;
    let t = document.createElement('textarea');
    document.body.appendChild(t);
    t.value = currentUrl;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);

    alert('링크가 복사되었습니다.');
  };

  return (
    <>
      <UserLayout>
        <BoardDetailLayout>
          <BoardTop />
          <BoardContents identity={identity} handleOpenDeleteBoard={handleOpenDeleteBoard} />
          <CommentsLayout />
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
        onClick={() => dispatch(boardsActions.deleteBoard({ boardId }))}
        onClick2={handleFunctionModalClose}
      />
    </>
  );
};

export default CommunityBoard;
