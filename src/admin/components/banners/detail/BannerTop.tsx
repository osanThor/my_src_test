import colors from '@/src/assets/Colors';
import { WebHook } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { Radio, RadioGroup } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CustomSelect from './items/CustomSelect';

const BannerTop = () => {
  const { getBannerDetailResult } = useSelector(({ adminBanners }: RootState) => ({
    getBannerDetailResult: adminBanners.getBannerDetailResult,
  }));
  const [pcFileName, setPcFileName] = useState('');
  const [position, setPosition] = useState('');
  return (
    <BannerTopBlock>
      <div className="title">배너상세</div>
      <div className="pc_banner_image">
        <Image src={WebHook[0]} alt="pc_banner_image" layout="intrinsic" />
      </div>
      <div className="pc_banner_crtl">
        <div className="ctrl_con">
          <div className="title">이미지 등록</div>
          <label>
            <input name="file2" type="file" accept=".gif, .jpg, .png" />
            <span className="file_button">파일 선택</span>
          </label>
          <span className="fileName">{pcFileName ? pcFileName : '선택된 파일 없음'}</span>
        </div>
        <div className="ctrl_con">
          <div className="title">노출 위치</div>
          <CustomSelect place={getBannerDetailResult?.position} setSearchName={setPosition} />
        </div>
        <div className="ctrl_con">
          <div className="title">노출 여부</div>
          <RadioGroup style={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row' }}>
            <label>
              <Radio name="isVisiblePc" value={true} checked={getBannerDetailResult?.isVisiblePc} />
              노출
            </label>
            <label>
              <Radio name="isVisiblePc" value={false} checked={!getBannerDetailResult?.isVisiblePc} />
              미노출
            </label>
          </RadioGroup>
        </div>
      </div>
    </BannerTopBlock>
  );
};

const BannerTopBlock = styled.div`
  width: 100%;
  margin-bottom: 56px;
  .pc_banner_image {
    width: 100%;
    min-height: 320px;
    margin-bottom: 20px;
    height: auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${colors.gray[2]};
    background-color: ${colors.gray[0]};
    border-radius: 8px;
    padding: 1rem;
    img {
      max-width: 100%;
    }
  }
  .pc_banner_crtl {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .ctrl_con {
      width: 49%;
      min-width: 542px;
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid ${colors.gray[2]};
      &:nth-child(2n-1) {
        margin-right: 2%;
      }
      .title {
        width: 100px;
        color: ${colors.gray[5]};
        margin: 0;
        margin-right: 1rem;
      }
      label {
        margin-right: 1rem;
        cursor: pointer;
        input[type='file'] {
          display: none;
        }
        span.file_button {
          cursor: pointer;
          display: inline-block;
          padding: 6px 16px;
          color: ${colors.dark[1]};
          border: 1px solid ${colors.gray[5]};
          border-radius: 8px;
          transition: all 0.2s;
          &:hover {
            background-color: ${colors.gray[1]};
          }
        }
      }
    }
  }
  .fileName {
    color: ${colors.gray[2]};
    flex: 1;
  }
`;

export default BannerTop;
