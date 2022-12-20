import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import { IThreeModalType } from '@/src/interfaces/iCommon/iModal';
import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import Button from '@/src/components/common/Button';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';

const DeleteTelegramModal = ({ open, onClose, onClick }: IThreeModalType) => {
  const { telegramPayload } = useSelector(({ adminUsers }: RootState) => ({
    telegramPayload: adminUsers.telegramPayload,
  }));

  return (
    <DeleteTelegramModalBlock open={open} onClose={onClose}>
      <DeleteTelegramModalCon>
        <div className="txt">
          사용자명 <span>"{telegramPayload?.username}"</span>을 <br />
          삭제하시겠어요?
        </div>
        <div className=" btn btns">
          <StyledButton onClick={onClose}>돌아가기</StyledButton>
          <StyledButton onClick={onClick}>삭제</StyledButton>
        </div>
      </DeleteTelegramModalCon>
    </DeleteTelegramModalBlock>
  );
};
const DeleteTelegramModalBlock = styled(Dialog)`
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
const DeleteTelegramModalCon = styled(DialogContent)`
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
        font-family: 'GmarketSansBold';
        color: ${colors.blue[2]};
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

export default DeleteTelegramModal;
