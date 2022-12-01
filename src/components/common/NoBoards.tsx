import colors from '@/src/assets/Colors';
import React from 'react';
import styled from 'styled-components';

const NoBoards = () => {
  return (
    <NoBoardsBlock>
      <h2>게시물이 없습니다</h2>
    </NoBoardsBlock>
  );
};

const NoBoardsBlock = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    font-size: 20px;
    color: ${colors.gray[5]};
  }
`;

export default NoBoards;
