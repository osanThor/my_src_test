import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const InquiryAnswer = () => {
  const { getInquiryResult } = useSelector(({ boards }: RootState) => ({
    getInquiryResult: boards.getInquiryResult,
  }));
  const { answer } = getInquiryResult;
  const viewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (answer) {
      if (!viewRef.current) {
        return;
      }
      viewRef.current.innerHTML = answer?.content;
    }
  }, [answer]);
  return (
    <InquiryAnswerBlock>
      <div className="answer_top">
        <div className={answer ? 'answer_status on' : 'answer_status'}>{answer ? '답변' : '대기'}</div>
      </div>
      {answer ? (
        <div className="answerView" ref={viewRef} />
      ) : (
        <div className="noAnswer">답변 대기중입니다. 조금만 기다려주세요!</div>
      )}
    </InquiryAnswerBlock>
  );
};

const InquiryAnswerBlock = styled.div`
  width: 100%;
  padding: 48px 0;
  .answer_top {
    margin-bottom: 20px;
    .answer_status {
      width: 64px;
      height: 32px;
      background-color: ${colors.gray[0]};
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${colors.gray[4]};
      &.on {
        background-color: ${colors.blue[0]};
        color: ${colors.blue[2]};
      }
    }
  }
  .noAnswer {
    word-break: keep-all;
  }
  .answerView {
    width: 100%;
    min-height: 300px;
    padding: 24px 36px;
    border: 1px solid ${colors.blue[2]};
    border-radius: 14px;
  }
  ${media.tablet} {
    padding: 20px 0;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  border: none;
  background-color: ${colors.gray[1]};
  resize: none;
  padding: 36px;
  font-size: 1rem;
  margin-bottom: 30px;
  &:focus {
    outline: none;
  }
`;

export default InquiryAnswer;
