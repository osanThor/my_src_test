import colors from '@/src/assets/Colors';
import { MoreInfoIcon, Profile1 } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Moment from 'react-moment';
import CommentEditor from './CommentEditor';
import { media } from '@/styles/theme';
import { useDispatch } from 'react-redux';
import { boardsActions } from '@/src/store/reducers';
import UpdateCommentEditor from './UpdateCommentEditor';

const CommentsList = ({ handleOpenDleteComment }: { handleOpenDleteComment: () => void }) => {
  const { getBoardDone } = useSelector(({ boards }: RootState) => ({
    getBoardDone: boards.getBoardDone,
  }));
  const { comments } = getBoardDone;
  return (
    <CommentsListBlock>
      {comments.map((cm) => (
        <CommentItem key={cm.id} cm={cm} handleOpenDleteComment={handleOpenDleteComment} />
      ))}
    </CommentsListBlock>
  );
};

const CommentItem = ({
  cm,
  handleOpenDleteComment,
}: {
  cm: {
    childComment:
      | Array<{
          content: string;
          createdAt: string;
          id: number;
          user: { nickname: string };
        }>
      | [];
    content: string;
    createdAt: string;
    id: number;
    user: {
      nickname: string;
    };
  };
  handleOpenDleteComment: () => void;
}) => {
  const dispatch = useDispatch();
  //state
  const { nickname } = useSelector(({ user }: RootState) => ({
    nickname: user.nickname,
  }));
  const { getBoardDone, parentCommentId, commentId } = useSelector(({ boards }: RootState) => ({
    getBoardDone: boards.getBoardDone,
    parentCommentId: boards.parentCommentId,
    commentId: boards.commentId,
  }));
  const [addComment, setAddComment] = useState(false);
  const [childCommentUpdate, setChildCommentUpdate] = useState(false);
  const { childComment, content, createdAt, id, user } = cm;

  // 답글 쓰기 버튼 클릭 시 해당 comment id와 parentCommentId 비교
  const handleChangeParentsId = () => {
    dispatch(boardsActions.initialCommentState());
    if (parentCommentId === id && commentId === 0) {
      dispatch(boardsActions.changeParentCommentId({ parentCommentId: 0 }));
      setAddComment(false);
    } else {
      dispatch(boardsActions.changeParentCommentId({ parentCommentId: id }));
      dispatch(boardsActions.changeCommentId({ commentId: 0 }));
      setChildCommentUpdate(false);
      setAddComment(true);
    }
  };

  useEffect(() => {
    if (parentCommentId != id || commentId != 0) {
      setAddComment(false);
    } else {
      setAddComment(true);
    }
  }, [parentCommentId, commentId]);

  //update comment
  const [updateSt, setUpdateSt] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);
  const handleOpenUpdateCommentArea = () => {
    dispatch(boardsActions.changeCommentId({ commentId: id }));
    dispatch(boardsActions.changeParentCommentId({ parentCommentId: 0 }));
    dispatch(boardsActions.updateCommentSt({ commentId: id, content, parentCommentId: 0 }));
    setAddComment(false);
    setUpdateSt(true);
  };

  useEffect(() => {
    if (updateSt && commentId === id) {
      setUpdateComment(true);
    } else {
      setUpdateComment(false);
    }
  }, [commentId, updateSt]);

  //delte comment open
  const handleOpenDlete = () => {
    handleOpenDleteComment();
    dispatch(boardsActions.changeCommentId({ commentId: id }));

    // update comment와 충돌 방지
    setUpdateSt(false);
  };
  //ctrl buttons modal
  const [isMoCntrl, setIsMoCtrl] = useState(false);
  const MoCtrlRef = useRef<HTMLDivElement>(null);
  const MoCtrlButtonRef = useRef<HTMLDivElement>(null);
  const handleMoCtrlWin = () => {
    setIsMoCtrl(!isMoCntrl);
  };

  const handleClickOutSide = (e: any) => {
    if (isMoCntrl && !MoCtrlRef.current.contains(e.target)) {
      if (!MoCtrlButtonRef.current.contains(e.target)) {
        handleMoCtrlWin();
      }
    }
  };

  useEffect(() => {
    if (isMoCntrl) document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });

  return (
    <CommentItemBlock className="item">
      <div className="parent_comment" style={{ marginBottom: updateComment && '16px' }}>
        <div className="profile">
          <div className="profile_image">
            <Image src={Profile1[1]} alt="profile" layout="fill" />
          </div>
          <div className="profile_info">
            <div className={getBoardDone.user.nickname === user.nickname ? 'nickname on' : 'nickname'}>
              {user ? user.nickname : '닉네임없음'}
            </div>
            <Moment format="YYYY.MM.DD HH.MM" className="Moment">
              {createdAt}
            </Moment>
          </div>
        </div>
        <div className="comment_content">{content}</div>
        <div className="comment_btns">
          <div className="btn add_comment" onClick={handleChangeParentsId}>
            답글쓰기
          </div>
          {nickname === user.nickname && (
            <div className="btn more_info" ref={MoCtrlButtonRef} onClick={handleMoCtrlWin}>
              <Image src={MoreInfoIcon[0]} alt="moreInfo" />
              {isMoCntrl && (
                <div className="board_mo_ctrl" ref={MoCtrlRef}>
                  <div className="button" onClick={handleOpenUpdateCommentArea}>
                    수정하기
                  </div>
                  <div className="button" onClick={handleOpenDlete}>
                    삭제하기
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {updateComment && <UpdateCommentEditor />}
      <div className="children_comments">
        <span className="comments_spacer" />
        <div className="comments_con">
          {childComment.map((child) => (
            <ChlidrenItem
              key={child.id}
              child={child}
              handleOpenDleteComment={handleOpenDleteComment}
              parentId={id}
              setAddComment={setAddComment}
              setUpdateStParent={setUpdateSt}
              childCommentUpdate={childCommentUpdate}
              setChildCommentUpdate={setChildCommentUpdate}
            />
          ))}
          {addComment && <CommentEditor />}
        </div>
      </div>
    </CommentItemBlock>
  );
};
const ChlidrenItem = ({
  child,
  handleOpenDleteComment,
  parentId,
  setAddComment,
  setUpdateStParent,
  childCommentUpdate,
  setChildCommentUpdate,
}: {
  child: {
    content: string;
    createdAt: string;
    id: number;
    user: {
      nickname: string;
    };
  };
  handleOpenDleteComment: () => void;
  parentId: number | null;
  setAddComment: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateStParent: React.Dispatch<React.SetStateAction<boolean>>;
  childCommentUpdate: boolean;
  setChildCommentUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const { getBoardDone, parentCommentId, commentId } = useSelector(({ boards }: RootState) => ({
    getBoardDone: boards.getBoardDone,
    parentCommentId: boards.parentCommentId,
    commentId: boards.commentId,
  }));
  const { nickname } = useSelector(({ user }: RootState) => ({
    nickname: user.nickname,
  }));

  const { id, content } = child;

  //update comment
  const [updateComment, setUpdateComment] = useState(false);
  const handleOpenUpdateCommentArea = () => {
    dispatch(boardsActions.changeCommentId({ commentId: id }));
    dispatch(boardsActions.changeParentCommentId({ parentCommentId: parentId }));
    dispatch(boardsActions.updateCommentSt({ commentId: id, content, parentCommentId: parentId }));
    setAddComment(false);
    setUpdateStParent(false);
    setChildCommentUpdate(true);
  };

  useEffect(() => {
    if (childCommentUpdate && commentId === id) {
      setUpdateComment(true);
    } else {
      setUpdateComment(false);
    }
  }, [commentId, childCommentUpdate]);

  const handleOpenDelte = () => {
    handleOpenDleteComment();
    dispatch(boardsActions.changeCommentId({ commentId: child.id }));
    // update comment와 충돌 방지
    setChildCommentUpdate(false);
  };
  const [isMoChildCntrl, setIsMoChildCtrl] = useState(false);
  const MoChildCtrlRef = useRef<HTMLDivElement>(null);
  const MoChildCtrlButtonRef = useRef<HTMLDivElement>(null);
  const handleMoChildCtrlWin = () => {
    setIsMoChildCtrl(!isMoChildCntrl);
  };

  const handleClickOutSide = (e: any) => {
    if (isMoChildCntrl && !MoChildCtrlRef.current.contains(e.target)) {
      if (!MoChildCtrlButtonRef.current.contains(e.target)) {
        handleMoChildCtrlWin();
      }
    }
  };

  useEffect(() => {
    if (isMoChildCntrl) document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });
  return (
    <>
      <div className="parent_comment">
        <div className="profile">
          <div className="profile_image">
            <Image src={Profile1[1]} alt="profile" layout="fill" />
          </div>
          <div className="profile_info">
            <div className={getBoardDone.user.nickname === child.user.nickname ? 'nickname on' : 'nickname'}>
              {child.user ? child.user.nickname : '닉네임없음'}
            </div>
            <Moment format="YYYY.MM.DD HH.MM" className="Moment">
              {child.createdAt}
            </Moment>
          </div>
        </div>
        <div className="comment_content">{child.content}</div>
        <div className="comment_btns">
          {nickname === child.user.nickname && (
            <div className="btn more_info" ref={MoChildCtrlButtonRef} onClick={handleMoChildCtrlWin}>
              <Image src={MoreInfoIcon[0]} alt="moreInfo" />
              {isMoChildCntrl && (
                <div className="board_mo_ctrl" ref={MoChildCtrlRef}>
                  <div className="button" onClick={handleOpenUpdateCommentArea}>
                    수정하기
                  </div>
                  <div className="button" onClick={handleOpenDelte}>
                    삭제하기
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {updateComment && <UpdateCommentEditor />}
    </>
  );
};

const CommentItemBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .parent_comment {
    width: 100%;
    display: flex;
    align-items: flex-start;
    .profile {
      display: flex;
      align-items: center;
      .profile_image {
        width: 48px;
        height: 48px;
        min-width: 48px;
        position: relative;
        margin-right: 16px;
      }
      .profile_info {
        min-width: 135px;
        .nickname {
          font-family: 'GmarketSansBold';
          color: ${colors.gray[5]};
          &.on {
            color: ${colors.blue[2]};
          }
        }
        time {
          font-size: 12px;
          color: ${colors.gray[3]};
        }
      }
    }
    .comment_content {
      flex: 1;
      padding: 0 20px;
    }
    .comment_btns {
      display: flex;
      align-items: flex-start;
      .btn {
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
        color: ${colors.gray[4]};
        margin-left: 20px;
        position: relative;
        &:first {
          margin-left: 0;
        }
        &:hover {
          color: ${colors.gray[5]};
        }
        .board_mo_ctrl {
          position: absolute;
          top: 100%;
          right: 0;
          width: 88px;
          text-align: center;
          background-color: ${({ theme }) => theme.bgColor};
          box-shadow: ${({ theme }) => theme.boxShadow};
          border-radius: 8px;
          padding: 12px 6px;
          z-index: 7;
          .button {
            width: 100%;
            padding: 0;
            background-color: ${({ theme }) => theme.bgColor};
            &:first-child {
              margin-bottom: 4px;
            }
          }
        }
      }
    }
  }
  .children_comments {
    display: flex;

    .comments_spacer {
      min-width: 68px;
    }
    .comments_con {
      flex: 1;
      .parent_comment {
        margin-top: 16px;
        &:first-child {
        }
      }
      .comments_Editor {
        margin-top: 16px;
      }
    }
  }
  ${media.tablet} {
    .parent_comment {
      justify-content: space-between;
      flex-wrap: wrap;
      .profile {
        display: flex;
        align-items: center;
        .profile_image {
          width: 32px;
          height: 32px;
          min-width: 32px;
          position: relative;
          margin-right: 8px;
        }
        .profile_info {
          min-width: auto;
        }
      }
      .comment_content {
        width: 100%;
        flex: auto;
        order: 2;
        padding-left: 40px;
        margin-top: 8px;
      }
      .comment_btns {
        order: 1;
      }
    }
    .children_comments {
      .comments_spacer {
        min-width: 40px;
      }
    }
  }
`;

const CommentsListBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  & > div + div {
    margin-top: 40px;
  }
`;

export default CommentsList;
