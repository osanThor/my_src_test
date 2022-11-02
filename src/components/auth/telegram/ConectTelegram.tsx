import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';

const ConectTelegram = () => {
  return (
    <ConnectTelegramBlock>
      <StyledButton href="https://t.me/quantro_alarm_bot">
        <a target="_blank">링크 접속</a>
      </StyledButton>
    </ConnectTelegramBlock>
  );
};

const ConnectTelegramBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;

  a {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: white;
    border-radius: 14px;
    line-height: 72px;
    background-color: ${colors.blue[2]};
    transition: all 0.2s;
    &:hover {
      background: ${colors.blue[1]};
    }
  }
  ${media.tablet} {
    a {
      font-size: 14px;
      line-height: 56px;
    }
  }
`;
const StyledButton = styled(Button)`
  height: 72px;
  ${media.tablet} {
    height: 56px;
  }
`;
export default ConectTelegram;
