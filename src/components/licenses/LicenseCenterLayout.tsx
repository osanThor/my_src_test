import React from 'react';
import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import { GuidGoIcon } from '@/src/assets/Images';
import QuantroBenefit from './item/QuantroBenefit';

const LicenseCenterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LicenseCenterLayoutBlock>
      <div className="lecense_title">
        <h2>이용권 등록</h2>
        <div className="how_to_api_btn dis_p">
          <span>인증키등록 & 구매가이드</span>
          <div className="icon">
            <Image src={GuidGoIcon[0]} alt="quide" />
          </div>
        </div>
      </div>
      <div className="license_main">
        <div className="license_main_con">{children}</div>
        <div className="license_description">
          <QuantroBenefit />
        </div>
      </div>
      <div className="lecense_bot dis_m">
        <div className="how_to_api_btn dis_m">
          <span>인증키등록 & 구매가이드</span>
          <div className="icon">
            <Image src={GuidGoIcon[0]} alt="quide" />
          </div>
        </div>
      </div>
    </LicenseCenterLayoutBlock>
  );
};

const LicenseCenterLayoutBlock = styled.div`
  .dis_m {
    display: none;
  }
  .how_to_api_btn {
    padding: 6px 20px;
    background-color: ${colors.gray[0]};
    border-radius: 16px;
    cursor: pointer;
    display: flex;
    font-size: 14px;
    color: ${colors.gray[5]};
    align-items: center;
    transition: all 0.2s;
    & > span {
      transform: translateY(2px);
    }
    .icon {
      width: 18px;
      min-width: 18px;
      height: 18px;
      margin-left: 12px;
    }

    &:hover {
      background-color: ${colors.gray[2]};
    }
  }
  .lecense_title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 22px;
    h2 {
      font-family: 'GmarketSansBold';
      font-size: 20px;
    }
  }
  .license_main {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .license_main_con {
      width: 100%;
      margin-right: 20px;
    }
    .license_description {
      width: 100%;
      max-width: 480px;
    }
  }

  ${media.tablet} {
    .dis_p {
      display: none;
    }
    .dis_m {
      display: flex;
    }
    .lecense_title {
      h2 {
        font-size: 16px;
      }
    }
    .lecense_bot {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

export default LicenseCenterLayout;
