import { media } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';
import BoardSearchLayout from '../../common/boards/BoardSearch/BoardSearchLayout';
import CustomSelect from '../../common/boards/BoardSearch/CustomSelect';
import SearchForm from '../../common/boards/BoardSearch/SearchForm';
import Button from '../../common/Button';
import Pagination from '../../common/Pagination';

const BoardsTableBottom = () => {
  return (
    <BoardsTableBottomBlock>
      <div className="first">
        <Pagination />
      </div>
      <div className="second">
        <BoardSearchLayout>
          <CustomSelect place="선택" />
          <SearchForm />
        </BoardSearchLayout>
        <div className="btn">
          <StyledButton lightBlue>글쓰기</StyledButton>
        </div>
      </div>
    </BoardsTableBottomBlock>
  );
};
const BoardsTableBottomBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  .first {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .second {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ${media.tablet} {
    .first {
      margin-bottom: 0;
    }
    .second {
      justify-content: center;
    }
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
