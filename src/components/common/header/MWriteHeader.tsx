import { ArrowLeft } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const MWriteHeader = () => {
  const router = useRouter();
  const [isWrite, setIsWrite] = useState(false);
  const [isInquiries, setIsInquiries] = useState(false);
  const [isStrategist, setIsStrategist] = useState(false);
  const { nickname } = useSelector(({ boards }: RootState) => ({
    nickname: boards.nickname,
  }));
  useEffect(() => {
    if (router.pathname === '/mypage/inquiries/write' || router.pathname === '/mypage/inquiries/[qId]') {
      setIsInquiries(true);
      setIsWrite(false);
      setIsStrategist(false);
    } else if (router.pathname === '/strategy/strategist') {
      setIsStrategist(true);
      setIsInquiries(false);
      setIsWrite(false);
    } else {
      setIsWrite(true);
      setIsInquiries(false);
      setIsStrategist(false);
    }
  }, [router]);
  return (
    <MWriteHeaderBlock>
      <div className="backBtn" onClick={() => router.back()}>
        <Image src={ArrowLeft} alt="back button" />
      </div>
      {isWrite && '글작성'}
      {isInquiries && '1:1 문의'}
      {isStrategist && <div className="nickname">{nickname}</div>}
      <span />
    </MWriteHeaderBlock>
  );
};

const MWriteHeaderBlock = styled.div`
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

export default MWriteHeader;
