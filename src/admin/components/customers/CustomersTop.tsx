import colors from '@/src/assets/Colors';
import Button from '@/src/components/common/Button';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardSearchLayout from '../common/BoardSearch/BoardSearchLayout';
import CustomSelect from '../common/BoardSearch/CustomSelect';
import SearchInput from '../common/BoardSearch/SearchInput';

const CustomersTop = () => {
  const router = useRouter();
  const [searchName, setSearchName] = useState('');
  const [searchVal, setSearchVal] = useState('');
  useEffect(() => {
    setSearchName('');
    setSearchVal('');
  }, [router]);
  return (
    <CustomersTopBlock>
      <div className="title">
        고객센터
        {router.query.state === 'guide' && (
          <Button blue onClick={() => router.push('/admin/customers/write_guide')}>
            이용안내 등록
          </Button>
        )}
      </div>
      <div className="boardTop">
        <div className="admin_tab">
          <div
            className={router.query.state === 'guide' ? 'menu on' : 'menu'}
            onClick={() => router.push('/admin/customers?state=guide&page=1')}
          >
            이용안내
          </div>
          <div
            className={router.query.state === 'inquiry' ? 'menu on' : 'menu'}
            onClick={() => router.push('/admin/customers?state=inquiry&page=1&isWait=true')}
          >
            1:1 문의
          </div>
          <div className={router.query.state === 'guide' ? 'sub_tab on' : 'sub_tab'}>
            <div
              className={!router.query.group ? 'tab on' : 'tab'}
              onClick={() => router.push('/admin/customers?state=guide&page=1')}
            >
              전체
            </div>
            <div
              className={router.query.group === 'DASHBOARD' ? 'tab on' : 'tab'}
              onClick={() => router.push('/admin/customers?state=guide&page=1&group=DASHBOARD')}
            >
              대시보드
            </div>
            <div
              className={router.query.group === 'QUANT' ? 'tab on' : 'tab'}
              onClick={() => router.push('/admin/customers?state=guide&page=1&group=QUANT')}
            >
              퀀트작성
            </div>
            <div
              className={router.query.group === 'SUBSCRIBE' ? 'tab on' : 'tab'}
              onClick={() => router.push('/admin/customers?state=guide&page=1&group=SUBSCRIBE')}
            >
              API Key/이용권 등록
            </div>
            <div
              className={router.query.group === 'STRATEGY' ? 'tab on' : 'tab'}
              onClick={() => router.push('/admin/customers?state=guide&page=1&group=STRATEGY')}
            >
              전략
            </div>
            <div
              className={router.query.group === 'COMMUNITY ' ? 'tab on' : 'tab'}
              onClick={() => router.push('/admin/customers?state=guide&page=1&group=COMMUNITY ')}
            >
              커뮤니티
            </div>
          </div>
          <div className={router.query.state === 'inquiry' ? 'sub_tab on' : 'sub_tab'}>
            <div
              className={router.query.isWait === 'true' ? 'tab on' : 'tab'}
              onClick={() => router.push('/admin/customers?state=inquiry&page=1&isWait=true')}
            >
              대기
            </div>
            <div
              className={!router.query.isWait ? 'tab on' : 'tab'}
              onClick={() => router.push('/admin/customers?state=inquiry&page=1')}
            >
              답변
            </div>
          </div>
        </div>
        {router.query.state === 'inquiry' && (
          <BoardSearchLayout name={searchName} value={searchVal}>
            <CustomSelect place={'선택'} setSearchName={setSearchName} />
            <SearchInput searchVal={searchVal} setSearchVal={setSearchVal} />
          </BoardSearchLayout>
        )}
      </div>
    </CustomersTopBlock>
  );
};

const CustomersTopBlock = styled.div`
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
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .admin_tab {
      display: flex;
      align-items: center;
      position: relative;
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
    .sub_tab {
      width: 0px;
      overflow: hidden;
      visibility: hidden;
      position: absolute;
      top: 50%;
      left: 100%;
      display: flex;
      transform: translateY(-50%);
      font-size: 14px;

      .tab {
        padding: 0 10px;
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
        &.on {
          color: ${colors.blue[2]};
        }
        &:hover {
          color: ${colors.blue[2]};
        }
      }

      &.on {
        width: 300%;
        visibility: visible;
      }
    }
  }
`;
export default CustomersTop;
