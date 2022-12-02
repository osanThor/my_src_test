import colors from '@/src/assets/Colors';
import { MoreInfoIcon, Profile1 } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Moment from 'react-moment';

const CommentsList = () => {
  const { getBoardDone } = useSelector(({ boards }: RootState) => ({
    getBoardDone: boards.getBoardDone,
  }));
  console.log(getBoardDone);
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
    childComment: [];
    content: string;
    createdAt: string;
    id: number;
    user: {
      nickname: string;
    };
  };
}) => {
  const { getBoardDone } = useSelector(({ boards }: RootState) => ({
    getBoardDone: boards.getBoardDone,
  }));
  const { childComment, content, createdAt, id, user } = cm;
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
          <div className="btn add_comment">답글쓰기</div>
          <div className="btn more_info">
            <Image src={MoreInfoIcon} alt="moreInfo" />
          </div>
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
