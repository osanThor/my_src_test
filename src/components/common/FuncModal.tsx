import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import colors from '@/src/assets/Colors';
import Image from 'next/image';
import Button from './Button';

const FuncModal = () => {
  const [open, setOpen] = React.useState(true);
  const [message, setMessage] = React.useState('이용권 등록 페이지에서 나중에 연동 가능해요~!');
  const onClose = () => {
    setOpen(false);
  };
  return (
    <FuncModalBlock open={open} onClose={onClose}>
      <FuncModalCon>
        <div className="txt">{message}</div>
        <div className="btns">
          <StyledButton>돌아가기</StyledButton>
          <StyledButton>취소하기</StyledButton>
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
    padding: 48px 28px;
  }
`;
const FuncModalCon = styled(DialogContent)`
  &.MuiDialogContent-root {
    padding: 0;
    font-size: 20px;

    .txt {
      margin-bottom: 48px;
    }
    .btns {
      display: flex;
      justify-content: center;

      button:first-child {
        margin-right: 20px;
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
