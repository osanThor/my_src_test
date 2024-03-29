import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import { boardsActions } from '@/src/store/reducers';
import { media } from '@/styles/theme';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CommentEditor from './CommentEditor';
import CommentsList from './CommentsList';
import DummyEditor from './DummyEditor';

const CommentsLayout = ({ handleOpenDleteComment }: { handleOpenDleteComment: () => void }) => {
  const dispatch = useDispatch();
  const { getBoardDone, parentCommentId, commentId } = useSelector(({ boards }: RootState) => ({
    getBoardDone: boards.getBoardDone,
    parentCommentId: boards.parentCommentId,
    commentId: boards.commentId,
  }));
  const handleChangeParentsIdZero = () => {
    dispatch(boardsActions.initialCommentState());
    dispatch(boardsActions.changeCommentId({ commentId: 0 }));
    dispatch(boardsActions.changeParentCommentId({ parentCommentId: 0 }));
  };

  const [isAddComment, setIsAddComment] = useState(true);
  useEffect(() => {
    if (parentCommentId === 0 && commentId === 0) {
      setIsAddComment(true);
    } else {
      setIsAddComment(false);
    }
  }, [commentId, parentCommentId]);

  return (
    <CommentsLayoutBlock>
      <span className="board_spacer" />
      <div className="comments_area">
        <div className="comments_title">댓글</div>
        {getBoardDone?.comments.length !== 0 && <CommentsList handleOpenDleteComment={handleOpenDleteComment} />}
        {isAddComment ? <CommentEditor /> : <DummyEditor onClick={handleChangeParentsIdZero} />}
      </div>
    </CommentsLayoutBlock>
  );
};

const CommentsLayoutBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .board_spacer {
    min-width: 84px;
  }
  .comments_area {
    flex: 1;
    max-width: 1420px;
    .comments_title {
      padding: 12px 83px;
      margin-bottom: 24px;
      border-bottom: 1px solid ${colors.gray[2]};
      font-family: 'GmarketSansBold';
      color: ${colors.gray[5]};
    }
    .comments_Editor {
      width: 100%;
      padding: 20px 24px;
      background-color: ${colors.gray[0]};
      border-radius: 8px;
      .nickname {
        font-family: 'GmarketSansBold';
        color: ${colors.gray[5]};
        margin-bottom: 8px;
      }
    }
    .photo_area {
      .file_list {
        width: 100%;
        display: flex;
        margin-bottom: 8px;
        .file {
          width: 56px;
          height: 56px;
          position: relative;
          .delete_file_btn {
            cursor: pointer;
            width: 16px;
            height: 16px;
            position: absolute;
            top: 4px;
            right: 4px;
            background-color: rgba(0, 0, 0, 0.7);
            border-radius: 50%;
            z-index: 7;
            padding: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .bottom_btns {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          width: 24px;
          height: 24px;
          input {
            display: none;
          }
        }
        .comment_btns {
          display: flex;
          .btn {
            cursor: pointer;
            color: ${colors.gray[4]};
            transition: all 0.2s;
            margin-left: 1rem;
            &:first-child {
              margin-left: 0;
            }
            &:hover {
              color: ${colors.dark[1]};
            }
          }
        }
      }
    }
  }

  ${media.tablet} {
    .board_spacer {
      display: none;
    }
    .comments_area {
      .comments_title {
        padding: 12px 64px;
      }
    }
  }
`;

export default CommentsLayout;
