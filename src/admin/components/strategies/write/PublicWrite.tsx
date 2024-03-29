import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from '@/src/assets/Colors';
import { Input } from '@mui/material';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('@/src/admin/components/common/Editor/Editor'), { ssr: false });
import { adminStrategiesActions } from '@/src/store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import CustomSelect from './items/CustomSelect';
import { RootState } from '@/src/store/configureStore';
import { axiosInstance } from '@/src/store/api';

const platformOptions = [
  { txt: 'BYBIT', value: 'BYBIT' },
  { txt: 'BINANCE', value: 'BINANCE' },
  { txt: 'BITGET', value: 'BITGET' },
];

const chartCycleOptions = [
  { txt: 'M1', value: 'M1' },
  { txt: 'M3', value: 'M3' },
  { txt: 'M5', value: 'M5' },
  { txt: 'M15', value: 'M15' },
  { txt: 'M30', value: 'M30' },
  { txt: 'M45', value: 'M45' },
  { txt: 'H1', value: 'H1' },
  { txt: 'H2', value: 'H2' },
  { txt: 'H3', value: 'H3' },
  { txt: 'H4', value: 'H4' },
  { txt: 'D1', value: 'D1' },
  { txt: 'W1', value: 'W1' },
];

const PublicWrite = () => {
  const dispatch = useDispatch();
  const { content, quantroStrategyPayload, getAdminStrategyDetailResult } = useSelector(
    ({ adminStrategies }: RootState) => ({
      content: adminStrategies.content,
      quantroStrategyPayload: adminStrategies.quantroStrategyPayload,
      getAdminStrategyDetailResult: adminStrategies.getAdminStrategyDetailResult,
    }),
  );
  const [platform, setPlatForm] = useState('');
  const [chartCycle, setChartCycle] = useState('');
  const [fileUrls, setfileUrls] = useState<Array<string>>([]);
  const [fileUrl, setfileUrl] = useState('');

  useEffect(() => {
    if (getAdminStrategyDetailResult) {
      if (getAdminStrategyDetailResult?.strategy?.platform) {
        setPlatForm(getAdminStrategyDetailResult?.strategy?.platform);
      }
      if (getAdminStrategyDetailResult?.strategy?.chartCycle) {
        setChartCycle(getAdminStrategyDetailResult?.strategy?.chartCycle);
      }
      if (getAdminStrategyDetailResult?.files) {
        setfileUrls(getAdminStrategyDetailResult?.files?.map((file) => file.url));
        setfileUrl(getAdminStrategyDetailResult?.files[0].url);
      }
    }
  }, [getAdminStrategyDetailResult]);

  console.log(chartCycle);

  function handleChangeQuantroStrategyField(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === 'title') {
      dispatch(
        adminStrategiesActions.changeQuantroStrategyField({
          title: value,
          category: 'QUANTRO_STRATEGY',
          content,
          platform,
          symbol: quantroStrategyPayload?.symbol,
          chartCycle,
          profitPct: quantroStrategyPayload?.profitPct,
          fileUrls,
        }),
      );
    } else if (name === 'symbol') {
      dispatch(
        adminStrategiesActions.changeQuantroStrategyField({
          title: quantroStrategyPayload?.title,
          category: 'QUANTRO_STRATEGY',
          content,
          platform,
          symbol: value,
          chartCycle,
          profitPct: quantroStrategyPayload?.profitPct,
          fileUrls,
        }),
      );
    } else if (name === 'profitPct') {
      dispatch(
        adminStrategiesActions.changeQuantroStrategyField({
          title: quantroStrategyPayload?.title,
          category: 'QUANTRO_STRATEGY',
          content,
          platform,
          symbol: quantroStrategyPayload?.symbol,
          chartCycle,
          profitPct: parseInt(value),
          fileUrls,
        }),
      );
    }
  }
  const handleChangeContents = (val: string) => {
    dispatch(
      adminStrategiesActions.changeContent({
        content: val,
      }),
    );
    dispatch(
      adminStrategiesActions.changeQuantroStrategyField({
        title: quantroStrategyPayload?.title,
        category: 'QUANTRO_STRATEGY',
        content: val,
        platform,
        symbol: quantroStrategyPayload?.symbol,
        chartCycle,
        profitPct: quantroStrategyPayload?.profitPct,
        fileUrls,
      }),
    );
  };
  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const formData = new FormData();

    if (files.length === 0) {
      return;
    } else {
      formData.append('files', files[0]);
    }
    const res = await axiosInstance.post(`/admin/uploads/files?zone=STRATEGY`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res) {
      setfileUrls([res.data.urls[0]]);
      setfileUrl(res.data.urls[0]);
      dispatch(
        adminStrategiesActions.changeQuantroStrategyField({
          title: quantroStrategyPayload?.title,
          category: 'QUANTRO_STRATEGY',
          content: quantroStrategyPayload?.content,
          platform,
          symbol: quantroStrategyPayload?.symbol,
          chartCycle,
          profitPct: quantroStrategyPayload?.profitPct,
          fileUrls: [res.data.urls[0]],
        }),
      );
    }
  };
  console.log(quantroStrategyPayload);

  return (
    <PublicWriteBlock>
      <Input
        name="title"
        placeholder="전략 이름이 들어가는 곳이에요"
        value={quantroStrategyPayload?.title || ''}
        sx={{ width: '100%', height: '58px', p: 2, fontFamily: 'GmarketSans', mb: '20px' }}
        onChange={handleChangeQuantroStrategyField}
      />
      <Editor onChange={handleChangeContents} />
      <div className="add_exchange">
        <div className="con">
          <div className="con_label">거래소 입력란</div>
          <CustomSelect options={platformOptions} place={platform} setSearchName={setPlatForm} />
        </div>
        <div className="con">
          <div className="con_label">대상종목 입력란</div>
          <Input
            name="symbol"
            placeholder="대상종목을 입력해주세요"
            value={quantroStrategyPayload?.symbol || ''}
            sx={{ width: '100%', height: '48px', p: 2, fontFamily: 'GmarketSans' }}
            onChange={handleChangeQuantroStrategyField}
          />
        </div>
        <div className="con">
          <div className="con_label">차트주기 입력란</div>
          <CustomSelect options={chartCycleOptions} place={chartCycle} setSearchName={setChartCycle} />
        </div>
        <div className="con">
          <div className="con_label">누적 수입률 입력란</div>
          <Input
            name="profitPct"
            type="number"
            placeholder="누적 수입률을 입력해주세요"
            value={quantroStrategyPayload?.profitPct || ''}
            sx={{ width: '100%', height: '48px', p: 2, fontFamily: 'GmarketSans' }}
            onChange={handleChangeQuantroStrategyField}
          />
        </div>
      </div>
      <div className="file">
        <div className="file_label">파일 업로드</div>
        <label>
          <input type="file" onChange={handleChangeImage} />
          <span className="button">파일 업로드</span>
        </label>
        <div className="filename">{fileUrl ? fileUrl : '선택 파일이 없습니다'}</div>
        <span className="guide">※ 해당 전략의 백테스트 결과를 캡쳐한 이미지를 업로드해주세요.</span>
      </div>
    </PublicWriteBlock>
  );
};

