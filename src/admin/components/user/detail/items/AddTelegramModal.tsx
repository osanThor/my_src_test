import React from 'react';
import { Dialog, DialogContent, Input } from '@mui/material';
import styled from 'styled-components';
import { IThreeModalType } from '@/src/interfaces/iCommon/iModal';
import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import Button from '@/src/components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import { adminUsersActions } from '@/src/store/reducers';

const AddTelegramModal = ({ open, onClose, onClick }: IThreeModalType) => {
  const dispatch = useDispatch();
  const { telegramPayload } = useSelector(({ adminUsers }: RootState) => ({
    telegramPayload: adminUsers.telegramPayload,
  }));

  const handleChangeTelegramField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(
      adminUsersActions.changeAdminTelegramField({
        id: telegramPayload?.id,
        username: value,
      }),
    );
  };
  return (
    <AddTelegramModalBlock open={open} onClose={onClose}>
      <AddTelegramModalCon>
        <div className="txt">추가할 텔레그램 '@사용자명'을 입력해주세요</div>
        <Input
          style={{ width: '100%', fontFamily: 'GmarketSans', padding: '0.5rem', marginBottom: '1rem' }}
          name="username"
          value={telegramPayload?.username}
          placeholder="텔레그램 @사용자명을 입력해주세요"
          onChange={handleChangeTelegramField}
        />
        <div className=" btn btns">
          <StyledButton onClick={onClose}>돌아가기</StyledButton>
          <StyledButton onClick={onClick}>추가</StyledButton>
        </div>
      </AddTelegramModalCon>
    </AddTelegramModalBlock>
  );
};
const AddTelegramModalBlock = styled(Dialog)`
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
const AddTelegramModalCon = styled(DialogContent)`
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

export default AddTelegramModal;
