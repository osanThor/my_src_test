import colors from '@/src/assets/Colors';
import { GuidGoIcon, SawWheelIcon } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import WebhookModal from './item/WebhookModal';

const WriteQuantTop = ({
  webhookRef,
  handleCopyWebhook,
  messageRef,
  handleCopyMessage,
}: {
  webhookRef: React.MutableRefObject<HTMLInputElement>;
  handleCopyWebhook: () => void;
  messageRef: React.MutableRefObject<HTMLInputElement>;
  handleCopyMessage: () => void;
}) => {
  const [webhookOpen, setWebhookOpen] = useState(false);
  const handleCloseTelegramModal = () => {
    setWebhookOpen(false);
  };
  return (
    <>
      <WriteQuantTopBlock>
        <div className="writeTop_con">
          <div className="webHook_area">
            <div className="top">
              <div className="title">웹훅 URL</div>
              <div className="openHowToBtn" onClick={() => setWebhookOpen(true)}>
                <div className="icon">
                  <Image src={SawWheelIcon} alt="info" />
                </div>
                설정방법
              </div>
            </div>
            <div className="bottom">
              <input ref={webhookRef} value="https://tvextbot-trading.web.app/api/webhook" readOnly />
              <Button lightBlue onClick={handleCopyWebhook}>
                <span className="dis_p">복사하기</span>
                <span className="dis_m">
                  <Image src={GuidGoIcon[1]} alt="button" />
                </span>
              </Button>
            </div>
          </div>
          <div className="orderMessage_area">
            <div className="top">
              <div className="title">주문메세지 작성결과</div>
            </div>
            <div className="bottom">
              <input ref={messageRef} className="blue" />
              <Button blue onClick={handleCopyMessage}>
                <span className="dis_p">복사하기</span>
                <span className="dis_m">
                  <Image src={GuidGoIcon[1]} alt="button" />
                </span>
              </Button>
              <span>간단한 텍스트 수정이 가능해요</span>
            </div>
          </div>
        </div>
      </WriteQuantTopBlock>
      <WebhookModal onClose={handleCloseTelegramModal} open={webhookOpen} />
    </>
  );
};

const WriteQuantTopBlock = styled.div`
  width: 100%;
  margin-bottom: 80px;
  .dis_m {
    display: none;
  }
  .writeTop_con {
    width: 100%;
    display: flex;
    justify-content: space-between;
    & > div {
      width: 100%;
      max-width: 732px;

      &:first-child {
        margin-right: 40px;
      }
      .top {
        width: 100%;
        display: flex;
        margin-bottom: 15px;
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
          width: 152px;
          height: 56px;
          border-radius: 8px;
          padding: 0;
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
  ${media.pc} {
    .writeTop_con {
      flex-wrap: wrap;
      & > div {
        max-width: none;
        &:first-child {
          margin-right: 0;
          margin-bottom: 1rem;
        }
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
            margin-right: 8px;
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
            width: 100px;
            height: 56px;
            border-radius: 8px;
            padding: 0;
          }
        }
      }
    }
  }
  ${media.tablet} {
    .dis_p {
      display: none;
    }
    .dis_m {
      display: inline-block;
      position: relative;
      width: 24px;
      height: 24px;
    }
    padding: 20px 0 40px;
    margin-bottom: 20px;
    position: relative;
    &::after {
      content: '';
      width: 100vw;
      height: 1px;
      background-color: ${colors.gray[1]};
      position: absolute;
      bottom: 0;
      left: -1rem;
    }
    .writeTop_con {
      flex-direction: column;
      & > div {
        max-width: none;
        &:first-child {
          margin-right: 0;
          margin-bottom: 24px;
        }
        .top {
          margin-bottom: 10px;
          justify-content: space-between;
          .title {
            margin-right: 0;
          }
          .openHowToBtn {
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
            height: 48px;
            margin-right: 8px;
            background-color: ${colors.gray[1]};
            border: none;
            border-radius: 8px;
            padding: 12px 8px;
            font-size: 14px;
          }
          button {
            width: 48px;
            height: 48px;
            min-height: auto;
            border-radius: 8px;
            padding: 0;
            background-color: ${colors.blue[0]};
            display: flex;
            justify-content: center;
            align-items: center;
          }
          & > span {
            bottom: -27px;
          }
        }
      }
    }
  }
`;

export default WriteQuantTop;
