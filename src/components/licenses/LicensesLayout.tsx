import { media } from '@/styles/theme';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const LicensesLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [licenseIndex, setLicenseIndex] = useState(false);
  useEffect(() => {
    if (router.pathname === '/licenses' && router.query.state === 'index') {
      setLicenseIndex(true);
    } else {
      setLicenseIndex(false);
    }
  }, [router]);
  return (
    <LicensesLayoutBlock className="container">
      {licenseIndex && <LicensesHeaderSpacer />}
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
