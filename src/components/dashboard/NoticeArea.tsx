import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import styled from 'styled-components';
import React from 'react';
import colors from '@/src/assets/Colors';
import Link from 'next/link';
import { media } from '@/styles/theme';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import Moment from 'react-moment';

const NoticeArea = () => {
  SwiperCore.use([Navigation, Pagination]);
  const { loadGetNoticeDone } = useSelector(({ boards }: RootState) => ({
    loadGetNoticeDone: boards.loadGetNoticeDone,
  }));
  return (
    <NoticeAreaBlock>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        className="mySwiper"
        breakpoints={{ 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
      >
        {loadGetNoticeDone.boards.slice(0, 9).map((notice) => (
          <SwiperSlide key={notice.id}>
            <Link href={`/board/${notice.id}`}>
              <div className="notice_item">
                <div className="notice_num">
                  <Moment format="DD">{notice.createdAt}</Moment>
                  <span>/</span>
                  <Moment format="MM">{notice.createdAt}</Moment>
                </div>
                <div className="notice_title">{notice.title}</div>
                <span>NEW</span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </NoticeAreaBlock>
  );
};
const NoticeAreaBlock = styled.div`
  width: 100%;
  margin-bottom: 40px;

  .notice_item {
    cursor: pointer;
    max-width: 500px;
    padding: 12px 40px;
    background-color: ${colors.gray[1]};
    border-radius: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s;

    .notice_num {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: white;
      display: flex;
      position: relative;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
      font-size: 12px;
      span {
        position: absolute;
        top: 50%;
        left: 55%;
        transform: translateY(-30%);
      }
      time {
        font-weight: bold;
        position: absolute;
        &:first-child {
          left: 2px;
          font-size: 13px;
        }

        &:last-child {
          right: 1px;
          bottom: 1px;
          font-size: 10px;
        }
      }
    }
    .notice_title {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 20px;
      transform: translateY(2px);
    }
    span {
      font-family: 'GmarketSansBold';
      transform: translateY(2px);
      font-weight: 800;
      color: ${colors.red[1]};
    }

    &:hover {
      background-color: ${colors.gray[2]};
    }
  }

  ${media.tablet} {
    .notice_item {
      max-width: none;
      padding: 8px;
      .notice_num {
        width: 24px;
        height: 24px;
        margin-right: 8px;
        span {
          display: none;
        }
        time {
          &:first-child {
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          &:last-child {
            display: none;
          }
        }
      }
      .notice_title {
        margin-right: 8px;
      }
      span {
        font-size: 12px;
      }
    }
  }
`;

export default NoticeArea;
