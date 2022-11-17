import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import { localActions } from '@/src/store/reducers';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const MessageMenu = () => {
  const dispatch = useDispatch();
  const { orderMessage, noSignMessage, errorMessage } = useSelector(({ local }: RootState) => ({
    orderMessage: local.orderMessage,
    noSignMessage: local.noSignMessage,
    errorMessage: local.errorMessage,
  }));
  return (
    <MessageMenuBlock>
      <div className={orderMessage ? 'button on' : 'button'} onClick={() => dispatch(localActions.gotoOrderMessage())}>
        <span>주문내역</span>
        <span>0</span>
      </div>
      <div
        className={noSignMessage ? 'button on' : 'button'}
        onClick={() => dispatch(localActions.gotoNoSignMessage())}
      >
        <span>미체결 주문</span>
        <span>0</span>
      </div>
      <div
        className={errorMessage ? 'button error' : 'button'}
        onClick={() => dispatch(localActions.gotoErrorMessage())}
      >
        <span>에러 메세지</span>
        <span>0</span>
      </div>
    </MessageMenuBlock>
  );
};

const MessageMenuBlock = styled.div`
  width: 100%;
  height: 56px;
  position: absolute;
  top: 100%;
  left: 0;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.gray[1]};
  background-color: ${({ theme }) => theme.bgColor};
  overflow-x: auto;
  white-space: nowrap;

  .button {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
    border-radius: 20px;
    background-color: ${colors.gray[1]};
    color: ${colors.gray[5]};
    margin-right: 8px;
    &:last-child {
      margin-right: 0;
    }
    span {
      &:first-child {
        margin-right: 8px;
      }
    }

    &.on {
      background-color: ${colors.blue[2]};
      color: white;
    }
    &.error {
      background-color: ${colors.red[2]};
      color: white;
    }
  }
`;

export default MessageMenu;
