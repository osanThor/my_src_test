import colors from '@/src/assets/Colors';
import React from 'react';
import styled from 'styled-components';

const AlramWindow = ({ AlramRef }: { AlramRef: any }) => {
  return (
    <AlramWindowBlock ref={AlramRef}>
      <span>알림을 모두 확인했습니다!</span>
    </AlramWindowBlock>
  );
};

const AlramWindowBlock = styled.div`
  width: 290px;
  font-size: 1rem;
  background-color: white;
  position: absolute;
  padding: 20px 32px;
  text-align: center;
  border-radius: 14px;
  top: 110%;
  right: 0;
  box-shadow: ${({ theme }) => theme.boxShadow};
  color: ${colors.gray[5]};
`;

export default AlramWindow;
