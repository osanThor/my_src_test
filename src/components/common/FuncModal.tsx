import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import Button from './Button';
import { IFuncModalType } from '@/src/interfaces/iCommon/iModal';
import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';

const FuncModal = ({ open, onClose, message, dubBtn, onClick }: IFuncModalType) => {
  return (
    <FuncModalBlock open={open} onClose={onClose}>
      <FuncModalCon>
        <div className="txt">{message.title}</div>
        {dubBtn ? (
          <div className=" btn btns">
            <StyledButton onClick={onClose}>돌아가기</StyledButton>
            <StyledButton onClick={onClick}>{message.btnTxt}</StyledButton>
          </div>
        ) : (
          <div className="btn">
            <StyledButton onClick={onClick}>확인</StyledButton>
          </div>
        )}
      </FuncModalCon>
    </FuncModalBlock>
  );
};
const FuncModalBlock = styled(Dialog)`
  .MuiPaper-root {
    max-width: none;
    height: 236px;
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
const FuncModalCon = styled(DialogContent)`
  &.MuiDialogContent-root {
    padding: 0;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .txt {
      width: 55%;
      text-align: center;
      word-break: keep-all;
    }
    .btn {
      display: flex;
      justify-content: center;
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
        font-size: 1rem;
        button {
          width: 100%;
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

export default FuncModal;
