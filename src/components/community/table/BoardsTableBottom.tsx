import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BoardSearchLayout from '../../common/boards/BoardSearch/BoardSearchLayout';
import CustomSelect from '../../common/boards/BoardSearch/CustomSelect';
import SearchInput from '../../common/boards/BoardSearch/SearchInput';
import Button from '../../common/Button';
import Pagination from '../../common/Pagination';

const BoardsTableBottom = ({ total }: { total: number }) => {
  const router = useRouter();
  const { communityDiscussion, communityCommission } = useSelector(({ local }: RootState) => ({
    communityDiscussion: local.communityDiscussion,
    communityCommission: local.communityCommission,
  }));
  const { category, page, user, title, comment } = useSelector(({ boards }: RootState) => ({
    category: boards.category,
    page: boards.page,
    user: boards.user,
    title: boards.title,
    comment: boards.comment,
    loadGetBoardsDone: boards.loadGetBoardsDone,
  }));

  const [searchName, setSearchName] = useState('');
  const [searchVal, setSearchVal] = useState('');

  return (
    <BoardsTableBottomBlock>
      <div className="first">
        <Pagination total={total} page={page} />
      </div>
      <div className="second">
        <BoardSearchLayout category={category} name={searchName} value={searchVal}>
          <CustomSelect place="선택" setSearchName={setSearchName} />
          <SearchInput searchVal={searchVal} setSearchVal={setSearchVal} />
        </BoardSearchLayout>
        <div className="btn">
          {communityDiscussion && (
            <StyledButton lightBlue onClick={() => router.push('/community/write')}>
              글쓰기
            </StyledButton>
          )}
          {communityCommission && (
            <StyledButton lightBlue onClick={() => router.push('/community/write')}>
              의뢰하기
            </StyledButton>
          )}
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
