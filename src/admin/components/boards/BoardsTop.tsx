import colors from '@/src/assets/Colors';
import Button from '@/src/components/common/Button';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardSearchLayout from '../common/BoardSearch/BoardSearchLayout';
import CustomSelect from '../common/BoardSearch/CustomSelect';
import SearchInput from '../common/BoardSearch/SearchInput';

const BoardsTop = () => {
  const router = useRouter();
  const [searchName, setSearchName] = useState('');
  const [searchVal, setSearchVal] = useState('');
  useEffect(() => {
    setSearchName('');
    setSearchVal('');
  }, [router]);
  return (
    <BoardsTopBlock>
      <div className="title">
        커뮤니티 관리
        <Button blue>공지사항 등록</Button>
      </div>
      <div className="boardTop">
        <div className="admin_tab">
          <div
            className={!router.query.category ? 'menu on' : 'menu'}
            onClick={() => router.push('/admin/boards?page=1')}
          >
            전체
          </div>
          <div
            className={router.query.category === 'CERTIFIED' ? 'menu on' : 'menu'}
            onClick={() => router.push('/admin/boards?page=1&category=DISCUSSION')}
          >
            전략토론
          </div>
          <div
            className={router.query.category === 'USER' ? 'menu on' : 'menu'}
            onClick={() => router.push('/admin/boards?page=1&category=MOTICE')}
          >
            공지사항
          </div>
        </div>
        <BoardSearchLayout name={searchName} value={searchVal}>
          <CustomSelect place={'선택'} setSearchName={setSearchName} />
          <SearchInput searchVal={searchVal} setSearchVal={setSearchVal} />
        </BoardSearchLayout>
      </div>
    </BoardsTopBlock>
  );
};

const BoardsTopBlock = styled.div`
  width: 100%;
  margin-bottom: 20px;
  & > .title {
    display: flex;
    justify-content: space-between;
    button {
      min-height: auto;
      height: 38px;
      border-radius: 8px;
    }
  }
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
export default BoardsTop;
