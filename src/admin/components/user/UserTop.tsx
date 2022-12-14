import colors from '@/src/assets/Colors';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardSearchLayout from '../common/BoardSearch/BoardSearchLayout';
import CustomSelect from '../common/BoardSearch/CustomSelect';
import SearchInput from '../common/BoardSearch/SearchInput';

const UserTop = () => {
  const router = useRouter();
  const [searchName, setSearchName] = useState('');
  const [searchVal, setSearchVal] = useState('');
  useEffect(() => {
    setSearchName('');
    setSearchVal('');
  }, [router]);

  return (
    <UserTopBlock>
      <div className="title">회원관리</div>
      <div className="boardTop">
        <div className="admin_tab">
          <div
            className={!router.query.snsType ? 'menu on' : 'menu'}
            onClick={() => router.push('/admin/users?page=1')}
          >
            전체
          </div>
          <div
            className={router.query.snsType === 'EMAIL' ? 'menu on' : 'menu'}
            onClick={() => router.push('/admin/users?page=1&snsType=EMAIL')}
          >
            일반
          </div>
          <div
            className={router.query.snsType === 'GOOGLE' ? 'menu on' : 'menu'}
            onClick={() => router.push('/admin/users?page=1&snsType=GOOGLE')}
          >
            소셜
          </div>
        </div>
        <BoardSearchLayout name={searchName} value={searchVal}>
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
