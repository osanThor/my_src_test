import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';

const PaymentGuide = () => {
  return (
    <PaymentGuideBlock>
      <div className="title">결제 안내사항</div>
      <ul className="benefit_list">
        <li>
          <span>
            레퍼럴로 가입된 계정을 등록하시면 평생 무료로 이용가능해요 사용하고자 하는 거래소를 선택하여 접속된 링크로
            가입하면 레퍼럴 등록이 완료됩니다.
          </span>
        </li>
        <li>
          <span>암호화폐로 결제시 코인의 수량은 현재 시세를 반영하여 자동으로 수량이 계산돼요</span>
        </li>
        <li>
          <span>결제는 암호화폐로 결제 가능하며 기타 결제 방법은 아래 메신저로 문의주세요</span>
        </li>
        <li>
          <span>무통장입금시 입금자 성함과 이메일을 정확하게 작성해주세요.</span>
        </li>
        <li>
          <span>무통장입금은 입금이 반영되는데 1일이상 소요 될 수 있어요.</span>
        </li>
      </ul>
    </PaymentGuideBlock>
  );
};
const PaymentGuideBlock = styled.div`
  width: 100%;
  height: 100%;
  min-height: 434px;
  padding: 40px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${colors.gray[5]};
  background-color: ${colors.gray[0]};
  .title {
    color: ${colors.dark[0]};
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    li {
      margin-bottom: 20px;
      padding-left: 1rem;
      font-size: 14px;
      align-items: center;
      position: relative;
      word-break: keep-all;
      &::after {
        content: '';
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: ${colors.gray[5]};
        position: absolute;
        z-index: 6;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  ${media.custom(1490)} {
    min-height: auto;
  }
  ${media.tablet} {
    padding: 20px;
    min-height: auto;
    ul {
      li {
        margin-bottom: 8px;
        padding-left: 12px;
        font-size: 14px;
        align-items: center;
        position: relative;
        &::after {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: ${colors.gray[5]};
          position: absolute;
          z-index: 6;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
`;
export default PaymentGuide;
