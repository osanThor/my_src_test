import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import { IFuncModalType } from '@/src/interfaces/iCommon/iModal';
import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import Button from '../Button';

const FuncModal = ({ open, onClose, message, dubBtn, onClick, onClick2 }: IFuncModalType) => {
  return (
    <FuncModalBlock open={open} onClose={onClose}>
      <FuncModalCon>
        <div className="txt">
          {message.title}
          <br />
          {message.description && <span>{message.description}</span>}
        </div>
        {dubBtn ? (
          <div className=" btn btns">
            <StyledButton onClick={onClick2}>돌아가기</StyledButton>
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

export default FuncModal;
