import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';

const BoardsTable = () => {
  return (
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
        <div className="tr">
          <div className="td">87516</div>
          <div className="td title dark_gray pointer">
            게시글의 제목이 들어가는 자리입니다 <span className="comments">0</span>
          </div>
          <div className="td dark_gray pointer">다른 사용자 닉네임</div>
          <div className="td">6553</div>
          <div className="td">2022.12.25</div>
        </div>
        <div className="tr">
          <div className="td">87516</div>
          <div className="td title dark_gray pointer">
            게시글의 제목이 들어가는 자리입니다 <span className="comments">0</span>
          </div>
          <div className="td dark_gray pointer">다른 사용자 닉네임</div>
          <div className="td">6553</div>
          <div className="td">2022.12.25</div>
        </div>
        <div className="tr">
          <div className="td">87516</div>
          <div className="td title dark_gray pointer">
            게시글의 제목이 들어가는 자리입니다 <span className="comments">0</span>
          </div>
          <div className="td dark_gray pointer">다른 사용자 닉네임</div>
          <div className="td">6553</div>
          <div className="td">2022.12.25</div>
        </div>
        <div className="tr">
          <div className="td">87516</div>
          <div className="td title dark_gray pointer">
            게시글의 제목이 들어가는 자리입니다 <span className="comments">0</span>
          </div>
          <div className="td dark_gray pointer">다른 사용자 닉네임</div>
          <div className="td">6553</div>
          <div className="td">2022.12.25</div>
        </div>
        <div className="tr">
          <div className="td">87516</div>
          <div className="td title dark_gray pointer">
            게시글의 제목이 들어가는 자리입니다 <span className="comments">0</span>
          </div>
          <div className="td dark_gray pointer">다른 사용자 닉네임</div>
          <div className="td">6553</div>
          <div className="td">2022.12.25</div>
        </div>
        <div className="tr">
          <div className="td">87516</div>
          <div className="td title dark_gray pointer">
            게시글의 제목이 들어가는 자리입니다 <span className="comments">0</span>
          </div>
          <div className="td dark_gray pointer">다른 사용자 닉네임</div>
          <div className="td">6553</div>
          <div className="td">2022.12.25</div>
        </div>
        <div className="tr">
          <div className="td">87516</div>
          <div className="td title dark_gray pointer">
            게시글의 제목이 들어가는 자리입니다 <span className="comments">0</span>
          </div>
          <div className="td dark_gray pointer">다른 사용자 닉네임</div>
          <div className="td">6553</div>
          <div className="td">2022.12.25</div>
        </div>
        <div className="tr">
          <div className="td">87516</div>
          <div className="td title dark_gray pointer">
            게시글의 제목이 들어가는 자리입니다 <span className="comments">0</span>
          </div>
          <div className="td dark_gray pointer">다른 사용자 닉네임</div>
          <div className="td">6553</div>
          <div className="td">2022.12.25</div>
        </div>
        <div className="tr">
          <div className="td">87516</div>
          <div className="td title dark_gray pointer">
            게시글의 제목이 들어가는 자리입니다 <span className="comments">0</span>
          </div>
          <div className="td dark_gray pointer">다른 사용자 닉네임</div>
          <div className="td">6553</div>
          <div className="td">2022.12.25</div>
        </div>
        <div className="tr">
          <div className="td">87516</div>
          <div className="td title dark_gray pointer">
            게시글의 제목이 들어가는 자리입니다 <span className="comments">0</span>
          </div>
          <div className="td dark_gray pointer">다른 사용자 닉네임</div>
          <div className="td">6553</div>
          <div className="td">2022.12.25</div>
        </div>
      </div>
    </BoardsTableBlock>
  );
};

const BoardsTableBlock = styled.div`
  width: 100%;
  margin-bottom: 20px;
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
      }
    }
  }
`;

export default BoardsTable;
