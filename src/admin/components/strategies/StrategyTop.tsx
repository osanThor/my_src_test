import colors from '@/src/assets/Colors';
import Button from '@/src/components/common/Button';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardSearchLayout from '../common/BoardSearch/BoardSearchLayout';
import CustomSelect from '../common/BoardSearch/CustomSelect';
import SearchInput from '../common/BoardSearch/SearchInput';

const StrategyTop = () => {
  const router = useRouter();
  const [searchName, setSearchName] = useState('');
  const [searchVal, setSearchVal] = useState('');
  useEffect(() => {
    setSearchName('');
    setSearchVal('');
  }, [router]);

  return (
    <StrategyTopBlock>
      <div className="title">
        전략관리 <Button blue>공개 전략/지표 작성</Button>
      </div>
      <div className="boardTop">
        <div className="admin_tab">
          <div
            className={!router.query.category ? 'menu on' : 'menu'}
            onClick={() => router.push('/admin/strategies?page=1')}
          >
            전체
          </div>
          <div
            className={router.query.category === 'CERTIFIED' ? 'menu on' : 'menu'}
            onClick={() => router.push('/admin/strategies?page=1&category=CERTIFIED')}
          >
            인증전략
          </div>
          <div
            className={router.query.category === 'USER' ? 'menu on' : 'menu'}
            onClick={() => router.push('/admin/strategies?page=1&category=USER')}
          >
            사용자전략
          </div>
          <div
            className={router.query.category === 'COMMISION' ? 'menu on' : 'menu'}
            onClick={() => router.push('/admin/strategies?page=1&category=COMMISION')}
          >
            전략개발의뢰
          </div>
          <div
            className={router.query.category === 'PUBLIC' ? 'menu on' : 'menu'}
            onClick={() => router.push('/admin/strategies?page=1&category=PUBLIC')}
          >
            공개전략
          </div>
          <div
            className={router.query.category === 'INDICATOR' ? 'menu on' : 'menu'}
            onClick={() => router.push('/admin/strategies?page=1&category=INDICATOR')}
          >
            공개지표
          </div>
        </div>
        <BoardSearchLayout name={searchName} value={searchVal}>
          <CustomSelect place={'선택'} setSearchName={setSearchName} />
          <SearchInput searchVal={searchVal} setSearchVal={setSearchVal} />
        </BoardSearchLayout>
      </div>
    </StrategyTopBlock>
  );
};

const StrategyTopBlock = styled.div`
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

export default StrategyTop;
