import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';
import CertifiedGuide from './CertifiedGuide';

const WriteCertifiedCon = () => {
  return (
    <WriteCertifiedConBlock>
      <CertifiedGuide />
      <StyledInput placeholder="전략 제목을 입력해주세요" />
      <StyledTextarea placeholder="전략 내용을 입력해주세요.(설명은 자세할 수록 좋아요!)" />
      <div className="strategy_input_box">
        <div className="title">전략 입력</div>
        <div className="strategy_inputs">
          <div className="input">
            <div className="label">거래소</div>
          </div>
          <div className="input">
            <div className="label">대상종목</div>
            <input placeholder="대상종목을 입력해주세요" />
          </div>
          <div className="input">
            <div className="label">차트주기</div>
          </div>
          <div className="input">
            <div className="label">누적 수익률</div>
            <input type="number" placeholder="누적 수익률을 입력해주세요" />
          </div>
        </div>
      </div>
    </WriteCertifiedConBlock>
  );
};

const WriteCertifiedConBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .strategy_input_box {
    width: 100%;
    padding: 1rem 36px;
    background-color: ${colors.gray[0]};
    border-radius: 14px;
    .title {
      margin-bottom: 1rem;
    }
    .strategy_inputs {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .input {
        width: 50%;
        padding: 1rem 0;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .label {
          min-width: 100px;
          margin-right: 1rem;
          font-size: 14px;
        }
        input {
          width: 100%;
          height: 48px;
          padding: 1rem;
          font-size: 1rem;
          border-radius: 8px;
          border: 1px solid ${colors.blue[2]};
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
`;
const StyledInput = styled.input`
  width: 100%;
  height: 62px;
  padding: 0 36px;
  border-radius: 14px;
  font-size: 16px;
  border: 1px solid ${colors.blue[2]};
  margin-bottom: 8px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 16px;
    color: ${colors.gray[3]};
  }

  ${media.tablet} {
    height: 58px;
    padding: 0 16px;
  }
`;
const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 1rem 36px;
  border-radius: 14px;
  font-size: 16px;
  border: 1px solid ${colors.blue[2]};
  margin-bottom: 20px;
  resize: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 16px;
    color: ${colors.gray[3]};
  }

  ${media.tablet} {
    padding: 16px;
  }
`;

export default WriteCertifiedCon;
