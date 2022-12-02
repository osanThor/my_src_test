import colors from '@/src/assets/Colors';
import { MoreInfoIcon, Profile1 } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Moment from 'react-moment';
import CommentEditor from './CommentEditor';
import { media } from '@/styles/theme';
import { useDispatch } from 'react-redux';
import { boardsActions } from '@/src/store/reducers';

const CommentsList = () => {
  const { getBoardDone } = useSelector(({ boards }: RootState) => ({
    getBoardDone: boards.getBoardDone,
  }));
  const { comments } = getBoardDone;
  return (
    <CommentsListBlock>
      {comments.map((cm) => (
        <CommentItem key={cm.id} cm={cm} />
      ))}
    </CommentsListBlock>
  );
};

const CommentItem = ({
  cm,
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
}) => {
  const dispatch = useDispatch();
  const { nickname } = useSelector(({ user }: RootState) => ({
    nickname: user.nickname,
  }));
  const { getBoardDone, parentCommentId } = useSelector(({ boards }: RootState) => ({
    getBoardDone: boards.getBoardDone,
    parentCommentId: boards.parentCommentId,
  }));
  const [addComment, setAddComment] = useState(false);
  const { childComment, content, createdAt, id, user } = cm;
  const handleChangeParentsId = () => {
    dispatch(boardsActions.initialCommentState());
    if (parentCommentId === id) {
      dispatch(boardsActions.changeParentCommentId({ parentCommentId: 0 }));
      setAddComment(false);
    } else {
      dispatch(boardsActions.changeParentCommentId({ parentCommentId: id }));
      setAddComment(true);
    }
  };

  useEffect(() => {
    if (parentCommentId != id) {
      setAddComment(false);
    } else {
      setAddComment(true);
    }
  }, [parentCommentId]);
  return (
    <CommentItemBlock className="item">
      <div className="parent_comment">
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
          <div className="btn more_info">
            <Image src={MoreInfoIcon} alt="moreInfo" />
          </div>
        </div>
      </div>
      <div className="children_comments">
        <span className="comments_spacer" />
        <div className="comments_con">
          {childComment.map((chlid) => (
            <div className="parent_comment" key={chlid.id}>
              <div className="profile">
                <div className="profile_image">
                  <Image src={Profile1[1]} alt="profile" layout="fill" />
                </div>
                <div className="profile_info">
                  <div className={getBoardDone.user.nickname === chlid.user.nickname ? 'nickname on' : 'nickname'}>
                    {chlid.user ? chlid.user.nickname : '닉네임없음'}
                  </div>
                  <Moment format="YYYY.MM.DD HH.MM" className="Moment">
                    {chlid.createdAt}
                  </Moment>
                </div>
              </div>
              <div className="comment_content">{chlid.content}</div>
              <div className="comment_btns">
                {nickname === user.nickname && (
                  <div className="btn more_info">
                    <Image src={MoreInfoIcon} alt="moreInfo" />
                  </div>
                )}
              </div>
            </div>
          ))}
          {addComment && <CommentEditor />}
        </div>
      </div>
    </CommentItemBlock>
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
        &:first {
          margin-left: 0;
        }
        &:hover {
          color: ${colors.gray[5]};
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
