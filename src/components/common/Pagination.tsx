import colors from '@/src/assets/Colors';
import { Arrow } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const Pagination = () => {
  return (
    <PaginationBlock className="pagination">
      <div className="prev_btns">
        <div className="btn">
          <Image src={Arrow[1]} alt="arrow" />
        </div>
        <div className="btn">
          <Image src={Arrow[0]} alt="arrow" />
        </div>
      </div>
      <div className="numbers">
        <div className="num on">1</div>
        <div className="num">2</div>
        <div className="num">3</div>
        <div className="num">4</div>
        <div className="num">5</div>
      </div>
      <div className="next_btns">
        <div className="btn">
          <Image src={Arrow[0]} alt="arrow" />
        </div>
        <div className="btn">
          <Image src={Arrow[1]} alt="arrow" />
        </div>
      </div>
    </PaginationBlock>
  );
};

const PaginationBlock = styled.div`
  display: flex;
  & > div {
    display: flex;
  }
  .btn {
    width: 24px;
    height: 24px;
    border: 1px solid ${colors.gray[3]};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .numbers {
    margin: 0 20px;
    font-size: 14px;
    .num {
      cursor: pointer;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${colors.gray[4]};
      transition: all 0.2s;

      &:hover {
        color: ${colors.gray[5]};
      }

      &.on {
        color: ${colors.dark[1]};
      }
    }
  }

  .next_btns {
    .btn {
      transform: rotate(180deg);
    }
  }

  ${media.tablet} {
    .prev_btns {
      .btn:first-child {
        display: none;
      }
    }
    .next_btns {
      .btn:last-child {
        display: none;
      }
    }
  }
`;

export default Pagination;
