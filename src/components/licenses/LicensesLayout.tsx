import { media } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';

const LicensesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LicensesLayoutBlock className="container">
      <LicensesHeaderSpacer />
      {children}
    </LicensesLayoutBlock>
  );
};

const LicensesLayoutBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const LicensesHeaderSpacer = styled.div`
  ${media.tablet} {
    width: 100%;
    height: 41px;
  }
`;

export default LicensesLayout;
