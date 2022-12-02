import { ArrowLeft, Menu7, ShareIcon } from '@/src/assets/Images';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const MBoardHeader = () => {
  const router = useRouter();

  return (
    <MBoardHeaderBlock>
      <div className="backBtn" onClick={() => router.back()}>
        <Image src={ArrowLeft} alt="back button" />
      </div>
      <div className="right_btns">
        <div className="button">
          <Image src={Menu7[0]} alt="collection" />
        </div>
        <div className="button">
          <Image src={ShareIcon} alt="share" />
        </div>
      </div>
    </MBoardHeaderBlock>
  );
};

const MBoardHeaderBlock = styled.div`
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
  .right_btns {
    display: flex;
    align-items: center;
    .button {
      width: 24px;
      height: 24px;
      margin-left: 16px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
`;

export default MBoardHeader;
