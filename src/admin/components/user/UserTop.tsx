import colors from '@/src/assets/Colors';
import React, { useState } from 'react';
import styled from 'styled-components';
import BoardSearchLayout from '../common/BoardSearch/BoardSearchLayout';
import CustomSelect from '../common/BoardSearch/CustomSelect';
import SearchInput from '../common/BoardSearch/SearchInput';

const UserTop = () => {
  const [searchName, setSearchName] = useState('');
  const [searchVal, setSearchVal] = useState('');

  return (
    <UserTopBlock>
      <div className="title">회원관리</div>
      <div className="boardTop">
        <div className="admin_tab">
          <div className="menu">전체</div>
          <div className="menu">일반</div>
          <div className="menu">소셜</div>
        </div>
        <BoardSearchLayout category={''} name={''} value={''}>
          <CustomSelect place={'선택'} setSearchName={setSearchName} />
          <SearchInput searchVal={searchVal} setSearchVal={setSearchVal} />
        </BoardSearchLayout>
      </div>
    </UserTopBlock>
  );
};

const UserTopBlock = styled.div`
  width: 100%;
  margin-bottom: 20px;
  .boardTop {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .admin_tab {
      display: flex;
      align-items: center;
      .menu {
        padding: 4px 1rem;
        background-color: ${colors.blue[0]};
        border-radius: 24px;
        color: ${colors.blue[2]};
        cursor: pointer;
        margin-right: 1rem;
        transition: all 0.2s;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          background-color: ${colors.blue[2]};
          color: white;
        }
        &.on {
          background-color: ${colors.blue[2]};
          color: white;
        }
      }
    }
  }
`;

export default UserTop;
