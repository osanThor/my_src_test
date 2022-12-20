import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Moment from 'react-moment';
import Pagination from '@/src/components/common/Pagination';
import NoBoards from '@/src/components/common/NoBoards';
import Image from 'next/image';
import { CommentLine } from '@/src/assets/Images';
import { useRouter } from 'next/router';

const MyCommentsTable = () => {
  const router = useRouter();
  // const { communityDiscussion, communityNotice } = useSelector(({ local }: RootState) => ({
  //   communityDiscussion: local.communityDiscussion,
  //   communityNotice: local.communityNotice,
  // }));
  const { page, getUserCommentsDone } = useSelector(({ boards }: RootState) => ({
    page: boards.page,
    getUserCommentsDone: boards.getUserCommentsDone,
  }));
  const { total } = getUserCommentsDone;
  return (
    <>
      {total != 0 ? (
        <>
          <BoardsTableBlock>
            <div className="thead">
              <div className="th">
                <div className="td">번호</div>
                <div className="td title">제목</div>
                <div className="td dark_gray">작성자</div>
                <div className="td">조회수</div>
                <div className="td">작성일</div>
              </div>
            </div>
            <div className="tbody">
              {getUserCommentsDone.comments.map((board) => (
                <React.Fragment key={board.id}>
                  <div className="tr">
                    <div className="td">{board.id}</div>
                    <div className="td title dark_gray pointer" onClick={() => router.push(`/board/${board.board.id}`)}>
                      <span className="tit">{board.board.title}</span>
                      <span className="comments">{board.board._count.comments}</span>
                    </div>
                    <div className="td dark_gray pointer">{(board.board.user && board.board.user.nickname) || ''}</div>
                    <div className="td">
                      <span className="ver_m">조회수</span>
                      {board.board.hits}
                    </div>
                    <div className="td">
                      <Moment format="YYYY.MM.DD">{board.board.createdAt}</Moment>
                    </div>
                  </div>
                  <div className="comment_area">
                    <span className="comment_spacer" />
                    <div className="comment_content">
                      <div className="icon">
                        <Image src={CommentLine} alt="icon" />
                      </div>
                      {board.content}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </BoardsTableBlock>
          <MyBoardBottom page={page} total={total} />
        </>
      ) : (
        <NoBoards />
      )}
    </>
  );
};

const MyBoardBottom = ({ page, total }: { page: number; total: number }) => {
  return (
    <MyBoardBottomBlock>
      <Pagination total={total} page={page} />
    </MyBoardBottomBlock>
  );
};

const MyBoardBottomBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardsTableBlock = styled.div`
  width: 100%;
  margin-bottom: 20px;
  .ver_m {
    display: none;
  }
  .td {
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colors.gray[4]};
    transition: all 0.2s;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:nth-child(1) {
      width: 20%;
      max-width: 112px;
    }
    &:nth-child(2) {
      width: 100%;
      max-width: 1000px;
    }
    &:nth-child(3) {
      width: 30%;
      max-width: 160px;
    }
    &:nth-child(4) {
      width: 30%;
      max-width: 96px;
      order: 1;
    }
    &:nth-child(5) {
      width: 30%;
      max-width: 136px;
      order: 2;
    }

    &.dark_gray {
      color: ${colors.gray[5]};
    }
    &.title {
      justify-content: flex-start;
      span.comments {
        margin-left: 8px;
        color: ${colors.blue[2]};
      }
    }
    span.tit {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &.pointer {
      cursor: pointer;
      &:hover {
        color: ${colors.dark[0]};
      }
    }
  }

  .thead {
    width: 100%;
    background-color: ${colors.gray[0]};
    border-top: 1px solid ${colors.gray[4]};
    .th {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .td {
        padding: 18px 16px;
      }
    }
  }

  .tbody {
    width: 100%;
    .tr {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      .td {
        padding: 20px 16px;
      }
    }
  }
  .comment_area {
    width: 100%;
    border-bottom: 1px solid ${colors.gray[2]};
    display: flex;
    padding: 20px 16px;
    span.comment_spacer {
      width: 20%;
      max-width: 112px;
    }
    .comment_content {
      width: 100%;
      max-width: 1000px;
      display: flex;
      align-items: center;
      flex: 1;
      font-size: 14px;
      text-overflow: ellipsis;
      color: ${colors.gray[5]};
      .icon {
        position: relative;
        margin-right: 8px;
      }
    }
  }
  ${media.tablet} {
    .ver_m {
      display: inline-block;
      margin-right: 8px;
    }
    .td {
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${colors.gray[4]};
      transition: all 0.2s;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:nth-child(1) {
        width: 20%;
        display: none;
        max-width: none;
      }
      &:nth-child(2) {
        width: 100%;
        max-width: none;
        margin-bottom: 4px;
      }
      &:nth-child(3) {
        width: auto;
        max-width: none;
        margin-right: 16px;
      }
      &:nth-child(4) {
        width: auto;
        max-width: none;
        order: 2;
      }
      &:nth-child(5) {
        width: auto;
        max-width: none;
        order: 1;
        margin-right: 16px;
      }
    }
    .thead {
      display: none;
    }
    .tbody {
      width: 100%;
      .tr {
        width: 100%;
        height: auto;
        padding: 12px 0;
        flex-wrap: wrap;
        justify-content: flex-start;
        .td {
          padding: 0;
        }
      }
    }
    .comment_area {
      width: 100%;
      display: flex;
      padding: 0;
      padding-bottom: 8px;
      span.comment_spacer {
        display: none;
      }
      .comment_content {
        width: 100%;
        max-width: 1000px;
        display: flex;
        align-items: center;
        flex: 1;
        font-size: 14px;
        text-overflow: ellipsis;
        color: ${colors.gray[5]};
        .icon {
          position: relative;
          margin-right: 8px;
        }
      }
    }
  }
`;

export default MyCommentsTable;
