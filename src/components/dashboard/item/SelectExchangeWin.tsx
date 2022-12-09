import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import { SelectExchangeModalType } from '@/src/interfaces/iCommon/iModal';
import Image from 'next/image';
import { BYBIT } from '@/src/assets/Images';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';

const SelectExchangeWin = ({ open, onClose }: SelectExchangeModalType) => {
  SwiperCore.use([Navigation, Pagination]);
  const { allExchangeResult } = useSelector(({ exchange }: RootState) => ({
    allExchangeResult: exchange.allExchangeResult,
  }));
  return (
    <SelectExchangeWinBlock open={open} onClose={onClose}>
      <SelectExchangeWinCon>
        <Swiper
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          slidesPerView={5}
          spaceBetween={12}
          className="mySwiper"
          breakpoints={{ 768: { slidesPerView: 5 }, 1200: { slidesPerView: 5 } }}
        >
          {allExchangeResult &&
            allExchangeResult.map((exc) => (
              <SwiperSlide key={exc.id}>
                <div className="exchange_item">
                  <div className="thumbnail">
                    <Image src={BYBIT} alt="exchange" />
                  </div>
                  <div className="alias">{exc.alias}</div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </SelectExchangeWinCon>
    </SelectExchangeWinBlock>
  );
};
const SelectExchangeWinBlock = styled(Dialog)`
  .MuiPaper-root {
    width: 100%;
    max-width: 332px;
    border: 1px solid rgba(112, 112, 112, 0.8);
    border-radius: 14px;
    position: relative;
    padding: 11px;
    margin: 0;
    background-color: ${colors.gray[0]};
  }

  ${media.tablet} {
    .MuiPaper-root {
      width: calc(100% - 32px);
      height: auto;
      padding: 8px;
    }
  }
  ${media.mobile} {
  }
`;
const SelectExchangeWinCon = styled(DialogContent)`
  &.MuiDialogContent-root {
    padding: 0;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .swiper {
      width: 100%;
      padding-bottom: 30px;
      .swiper-pagination {
        bottom: 0;
        height: 1.7rem;
        .swiper-pagination-bullet {
          background: none;
          border: 1px solid ${colors.gray[5]};
          opacity: 1;
          &.swiper-pagination-bullet-active {
            background-color: ${colors.gray[5]};
          }
        }
      }
    }
    .exchange_item {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      .thumbnail {
        width: 38px;
        height: 38px;
        position: relative;
      }
      .alias {
        font-size: 14px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    ${media.tablet} {
    }
  }
`;

export default SelectExchangeWin;
