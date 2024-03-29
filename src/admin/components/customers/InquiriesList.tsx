import colors from '@/src/assets/Colors';
import Pagination from '@/src/components/common/Pagination';
import { RootState } from '@/src/store/configureStore';
import { useRouter } from 'next/router';
import React from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const InquiriesList = () => {
  const router = useRouter();
  const { getInquiriesResult, page } = useSelector(({ adminCustomers }: RootState) => ({
    getInquiriesResult: adminCustomers.getInquiriesResult,
    page: adminCustomers.page,
  }));
  const { total } = getInquiriesResult;
  return (
    <InquiriesListBlock>
      <div className="user_list_header">
        <div className="th">
          <div className="td">NO</div>
          <div className="td">문의내용</div>
          <div className="td">전략가</div>
          <div className="td">이메일</div>
          <div className="td">상태</div>
          <div className="td">등록일</div>
        </div>
      </div>
      <div className="user_list">
        {getInquiriesResult?.inquiries?.map((inquiry) => (
          <div
            className="tr"
            key={inquiry.id}
            onClick={() => router.push(`/admin/customers/inquiry?id=${inquiry.id}&edit=true`)}
          >
            <div className="td">{inquiry.id}</div>
            <div className="td">{inquiry.title}</div>
            <div className="td">{inquiry?.user?.nickname}</div>
            <div className="td">{inquiry?.user?.email}</div>
            <div className="td">{inquiry?.answer ? '답변' : '대기'}</div>
            <div className="td">
              <Moment format="YYYY.MM.DD">{inquiry?.createdAt}</Moment>
            </div>
          </div>
        ))}
      </div>
      <div className="bottom">
        <Pagination total={total} page={page} />
      </div>
    </InquiriesListBlock>
  );
};
const InquiriesListBlock = styled.div`
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
      overflow: hidden;
      text-overflow: ellipsis;
      justify-content: flex-start;
      padding-left: 2rem;
    }
    &:nth-child(3) {
      width: 20%;
      max-width: 250px;
    }
    &:nth-child(4) {
      width: 20%;
      max-width: 250px;
    }
    &:nth-child(5) {
      width: 20%;
      max-width: 250px;
    }
    &:last-child {
      width: 20%;
      max-width: 450px;
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

export default InquiriesList;