const PublicWriteBlock = styled.div`
  width: 100%;
  .add_exchange {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    .con {
      width: 50%;
      padding: 7px 1rem;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      .con_label {
        white-space: nowrap;
        width: 180px;
        font-family: 'GmarketSansBold';
        color: ${colors.gray[5]};
        font-size: 1rem;
        margin-right: 1rem;
      }
    }
  }
  .file {
    width: 50%;
    padding: 7px 1rem;
    display: flex;
    align-items: center;
    position: relative;
    .file_label {
      white-space: nowrap;
      width: 180px;
      font-family: 'GmarketSansBold';
      color: ${colors.gray[5]};
      font-size: 1rem;
      margin-right: 1rem;
    }
    label {
      cursor: pointer;
      margin-right: 1rem;
      input {
        display: none;
      }
      span.button {
        padding: 7px 1rem;
        border: 1px solid ${colors.gray[4]};
        border-radius: 8px;
        transition: all 0.2s;
        &:hover {
          background-color: ${colors.gray[1]};
        }
      }
    }
    .filename {
      width: 70%;
      flex: 1;
      color: ${colors.gray[3]};
      white-space: nowrap;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .guide {
      width: 100%;
      position: absolute;
      font-size: 12px;
      color: ${colors.gray[4]};
      top: -10%;
      left: 212px;
      transform: translateY(-100%);
    }
  }
`;

export default PublicWrite;
