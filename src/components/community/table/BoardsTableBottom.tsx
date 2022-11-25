import { media } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';
import Pagination from '../../common/Pagination';

const BoardsTableBottom = () => {
  return (
    <BoardsTableBottomBlock>
      <div className="search_form">카테고리 선택, 검색</div>
      <Pagination />
      <div className="btn">
        <StyledButton lightBlue>글쓰기</StyledButton>
      </div>
    </BoardsTableBottomBlock>
  );
};
const BoardsTableBottomBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.tablet} {
    flex-direction: column;
    .search_form {
      margin-top: 20px;
      order: 2;
    }
    .pagination {
      order: 1;
    }
    .btn {
      display: none;
    }
  }
`;

const StyledButton = styled(Button)`
  min-height: auto;
  min-width: 94px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 8px;
`;

export default BoardsTableBottom;
