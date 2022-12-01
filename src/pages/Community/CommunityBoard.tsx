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
  const { boardId, getBoardDone } = useSelector(({ boards }: RootState) => ({
    boardId: boards.boardId,
    getBoardDone: boards.getBoardDone,
  }));

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) router.push('/');
  }, []);

  useEffect(() => {
    dispatch(boardsActions.initializeBoardsForm());
  }, [router]);

  const { bId } = router.query;

  useEffect(() => {
    if (bId) {
      setBoardIdSt(parseInt(bId as string));
    }
  }, [bId]);
  console.log(boardId);
  console.log(boardIdSt);
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

  return (
    <UserLayout>
      <BoardDetailLayout>
        <BoardTop />
        <BoardContents />
      </BoardDetailLayout>
    </UserLayout>
  );
};

export default CommunityBoard;
