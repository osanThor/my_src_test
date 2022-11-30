import BoardDetail from '@/src/components/community/detail/BoardDetail';
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

  useEffect(() => {
    if (boardIdSt != 0) {
      console.log('야 되냐');
      dispatch(boardsActions.getBoard({ boardId: boardIdSt }));
    }
  }, [boardId, boardIdSt, dispatch]);

  return (
    <UserLayout>
      <BoardDetail />
    </UserLayout>
  );
};

export default CommunityBoard;
