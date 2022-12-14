import colors from '@/src/assets/Colors';
import React from 'react';
import styled from 'styled-components';

const BasicContainer = ({ children }: { children: React.ReactNode }) => {
  return <BasicContainerBlock>{children}</BasicContainerBlock>;
};
const BasicContainerBlock = styled.div`
  width: 100%;
  background-color: white;
  padding: 1.5rem 2rem;
  border-radius: 14px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  .title {
    color: ${colors.gray[5]};
    height: 38px;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-family: 'GmarketSansBold';
  }
`;

export default BasicContainer;
