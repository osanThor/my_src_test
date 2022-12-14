import colors from '@/src/assets/Colors';
import Pagination from '@/src/components/common/Pagination';
import { RootState } from '@/src/store/configureStore';
import { useRouter } from 'next/router';
import React from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StrategiesList = () => {
  const router = useRouter();
  const { page } = useSelector(({ adminStrategies }: RootState) => ({
    page: adminStrategies.page,
  }));
  return (
    <StrategiesListBlock>
      <div className="user_list_header">
        <div className="th">
          <div className="td">NO</div>
          <div className="td">제목</div>
          <div className="td">전략가</div>
          <div className="td">이메일</div>
          <div className="td">게시판</div>
          <div className="td">상태</div>
          <div className="td">등록일</div>
        </div>
      </div>
      <div className="user_list">
        <div className="tr" onClick={() => router.push(`/admin/users/user?email=edit=true`)}>
          <div className="td"></div>
          <div className="td profile"></div>
          <div className="td"></div>
          <div className="td"></div>
          <div className="td"></div>
          <div className="td"></div>
          <div className="td">
            <Moment format="YYYY.MM.DD"></Moment>
          </div>
        </div>
      </div>
      <div className="bottom">
        <Pagination total={100} page={page} />
      </div>
    </StrategiesListBlock>
  );
};
const StrategiesListBlock = styled.div`
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

export default StrategiesList;
