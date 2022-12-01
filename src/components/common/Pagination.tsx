import colors from '@/src/assets/Colors';
import { Arrow } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Pagination = ({ total, page }: { total: number; page: number }) => {
  const router = useRouter();
  const limit = 5;
  const numPages = Math.ceil(total / 10);

  const [currentPageArray, setCurrentPageArray] = useState([]);
  const [totalPageArray, setTotalPageArray] = useState([]);
  useEffect(() => {
    if (page % limit === 1) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
    } else if (page % limit === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
    }
  }, [page, totalPageArray]);
  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(numPages, limit);
    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0]);
  }, [numPages]);

  const sliceArrayByLimit = (numPages: number, limit: number) => {
    const totalPageArray = Array(numPages)
      .fill(0)
      .map((_, i) => i);
    return Array(Math.ceil(numPages / limit))
      .fill(0)
      .map(() => totalPageArray.splice(0, limit));
  };

  useEffect(() => {
    if (page % limit === 1) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
    } else if (page % limit === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
    } else {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
    }
  }, [page, totalPageArray]);

  return (
    <PaginationBlock className="pagination">
      <div className="prev_btns">
        <div
          className={page === 1 ? 'btn disabled' : 'btn'}
          onClick={() => {
            router.replace({ query: { ...router.query, page: 1 } });
          }}
        >
          <Image src={Arrow[1]} alt="arrow" />
        </div>
        <div
          className={page === 1 ? 'btn disabled' : 'btn'}
          onClick={() => {
            router.replace({ query: { ...router.query, page: page - 1 } });
          }}
        >
          <Image src={Arrow[0]} alt="arrow" />
        </div>
      </div>
      <div className="numbers">
        {currentPageArray?.map((i) => (
          <div
            key={i + 1}
            className={page === i + 1 ? 'num on' : 'num'}
            onClick={
              () => {
                router.replace({ query: { ...router.query, page: i + 1 } });
              }
              // dispatch(boardsActions.changePage({ page: i + 1 }))
            }
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className="next_btns">
        <div
          className={page === numPages ? 'btn disabled' : 'btn'}
          onClick={() => {
            router.replace({ query: { ...router.query, page: page + 1 } });
          }}
        >
          <Image src={Arrow[0]} alt="arrow" />
        </div>
        <div
          className={page === numPages ? 'btn disabled' : 'btn'}
          onClick={() => {
            router.replace({ query: { ...router.query, page: numPages } });
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
