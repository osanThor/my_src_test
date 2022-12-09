import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import { INotUserModalType } from '@/src/interfaces/iCommon/iModal';
import { useRouter } from 'next/router';
import Button from '../../common/Button';

const ApiGuideModal = ({ open, onClose }: INotUserModalType) => {
  const router = useRouter();
  const handleCloseNever = () => {
    localStorage.setItem('ap_m_St', 'true');
    onClose();
  };
  return (
    <ApiGuideModalBlock open={open} onClose={onClose}>
      <ApiGuideModalCon>
        <div className="main">
          <h2>
            API KEY 등록전,
            <br />
            꼭! 읽어주세요.
          </h2>
          <p>
            <span className="bold">퀀트로</span>는 여러분의 API KEY를 <br />
            <span className="bold">암호화된 알고리즘 이중 보안 시스템</span>으로
            <br />
            <span className="bold">안전하게 보관</span>하고 있어요.
          </p>
          <p className="red bold">
            6개월 동안 무료로 사용할 수 있는
            <br />
            오픈베타 이벤트가 진행되고 있어요.
          </p>
          <p>
            API KEY, ID TOKEN이 노출 될 경우, <br />
            타인이 임의로 주문을 넣을 수 있으니,
            <br />
            변경이 필요 할 경우 1:1 문의를 통해 요청주세요.
          </p>
        </div>
        <div className=" btn btns">
          <StyledButton onClick={handleCloseNever}>다시 보지 않기</StyledButton>
          <StyledButton onClick={onClose}>확인</StyledButton>
        </div>
      </ApiGuideModalCon>
    </ApiGuideModalBlock>
  );
};
const ApiGuideModalBlock = styled(Dialog)`
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
const ApiGuideModalCon = styled(DialogContent)`
  &.MuiDialogContent-root {
    padding: 0;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .main {
      text-align: center;
      word-break: keep-all;
      margin-bottom: 57px;
      h2 {
        font-size: 2rem;
        font-family: 'GmarketSansBold';
        margin-bottom: 2rem;
        line-height: 2rem;
      }
      p {
        font-size: 1.25rem;
        margin-bottom: 20px;
        line-height: 2.75rem;
        &.red {
          color: ${colors.red[2]};
        }
        span.bold,
        &.bold {
          font-family: 'GmarketSansBold';
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .btn {
      display: flex;
      justify-content: center;
      white-space: nowrap;
      button {
        background-color: ${colors.blue[1]};
        width: auto;
        color: white;
        &:hover {
          background-color: ${colors.blue[2]};
          color: white;
          opacity: 0.7;
        }
      }
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
      .main {
        width: auto;
        text-align: center;
        margin-bottom: 1rem;
        h2 {
          font-size: 1.25rem;
          font-family: 'GmarketSansBold';
          margin-bottom: 20px;
        }
        p {
          font-size: 1rem;
          margin-bottom: 20px;
          line-height: 2rem;
          &.blue {
            color: ${colors.blue[2]};
          }
          span.bold {
            font-family: 'GmarketSansBold';
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
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

export default ApiGuideModal;
