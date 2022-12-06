import colors from '@/src/assets/Colors';
import { ArrowLeft, BINANCE, BITGET, BITMEX, BYBIT, FTX, Profile1 } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';

const LicenseExchange = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(false);
  const [exchageSt, setExchangeSt] = useState<any>();

  useEffect(() => {
    if (!router.query.selected) {
      setSelected(false);
    } else {
      setSelected(true);
      if (router.query.selected === 'BINANCE') {
        setExchangeSt(BINANCE);
      } else if (router.query.selected === 'BYBIT') {
        setExchangeSt(BYBIT);
      } else if (router.query.selected === 'BITMEX') {
        setExchangeSt(BITMEX);
      } else if (router.query.selected === 'BITGET') {
        setExchangeSt(BITGET);
      } else if (router.query.selected === 'FTX') {
        setExchangeSt(FTX);
      } else {
        setExchangeSt(null);
      }
    }
  }, [router]);

  const handleSelectExchange = (e: any) => {
    const targetValue = e.currentTarget.children[0].value;
    if (targetValue === 'BINANCE') {
      window.open('https://www.binance.com/en');
    } else if (targetValue === 'BYBIT') {
      window.open('https://www.bybit.com/en-US');
    } else if (targetValue === 'BITMEX') {
      window.open('https://www.bitmex.com/app/trade/XBTUSD');
    } else if (targetValue === 'BITGET') {
      window.open('https://www.bitget.com/en-GB/');
    } else if (targetValue === 'FTX') {
      window.open('https://help.ftx.com/hc/en-us');
    }

    router.replace({ query: { ...router.query, selected: targetValue } });
  };
  return (
    <LicenseExchangeBlock className="license_main_con">
      {selected || <div className="license_process_title">거래소 등록</div>}
      <div className="license_process_con">
        <div
          className="backButton"
          onClick={selected ? () => router.replace({ query: { ...router.query, selected: '' } }) : () => router.back()}
        >
          <div className="arrow">
            <Image src={ArrowLeft} alt="arrow" />
          </div>
        </div>
        {!selected ? (
          <div className="exchanges">
            <div className="exchange" onClick={handleSelectExchange}>
              <input type="hidden" value="BINANCE" />
              <div className="exchange_thumbnail">
                <Image src={BINANCE} alt="exchange" layout="fill" />
              </div>
              <div className="exchange_name">BINANCE</div>
            </div>
            <div className="exchange" onClick={handleSelectExchange}>
              <input type="hidden" value="BYBIT" />
              <div className="exchange_thumbnail">
                <Image src={BYBIT} alt="exchange" layout="fill" />
              </div>
              <div className="exchange_name">BYBIT</div>
            </div>
            <div className="exchange" onClick={handleSelectExchange}>
              <input type="hidden" value="BITMEX" />
              <div className="exchange_thumbnail">
                <Image src={BITMEX} alt="exchange" layout="fill" />
              </div>
              <div className="exchange_name">BITMEX</div>
            </div>
            <div className="exchange" onClick={handleSelectExchange}>
              <input type="hidden" value="BITGET" />
              <div className="exchange_thumbnail">
                <Image src={BITGET} alt="exchange" layout="fill" />
              </div>
              <div className="exchange_name">BITGET</div>
            </div>
            <div className="exchange" onClick={handleSelectExchange}>
              <input type="hidden" value="FTX" />
              <div className="exchange_thumbnail">
                <Image src={FTX} alt="exchange" layout="fill" />
              </div>
              <div className="exchange_name">FTX</div>
            </div>
          </div>
        ) : (
          <div className="exchanges exchagnge_benefit">
            <div className="exchange">
              <div className="exchange_thumbnail">
                <Image src={exchageSt ? exchageSt : Profile1[1]} alt="exchange" layout="fill" />
              </div>
              <div className="exchange_name">{router.query.selected as string}</div>
            </div>
            <div className="benefit_con">
              <div className="guide">
                <div className="guide_top">레퍼럴 등록이 되셨나요?</div>
                <div className="guide_bot"> 퀀트로와 함께 거래소의 다양한 혜택을 누리세요</div>
              </div>
              <div className="benefitInfo"></div>
              <Button blue>등록완료</Button>
            </div>
          </div>
        )}
      </div>
    </LicenseExchangeBlock>
  );
};

