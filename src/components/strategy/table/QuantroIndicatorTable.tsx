import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BoardsTableBottom from './BoardsTableBottom';
import Moment from 'react-moment';
import NoBoards from '../../common/NoBoards';
import { useRouter } from 'next/router';

const QuantroIndicatorTable = () => {
  const router = useRouter();
  const { communityDiscussion, communityNotice } = useSelector(({ local }: RootState) => ({
    communityDiscussion: local.communityDiscussion,
    communityNotice: local.communityNotice,
  }));
  const { loadGetQuantroIndicatorDone, getNoticesDone } = useSelector(({ boards }: RootState) => ({
    loadGetQuantroIndicatorDone: boards.loadGetQuantroIndicatorDone,
    getNoticesDone: boards.getNoticesDone,
  }));
  const { total } = loadGetQuantroIndicatorDone;
  const [isNotice, setIsNotice] = useState(false);
  useEffect(() => {
    if (communityNotice) {
      setIsNotice(true);
    } else if (communityDiscussion) {
      setIsNotice(false);
    }
  }, [loadGetQuantroIndicatorDone]);

  console.log(loadGetQuantroIndicatorDone);
  return (
    <>
      <BoardsTableBlock>
        <div className="thead">
          <div className="th">
            <div className="td">번호</div>
            <div className="td title">제목</div>
            <div className="td dark_gray">작성자</div>
            <div className="td">조회수</div>
            <div className="td">작성일</div>
          </div>
        </div>
        <div className="tbody">
          {getNoticesDone?.map((notice) => (
            <div className="tr notice" key={notice.board.id}>
              <div className="td">
                <NoticeCon />
              </div>
              <div
                className="td title dark_gray pointer"
                onClick={() => router.push(`/board/${notice.board.id}?state=community&category=NOTICE`)}
              >
                <span className="tit">{notice.board.title}</span>
                <span className="comments">{notice.board._count.comments}</span>
              </div>
              <div className="td dark_gray pointer">
                {(notice.board.user && notice.board.user.nickname) || '퀀트로'}
              </div>
              <div className="td">
                <span className="ver_m">조회수</span>
                {notice.board.hits}
              </div>
              <div className="td">
                <Moment format="YYYY.MM.DD">{notice.board.createdAt}</Moment>
              </div>
            </div>
          ))}
          {total != 0 ? (
            <>
              {loadGetQuantroIndicatorDone.boards.map((board) => (
                <div className="tr" key={board.id}>
                  <div className="td">{isNotice ? <NoticeCon /> : board.id}</div>
                  <div
                    className="td title dark_gray pointer"
                    onClick={() => router.push(`/board/${board.id}?state=strategy&category=QUANTRO_INDICATOR`)}
                  >
                    <span className="tit">{board.title}</span> <span className="comments">{board._count.comments}</span>
                  </div>
                  <div
                    className="td dark_gray pointer"
                    onClick={() => router.push(`/strategy/strategist?user=${board.user.nickname}&category=user`)}
                  >
                    {(board.user && board.user.nickname) || '퀀트로'}
                  </div>
                  <div className="td">
                    <span className="ver_m">조회수</span>
                    {board.hits}
                  </div>
                  <div className="td">
                    <Moment format="YYYY.MM.DD">{board.createdAt}</Moment>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <NoBoards />
          )}
        </div>
      </BoardsTableBlock>
      <BoardsTableBottom total={total} />
    </>
  );
};

const NoticeCon = () => {
  return <NoticeSpan>공지</NoticeSpan>;
};
const NoticeSpan = styled.span`
  background-color: ${colors.blue[0]};
  color: ${colors.blue[2]};
  padding: 4px 8px;
  border-radius: 16px;
`;

const BoardsTableBlock = styled.div`
  width: 100%;
  margin-bottom: 20px;
  .ver_m {
    display: none;
  }
  .td {
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colors.gray[4]};
    transition: all 0.2s;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:nth-child(1) {
      width: 20%;
      max-width: 112px;
    }
    &:nth-child(2) {
      width: 100%;
      max-width: 1000px;
    }
    &:nth-child(3) {
      width: 30%;
      max-width: 160px;
    }
    &:nth-child(4) {
      width: 30%;
      max-width: 96px;
      order: 1;
    }
    &:nth-child(5) {
      width: 30%;
      max-width: 136px;
      order: 2;
    }

    &.dark_gray {
      color: ${colors.gray[5]};
    }
    &.title {
      justify-content: flex-start;
      span.comments {
        margin-left: 8px;
        color: ${colors.blue[2]};
      }
    }
    span.tit {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &.pointer {
      cursor: pointer;
      &:hover {
        color: ${colors.dark[0]};
      }
    }
  }

  .thead {
    width: 100%;
    background-color: ${colors.gray[0]};
    border-top: 1px solid ${colors.gray[4]};
    .th {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .td {
        padding: 18px 16px;
      }
    }
  }

  .tbody {
    width: 100%;
    .tr {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid ${colors.gray[2]};
      .td {
        padding: 20px 16px;
      }
    }
  }

  ${media.tablet} {
    .ver_m {
      display: inline-block;
      margin-right: 8px;
    }
    .td {
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${colors.gray[4]};
      transition: all 0.2s;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:nth-child(1) {
        width: 20%;
        display: none;
        max-width: none;
      }
      &:nth-child(2) {
        width: 100%;
        max-width: none;
        margin-bottom: 4px;
      }
      &:nth-child(3) {
        width: auto;
        max-width: none;
        margin-right: 16px;
      }
      &:nth-child(4) {
        width: auto;
        max-width: none;
        order: 2;
      }
      &:nth-child(5) {
        width: auto;
        max-width: none;
        order: 1;
        margin-right: 16px;
      }
    }
    .thead {
      display: none;
    }
    .tbody {
      width: 100%;
      .tr {
        width: 100%;
        height: auto;
        padding: 12px 0;
        flex-wrap: wrap;
        justify-content: flex-start;
        border-bottom: 1px solid ${colors.gray[2]};
        .td {
          padding: 0;
        }
        &.notice {
          .td {
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: ${colors.gray[4]};
            transition: all 0.2s;
            white-space: nowrap;
            text-overflow: ellipsis;

            &:nth-child(1) {
              width: auto;
              width: 45px;
              max-width: none;
              justify-content: flex-start;
              margin-bottom: 4px;
            }
            &:nth-child(2) {
              width: calc(100% - 45px);
              max-width: none;
              margin-bottom: 4px;
              justify-content: flex-start;
            }
            &:nth-child(3) {
              width: auto;
              max-width: none;
              margin-right: 16px;
            }
            &:nth-child(4) {
              width: auto;
              max-width: none;
              order: 2;
            }
            &:nth-child(5) {
              width: auto;
              max-width: none;
              order: 1;
              margin-right: 16px;
            }
          }
        }
      }
    }
  }
`;
export default QuantroIndicatorTable;
