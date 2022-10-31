import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import colors from '@/src/assets/Colors';

const FuncModal = ({
  open,
  close,
  message,
  error,
}: {
  open: boolean;
  close: () => void;
  message: string;
  error: boolean;
}) => {
  return (
    <DialogBlock onClose={close} open={open}>
      <ModalCon className={error ? 'error' : ''}>{message}</ModalCon>
    </DialogBlock>
  );
};

const DialogBlock = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 14px;
  }
`;
const ModalCon = styled(DialogContent)`
  &.MuiDialogContent-root {
    padding: 1rem 3rem;
    color: white;
    background-color: ${colors.blue[2]};

    &.error {
      background: ${colors.red[2]};
    }
  }
`;

export default FuncModal;