const LicenseExchangeBlock = styled.div`
  width: 100%;
  flex: 1;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${colors.gray[1]};
  padding: 40px;
  border-radius: 14px;
  position: relative;
  .license_process_title {
    font-size: 1.625rem;
    margin-bottom: 32px;
  }
  .license_process_con {
    flex: 1;
    display: flex;
    .backButton {
      width: 48px;
      height: 48px;
      position: absolute;
      cursor: pointer;
      border-radius: 50%;
      transition: all 0.2s;
      border: 1px solid ${colors.gray[2]};
      display: flex;
      justify-content: center;
      align-items: center;
      left: 40px;
      top: 50%;
      transform: translateY(-50%);
      background-color: white;
      z-index: 7;
      &:hover {
        background-color: ${colors.gray[1]};
      }
      .arrow {
        width: 24px;
        height: 24px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    //
    .exchanges {
      display: flex;
      flex: 1;
      .exchange {
        cursor: pointer;
        width: 20%;
        min-width: 128px;
        min-height: 162px;
        background-color: ${colors.gray[0]};
        border-radius: 14px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 24px;
        &:last-child {
          margin-right: 0;
        }
        .exchange_thumbnail {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          margin-bottom: 32px;
        }
        .exchange_name {
          font-size: 1.125rem;
          font-family: 'GmarketSansBold';
        }
      }
      &.exchagnge_benefit {
        width: 100%;
        justify-content: center;
        align-items: flex-end;
        height: 100%;
        .exchange {
          cursor: auto;
          flex: 1;
          height: 100%;
          max-height: 274px;
          margin-right: 68px;
          background-color: ${colors.blue[0]};
        }
        .benefit_con {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .guide {
            text-align: center;
            font-size: 26px;
            margin-bottom: 40px;
          }
          .benefitInfo {
            width: 100%;
            height: 152px;
            background-color: ${colors.gray[2]};
            margin-bottom: 18px;
          }
        }

        button {
          min-height: auto;
          height: 50px;
        }
      }
    }
  }

  ${media.custom(1490)} {
    .license_process_con {
      .backButton {
        left: 30px;
      }
      .exchanges {
        .exchange {
          margin-right: 8px;
          &:last-child {
          }
          .exchange_thumbnail {
            width: 77px;
            height: 77px;
            margin-bottom: 8px;
          }
          .exchange_name {
          }
        }
        &.exchagnge_benefit {
          .exchange {
            flex: 1;
            height: 274px;
            margin-right: 40px;
            background-color: ${colors.blue[0]};
          }
          .benefit_con {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .guide {
              text-align: center;
              font-size: 20px;
              margin-bottom: 40px;
            }
            .benefitInfo {
            }
          }
        }
      }
    }
  }
  ${media.tablet} {
    border: none;
    padding: 0;
    .license_process_title {
      display: none;
    }
    .license_process_con {
      width: 100%;
      .backButton {
        display: none;
      }

      //
      .exchanges {
        width: 100%;
        .exchange {
          min-width: auto;
          &:last-child {
          }
          .exchange_thumbnail {
          }
          .exchange_name {
          }
        }
        &.exchagnge_benefit {
          align-items: center;
          .exchange {
            flex: 1;
            height: auto;
            margin-right: 1rem;
            background-color: ${colors.blue[0]};
            margin-bottom: 0;
            max-width: 110px;
          }
          .benefit_con {
            width: auto;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .guide {
              text-align: center;
              font-size: 20px;
              margin-bottom: 18px;
              .guide_bot {
                font-size: 15px;
              }
            }
            .benefitInfo {
              display: none;
            }
          }
        }
      }
    }
  }
  ${media.mobile} {
    .license_process_con {
      //
      .exchanges {
        flex-wrap: wrap;
        .exchange {
          width: calc(33.3333% - 8px);
          min-width: auto;
          margin-bottom: 20px;
          &:nth-child(3n) {
            margin-right: 0;
          }
          .exchange_thumbnail {
          }
          .exchange_name {
          }
        }
        &.exchagnge_benefit {
          flex-wrap: nowrap;
          align-items: normal;
          .exchange {
            flex: 1;
            height: auto;
            margin-right: 1rem;
            background-color: ${colors.blue[0]};
            margin-bottom: 0;
            max-width: 110px;
            min-width: 110px;
          }
          .benefit_con {
            width: auto;
            height: auto;
            justify-content: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            .guide {
              word-break: keep-all;
              text-align: center;
              font-size: 20px;
              margin-bottom: 18px;
              .guide_bot {
                font-size: 15px;
              }
            }
            .benefitInfo {
              display: none;
            }
            button {
              padding: 0;
              width: 114px;
            }
          }
        }
      }
    }
  }
`;

export default LicenseExchange;
