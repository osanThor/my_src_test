import { media } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';

const ExplaneService = ({ onClick }: { onClick: () => void }) => {
  return (
    <ExplaneBlock>
      <h2>이런 이유로 텔레그램 연동을 추천해요!</h2>
      <div className="description">텔레그램 연동의 중요성(미결정)</div>
      <StyledButton fullWidth blue onClick={onClick}>
        연동하기
      </StyledButton>
    </ExplaneBlock>
  );
};

const ExplaneBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  h2 {
    font-weight: 700;
  }
  .description {
    width: 100%;
    height: 370px;
    margin-bottom: 1rem;
    overflow-y: auto;
    padding: 1rem;
  }
`;
const StyledButton = styled(Button)`
  height: 72px;
  ${media.tablet} {
    height: 56px;
  }
`;
export default ExplaneService;
