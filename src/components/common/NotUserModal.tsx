import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import Button from './Button';
import { INotUserModalType } from '@/src/interfaces/iCommon/iModal';
import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import Image from 'next/image';
import { DisplayIllust } from '@/src/assets/Images';
import { useRouter } from 'next/router';

const FuncModal = ({ open, onClose }: INotUserModalType) => {
  const router = useRouter();
  return (
    <FuncModalBlock open={open} onClose={onClose}>
      <FuncModalCon>
        <h2>처음 오셨나요?</h2>
        <p>로그인 후 API 연동화면이 나와요</p>

        <div className="illust">
          <Image src={DisplayIllust} alt="modal illust" />
        </div>
        <div className="btn" onClick={() => router.push('/auth/login')}>
          <StyledButton>회원가입 하러가기</StyledButton>
        </div>
      </FuncModalCon>
    </FuncModalBlock>
  );
};
const FuncModalBlock = styled(Dialog)`
  .MuiPaper-root {
    max-width: none;
    border-radius: 32px;
    position: relative;
    padding: 48px 88px;
    background-color: ${colors.blue[2]};
  }

  ${media.tablet} {
    .MuiPaper-root {
      height: auto;
      padding: 28px;
      margin: 0;
    }
  }
  ${media.mobile} {
    padding: 20px;
  }
`;
const FuncModalCon = styled(DialogContent)`
  &.MuiDialogContent-root {
    padding: 0;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;

    h2 {
      font-family: 'GmarketSansBold';
      color: white;
      margin-bottom: 16px;
    }
    p {
      color: ${colors.blue[1]};
      margin-bottom: 40px;
    }
    .illust {
      margin-bottom: 56px;
    }
    ${media.tablet} {
      h2 {
        font-size: 26px;
        margin-bottom: 8px;
      }
      p {
        font-size: 1rem;
        margin-bottom: 20px;
      }
    }
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 64px;
  font-size: 20px;
  border-radius: 32px;
  color: ${colors.blue[2]};
  word-break: keep-all;
`;

export default FuncModal;
