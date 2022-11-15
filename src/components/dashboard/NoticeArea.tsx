import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import styled from 'styled-components';
import React from 'react';
import colors from '@/src/assets/Colors';
import Link from 'next/link';
import { media } from '@/styles/theme';

const NoticeArea = () => {
  SwiperCore.use([Navigation, Pagination]);
  return (
    <NoticeAreaBlock>
      <Swiper slidesPerView={1} spaceBetween={20} className="mySwiper" breakpoints={{ 768: { slidesPerView: 3 } }}>
        <SwiperSlide>
          <Link href="/">
            <div className="notice_item">
              <div className="notice_num"></div>
              <div className="notice_title">파트너십 체결: Dune Analytics</div>
              <span>NEW</span>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/">
            <div className="notice_item">
              <div className="notice_num"></div>
              <div className="notice_title">파트너십 체결: Dune Analytics Analytics Analytics</div>
              <span>NEW</span>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/">
            <div className="notice_item">
              <div className="notice_num"></div>
              <div className="notice_title">파트너십 체결: Dune Analytics Analytics Analytics</div>
              <span>NEW</span>
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </NoticeAreaBlock>
  );
};
const NoticeAreaBlock = styled.div`
  width: 100%;

  .notice_item {
    cursor: pointer;
    max-width: 500px;
    padding: 12px 40px;
    background-color: ${colors.gray[1]};
    border-radius: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .notice_num {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: ${colors.gray[3]};
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
    }
    .notice_title {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transform: translateY(2px);
      margin-right: 20px;
    }
    span {
      font-family: 'GmarketSansBold';
      transform: translateY(2px);
      color: ${colors.red[1]};
    }
  }

  ${media.tablet} {
    .notice_item {
      max-width: none;
    }
  }
`;

export default NoticeArea;
