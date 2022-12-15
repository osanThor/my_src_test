import colors from '@/src/assets/Colors';
import Pagination from '@/src/components/common/Pagination';
import { RootState } from '@/src/store/configureStore';
import { useRouter } from 'next/router';
import React from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const BoardsList = () => {
  const router = useRouter();
  const { page, getAdminAllBoardsResult } = useSelector(({ adminBoards }: RootState) => ({
    page: adminBoards.page,
    getAdminAllBoardsResult: adminBoards.getAdminAllBoardsResult,
  }));
  const { total } = getAdminAllBoardsResult;
  return (
    <BoardsListBlock>
      <div className="user_list_header">
        <div className="th">
          <div className="td">NO</div>
          <div className="td">제목</div>
          <div className="td">전략가</div>
          <div className="td">이메일</div>
          <div className="td">게시판</div>
          <div className="td">조회수</div>
          <div className="td">등록일</div>
        </div>
      </div>
      <div className="user_list">
        {getAdminAllBoardsResult?.boards?.map((boards) => (
          <div
            className="tr"
            key={boards?.id}
            onClick={() => router.push(`/admin/boards/board?id=${boards.id}&category=${boards.category}&edit=true`)}
          >
            <div className="td">{boards?.id}</div>
            <div className="td">{boards?.title}</div>
            <div className="td">{boards?.user?.nickname}</div>
            <div className="td">{boards?.user?.email}</div>
            <div className="td">
              {boards.category === 'CERTIFIED_STRATEGY' && '인증전략'}
              {boards.category === 'USER_STRATEGY' && '사용자전략'}
              {boards.category === 'COMMISSION' && '전략개발의뢰'}
              {boards.category === 'DISCUSSION' && '전략토론'}
              {boards.category === 'NOTICE' && '공지'}
              {boards.category === 'QUANTRO_STRATEGY' && '공개전략'}
              {boards.category === 'QUANTRO_INDICATOR' && '공개지표'}
            </div>
            <div className="td">{boards.hits}</div>
            <div className="td">
              <Moment format="YYYY.MM.DD">{boards.createdAt}</Moment>
            </div>
          </div>
        ))}
      </div>
      <div className="bottom">
        <Pagination total={total} page={page} />
      </div>
    </BoardsListBlock>
  );
};
const BoardsListBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .td {
    padding: 8px 1rem;
    margin-right: 8px;
    text-align: center;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    &:first-child {
      width: 10%;
      max-width: 120px;
    }
    &:nth-child(2) {
      flex: 1;
      width: 100%;
      max-width: 500px;
    }
    &:nth-child(3) {
      width: 20%;
      max-width: 150px;
    }
    &:nth-child(4) {
      width: 20%;
      max-width: 250px;
    }
    &:nth-child(5) {
      width: 10%;
      max-width: 150px;
    }
    &:nth-child(6) {
      width: 10%;
      max-width: 150px;
    }
    &:last-child {
      width: 20%;
      max-width: 350px;
      margin-right: 0;
    }
  }

  .user_list_header {
    width: 100%;
    margin-bottom: 8px;
    .th {
      width: 100%;
      display: flex;
      font-size: 12px;
      .td {
        background: ${colors.gray[1]};
        border: 1px solid ${colors.gray[3]};
        border-radius: 8px;
      }
    }
  }
  .user_list {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    .tr {
      cursor: pointer;
      width: 100%;
      display: flex;
      border-bottom: 1px solid ${colors.gray[2]};
      padding: 4px 0;
      font-size: 14px;
      color: ${colors.gray[5]};
    }
  }
  .bottom {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export default BoardsList;
