import React from 'react';
import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import styled from 'styled-components';
import Image from 'next/image';
import { GuidGoIcon, Mark } from '@/src/assets/Images';
import QuantroBenefit from './item/QuantroBenefit';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import PaymentGuide from './item/PaymentGuide';

const LicenseCenterLayout = ({ children }: { children: React.ReactNode }) => {
  const { licenseIndex, licenseExchange, licenseRegular, licensePremium } = useSelector(({ local }: RootState) => ({
    licenseIndex: local.licenseIndex,
    licenseExchange: local.licenseExchange,
    licenseRegular: local.licenseRegular,
    licensePremium: local.licensePremium,
  }));
  return (
    <LicenseCenterLayoutBlock>
      <div className="license_title">
        <h2>이용권 등록</h2>
        {/* <div className="how_to_api_btn dis_p">
          <span>인증키등록 & 구매가이드</span>
          <div className="icon">
            <Image src={GuidGoIcon[0]} alt="quide" />
          </div>
        </div> */}
      </div>
      <div className="license_main">
        {children}
        <div className="license_description">{licenseIndex ? <QuantroBenefit /> : <PaymentGuide />}</div>
      </div>
      {/* <div className="license_bot dis_m">
        <div className="how_to_api_btn dis_m">
          <span>인증키등록 & 구매가이드</span>
          <div className="icon">
            <Image src={GuidGoIcon[0]} alt="quide" />
          </div>
        </div>
      </div> */}
      <div className="notice" id="point3">
        <div className="icon">
          <Image src={Mark} alt="mark" />
        </div>
        <span>자동매매할 거래소의 API Key를 생성한 후 아래의 해당 입력란에 저장해주세요</span>
      </div>
    </LicenseCenterLayoutBlock>
  );
};

const LicenseCenterLayoutBlock = styled.div`
  width: 100%;
  margin-bottom: 48px;
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
  .license_title {
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
    margin-bottom: 20px;

    .license_main_con {
      width: 100%;
      display: flex;
      margin-right: 42px;
    }
    .license_description {
      width: 100%;
      max-width: 504px;
    }
  }

  .notice {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: ${colors.gray[0]};
    padding: 14px 24px;
    border-radius: 8px;
    .icon {
      width: 18px;
      min-width: 18px;
      height: 18px;
      margin-right: 8px;
    }
    & > span {
      color: ${colors.gray[4]};
      transform: translateY(2px);
    }
  }

  ${media.custom(1590)} {
    .license_main {
      .license_main_con {
        margin-right: 20px;
      }
      .license_description {
      }
    }
  }
  ${media.custom(1490)} {
    margin-bottom: 24px;
    .dis_p {
      display: none;
    }
    .dis_m {
      display: flex;
    }
    .license_title {
      h2 {
        font-size: 16px;
      }
    }
    .license_main {
      flex-direction: column;
      .license_main_con {
        margin-bottom: 20px;
      }
      .license_description {
        width: 100%;
        max-width: none;
      }
    }
    .license_bot {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 20px;
    }
  }
`;

export default LicenseCenterLayout;
