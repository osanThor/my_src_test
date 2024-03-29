import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import { Input } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CustomSelect from '../../write/items/CustomSelect';

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

const UserStrategyCon = ({
  platform,
  setPlatForm,
  chartCycle,
  setChartCycle,
  handleChangeImage,
  filUrl,
}: {
  platform: string | null;
  setPlatForm: React.Dispatch<React.SetStateAction<string>>;
  chartCycle: string | null;
  setChartCycle: React.Dispatch<React.SetStateAction<string>>;
  handleChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filUrl: string | null;
}) => {
  const { content, getAdminStrategyDetailResult } = useSelector(({ adminStrategies }: RootState) => ({
    content: adminStrategies.content,
    getAdminStrategyDetailResult: adminStrategies.getAdminStrategyDetailResult,
  }));

  const ViewContentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ViewContentsRef.current) {
      ViewContentsRef.current.innerHTML = content;
    }
  }, [content]);
  return (
    <UserStrategyConBlock>
      <div className="certified_request">
        <div className="title_user">
          <Input
            placeholder="전략 제목(사용자가 작성한 전략명)"
            sx={{ width: '50%', height: '58px', p: 2, fontFamily: 'GmarketSans', mr: '20px' }}
            value={getAdminStrategyDetailResult?.title || ''}
            readOnly
          />
          <div className="user">
            <div className="strategist">
              <div className="label">전략가명</div> {getAdminStrategyDetailResult?.user?.nickname}
            </div>
          </div>
        </div>
        <div className="ViewContent" ref={ViewContentsRef} />
        <div className="file_zone">
          <div className="label">첨부파일</div>
          <div className="files">
            {getAdminStrategyDetailResult?.files.length != 0 ? (
              <>
                {getAdminStrategyDetailResult?.files.map((file) => (
                  <a className="file" href={file.url} download={true}>
                    첨부파일1
                  </a>
                ))}
              </>
            ) : (
              <div className="no_file">파일이 없습니다.</div>
            )}
          </div>
        </div>
        <div className="add_exchange">
          <div className="con">
            <div className="con_label">거래소 입력란</div>
            <CustomSelect options={platformOptions} place={platform} setSearchName={setPlatForm} />
          </div>
          <div className="con">
            <div className="con_label">대상종목 입력란</div>
            <Input
              name="symbol"
              value={getAdminStrategyDetailResult?.strategy?.symbol}
              placeholder="대상종목을 입력해주세요"
              sx={{ width: '100%', height: '48px', p: 2, fontFamily: 'GmarketSans' }}
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
              value={getAdminStrategyDetailResult?.strategy?.profitPct}
              placeholder="누적 수입률을 입력해주세요"
              sx={{ flex: 1, height: '48px', p: 2, fontFamily: 'GmarketSans' }}
            />
          </div>
        </div>
        <div className="file">
          <div className="file_label">파일 업로드</div>
          <label>
            <input type="file" onChange={handleChangeImage} />
            <span className="button">파일 업로드</span>
          </label>
          <div className="filename">{filUrl ? filUrl : '선택 파일이 없습니다'}</div>
          <span className="guide">※ 해당 전략의 백테스트 결과를 캡쳐한 이미지를 업로드해주세요.</span>
        </div>
      </div>
    </UserStrategyConBlock>
  );
};
const UserStrategyConBlock = styled.div`
  width: 100%;
  margin-bottom: 20px;
  .certified_request {
    width: 100%;
    .title_user {
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      align-items: center;
      .user {
        .strategist {
          display: flex;
          align-items: center;
          .label {
            color: ${colors.gray[5]};
            margin-right: 8px;
          }
          font-family: 'GmarketSansBold';
          color: ${colors.blue[2]};
        }
      }
    }
    .ViewContent {
      min-height: 300px;
      margin-bottom: 20px;
      padding: 1rem;
      border-radius: 14px;
      border: 1px solid ${colors.blue[2]};
      max-height: 500px;
      overflow-y: auto;
      img {
        max-width: 100%;
      }
    }
    .file_zone {
      width: 100%;
      margin-bottom: 20px;
      padding: 1rem;
      .label {
        color: ${colors.gray[5]};
        margin-bottom: 8px;
      }
      .files {
        width: 100%;
        display: flex;
        .file {
          max-width: 120px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding: 4px 7px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid ${colors.gray[4]};
          margin-right: 8px;
          &:last-child {
            margin-right: 0;
          }
          &:hover {
            background-color: ${colors.gray[1]};
          }
        }
      }
    }

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
          min-width: 145px;
          font-family: 'GmarketSansBold';
          color: ${colors.gray[5]};
          font-size: 1rem;
          margin-right: 1rem;
        }
      }
    }
    & > .file {
      width: 50%;
      padding: 7px 1rem;
      display: flex;
      align-items: center;
      position: relative;
      .file_label {
        white-space: nowrap;
        width: 145px;
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
        left: 180px;
        transform: translateY(-100%);
      }
    }
  }
`;

export default UserStrategyCon;
