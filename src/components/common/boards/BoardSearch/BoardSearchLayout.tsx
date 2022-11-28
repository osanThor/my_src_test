import React from 'react';
import styled from 'styled-components';
import Button from '../../Button';

const BoardSearchLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BoardSearchLayoutBLock className="search_form">
      {children}
      <StyledButton lightBlue>검색</StyledButton>
    </BoardSearchLayoutBLock>
  );
};

const BoardSearchLayoutBLock = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  min-height: auto;
  height: 48px;
  border-radius: 8px;
`;

export default BoardSearchLayout;
