import { media } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';

const WriteQuantLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WriteQuantLayoutBlock className="container">
      <WriteQuantHeaderSpacer />
      {children}
    </WriteQuantLayoutBlock>
  );
};

const WriteQuantLayoutBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const WriteQuantHeaderSpacer = styled.div`
  ${media.tablet} {
    width: 100%;
    height: 56px;
  }
`;

export default WriteQuantLayout;
