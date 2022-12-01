import React from 'react';
import styled from 'styled-components';

const RankLayout = () => {
  return (
    <RankLayoutBlock>
      <h2>랭킹 Area</h2>
    </RankLayoutBlock>
  );
};

const RankLayoutBlock = styled.div`
  width: 100%;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 20px;
    font-family: 'GmarketSansBold';
  }
`;

export default RankLayout;
