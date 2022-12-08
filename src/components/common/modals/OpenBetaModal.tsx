import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import Button from '../Button';
import { INotUserModalType } from '@/src/interfaces/iCommon/iModal';
import { useRouter } from 'next/router';

const OpenBetaModal = ({ open, onClose }: INotUserModalType) => {
  const router = useRouter();
  const handleCloseGotoHome = () => {
    router.push('/');
    onClose();
  };
  return (
    <OpenBetaModalBlock open={open} onClose={onClose}>
      <OpenBetaModalCon>
        <div className="main">
          <h2>
            시스템트레이딩 통합주문 플랫폼 퀀트로
            <br /> 오픈베타 서비스 안내
          </h2>
          <p>
            안녕하세요.
            <br />
            2023년 1월 1일, <span className="bold">퀀트로</span> 오픈베타 서비스가 오픈되었어요.
          </p>
          <p className="blue">
            6개월 동안 무료로 사용할 수 있는
            <br />
            오픈베타 이벤트가 진행되고 있어요.
          </p>
          <p>
            시스템 트레이딩 프로그램 주문 외 기능은 추후 업데이트 될 예정이니,
            <br />
            <span className="bold">퀀트로</span>의 자세한 소개는 홈페이지를 통해 확인해주세요.
          </p>
          <p>
            퀀트투자의 길을 열어주는 <span className="bold">퀀트로</span>! <br />
            많은 사랑과 관심 부탁드려요.
          </p>
        </div>
        <div className=" btn btns">
          <StyledButton onClick={handleCloseGotoHome}>홈페이지 바로가기</StyledButton>
          <StyledButton onClick={onClose}>확인</StyledButton>
        </div>
      </OpenBetaModalCon>
    </OpenBetaModalBlock>
  );
};
const OpenBetaModalBlock = styled(Dialog)`
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
const OpenBetaModalCon = styled(DialogContent)`
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
        margin-bottom: 20px;
      }
      p {
        font-size: 1.25rem;
        margin-bottom: 20px;
        line-height: 2.75rem;
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

export default OpenBetaModal;
