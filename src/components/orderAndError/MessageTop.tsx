import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import { localActions } from '@/src/store/reducers';
import { media } from '@/styles/theme';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const MessageTop = () => {
  const dispatch = useDispatch();
  const { orderMessage, noSignMessage, errorMessage } = useSelector(({ local }: RootState) => ({
    orderMessage: local.orderMessage,
    noSignMessage: local.noSignMessage,
    errorMessage: local.errorMessage,
  }));
  const switchRef = useRef<HTMLInputElement>(null);
  const [checkVal, setCheckVal] = useState(false);

  return (
    <MessageTopBlock>
      <div className="menu_tap">
        <div
          className={orderMessage ? 'button on' : 'button'}
          onClick={() => dispatch(localActions.gotoOrderMessage())}
        >
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
      </div>
      <div className="switch_box">
        <label className={checkVal ? 'moreInfoLabel on' : 'moreInfoLabel'}>
          자세히 보기
          <div className="switch">
            <input ref={switchRef} className="switchBtn" type="checkbox" id="moreInfoSwitch" name="moreInfo" />
            <span className="slider round"></span>
          </div>
        </label>
      </div>
    </MessageTopBlock>
  );
};

const MessageTopBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  .menu_tap {
    display: flex;
    align-items: center;
    flex: 1;
    .button {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 20px;
      border-radius: 20px;
      background-color: ${colors.gray[1]};
      color: ${colors.gray[5]};
      margin-right: 1rem;
      transition: all 0.2s;
      &:last-child {
        margin-right: 0;
      }
      span {
        &:first-child {
          margin-right: 8px;
        }
      }
      &:hover {
        background-color: ${colors.gray[2]};
      }

      &.on {
        background-color: ${colors.blue[2]};
        color: white;
        &:hover {
          background-color: ${colors.blue[1]};
        }
      }
      &.error {
        background-color: ${colors.red[2]};
        color: white;
        &:hover {
          background-color: ${colors.red[1]};
        }
      }
    }
  }
  .switch_box {
    label.moreInfoLabel {
      display: flex;
      align-items: center;
      color: ${colors.gray[4]};
      cursor: pointer;
      & > div {
        margin-left: 8px;
      }
    }
    label.moreInfoLabel.on {
      color: ${colors.blue[2]};
    }
    /* on off 스위치 */
    /* The switch - the box around the slider */
    .switch {
      position: relative;
      display: inline-block;
      width: 48px;
      height: 24px;
      vertical-align: middle;
      /* Hide default HTML checkbox */
      input {
        display: none;
      }
      /* The slider */
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${colors.gray[1]};
        border-radius: 20px;
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }
      .slider:before {
        position: absolute;
        content: '';
        height: 18px;
        width: 18px;
        left: 2px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 50%;
        background-color: ${colors.gray[3]};
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }
      input.switchBtn:checked + .slider:before {
        -webkit-transform: translate(24px, -50%);
        -ms-transform: translate(24px, -50%);
        transform: translate(24px, -50%);
        background-color: ${colors.blue[2]};
      }
    }
  }

  ${media.tablet} {
    margin-bottom: 16px;
    .menu_tap {
      .button {
        display: none;
      }
    }
  }
`;

export default MessageTop;
