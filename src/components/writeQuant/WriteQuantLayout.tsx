import React from 'react';
import styled from 'styled-components';

const WriteQuantLayout = ({ children }: { children: React.ReactNode }) => {
  return <WriteQuantLayoutBlock className="container">{children}</WriteQuantLayoutBlock>;
};

const WriteQuantLayoutBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default WriteQuantLayout;
