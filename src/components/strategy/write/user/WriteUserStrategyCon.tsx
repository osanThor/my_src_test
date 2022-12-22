import colors from '@/src/assets/Colors';

import Button from '@/src/components/common/Button';
import { RootState } from '@/src/store/configureStore';
import { boardsActions } from '@/src/store/reducers';
import { media } from '@/styles/theme';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CustomSelect from '../item/CustomSelect';

const exchangeOptions = [
  { txt: 'BYBIT', value: 'BYBIT' },
  { txt: 'BINANCE', value: 'BINANCE' },
  { txt: 'BITGET ', value: 'BITGET ' },
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

const WriteUserStrategyCon = ({
  handleChangeStrategyField,
  fileUrl,
  handleChangeFileUrls,
  handleCreateStrategy,
}: {
  handleChangeStrategyField: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  fileUrl: string | null;
  handleChangeFileUrls: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleCreateStrategy: () => void;
}) => {
  const dispatch = useDispatch();
  const { title, content, symbol, fileUrls, profitPct, communities } = useSelector(({ boards }: RootState) => ({
    title: boards.title,
    content: boards.content,
    symbol: boards.symbol,
    profitPct: boards.profitPct,
    fileUrls: boards.fileUrls,
    communities: boards.communities,
  }));
  const [platform, setPlatform] = useState('');
  const [chartCycle, setChartCycle] = useState('');

  useEffect(() => {
    dispatch(
      boardsActions.changeCreateStrategyField({
        category: 'USER_STRATEGY',
        title,
        content,
        fileUrls,
        platform: platform,
        symbol,
        chartCycle: chartCycle,
        profitPct,
        communities,
      }),
    );
  }, [platform, chartCycle]);

  return (
    <WriteUserStrategyConBlock>
      <StyledInput
        placeholder="전략 제목을 입력해주세요"
        name="title"
        value={title}
        onChange={handleChangeStrategyField}
      />
      <StyledTextarea
        placeholder="전략 내용을 입력해주세요.(설명은 자세할 수록 좋아요!)"
        name="content"
        value={content}
        onChange={handleChangeStrategyField}
      />
      <div className="strategy_input_box">
        <div className="title">전략 입력</div>
        <div className="strategy_inputs">
          <div className="input">
            <div className="label">거래소</div>
            <CustomSelect options={exchangeOptions} place={platform} setSearchName={setPlatform} />
          </div>
          <div className="input">
            <div className="label">대상종목</div>
            <input
              placeholder="대상종목을 입력해주세요"
              name="symbol"
              value={symbol || ''}
              onChange={handleChangeStrategyField}
            />
          </div>
          <div className="input">
            <div className="label">차트주기</div>
            <CustomSelect options={chartCycleOptions} place={chartCycle} setSearchName={setChartCycle} />
          </div>
          <div className="input">
            <div className="label">누적 수익률</div>
            <input
              type="number"
              placeholder="누적 수익률을 입력해주세요"
              name="profitPct"
              value={profitPct || ''}
              onChange={handleChangeStrategyField}
            />
          </div>
        </div>
      </div>
      <div className="certified_ex">
        <div className="add_file">
          <div className="label">파일 추가</div>
          <label>
            <input type="file" onChange={handleChangeFileUrls} />
            <span>첨부파일</span>
            <div className="file_name">{fileUrl ? fileUrl : '선택된 파일 없음'}</div>
          </label>
        </div>
      </div>
      <StyledButton blue onClick={handleCreateStrategy}>
        전략등록하기
      </StyledButton>
    </WriteUserStrategyConBlock>
  );
};

const WriteUserStrategyConBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .strategy_input_box {
    width: 100%;
    padding: 1rem 36px;
    background-color: ${colors.gray[0]};
    border-radius: 14px;
    margin-bottom: 20px;
    .title {
      margin-bottom: 1rem;
    }
    .strategy_inputs {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .input {
        width: calc(50% - 10px);
        padding: 1rem 0;
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        &:nth-child(2n) {
          margin-left: 20px;
        }
        .label {
          min-width: 100px;
          margin-right: 1rem;
          font-size: 14px;
        }
        input {
          width: 100%;
          height: 48px;
          padding: 1rem;
          font-size: 1rem;
          border-radius: 8px;
          border: 1px solid ${colors.blue[2]};
          &:focus {
            outline: none;
          }
          &::placeholder {
            font-size: 1rem;
            color: ${colors.gray[3]};
          }
        }
      }
    }
  }
  .certified_ex {
    width: 100%;
    display: flex;
    align-items: flex-start;
    padding: 0 36px;
  }
  .add_file {
    label {
      width: calc(100% - 116px);
      display: flex;
      align-items: center;
    }
    input {
      display: none;
    }
    span {
      cursor: pointer;
      border-radius: 14px;
      display: inline-block;
      width: 120px;
      line-height: 46px;
      border: 1px solid ${colors.gray[3]};
      text-align: center;
      transition: all 0.2s;
      &:hover {
        background-color: ${colors.gray[1]};
      }
    }
    .file_name {
      margin-left: 1rem;
      width: 100%;
      max-width: 50%;
      white-space: nowrap;
      font-size: 14px;
      color: ${colors.gray[3]};
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .add_comu,
  .add_file {
    width: calc(50% - 10px);
    display: flex;
    flex-wrap: wrap;
    padding: 1rem 0;
    margin-bottom: 20px;
    align-items: center;
    .label {
      width: 100px;
      margin-right: 1rem;
      font-size: 14px;
    }
    .add_box {
      width: calc(100% - 116px);
      display: flex;
      input {
        height: 48px;
        margin: 0;
        border-radius: 8px;
        margin: 0 1rem;
        padding: 1rem;
      }
      button {
        min-width: 100px;
        min-height: auto;
        height: 48px;
        padding: 0;
      }
    }
    .comu_list {
      width: 100%;
      margin-top: 20px;
      .community {
        width: 100%;
        padding: 7px 2.3rem;
        display: flex;
        align-items: center;
        padding-left: 116px;
        color: ${colors.gray[5]};
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        .icon {
          width: 24px;
          min-width: 24px;
          margin-right: 1rem;
          height: 24px;
          position: relative;
        }
        .close_btn {
          cursor: pointer;
          width: 24px;
          height: 24px;
          background-color: ${colors.dark[0]};
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 50%;
          right: 1rem;
          transform: translateY(-50%);
          border-radius: 50%;
          img {
            width: 20px !important;
            height: 20px !important;
          }
        }
      }
    }
  }

  ${media.pc} {
    .strategy_input_box {
      padding: 1rem;
    }
    .certified_ex {
      flex-direction: column;
      padding: 1rem;
    }

    .add_comu,
    .add_file {
      width: 100%;
      padding: 1rem;
      flex-direction: column;
      align-items: flex-start;
      & > .label {
        margin-bottom: 1rem;
      }
      .add_box {
        width: 100%;
      }
      .comu_list {
        .community {
          width: 100%;
          padding-left: 178px;
        }
      }
    }
    .add_file {
      padding: 0;
      margin: 0;
      flex-direction: row;
      align-items: center;
      .label {
        margin-bottom: 0;
      }
    }
  }
  ${media.tablet} {
    .strategy_input_box {
      .strategy_inputs {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .input {
          &:nth-child(2n) {
          }
          .label {
          }
          input {
            height: 40px;
            border-radius: 8px;
          }
        }
      }
    }
  }
  ${media.mobile} {
    .strategy_input_box {
      .strategy_inputs {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .input {
          width: 100%;
          flex-direction: column;
          align-items: flex-start;
          padding: 0;
          &:nth-child(2n) {
            margin-left: 0;
          }
          & > .label {
            margin-bottom: 1rem;
          }
          input {
            height: 40px;
            border-radius: 8px;
          }
        }
      }
    }
    .add_comu,
    .add_file {
      & > .label {
      }
      .add_box {
        width: 100%;
        flex-wrap: wrap;
        & > div:nth-child(1) {
          width: 100%;
          margin-bottom: 1rem;
        }
        input {
          width: calc(100% - 114px);
          margin: 0;
          margin-right: 1rem;
        }
      }
      .comu_list {
        .community {
          width: 100%;
          padding-left: 0;
        }
      }
    }
  }
`;
const StyledInput = styled.input`
  width: 100%;
  height: 62px;
  padding: 0 36px;
  border-radius: 14px;
  font-size: 16px;
  border: 1px solid ${colors.blue[2]};
  margin-bottom: 8px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 1rem;
    color: ${colors.gray[3]};
  }

  ${media.tablet} {
    height: 40px;
    padding: 0 16px;
  }
`;
const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 1rem 36px;
  border-radius: 14px;
  font-size: 16px;
  border: 1px solid ${colors.blue[2]};
  margin-bottom: 20px;
  resize: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 1rem;
    color: ${colors.gray[3]};
  }

  ${media.tablet} {
    padding: 16px;
  }
`;

const StyledButton = styled(Button)`
  min-height: auto;
  height: 48px;
  ${media.tablet} {
    width: 100%;
    margin-top: 20px;
  }
`;

export default WriteUserStrategyCon;
