import colors from '@/src/assets/Colors';
import { CheckBlueIcon } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';

const ExplaneService = ({ onClick }: { onClick: () => void }) => {
  return (
    <ExplaneBlock>
      <h2>이런 이유로 텔레그램 연동을 추천해요!</h2>
      <div className="description">
        <h3>퀀트로 알람 텔레그램!!</h3>
        <ul>
          <li>주문내역 실시간 알림 수신</li>
          <li>퀀트로 안내사항 수신</li>
          <li>이벤트 혜택 공지</li>
        </ul>
      </div>
      <StyledButton fullWidth blue onClick={onClick}>
        연동하기
      </StyledButton>
    </ExplaneBlock>
  );
};

const ExplaneBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  h2 {
    font-size: 20px;
    font-weight: 700;
  }
  .description {
    width: 100%;
    margin-bottom: 1rem;
    overflow-y: auto;
    padding: 1rem 0;
    h3 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: ${colors.blue[2]};
      font-family: 'GmarketSansBold';
    }
    ul {
      list-style: none;
      li {
        position: relative;
        font-size: 1.125rem;
        margin-bottom: 1rem;
        padding-left: 3rem;
        line-height: 48px;
        border: 1px solid ${colors.blue[2]};
        border-radius: 8px;
        &::before {
          content: '';
          width: 24px;
          height: 24px;
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: url(${CheckBlueIcon.src}) no-repeat 50% / cover;
        }
      }
    }
  }

  ${media.tablet} {
    h2 {
      font-size: 18px;
    }
  }
`;
const StyledButton = styled(Button)`
  height: 72px;
  ${media.tablet} {
    height: 56px;
  }
`;
export default ExplaneService;
