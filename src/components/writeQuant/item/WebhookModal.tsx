import React, { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import Image from 'next/image';
import { ArrowBottom, Close, WebHook } from '@/src/assets/Images';
import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';

const WebhookModal = ({ onClose, open }: { onClose: () => void; open: boolean }) => {
  // 리스트 색상 이벤트
  const handleClickEvent = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    siblings(target, 'on');
  };
  const [num, setNum] = useState(0);
  function siblings(t: EventTarget & HTMLLIElement, className: string) {
    const children = t.parentElement.children;

    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove(className);
      t.classList.add(className);
      if (children[i] === t) {
        setNum(i);
      }
    }
  }

  return (
    <DialogBlock onClose={onClose} open={open}>
      <ModalCon>
        <div className="modalTopCon">
          <span className="closeBtn" onClick={onClose}>
            <Image src={Close} alt="closeBtn" />
          </span>
        </div>
        <h2>웹훅 URL 안내</h2>
        <div className="main_box">
          <div className="descript">
            <ul>
              <li className="on" onClick={handleClickEvent}>
                <span className="num">1</span>
                <p>TradingView 전략 테스트 클릭</p>
              </li>
              <li onClick={handleClickEvent}>
                <span className="num">2</span>
                <p>얼러트 생성</p>
              </li>
              <li onClick={handleClickEvent}>
                <span className="num">3</span>
                <p>웹훅 URL 체크</p>
              </li>
              <li onClick={handleClickEvent}>
                <span className="num">4</span>
                <p>퀀트로 서버 URL 복사/붙여넣기</p>
              </li>
            </ul>
          </div>
          <div className="ImageBox">{num <= 2 && <Image src={WebHook[num]} alt="webhook" />}</div>
        </div>
      </ModalCon>
    </DialogBlock>
  );
};

const DialogBlock = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 14px;
    max-width: none;
  }
`;

const ModalCon = styled(DialogContent)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  &.MuiDialogContent-root {
    padding: 48px 40px 40px;
  }
  h2 {
    font-size: 1.625rem;
    color: ${colors.blue[2]};
    margin-bottom: 30px;
    font-family: 'GmarketSansBold';
  }
  .modalTopCon {
    width: 100%;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    justify-content: flex-end;
    margin-bottom: 1.5rem;
    padding: 28px;

    .closeBtn {
      cursor: pointer;
      width: 24px;
      height: 24px;
    }
  }

  .main_box {
    width: 100%;
    display: flex;
  }
  .descript {
    margin-right: 32px;
    ul {
      width: 100%;
      li {
        width: 100%;
        list-style: none;
        display: flex;
        align-items: center;
        padding: 18px 20px;
        background-color: ${colors.gray[0]};
        border-radius: 14px;
        margin-bottom: 28px;
        position: relative;
        transition: all 0.2s;
        cursor: pointer;
        position: relative;

        span.num {
          width: 24px;
          padding: 3px 0 0;
          border-radius: 50%;
          font-size: 14px;
          background-color: ${colors.gray[5]};
          text-align: center;
          color: white;
          margin-right: 0.5rem;
        }
        p {
          transform: translateY(2px);
          flex: 1;
        }

        &.on {
          background-color: ${colors.blue[0]};
          color: ${colors.blue[2]};
          span.num {
            background-color: ${colors.blue[2]};
          }
        }
        &::after {
          content: '';
          width: 24px;
          height: 24px;
          background: url(${ArrowBottom.src}) no-repeat 50% / cover;
          position: absolute;
          bottom: -39px;
          left: 50%;
          transform: translate(-50%, -50%);
          cursor: auto;
        }
        &:last-child {
          margin-bottom: 0;
          &::after {
            display: none;
          }
        }
      }
    }
  }
  .ImageBox {
    width: 568px;
    transition: all 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${media.tablet} {
    &.MuiDialogContent-root {
      padding: 48px 20px 20px;
    }
    .modalTopCon {
      padding: 12px;
    }
    .main_box {
      flex-direction: column;
    }
    .descript {
      width: 100%;
      order: 2;
      margin-right: 0;
      margin-bottom: 1rem;
      ul {
        li {
          padding: 18px 8px;
        }
      }
    }
    .ImageBox {
      width: 100%;
      order: 1;
      margin-bottom: 20px;
    }
  }

  @media (max-width: 364px) {
    .imageTypes {
      & > div {
        margin-right: 1rem;
      }
      .charIcon {
        ul {
          width: 100%;
          li {
          }
        }
      }
    }
  }
`;

export default WebhookModal;
