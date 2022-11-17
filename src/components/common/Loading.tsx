import colors from '@/src/assets/Colors';
import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return (
    <LoadingBlock>
      <h1>Loading...</h1>
    </LoadingBlock>
  );
};

const LoadingBlock = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  h1 {
    font-weight: 800;
    /* font-family: GmarketSansBold; */
    color: ${colors.blue[2]};
  }
`;

export default Loading;
