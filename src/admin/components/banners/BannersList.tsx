import colors from '@/src/assets/Colors';
import Pagination from '@/src/components/common/Pagination';
import { RootState } from '@/src/store/configureStore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const BannersList = () => {
  const router = useRouter();
  const { getBannersResult, page } = useSelector(({ adminBanners }: RootState) => ({
    getBannersResult: adminBanners.getBannersResult,
    page: adminBanners.page,
  }));
  // const { total } = getBannersResult;
  return (
    <BannersListBlock>
      <div className="user_list_header">
        <div className="th">
          <div className="td">NO</div>
          <div className="td">썸네일 이미지(PC)</div>
          <div className="td">노출 여부</div>
          <div className="td">노출 위치</div>
          <div className="td">등록일</div>
        </div>
      </div>
      <div className="user_list">
        {getBannersResult?.map((banner) => (
          <div
            className="tr"
            key={banner.id}
            onClick={() => router.push(`/admin/banners/banner?id=${banner.id}&edit=true`)}
          >
            <div className="td">{banner.id}</div>
            <div className="td profile">배너이미지</div>
            <div className="td">{banner.isVisiblePc ? '노출' : '미노출'}</div>
            <div className="td">{banner.position}</div>
            <div className="td">
              <Moment format="YYYY.MM.DD">{banner.createdAt}</Moment>
            </div>
          </div>
        ))}
      </div>
      <div className="bottom">{/* <Pagination total={total} page={page} /> */}</div>
    </BannersListBlock>
  );
};
const BannersListBlock = styled.div`
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
      &.profile {
        display: flex;
        .profile_Image {
          width: 56px;
          min-width: 56px;
          height: 56px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          margin-right: 1rem;
          border: 1px solid ${colors.gray[1]};
        }
        .profile_info {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
      }
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

export default BannersList;
