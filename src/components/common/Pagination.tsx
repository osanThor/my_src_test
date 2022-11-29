import colors from '@/src/assets/Colors';
import { Arrow } from '@/src/assets/Images';
import { boardsActions } from '@/src/store/reducers';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Pagination = ({ total, page }: { total: number; page: number }) => {
  const dispatch = useDispatch();
  const numPages = Math.ceil(total / 10);
  console.log(numPages);
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
        {Array<number>(numPages)
          .fill(0)
          .map((_, i) => (
            <div
              key={i + 1}
              className={page === i + 1 ? 'num on' : 'num'}
              onClick={() => dispatch(boardsActions.changePage({ page: i + 1 }))}
            >
              {i + 1}
            </div>
          ))}
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
      .btn {
        display: flex;
      }
      .btn:first-child {
        display: none;
      }
    }
    .next_btns {
      .btn {
        display: flex;
      }
      .btn:last-child {
        display: none;
      }
    }
  }
`;

export default Pagination;
