import colors from '@/src/assets/Colors';
import Button from '@/src/components/common/Button';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardSearchLayout from '../common/BoardSearch/BoardSearchLayout';
import CustomSelect from '../common/BoardSearch/CustomSelect';
import SearchInput from '../common/BoardSearch/SearchInput';

const BannersTop = () => {
  const router = useRouter();
  const [searchName, setSearchName] = useState('');
  const [searchVal, setSearchVal] = useState('');
  useEffect(() => {
    setSearchName('');
    setSearchVal('');
  }, [router]);

  return (
    <BannersTopBlock>
      <div className="title">배너관리</div>
      <div className="boardTop">
        <div className="admin_tab">
          <div className={!router.query.zone ? 'menu on' : 'menu'} onClick={() => router.push('/admin/banners')}>
            전체
          </div>
          <div
            className={router.query.zone === 'MAIN' ? 'menu on' : 'menu'}
            onClick={() => router.push('/admin/banners?page=1&zone=MAIN')}
          >
            메인배너
          </div>
          <div
            className={router.query.zone === 'SUBSCRIBE' ? 'menu on' : 'menu'}
            onClick={() => router.push('/admin/banners?page=1&zone=SUBSCRIBE')}
          >
            이용권 등록
          </div>
          <div className={router.query.zone === 'SUBSCRIBE' ? 'sub_tab on' : 'sub_tab'}>
            <div
              className={router.query.sub === 'BYBIT' ? 'tab on' : 'tab'}
              onClick={() => router.push('/admin/banners?page=1&zone=SUBSCRIBE&sub=BYBIT')}
            >
              BYBIT
            </div>
            <div
              className={router.query.sub === 'BINANCE' ? 'tab on' : 'tab'}
              onClick={() => router.push('/admin/banners?page=1&zone=SUBSCRIBE&sub=BINANCE')}
            >
              BINANCE
            </div>
            <div
              className={router.query.sub === 'BITGET' ? 'tab on' : 'tab'}
              onClick={() => router.push('/admin/banners?page=1&zone=SUBSCRIBE&sub=BITGET')}
            >
              BITGET
            </div>
          </div>
        </div>
        <Button blue>추가</Button>
      </div>
    </BannersTopBlock>
  );
};

const BannersTopBlock = styled.div`
  width: 100%;
  margin-bottom: 20px;
  .title {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .boardTop {
    width: 100%;
    display: flex;
    justify-content: space-between;
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
    button {
      min-height: auto;
      height: 48px;
      border-radius: 8px;
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
      transition: all 0.2s;
      font-size: 14px;

      .tab {
        padding: 0 10px;
        cursor: pointer;
        transition: all 0.2s;
        &.on {
          color: ${colors.blue[2]};
        }
        &:hover {
          color: ${colors.blue[2]};
        }
      }

      &.on {
        width: 100%;
        visibility: visible;
      }
    }
  }
`;

export default BannersTop;
