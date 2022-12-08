import colors from '@/src/assets/Colors';
import { AcountPlusIcon, ResetIcon } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import AcountTable from './item/AcountTable';
import CustomSelect from './item/CustomSelect';

const AddApiKeyCon = ({ handleNoLicenseClick }: { handleNoLicenseClick: () => void }) => {
  return (
    <AddApiKeyConBlock>
      <div className="addAPi_title">
        <h2>API Key 등록</h2>
        <div className="api_contrl">
          <Button>
            <div className="icon">
              <Image src={ResetIcon[1]} alt="reset" />
            </div>
            <span>동기화</span>
          </Button>
          <CustomSelect place="추가 거래소 선택" options={[]} />
          <Button blue>
            <div className="icon">
              <Image src={AcountPlusIcon} alt="icon" />
            </div>
            <span>계정추가</span>
          </Button>
        </div>
      </div>
      <div className="acount_table">
        <AcountTable handleNoLicenseClick={handleNoLicenseClick} />
      </div>
    </AddApiKeyConBlock>
  );
};

const AddApiKeyConBlock = styled.div`
  width: 100%;
  .addAPi_title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    flex-wrap: wrap;
    h2 {
      font-size: 20px;
      font-family: 'GmarketSansBold';
    }
    .api_contrl {
      display: flex;
      position: relative;
      button {
        min-height: auto;
        height: 48px;
        display: flex;
        align-items: center;
        padding: 16px;
        font-size: 14px;
        .icon {
          width: 18px;
          height: 18px;
          min-width: 18px;
          margin-right: 8px;
        }
        background-color: white;
        border: 1px solid ${colors.gray[2]};

        &:hover {
          background-color: ${colors.gray[1]};
        }
        &:last-child {
          background-color: ${colors.blue[2]};
          margin-left: 16px;
          &:hover {
            background-color: ${colors.blue[1]};
          }
        }
      }
    }
  }
  .acount_table {
    width: 100%;
    max-height: 500px;
    position: relative;
    overflow-y: auto;
    padding: 0 7px;
  }
  ${media.pc} {
    .acount_table {
      padding: 0 0;
    }
  }
  ${media.custom(1200)} {
    .addAPi_title {
      h2 {
        font-size: 16px;
      }
    }
    .acount_table {
      padding: 0;
    }
  }
  ${media.custom(1000)} {
    .addAPi_title {
      width: 100%;
      flex-direction: column;
      justify-content: space-between;
      h2 {
        width: 100%;
        margin-bottom: 20px;
        font-size: 16px;
      }
      .api_contrl {
        width: 100%;
        button {
          width: 100%;
          max-width: 112px;
          min-width: 112px;
          height: 40px;
          text-align: center;
          .icon {
            margin-right: 4px;
          }
          & > span {
            width: 100%;
          }
          &:first-child {
            position: absolute;
            z-index: 900;
            top: 0;
            transform: translateY(-110%);
            right: 0;
          }
        }
      }
    }
  }
`;

export default AddApiKeyCon;
