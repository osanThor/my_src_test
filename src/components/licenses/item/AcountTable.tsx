import colors from '@/src/assets/Colors';
import { Profile1 } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';

const AcountTable = () => {
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
        <div className="tr">
          <div className="td">
            <div className="thumbnail">
              <Image src={Profile1[1]} alt="acount thumbnail" layout="fill" />
            </div>
            <span>거래소명</span>
          </div>
          <div className="td">
            <input value="계정명" />
          </div>
          <div className="td">
            <input value="6yVdiUADcsGzJ-pC4shZY3C77-BRPnaQMLuz90xxTsdgLArgdu0u0M-IN" />
          </div>
          <div className="td">
            <input type="password" value="-pC4shZY3C77BRPna" />
            <div className="status">미등록</div>
            <Button></Button>
            <Button></Button>
          </div>
        </div>
        <div className="tr">
          <div className="td">
            <div className="thumbnail">
              <Image src={Profile1[1]} alt="acount thumbnail" layout="fill" />
            </div>
            <span>거래소명</span>
          </div>
          <div className="td">
            <input value="계정명" />
          </div>
          <div className="td">
            <input value="6yVdiUADcsGzJ-pC4shZY3C77-BRPnaQMLuz90xxTsdgLArgdu0u0M-IN" />
          </div>
          <div className="td">
            <input type="password" value="-pC4shZY3C77BRPna" />
            <div className="status">미등록</div>
            <Button></Button>
            <Button></Button>
          </div>
        </div>
        <div className="tr">
          <div className="td">
            <div className="thumbnail">
              <Image src={Profile1[1]} alt="acount thumbnail" layout="fill" />
            </div>
            <span>거래소명</span>
          </div>
          <div className="td">
            <input value="계정명" />
          </div>
          <div className="td">
            <input value="6yVdiUADcsGzJ-pC4shZY3C77-BRPnaQMLuz90xxTsdgLArgdu0u0M-IN" />
          </div>
          <div className="td">
            <input type="password" value="-pC4shZY3C77BRPna" />
            <div className="status">미등록</div>
            <Button></Button>
            <Button></Button>
          </div>
        </div>
        <div className="tr">
          <div className="td">
            <div className="thumbnail">
              <Image src={Profile1[1]} alt="acount thumbnail" layout="fill" />
            </div>
            <span>거래소명</span>
          </div>
          <div className="td">
            <input value="계정명" />
          </div>
          <div className="td">
            <input value="6yVdiUADcsGzJ-pC4shZY3C77-BRPnaQMLuz90xxTsdgLArgdu0u0M-IN" />
          </div>
          <div className="td">
            <input type="password" value="-pC4shZY3C77BRPna" />
            <div className="status">미등록</div>
            <Button></Button>
            <Button></Button>
          </div>
        </div>
        <div className="tr">
          <div className="td">
            <div className="thumbnail">
              <Image src={Profile1[1]} alt="acount thumbnail" layout="fill" />
            </div>
            <span>거래소명</span>
          </div>
          <div className="td">
            <input value="계정명" />
          </div>
          <div className="td">
            <input value="6yVdiUADcsGzJ-pC4shZY3C77-BRPnaQMLuz90xxTsdgLArgdu0u0M-IN" />
          </div>
          <div className="td">
            <input type="password" value="-pC4shZY3C77BRPna" />
            <div className="status">미등록</div>
            <Button></Button>
            <Button></Button>
          </div>
        </div>
        <div className="tr">
          <div className="td">
            <div className="thumbnail">
              <Image src={Profile1[1]} alt="acount thumbnail" layout="fill" />
            </div>
            <span>거래소명</span>
          </div>
          <div className="td">
            <input value="계정명" />
          </div>
          <div className="td">
            <input value="6yVdiUADcsGzJ-pC4shZY3C77-BRPnaQMLuz90xxTsdgLArgdu0u0M-IN" />
          </div>
          <div className="td">
            <input type="password" value="-pC4shZY3C77BRPna" />
            <div className="status">미등록</div>
            <Button></Button>
            <Button></Button>
          </div>
        </div>
        <div className="tr">
          <div className="td">
            <div className="thumbnail">
              <Image src={Profile1[1]} alt="acount thumbnail" layout="fill" />
            </div>
            <span>거래소명</span>
          </div>
          <div className="td">
            <input value="계정명" />
          </div>
          <div className="td">
            <input value="6yVdiUADcsGzJ-pC4shZY3C77-BRPnaQMLuz90xxTsdgLArgdu0u0M-IN" />
          </div>
          <div className="td">
            <input type="password" value="-pC4shZY3C77BRPna" />
            <div className="status">미등록</div>
            <Button></Button>
            <Button></Button>
          </div>
        </div>
      </div>
    </AcountTableBlock>
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
      min-width: 388px;
      margin-right: 0;
      input {
        margin-right: 1rem;
        max-width: 384px;
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
      padding: 0 40px;
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
          background: ${colors.gray[0]};
          line-height: 40px;
          border-radius: 20px;
          padding: 0 1rem;
          margin-right: 1rem;
        }
        button {
          padding: 0;
          min-height: auto;
          width: 40px;
          min-width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 1rem;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }

  ${media.pc} {
    overflow: auto;
    padding: 0 7px 0;
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
    .tbody {
      width: 100%;
      .tr {
        padding: 8px 16px;
        margin-bottom: 20px;
      }
    }
  }
`;
export default AcountTable;
