import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import Button from '../Button';
import { INotUserModalType } from '@/src/interfaces/iCommon/iModal';

const OpenBetaModal = ({ open, onClose }: INotUserModalType) => {
  return (
    <OpenBetaModalBlock open={open} onClose={onClose}>
      <OpenBetaModalCon>
        <div className=" btn btns">
          <StyledButton>홈페이지 바로가기</StyledButton>
          <StyledButton>확인</StyledButton>
        </div>
      </OpenBetaModalCon>
    </OpenBetaModalBlock>
  );
};
const OpenBetaModalBlock = styled(Dialog)`
  .MuiPaper-root {
    max-width: none;
    border-radius: 32px;
    position: relative;
    padding: 48px 28px;
  }

  ${media.tablet} {
    .MuiPaper-root {
      height: auto;
      padding: 28px;
    }
  }
  ${media.mobile} {
    padding: 20px;
  }
`;
const OpenBetaModalCon = styled(DialogContent)`
  &.MuiDialogContent-root {
    padding: 0;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .txt {
      text-align: center;
      word-break: keep-all;
      margin-bottom: 16px;
      span {
        font-size: 1rem;
      }
    }
    .btn {
      display: flex;
      justify-content: center;
      white-space: nowrap;
      button:last-child {
        background-color: ${colors.blue[0]};
        color: ${colors.blue[1]};
        &:hover {
          background-color: ${colors.blue[2]};
          color: white;
          opacity: 0.7;
        }
      }
    }
    .btns {
      button:first-child {
        margin-right: 20px;
      }
    }
    ${media.tablet} {
      .txt {
        width: auto;
        text-align: center;
        margin-bottom: 1rem;
      }
      .btn {
        width: 100%;
        button {
          width: 132px;
          min-height: auto;
          height: 48px;
          font-size: 1rem;
          padding: 0;
        }
      }
      .btns {
        button:first-child {
          margin-right: 1rem;
        }
      }
    }
  }
`;

const StyledButton = styled(Button)`
  width: 168px;
  height: 64px;
  font-size: 20px;
  border-radius: 32px;
`;

export default OpenBetaModal;
