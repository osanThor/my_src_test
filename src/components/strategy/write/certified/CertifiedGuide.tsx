import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';

const CertifiedGuide = () => {
  return (
    <CertifiedGuideBlock>
      <div className="left">
        <h2>인증 전략 요청하기</h2>
        <p>
          <b>퀀트로 전략 인증</b>하고 전문가 인증을 받으세요!
        </p>
        <p>
          인증할 전략의 제목을 입력해주세요! <span>*필수</span>
        </p>
        <p>
          인증할 전략의 내용을 입력해주세요! (자세히 입력할 수록 인증 받을 확률이 높아져요) <span>*필수</span>
        </p>
      </div>
      <ul>
        <li>
          거래소를 선택해주세요
          <span>*필수</span>
        </li>
        <li>
          대상종목을 입력해주세요
          <span>*필수</span>
        </li>
        <li>
          차트주기를 선택해주세요
          <span>*필수</span>
        </li>
        <li>
          누적 수익률을 입력해주세요
          <span>*필수</span>
        </li>
      </ul>
    </CertifiedGuideBlock>
  );
};

const CertifiedGuideBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background-color: ${colors.gray[0]};
  border-radius: 14px;
  padding: 1rem 36px;
  margin-bottom: 20px;
  color: ${colors.gray[5]};
  font-size: 14px;
  word-break: keep-all;
  .left {
    margin-right: 48px;
    h2 {
      font-size: 1.25rem;
      font-family: 'GmarketSansBold';
    }
  }
  ul {
    flex: 1;
  }
  span {
    font-size: 12px;
    margin-left: 7px;
    color: ${colors.red[2]};
  }

  ${media.pc} {
    padding: 1rem;
    flex-wrap: wrap;
    ul {
      padding-left: 20px;
      white-space: nowrap;
    }
  }
  ${media.tablet} {
    flex-direction: column;
    .left {
      width: 100%;
      margin: 0;
      margin-bottom: 20px;
    }
    ul {
      width: 100%;
      padding-left: 20px;
      white-space: nowrap;
    }
  }
`;

export default CertifiedGuide;
