import colors from '@/src/assets/Colors';
import { Arrow } from '@/src/assets/Images';
import { boardsActions } from '@/src/store/reducers';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Pagination = ({ total, page }: { total: number; page: number }) => {
  const dispatch = useDispatch();
  // const numPages = Math.ceil(total / 10);
  const numPages = 17;
  const [currPage, setCurrPage] = useState(page);
  let firstNum = currPage - (currPage % 5) + 1;
  let lastNum = currPage - (currPage % 5) + 5;
  let lastCurr = Math.ceil(total / 5) * 5;
  console.log(lastCurr);

  console.log({ 'currPage is': currPage, 'firsNum is': firstNum, 'lastNum is': lastNum, 'page is': page });

  return (
    <PaginationBlock className="pagination">
      <div className="prev_btns">
        <div
          className={page === 1 ? 'btn disabled' : 'btn'}
          onClick={() => {
            dispatch(boardsActions.changePage({ page: 1 }));
            setCurrPage(1);
          }}
        >
          <Image src={Arrow[1]} alt="arrow" />
        </div>
        <div
          className={page === 1 ? 'btn disabled' : 'btn'}
          onClick={() => {
            dispatch(boardsActions.changePage({ page: page - 1 }));
            setCurrPage(page - 2);
          }}
        >
          <Image src={Arrow[0]} alt="arrow" />
        </div>
      </div>
      <div className="numbers">
        <div
          className={page === firstNum ? 'num on' : 'num'}
          onClick={() => dispatch(boardsActions.changePage({ page: firstNum }))}
        >
          {firstNum}
        </div>

        {Array(numPages)
          .fill(0, 0, 4)
          .map((_, i) => {
            if (i <= 2) {
              return (
                <div
                  key={i + 1}
                  className={page === firstNum + 1 + i ? 'num on' : 'num'}
                  onClick={() => dispatch(boardsActions.changePage({ page: firstNum + 1 + i }))}
                >
                  {firstNum + 1 + i}
                </div>
              );
            } else if (i >= 3) {
              return (
                <div
                  key={i + 1}
                  className={page === lastNum ? 'num on' : 'num'}
                  onClick={() => dispatch(boardsActions.changePage({ page: lastNum }))}
                >
                  {lastNum}
                </div>
              );
            }
          })}
      </div>
      <div className="next_btns">
        <div
          className={page === numPages ? 'btn disabled' : 'btn'}
          onClick={() => {
            dispatch(boardsActions.changePage({ page: page + 1 }));
            setCurrPage(page);
          }}
        >
          <Image src={Arrow[0]} alt="arrow" />
        </div>
        <div
          className={page === numPages ? 'btn disabled' : 'btn'}
          onClick={() => {
            dispatch(boardsActions.changePage({ page: numPages }));
            setCurrPage(lastCurr);
          }}
        >
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
    &.disabled {
      pointer-events: none;
      cursor: not-allowed;
    }
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
