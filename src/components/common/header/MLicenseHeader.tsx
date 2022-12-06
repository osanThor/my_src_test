import { ArrowLeft } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const MLicenseHeader = () => {
  const router = useRouter();
  const [isExchagne, setIsExchagne] = useState(false);
  const [isLicenses, setIsLicenses] = useState(false);
  const [isStrategist, setIsStrategist] = useState(false);

  useEffect(() => {
    if (router.pathname === '/licenses' && router.query.state === 'exchange') {
      setIsExchagne(true);
      setIsLicenses(false);
    } else {
      setIsExchagne(false);
      setIsLicenses(true);
    }
  }, [router]);
  return (
    <MLicenseHeaderBlock>
      <div className="backBtn" onClick={() => router.back()}>
        <Image src={ArrowLeft} alt="back button" />
      </div>
      {isExchagne && '거래소 등록'}
      {isLicenses && '이용권 등록'}
      <span />
    </MLicenseHeaderBlock>
  );
};

const MLicenseHeaderBlock = styled.div`
  width: 100%;
  height: 50px;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor};
  position: fixed;
  z-index: 997;

  .backBtn {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    cursor: pointer;
    span {
      width: 16px;
      height: 16px;
      position: relative;
    }
  }
  .nickname {
    height: 1rem;
  }
  span {
    width: 40px;
  }
`;

export default MLicenseHeader;
