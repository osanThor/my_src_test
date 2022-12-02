import { media } from '@/styles/theme';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import Button from '../../Button';

const BoardSearchLayout = ({
  category,
  name,
  value,
  children,
}: {
  category: string;
  name: string;
  value: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const handleGoBoards = () => {
    if (!name) {
      alert('필터값을 선택 해주세요');
      return;
    }
    router.push(`/community?category=${category}&${name}=${value}`);
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
