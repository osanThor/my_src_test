import colors from '@/src/assets/Colors';
import { ArrowLeft } from '@/src/assets/Images';
import Button from '@/src/components/common/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const DetailCommonTop = ({ handleDeleteModalOpen }: { handleDeleteModalOpen: () => void }) => {
  const router = useRouter();
  return (
    <DetailCommonTopBlock>
      <div className="back_btn" onClick={() => router.back()}>
        <div className="icon">
          <Image src={ArrowLeft} alt="arrow" />
        </div>
        돌아가기
      </div>
      <div className="ctrl_btns">
        <StyledButton yellow>수정</StyledButton>
        <StyledButton red onClick={handleDeleteModalOpen}>
          삭제
        </StyledButton>
      </div>
    </DetailCommonTopBlock>
  );
};

const DetailCommonTopBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .back_btn {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    color: ${colors.gray[5]};
    transition: all 0.2s;
    &:hover {
      color: ${colors.dark[0]};
    }
    .icon {
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      border: 1px solid ${colors.gray[3]};
      margin-right: 8px;
      img {
        width: 14px !important;
        height: 14px;
      }
    }
  }
`;

const StyledButton = styled(Button)`
  min-height: auto;
  height: 38px;
  font-size: 14px;
  border-radius: 8px;
  &:first-child {
    margin-right: 8px;
  }
`;

export default DetailCommonTop;
