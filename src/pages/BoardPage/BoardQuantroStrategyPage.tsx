import StrategistBox from '@/src/components/board/strategy/StrategistBox';
import StrategyCon from '@/src/components/board/strategy/StrategyCon';
import { RootState } from '@/src/store/configureStore';
import { boardsActions } from '@/src/store/reducers';
import router from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BoardQuantroStrategyPage = ({
  handleSetBoardLike,
  handleSetBoardCollection,
}: {
  handleSetBoardLike: () => void;
  handleSetBoardCollection: () => void;
}) => {
  const dispatch = useDispatch();

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

  //event handler
  useEffect(() => {
    if (loadBoardsError) {
      alert(loadBoardsError);
      return;
    }

    if (loadBoardsDone) {
      if (loadBoardsDone.message === 'DELETED') {
        dispatch(boardsActions.getBoard({ boardId }));
      } else if (loadBoardsDone.message === 'CREATED') {
        dispatch(boardsActions.getBoard({ boardId }));
      } else if (loadBoardsDone.message === 'UPDATED') {
        dispatch(boardsActions.getBoard({ boardId }));
      }
    }
  }, [loadBoardsDone, loadBoardsError]);
  return (
    <>
      <StrategistBox handleSetBoardLike={handleSetBoardLike} handleSetBoardCollection={handleSetBoardCollection} />
      <StrategyCon />
    </>
  );
};

export default BoardQuantroStrategyPage;
