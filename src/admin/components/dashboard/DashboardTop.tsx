import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const DashboardTop = () => {
  const { getAllUserCountResult, getAllExchangeResult, getPackageResult } = useSelector(
    ({ adminDashBoards }: RootState) => ({
      getAllUserCountResult: adminDashBoards.getAllUserCountResult,
      getAllExchangeResult: adminDashBoards.getAllExchangeResult,
      getPackageResult: adminDashBoards.getPackageResult,
    }),
  );

  return (
    <DashboardTopBlock>
      <div className="item">
        <div className="title">총 가입자 수</div>
        <div className="content">
          <div className="count_form">
            <div className="count_label">총 가입자</div>
            {getAllUserCountResult && getAllUserCountResult.totalUserCount}
          </div>
          <div className="count_form">
            <div className="count_label">전월 대비</div>
            {getAllUserCountResult && getAllUserCountResult.comparedLastMonth}
          </div>
        </div>
      </div>
      <div className="item">
        <div className="title">거래소 등록자 수</div>
        <div className="content">
          <div className="count_form">
            <div className="count_label">총 거래소 등록자</div>
            {getAllExchangeResult && getAllExchangeResult.totalExchangeCount}
          </div>
          <div className="count_form">
            <div className="count_label">전월 대비</div>
            {getAllExchangeResult && getAllExchangeResult.comparedLastMonth}
          </div>
        </div>
      </div>
      <div className="item">
        <div className="title">패키지 등록자 수</div>
        <div className="content">
          <div className="count_form">
            <div className="count_label">베이직 패키지</div>
            {getPackageResult && getPackageResult.basicCount}
          </div>
          <div className="count_form">
            <div className="count_label">레귤러 패키지</div>
            {getPackageResult && getPackageResult.regularCount}
          </div>
          <div className="count_form">
            <div className="count_label">프리미엄 패키지</div>
            {getPackageResult && getPackageResult.premiumCount}
          </div>
        </div>
      </div>
    </DashboardTopBlock>
  );
};

const DashboardTopBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .item {
    width: 32%;
    background-color: white;
    padding: 1.5rem 2rem;
    border-radius: 14px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    .title {
      color: ${colors.gray[5]};
      margin-bottom: 1rem;
      font-family: 'GmarketSansBold';
    }
    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      .count_form {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        &:last-child {
          margin-bottom: 0;
        }
        .count_label {
          padding: 8px 1rem;
          border-radius: 14px;
          background-color: ${colors.blue[0]};
          margin-right: 1rem;
          color: ${colors.blue[2]};
        }
      }
    }
  }
`;

export default DashboardTop;
