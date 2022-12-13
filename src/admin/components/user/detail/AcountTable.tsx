import colors from '@/src/assets/Colors';
import { BINANCE, BITGET, BITMEX, BYBIT, CancelIcon, EditPenIcon, FTX, Profile1 } from '@/src/assets/Images';
import Button from '@/src/components/common/Button';
import { RootState } from '@/src/store/configureStore';
import { exchangeActions } from '@/src/store/reducers';
import { media } from '@/styles/theme';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const AcountTable = ({}: {}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { getAdminUserDetailResult } = useSelector(({ adminUsers }: RootState) => ({
    getAdminUserDetailResult: adminUsers.getAdminUserDetailResult,
  }));
  // const [selectExchange, setSelectExchange] = useState('');
  // const [allExcLenght, setAllExcLenght] = useState(0);

  // useEffect(() => {
  //   if (router.query.selected) {
  //     setSelectExchange(router.query.selected as string);
  //     if (selectExchange) {
  //       setAllExcLenght(allExchangeResult.length + 1);
  //     } else {
  //       setAllExcLenght(allExcLenght - 1);
  //     }
  //   } else {
  //     setSelectExchange('');
  //     setAllExcLenght(allExchangeResult.length);
  //   }
  // }, [router, allExchangeResult, selectExchange]);

  // // change api key payload field
  // const handleChangeApiKeyPayload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, name } = e.target;
  //   console.log(name, value);
  //   if (name === 'alias') {
  //     dispatch(
  //       exchangeActions.chagneCreateApiKeyFeild({
  //         exchange,
  //         apiKeyObj: { id: apiKeyObj.id, alias: value, apiKey: apiKeyObj.apiKey, apiSecret: apiKeyObj.apiSecret },
  //       }),
  //     );
  //   } else if (name === 'apiKey') {
  //     dispatch(
  //       exchangeActions.chagneCreateApiKeyFeild({
  //         exchange,
  //         apiKeyObj: { id: apiKeyObj.id, alias: apiKeyObj.alias, apiKey: value, apiSecret: apiKeyObj.apiSecret },
  //       }),
  //     );
  //   } else if (name === 'apiSecret') {
  //     dispatch(
  //       exchangeActions.chagneCreateApiKeyFeild({
  //         exchange,
  //         apiKeyObj: { id: apiKeyObj.id, alias: apiKeyObj.alias, apiKey: apiKeyObj.apiKey, apiSecret: value },
  //       }),
  //     );
  //   }
  // };

  return (
    <AcountTableBlock>
      <div className="thead">
        <div className="th">
          <div className="td">
            <span>거래소</span>
          </div>
          <div className="td">
            <span>계정명</span>
          </div>
          <div className="td">
            <span>API Key</span>
          </div>
          <div className="td">
            <span>Secret Key</span>
          </div>
        </div>
      </div>
      <div className="tbody">
        {getAdminUserDetailResult?.exchanges?.map((exc) => (
          <TableRow key={exc.id} exc={exc} />
        ))}
      </div>
    </AcountTableBlock>
  );
};

