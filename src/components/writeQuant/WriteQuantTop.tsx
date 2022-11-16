import colors from '@/src/assets/Colors';
import { SawWheelIcon } from '@/src/assets/Images';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const WriteQuantTop = () => {
  return (
    <WriteQuantTopBlock>
      <div className="writeTop_con">
        <div className="webHook_area">
          <div className="top">
            <div className="title">웹훅 URL</div>
            <div className="openHowToBtn">
              <div className="icon">
                <Image src={SawWheelIcon} alt="info" />
              </div>
              설정방법
            </div>
          </div>
          <div className="bottom">
            <input value="https://tvextbot-trading.web.app/api/webhook" readOnly />
            <Button lightBlue>복사하기</Button>
          </div>
        </div>
        <div className="orderMessage_area">
          <div className="top">
            <div className="title">주문메세지 작성결과</div>
          </div>
          <div className="bottom">
            <input className="blue" />
            <Button blue>복사하기</Button>
            <span>간단한 텍스트 수정이 가능해요</span>
          </div>
        </div>
      </div>
    </WriteQuantTopBlock>
  );
};

const WriteQuantTopBlock = styled.div`
  width: 100%;
  margin-bottom: 80px;
  .writeTop_con {
    width: 100%;
    display: flex;
    justify-content: space-between;
    & > div {
      width: 100%;
      max-width: 732px;
      .top {
        width: 100%;
        display: flex;
        margin-bottom: 1rem;
        align-items: center;
        .title {
          color: ${colors.dark[1]};
          margin-right: 20px;
        }
        .openHowToBtn {
          display: flex;
          font-size: 14px;
          cursor: pointer;
          color: ${colors.gray[5]};
          .icon {
            width: 18px;
            height: 18px;
            margin-right: 8px;
          }
        }
      }
      .bottom {
        width: 100%;
        display: flex;
        position: relative;
        input {
          flex: 1;
          height: 56px;
          margin-right: 1rem;
          background-color: ${colors.gray[1]};
          border: none;
          border-radius: 8px;
          padding: 1rem 24px;
          font-size: 1rem;
          &:focus {
            outline: none;
          }

          &.blue {
            background-color: ${colors.blue[0]};
            color: ${colors.blue[2]};
          }
        }

        button {
          height: 56px;
          border-radius: 8px;
        }

        & > span {
          width: 100%;
          position: absolute;
          left: 0;
          font-size: 14px;
          color: ${colors.gray[3]};
          bottom: -30px;
        }
      }
    }
  }
`;

export default WriteQuantTop;
