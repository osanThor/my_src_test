import colors from '@/src/assets/Colors';
import { CheckedSqquare, CheckSquare, Notice } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { boardsActions } from '@/src/store/reducers';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Pagination from '../../common/Pagination';

interface ICommunity {
  id: number;
  title: string;
  hits: number;
  createdAt: string;
  deletedAt: string;
  user: {
    nickname: string;
  };
  _count: {
    comments: number;
  };
}

const CommissionList = ({
  handleSelectRefCommission,
}: {
  handleSelectRefCommission: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const dispatch = useDispatch();
  const { nickname } = useSelector(({ user }: RootState) => ({
    nickname: user.nickname,
  }));
  const { loadGetComissionDone, page } = useSelector(({ boards }: RootState) => ({
    loadGetComissionDone: boards.loadGetComissionDone,
    page: boards.page,
  }));

  const { total } = loadGetComissionDone;
  useEffect(() => {
    if (nickname) {
      dispatch(boardsActions.getBoards({ category: 'COMMISSION', page, user: nickname, title: '', comment: '' }));
    }
  }, [nickname, page]);

  return (
    <CommissionListBlock>
      <div className="comTop">
        나의 개발전략의뢰 리스트
        <span className="notice">
          <div className="icon">
            <Image src={Notice[0]} alt="notice" />
          </div>
          이전 개발의뢰와 함께 보여주고 싶다면 체크해주세요!
        </span>
      </div>
      <div className="listCon">
        <div className="commissions">
          {loadGetComissionDone?.boards?.map((com) => (
            <CommissionListItem key={com.id} com={com} handleSelectRefCommission={handleSelectRefCommission} />
          ))}
        </div>
        <Pagination total={total} page={page} />
      </div>
    </CommissionListBlock>
  );
};
const CommissionListItem = ({
  com,
  handleSelectRefCommission,
}: {
  com: ICommunity;
  handleSelectRefCommission: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="item">
      <label className="checkbox">
        <input type="radio" name="refBoardId" value={com?.id} onChange={handleSelectRefCommission} />
        <span className="check" />
        <div className="title">{com.title}</div>
        <Moment className="time" format="YYYY.MM.DD">
          {com.createdAt}
        </Moment>
      </label>
    </div>
  );
};

const CommissionListBlock = styled.div`
  width: 100%;
  margin-bottom: 48px;
  .comTop {
    width: 100%;
    padding: 7px 0;
    color: ${colors.gray[5]};
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    word-break: keep-all;
    white-space: nowrap;
    .notice {
      height: 20px;
      display: flex;
      font-size: 12px;
      color: ${colors.gray[3]};
      margin-left: 7px;
      .icon {
        margin-right: 4px;
      }
    }
  }
  .listCon {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid ${colors.gray[2]};
    padding: 7px 12px;
    border-radius: 4px;
    .commissions {
      width: 100%;
      max-width: 600px;
      max-height: 200px;
      overflow-y: auto;
      border-radius: 4px;
      padding: 4px 1rem;
      margin-bottom: 20px;
    }
  }

  .item {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }

    label {
      width: 100%;
      cursor: pointer;
      display: flex;
      align-items: center;
      input {
        display: none;
      }
      span.check {
        display: inline-block;
        width: 24px;
        margin-right: 8px;
        min-width: 24px;
        height: 24px;
        background: url(${CheckSquare.src}) no-repeat 50% / cover;
      }

      input:checked + span.check {
        background: url(${CheckedSqquare.src}) no-repeat 50% / cover;
      }
      .title {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      time {
        font-size: 12px;
        color: ${colors.gray[4]};
      }
    }
  }

  ${media.tablet} {
    .comTop {
      flex-wrap: wrap;
    }
    .listCon {
      max-width: none;
      .commissions {
        max-width: none;
      }
    }
  }
  ${media.mobile} {
    .comTop {
      flex-direction: column;
    }
  }
`;

export default CommissionList;
