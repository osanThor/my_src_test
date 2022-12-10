import BoardContents from '@/src/components/board/detail/BoardContents';
import BoardTop from '@/src/components/board/detail/BoardTop';
import CommentsLayout from '@/src/components/common/boards/Comments/CommentsLayout';
import FuncModal from '@/src/components/common/modals/FuncModal';
import { RootState } from '@/src/store/configureStore';
import { boardsActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const BoardDiscussionPage = ({
  copyURL,
  handleSetBoardCollection,
  identity,
  handleSetBoardLike,
}: {
  copyURL: () => void;
  handleSetBoardCollection: () => void;
  identity: boolean;
  handleSetBoardLike: () => void;
}) => {
  const router = useRouter();
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

  // function modal(delete board, commetn modal )
  const [fModalOpen, setFModalOpen] = useState(false);
  const [fModalMessage, setFModalMessage] = useState('');
  const handleFunctionModalClose = () => {
    setFModalOpen(false);
    dispatch(boardsActions.changeCommentId({ commentId: 0 }));
  };
  // open delete baord
  const handleOpenDeleteBoard = () => {
    setFModalOpen(true);
    setFModalMessage('게시글을 삭제할까요?');
  };
  // delete baord
  const handleDleteBoard = () => {
    dispatch(boardsActions.deleteBoard({ boardId }));
  };
  // delete comment state
  const [isComment, setIsComment] = useState(false);

  // open delete comment
  const handleOpenDleteComment = () => {
    setFModalOpen(true);
    setFModalMessage('댓글을 삭제할까요?');
    setIsComment(true);
  };
  // delete comment
  const handleDleteComment = () => {
    dispatch(boardsActions.deleteComment({ commentId }));
  };
  //event handler
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

  return (
    <>
      <BoardTop copyURL={copyURL} handleSetBoardCollection={handleSetBoardCollection} />
      <BoardContents
        identity={identity}
        handleOpenDeleteBoard={handleOpenDeleteBoard}
        handleSetBoardLike={handleSetBoardLike}
      />
      <CommentsLayout handleOpenDleteComment={handleOpenDleteComment} />
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
    </>
  );
};

export default BoardDiscussionPage;
