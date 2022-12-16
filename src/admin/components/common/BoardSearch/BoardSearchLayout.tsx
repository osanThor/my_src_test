import Button from '@/src/components/common/Button';
import { media } from '@/styles/theme';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const BoardSearchLayout = ({ name, value, children }: { name: string; value: string; children: React.ReactNode }) => {
  const router = useRouter();

  const handleGoBoards = () => {
    if (!name) {
      alert('필터값을 선택 해주세요');
      return;
    }
    if (!value) {
      alert('값을 입력 해주세요');
      return;
    }
    if (router.pathname === '/admin/users') {
      if (name === 'licensePackage') {
        if (value != 'BASIC' && value != 'REGULAR' && value != 'PREMIUM') {
          alert('등록된 패키지 검색값은 "BASIC, REGULAR, PREMIUM"만 가능해요');
          return;
        }
      }
      if (name === 'grade') {
        if (value != 'STRATEGIST' && value != 'NORMAL') {
          alert('상태 검색값은 "NORMAL, STRATEGIST"만 가능해요');
          return;
        }
      }
      router.push(`/admin/users?page=1&${name}=${value}`);
    }
    if (router.pathname === '/admin/strategies') {
      if (name === 'confirmStatus') {
        if (value != 'REQUEST' && value != 'CHECKING' && value != 'CONFIRMED') {
          alert('전략 상태 검색값은 "REQUEST, CHECKING, CONFIRMED"만 가능해요');
          return;
        }
      }
      router.push(`/admin/strategies?page=1&${name}=${value}`);
    }
    if (router.pathname === '/admin/boards') {
      router.push(`/admin/boards?page=1&${name}=${value}`);
    }
    if ((router.query.state = 'inquiry')) {
      if (router.query.isWait) {
        router.push(`/admin/customers?state=inquiry&page=1&isWait=true&${name}=${value}`);
      } else {
        router.push(`/admin/customers?state=inquiry&page=1&${name}=${value}`);
      }
    }
  };
  return (
    <BoardSearchLayoutBLock className="search_form">
      {children}
      <StyledButton lightBlue onClick={handleGoBoards}>
        검색
      </StyledButton>
    </BoardSearchLayoutBLock>
  );
};

const BoardSearchLayoutBLock = styled.div`
  display: flex;
  align-items: center;
  ${media.tablet} {
    width: 100%;
    max-width: 610px;
    justify-content: center;
  }
`;

const StyledButton = styled(Button)`
  min-height: auto;
  height: 48px;
  border-radius: 8px;
  ${media.tablet} {
    padding: 12px 16px;
    height: 40px;
  }
`;

export default BoardSearchLayout;
