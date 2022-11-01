import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Timer = ({ error, setError }: { error: boolean; setError: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [minutes, setMinutes] = useState<any>(3);
  const [seconds, setSeconds] = useState<any>(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      setError(false);
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
          setError(true);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <TimerBlock className="timer">
      <p className={error ? 'err' : 'noErr'}>
        ※ 남은시간 {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>
    </TimerBlock>
  );
};

const TimerBlock = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  transform: translateY(155%);
  z-index: 9;
  font-size: 14px;

  p.noErr {
    color: ${colors.blue[2]};
  }
  p.err {
    color: ${colors.red[2]};
  }

  ${media.tablet} {
    font-size: 12px;
  }
`;

export default Timer;
