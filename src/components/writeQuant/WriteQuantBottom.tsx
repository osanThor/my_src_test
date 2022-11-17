import colors from '@/src/assets/Colors';
import { ArrowRight } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Basic from './writeQuantProccess/Basic';

const WriteQuantBottom = () => {
  return (
    <WriteQuantBottomBlock>
      <div className="write_quant_botTop">
        <div className="title">주문작성</div>
        <div className="write_quant_menu">
          <div className="button on">
            <span>기본정보</span>
          </div>
          <div className="arrow">
            <Image src={ArrowRight} alt="arrow" />
          </div>
          <div className="button">
            <span>주문정보</span>
          </div>
          <div className="arrow">
            <Image src={ArrowRight} alt="arrow" />
          </div>
          <div className="button">
            <span>수량정보</span>
          </div>
          <div className="arrow">
            <Image src={ArrowRight} alt="arrow" />
          </div>
          <div className="button">
            <span>옵션선택</span>
          </div>
        </div>
      </div>
      <Basic />
    </WriteQuantBottomBlock>
  );
};

const WriteQuantBottomBlock = styled.div`
  width: 100%;

  .write_quant_botTop {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .title {
      font-size: 20px;
      font-family: 'GmarketSansBold';
    }
    .write_quant_menu {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .button {
        cursor: pointer;
        flex: 1;
        text-align: center;
        padding: 8px 20px;
        border-radius: 20px;
        background-color: ${colors.gray[1]};
        color: ${colors.gray[5]};
        transition: all 0.2s;
        span {
          transform: translateY(2px);
        }
        &:hover {
          background-color: ${colors.gray[2]};
        }

        &.on {
          background-color: ${colors.blue[2]};
          color: white;
          &:hover {
            background-color: ${colors.blue[1]};
          }
        }
      }
      .arrow {
        min-width: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 8px;
        position: relative;
      }
    }
  }

  .intro_box {
    width: 100%;
    background-color: ${colors.gray[1]};
    border-radius: 8px;
    height: 54px;
    display: flex;
    padding: 0 24px;
    align-items: center;
    margin-bottom: 40px;
    .intro_title {
      display: flex;
      align-items: center;
      margin-right: 1rem;
      .mark {
        width: 18px;
        height: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin-right: 8px;
      }
      span.txt {
        transform: translateY(2px);
      }
    }
    .description {
      transform: translateY(2px);
      color: ${colors.gray[4]};
    }
  }

  //responsive
  ${media.pc} {
    .write_quant_botTop {
      flex-wrap: wrap;
    }
  }

  ${media.tablet} {
    .write_quant_botTop {
      display: none;
    }
    .intro_box {
      padding: 12px;
      height: auto;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 20px;
    }
  }
`;

export default WriteQuantBottom;
