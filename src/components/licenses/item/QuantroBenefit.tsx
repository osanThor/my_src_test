import colors from '@/src/assets/Colors';
import { CheckBlueIcon } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const QuantroBenefit = () => {
  return (
    <QuantroBenefitBlock>
      <div className="title">퀀트로는 이런점이 좋아요</div>
      <ul className="benefit_list">
        <li>
          <div className="icon">
            <Image src={CheckBlueIcon} alt="check" />
          </div>
          <span>대시보드 제공으로 편리한 자산관리</span>
        </li>
        <li>
          <div className="icon">
            <Image src={CheckBlueIcon} alt="check" />
          </div>
          <span>트레이딩뷰 웹훅 url 자동매매 지원</span>
        </li>
        <li>
          <div className="icon">
            <Image src={CheckBlueIcon} alt="check" />
          </div>
          <span>전략개발 의뢰서비스(준비중)</span>
        </li>
        <li>
          <div className="icon">
            <Image src={CheckBlueIcon} alt="check" />
          </div>
          <span>전략가의 트레이딩 노하우 공개</span>
        </li>
        <li>
          <div className="icon">
            <Image src={CheckBlueIcon} alt="check" />
          </div>
          <span>PC, 모바일 언제 어디서나 이용가능</span>
        </li>
        <li>
          <div className="icon">
            <Image src={CheckBlueIcon} alt="check" />
          </div>
          <span>텔레그램 알람봇 지원</span>
        </li>
        <li>
          <div className="icon">
            <Image src={CheckBlueIcon} alt="check" />
          </div>
          <span>커뮤니티운영으로 빠른 유저 피드백</span>
        </li>
      </ul>
    </QuantroBenefitBlock>
  );
};
const QuantroBenefitBlock = styled.div`
  width: 100%;
  height: 100%;
  min-height: 434px;
  padding: 1rem;
  background-color: ${colors.blue[0]};
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${colors.blue[2]};
  .title {
    font-size: 20px;
    font-family: 'GmarketSansBold';
    margin-bottom: 24px;
  }

  ul {
    list-style: none;
    li {
      display: flex;
      margin-bottom: 10px;
      align-items: center;
      .icon {
        min-width: 18px;
        width: 18px;
        height: 18px;
        position: relative;
        transform: translateY(-2px);
        margin-right: 8px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  ${media.tablet} {
    padding: 20px;
    min-height: auto;
  }
`;
export default QuantroBenefit;