// table item
const TableRow = ({
  exc,
}: {
  exc: {
    id: string | null;
    platform: string | null;
    alias: string | null;
    apiKey: string | null;
    connectionStatus: string | null;
  } | null;
}) => {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const { exchange, apiKeyObj } = useSelector(({ exchange }: RootState) => ({
    exchange: exchange.exchange,
    apiKeyObj: exchange.apiKeyObj,
  }));

  console.log(exchange, apiKeyObj);
  // first state
  useEffect(() => {
    if (editable) {
      if (exc) {
        dispatch(
          exchangeActions.chagneCreateApiKeyFeild({
            exchange: exc.platform,
            apiKeyObj: { id: exc.id, alias: exc.alias, apiKey: exc.apiKey, apiSecret: '' },
          }),
        );
      }
    }
  }, [editable, exc]);

  //
  useEffect(() => {
    if (apiKeyObj && exc) {
      if (apiKeyObj.id != exc.id) {
        setEditable(false);
      }
    }
  }, [apiKeyObj, exc]);

  return (
    <div className="tr">
      <div className="td">
        <div className="thumbnail">
          {exc && <>{exc.platform === 'BINANCE' && <Image src={BINANCE} alt="acount thumbnail" layout="fill" />}</>}
          {exc && <>{exc.platform === 'BYBIT' && <Image src={BYBIT} alt="acount thumbnail" layout="fill" />}</>}
          {exc && <>{exc.platform === 'BITMEX' && <Image src={BITMEX} alt="acount thumbnail" layout="fill" />}</>}
          {exc && <>{exc.platform === 'BITGET' && <Image src={BITGET} alt="acount thumbnail" layout="fill" />}</>}
          {exc && <>{exc.platform === 'FTX' && <Image src={FTX} alt="acount thumbnail" layout="fill" />}</>}
        </div>
        <span>
          {exc && exc.platform}
          {!exc && '거래소'}
        </span>
      </div>
      <div className="td">
        {exc && editable && apiKeyObj && <input value={apiKeyObj.alias} name="alias" disabled={!editable} readOnly />}
        {exc && !editable && <input value={exc.alias} disabled={!editable} />}
        {!exc && <input disabled={!editable} />}
      </div>
      <div className="td">
        {exc && editable && apiKeyObj && <input value={apiKeyObj.apiKey} name="apiKey" disabled={!editable} readOnly />}
        {exc && !editable && <input value={exc.apiKey} disabled={!editable} />}
        {!exc && <input disabled={!editable} />}
      </div>
      <div className="td">
        {exc && editable && apiKeyObj && (
          <input type="password" value={apiKeyObj.apiSecret} name="apiSecret" disabled={!editable} readOnly />
        )}
        {exc && !editable && <input type="password" value="1111111111" disabled={!editable} />}
        {!exc && <input type="password" disabled={!editable} />}
        {exc && (
          <>{exc.connectionStatus ? <div className="status on">연결중</div> : <div className="status err">오류</div>}</>
        )}
        {!exc && <div className="status">미등록</div>}
      </div>
    </div>
  );
};
const AcountTableBlock = styled.div`
  min-width: 1100px;
  white-space: nowrap;
  left: -16px;
  top: 0;
  .td {
    margin-right: 1rem;
    font-size: 14px;

    &:nth-child(1) {
      flex: 1;
      width: 15%;
      max-width: 200px;
      min-width: 200px;
    }
    &:nth-child(2) {
      flex: 1;
      width: 11%;
      max-width: 144px;
      min-width: 120px;
    }
    &:nth-child(3) {
      flex: 1;
      width: 35%;
      max-width: 440px;
      min-width: 220px;
    }
    &:last-child {
      flex: 1;
      width: 100%;
      margin-right: 0;
      input {
        margin-right: 1rem;
      }
    }
  }
  .thead {
    width: 100%;
    background-color: white;
    margin-bottom: 1rem;
    line-height: 2rem;
    z-index: 9;
    .th {
      width: 100%;
      display: flex;
      padding: 0.2rem 40px;
      color: ${colors.gray[5]};
    }
    position: sticky;
    top: 0;
    left: 0;
  }

  .tbody {
    width: 100%;
    .tr {
      width: 100%;
      display: flex;
      background-color: ${({ theme }) => theme.bgColor};
      box-shadow: ${({ theme }) => theme.boxShadow};
      border-radius: 8px;
      padding: 16px 40px;
      margin-bottom: 20px;

      .td {
        display: flex;
        align-items: center;

        .thumbnail {
          width: 40px;
          min-width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 8px;
          position: relative;
          border: 1px solid ${colors.gray[2]};
          z-index: 7;
        }
        & > span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        input {
          width: 100%;
          height: 40px;
          border: none;
          background-color: ${colors.blue[0]};
          color: ${colors.blue[2]};
          padding: 0 1rem;
          border-radius: 20px;
          text-overflow: ellipsis;
          &::placeholder {
            background-color: ${colors.blue[0]};
            color: ${colors.blue[2]};
          }

          &:focus {
            outline: none;
          }

          &:disabled {
            background-color: ${colors.gray[0]};
            color: ${colors.gray[4]};
            &::placeholder {
              background-color: ${colors.gray[0]};
              color: ${colors.gray[4]};
            }
          }
        }

        .status {
          min-width: 80px;
          text-align: center;
          background: ${colors.gray[0]};
          color: ${colors.gray[4]};
          line-height: 40px;
          border-radius: 20px;
          padding: 0 1rem;
          margin-right: 1rem;
          &.on {
            background-color: ${colors.blue[0]};
            color: ${colors.blue[2]};
          }
          &.err {
            background-color: ${colors.red[0]};
            color: ${colors.red[2]};
          }
        }
        button {
          padding: 0;
          min-height: auto;
          width: 40px;
          min-width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          &:last-child {
            margin-right: 0;
          }
          &.editable.cancel {
            background-color: ${colors.red[0]};
            &:hover {
              opacity: 0.7;
            }
          }
        }
      }
    }
  }

  ${media.pc} {
    overflow: auto;
    padding: 0 7px 0;
    .thead {
      .th {
        padding: 0 16px;
      }
    }
    .tbody {
      width: 100%;
      .tr {
        padding: 8px 16px;
      }
    }
  }
  ${media.custom(1200)} {
    padding: 0 10px 0;
    .td {
      margin-right: 8px;
    }
  }
  ${media.mobile} {
    .tbody {
      .tr {
        .td {
          .thumbnail {
            width: 32px;
            min-width: 32px;
            height: 32px;
          }
          input {
            width: 100%;
            height: 32px;
            padding: 0 8px;
          }

          .status {
            line-height: 32px;
            margin-right: 8px;
          }
          button {
            padding: 0;
            min-height: auto;
            width: 32px;
            min-width: 32px;
            height: 32px;
          }
        }
      }
    }
  }
`;
export default AcountTable;
