import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import Image from 'next/image';
import { Close } from '@/src/assets/Images';
import Button from '../../common/Button';
import colors from '@/src/assets/Colors';

const ImageModal = ({ onClose, open }: { onClose: () => void; open: boolean }) => {
  return (
    <DialogBlock onClose={onClose} open={open}>
      <ModalCon>
        <div className="modalTopCon">
          <span className="closeBtn" onClick={onClose}>
            <Image src={Close} alt="closeBtn" />
          </span>
        </div>
        <div className="imageTypes">
          <div className="charIcon">
            <span>기본 제공</span>
          </div>
          <div className="fileImage">
            <span>이미지 업로드</span>
          </div>
        </div>
        <StyledButton>확인</StyledButton>
      </ModalCon>
    </DialogBlock>
  );
};

const DialogBlock = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 14px;
  }
`;

const ModalCon = styled(DialogContent)`
  position: relative;
  display: flex;
  flex-direction: column;

  .modalTopCon {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1.5rem;

    .closeBtn {
      cursor: pointer;
    }
  }

  .imageTypes {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
`;

const StyledButton = styled(Button)`
  max-width: 160px;
  height: 48px;
  border-radius: 24px;
  background-color: ${colors.blue[0]};
  color: ${colors.blue[2]};
  &:hover {
    background-color: ${colors.blue[0]};
    opacity: 0.7;
  }
`;

export default ImageModal;
