import React, { Dispatch, SetStateAction } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import Image from 'next/image';
import { ArrowBottom, Close, Profile1, Profile2, Profile3, Profile4 } from '@/src/assets/Images';
import Button from '../../common/Button';
import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';

const TelegramModal = ({ onClose, open }: { onClose: () => void; open: boolean }) => {
  // 리스트 색상 이벤트
  const handleClickEvent = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    siblings(target, 'on');
  };
  function siblings(t: EventTarget & HTMLLIElement, className: string) {
    const children = t.parentElement.children;

    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove(className);
      t.classList.add(className);
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
        <h2>텔레그램 연동 방법</h2>
        <div className="descript">
          <ul>
            <li className="on" onClick={handleClickEvent}>
              <span className="num">1</span>
              <p>텔레그램에서 @quantro 추가</p>
            </li>
            <li onClick={handleClickEvent}>
              <span className="num">2</span>
              <p>퀀트로 봇에 /start 입력</p>
            </li>
            <li onClick={handleClickEvent}>
              <span className="num">3</span>
              <p>매매와 여러정보 알림 문구 생성</p>
            </li>
          </ul>
        </div>
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

  .descript {
    width: 100%;
    margin-bottom: 1rem;
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

  ${media.tablet} {
    &.MuiDialogContent-root {
      padding: 48px 20px;
    }
    .modalTopCon {
      padding: 12px;
    }
    .descript {
      width: 100%;
      margin-bottom: 1rem;
      ul {
        li {
          padding: 18px 8px;
        }
      }
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

const StyledButton = styled(Button)`
  width: 160px;
  height: 48px;
  border-radius: 24px;
  background-color: ${colors.blue[0]};
  color: ${colors.blue[2]};
  &:hover {
    background-color: ${colors.blue[0]};
    opacity: 0.7;
  }
`;

export default TelegramModal;
