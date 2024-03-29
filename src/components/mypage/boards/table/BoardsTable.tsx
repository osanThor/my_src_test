import colors from '@/src/assets/Colors';
import { CheckedSqquare, CheckSquare } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Moment from 'react-moment';
import Pagination from '@/src/components/common/Pagination';
import Button from '@/src/components/common/Button';
import NoBoards from '@/src/components/common/NoBoards';
import { useRouter } from 'next/router';

const BoardsTable = () => {
  const router = useRouter();
  const { getUserBoardsDone, page } = useSelector(({ boards }: RootState) => ({
    getUserBoardsDone: boards.getUserBoardsDone,
    page: boards.page,
  }));
  const { total } = getUserBoardsDone;

  return (
    <>
      {total != 0 ? (
        <>
          <BoardsTableBlock>
            <div className="thead">
              <div className="th">
                <div className="td">
                  <span className="spacer" />
                </div>
                <div className="td">번호</div>
                <div className="td title">제목</div>
                <div className="td">조회수</div>
                <div className="td">작성일</div>
              </div>
            </div>
            <div className="tbody">
              {getUserBoardsDone.boards.map((board) => (
                <div className="tr" key={board.id}>
                  <div className="td">
                    <label>
                      <input type="checkbox" />
                      <span />
                    </label>
                  </div>
                  <div className="td">{board.id}</div>
                  <div className="td title dark_gray pointer" onClick={() => router.push(`/board/${board.id}`)}>
                    <span className="tit">{board.title}</span> <span className="comments">{board._count.comments}</span>
                  </div>
                  <div className="td">
                    <span className="ver_m">조회수</span>
                    {board.hits}
                  </div>
                  <div className="td">
                    <Moment format="YYYY.MM.DD">{board.createdAt}</Moment>
                  </div>
                </div>
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
      <label>
        <input type="checkbox" />
        <span className="checkbox" />
        <span className="txt">전체선택</span>
      </label>
      <Pagination page={page} total={total} />
      <Button disabled>삭제하기</Button>
    </MyBoardBottomBlock>
  );
};

const MyBoardBottomBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  label {
    cursor: pointer;
    display: flex;
    padding-left: 1rem;
    align-items: center;
    input {
      display: none;
    }

    span.checkbox {
      display: inline-block;
      width: 24px;
      height: 24px;
      background: url(${CheckSquare.src}) no-repeat 50% / cover;
      margin-right: 8px;
    }
    span.txt {
      font-size: 14px;
      color: ${colors.gray[5]};
      transform: translateY(2px);
    }
    input:checked + span.checkbox {
      background: url(${CheckedSqquare.src}) no-repeat 50% / cover;
    }
    input:checked + span.txt {
      color: ${colors.blue[2]};
    }
  }

  button {
    min-height: auto;
    height: 36px;
    padding: 0 1rem;
    border-radius: 8px;
  }

  ${media.tablet} {
    flex-wrap: wrap;
    padding: 0;
    label {
      padding-left: 8px;
    }
    .pagination {
      width: 100%;
      order: 2;
      justify-content: center;
      margin-top: 12px;
    }
    button {
      order: 1;
    }
  }
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
      max-width: 64px;
      .spacer {
        min-width: 24px;
      }
    }
    &:nth-child(2) {
      width: 20%;
      max-width: 112px;
    }
    &:nth-child(3) {
      width: 100%;
      max-width: 1103px;
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
      border-bottom: 1px solid ${colors.gray[2]};
      .td {
        padding: 20px 16px;

        label {
          cursor: pointer;
          span {
            width: 24px;
            height: 24px;
            display: block;
            background: url(${CheckSquare.src}) no-repeat 50% / cover;
          }

          input:checked + span {
            background: url(${CheckedSqquare.src}) no-repeat 50% / cover;
          }
        }
        input {
          display: none;
        }
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
        width: 40px;
        max-width: none;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      &:nth-child(2) {
        width: auto;
        max-width: none;
        margin-right: 16px;
        display: none;
      }
      &:nth-child(3) {
        width: 100%;
        max-width: none;
        margin-bottom: 4px;
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
        border-bottom: 1px solid ${colors.gray[2]};
        position: relative;
        padding-left: 40px;
        .td {
          padding: 0;
        }
      }
    }
  }
`;

export default BoardsTable;
