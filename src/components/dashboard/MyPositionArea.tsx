import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import PositionItem from './PositionItem';

const MyPositionArea = () => {
  const switchRef = useRef<HTMLInputElement>(null);
  const [checkVal, setCheckVal] = useState(false);

  return (
    <MyPositionAreaBlock>
      <div className="positoin_top">
        <div className="positoin_tap_btns">
          <div className="button on">
            <div className="btn_txt">
              <div className="title">
                현물 <span className="dis_p">자산</span>
              </div>
              0
            </div>
          </div>
          <div className="button">
            <div className="btn_txt">
              <div className="title">
                선물 <span className="dis_p">포지션</span>
              </div>
              0
            </div>
          </div>
          <div className="button">
            <div className="btn_txt">
              <div className="title">
                미체결 <span className="dis_p">주문</span>
              </div>
              0
            </div>
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
      </div>
      <div className="position_list">
        <PositionItem />
        <PositionItem />
        <PositionItem />
        <PositionItem />
        <PositionItem />
      </div>
    </MyPositionAreaBlock>
  );
};

const MyPositionAreaBlock = styled.div`
  width: 100%;

  .positoin_top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 26px;
    .positoin_tap_btns {
      display: flex;
      justify-content: space-between;
      .button {
        cursor: pointer;
        border-radius: 20px;
        padding: 8px 20px;
        margin-right: 14px;
        display: flex;
        justify-content: space-between;
        background-color: ${colors.gray[1]};
        color: ${colors.gray[5]};
        &.on {
          background-color: ${colors.blue[2]};
          color: white;
        }
        .btn_txt {
          display: flex;
          justify-content: space-between;
          transform: translateY(2px);
          .title {
            margin-right: 12px;
          }
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }
    .switch_box {
      label.moreInfoLabel {
        transform: translateY(2px);
        cursor: pointer;
        & > div {
          margin-left: 8px;
        }
      }
      label.moreInfoLabel.on {
        color: ${colors.blue[2]};
      }
    }
  }

  .position_list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-column-gap: 20px;
    -webkit-column-gap: 20px;
    column-gap: 20px;
    grid-row-gap: 20px;
    row-gap: 20px;
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

  ${media.pc} {
    .dis_p {
      display: none;
    }
    .positoin_top {
      flex-wrap: wrap;
      margin-bottom: 1rem;
      .positoin_tap_btns {
        .button {
          .btn_txt {
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
  ${media.tablet} {
  }
  ${media.mobile} {
    .positoin_top {
      .positoin_tap_btns {
        width: 100%;
        margin-bottom: 20px;

        .button {
          width: 30%;
          margin-right: 8px;
        }
      }
      .switch_box {
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
    }
    .position_list {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      grid-column-gap: 16px;
      -webkit-column-gap: 16px;
      column-gap: 16px;
      grid-row-gap: 16px;
      row-gap: 16px;
    }
  }
`;

export default MyPositionArea;
