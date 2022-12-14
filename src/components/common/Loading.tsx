import colors from '@/src/assets/Colors';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loading = () => {
  return (
    <LoadingBlock>
      <div className="spinner-box">
        <div className="circle-border">
          <div className="circle-core"></div>
        </div>
      </div>

      <h1>Loading...</h1>
    </LoadingBlock>
  );
};
const Spin = keyframes`
 from {
    transform: rotate(0);
  }
  to{
    transform: rotate(359deg);
  }

`;

const LoadingBlock = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  z-index: 999;
  h1 {
    font-weight: 800;
    font-family: 'GmarketSansBold';
    color: ${colors.blue[2]};
    font-size: 1.75rem;
    margin-top: 2rem;
  }
  .circle-border {
    width: 100px;
    height: 100px;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: rgb(63, 249, 220);
    background: linear-gradient(0deg, rgba(63, 249, 220, 0.1) 33%, ${colors.blue[1]});
    animation: ${Spin} 0.8s linear 0s infinite;
  }

  .circle-core {
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.bgColor};
    backdrop-filter: blur(10px);
    border-radius: 50%;
  }
`;

export default Loading;
