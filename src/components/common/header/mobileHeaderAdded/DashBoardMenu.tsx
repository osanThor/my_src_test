import colors from '@/src/assets/Colors';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DashBoardMenu = () => {
  const [point1, setPoint1] = useState(true);
  const [point2, setPoint2] = useState(false);
  const [point3, setPoint3] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', scrollTracker);
    return () => {
      window.removeEventListener('scroll', scrollTracker); //clean up
    };
  }, []);
  function scrollTracker() {
    if (window.scrollY < 509) {
      setPoint1(true);
      setPoint2(false);
      setPoint3(false);
    } else if (window.scrollY < 633) {
      setPoint1(false);
      setPoint2(true);
      setPoint3(false);
    } else {
      setPoint1(false);
      setPoint2(false);
      setPoint3(true);
    }
  }
  return (
    <DashBoardMenuBlock>
      <a className={point1 ? 'on' : ''} href="#point1">
        총 포지션 현황
      </a>
      <a className={point2 ? 'on' : ''} href="#point2">
        총 누적 평가손익
      </a>
      <a className={point3 ? 'on' : ''} href="#point3">
        현재 계좌 잔고
      </a>
    </DashBoardMenuBlock>
  );
};

const DashBoardMenuBlock = styled.div`
  width: 100%;
  height: 40px;
  position: absolute;
  top: 100%;
  left: 0;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.gray[1]};
  background-color: ${({ theme }) => theme.bgColor};
  overflow-x: auto;
  a {
    width: 33.333%;
    min-width: 107px;
    line-height: 37px;
    font-size: 14px;
    text-align: center;
    color: ${colors.gray[3]};
    white-space: nowrap;
    position: relative;
    &.on {
      font-family: 'GmarketSansBold';
      font-weight: 800;
      color: ${colors.blue[2]};
      &::after {
        content: '';
        width: 100%;
        height: 2px;
        background-color: ${colors.blue[2]};
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }
`;
export default DashBoardMenu;
