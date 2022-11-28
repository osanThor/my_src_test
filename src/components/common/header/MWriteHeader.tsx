import { ArrowLeft } from '@/src/assets/Images';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const MWriteHeader = () => {
  const router = useRouter();
  return (
    <MWriteHeaderBlock>
      <div className="backBtn" onClick={() => router.back()}>
        <Image src={ArrowLeft} alt="back button" />
      </div>
      글작성
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
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    span {
      width: 24px;
      height: 24px;
      position: relative;
    }
  }
  span {
    width: 40px;
  }
`;

export default MWriteHeader;
