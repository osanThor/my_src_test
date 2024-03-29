import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import colors from '@/src/assets/Colors';
import Image from 'next/image';
import { CloseRed, CloseWhite } from '@/src/assets/Images';
import { IModalType } from '@/src/interfaces/iCommon/iModal';
import { media } from '@/styles/theme';

const Modal = ({ open, close, message, error }: IModalType) => {
  return (
    <DialogBlock className={error ? 'error' : ''} onClose={close} open={open}>
      <ModalCon>
        <p>{message}</p>
      </ModalCon>
      <div className="closeBtn" onClick={close}>
        {error ? <Image src={CloseRed} alt="close button" /> : <Image src={CloseWhite} alt="close button" />}
      </div>
    </DialogBlock>
  );
};

const DialogBlock = styled(Dialog)`
  .MuiPaper-root {
    max-width: none;
    border-radius: 14px;
    background-color: ${colors.blue[1]};
    position: relative;
    color: white;
    margin: 0;

    .closeBtn {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 49%;
      transform: translateY(-50%);
      right: 24px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    ${media.tablet} {
      width: calc(100% - 32px);
    }
  }
  &.error {
    .MuiPaper-root {
      background: ${colors.red[0]};
      color: ${colors.red[2]};
    }
  }
`;
const ModalCon = styled(DialogContent)`
  &.MuiDialogContent-root {
    padding: 22px;
    text-align: center;
    p {
      width: 820px;
      transform: translateY(2px);
    }
  }

  ${media.tablet} {
    &.MuiDialogContent-root {
      p {
        width: auto;
      }
    }
  }
`;

export default Modal;
