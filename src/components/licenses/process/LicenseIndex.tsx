import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';

const LicenseIndex = () => {
  const router = useRouter();
  return (
    <LicenseIndexBlock className="license_main_con">
      <div className="chose_package">
        <div className="BASIC">
          <div className="package_con">
            <h2>BASIC PACKAGE</h2>
            <div className="price">Free</div>
            <div className="period">FOREVER</div>
            <StyledButton onClick={() => router.push('/licenses?state=exchange')}>거래소 등록</StyledButton>
          </div>
          <div className="benefit">
            <ul>
              <li>원하시는 거래소를 선택하여 가입해주세요</li>
              <li className="bold">분당 주문 회수 20회</li>
            </ul>
          </div>
        </div>
        <div className="REGULAR">
          <div className="package_con">
            <h2 className="blue">REGULAR PACKAGE</h2>
            <div className="price">₩19,900</div>
            <div className="period">PER MONTH</div>
            <StyledButton blue disabled>
              결제하기
            </StyledButton>
          </div>
          <div className="benefit">
            <ul>
              <li>퀀트로 베이직 패키지를 먼저 진행해주세요</li>
              <li className="bold">분당 주문 회수 30회 </li>
              <li className="bold">전략 개발 의뢰 서비스 이용 가능 </li>
            </ul>
          </div>
        </div>
        <div className="PREMIUM">
          <div className="package_con">
            <h2 className="red">PREMIUM PACKAGE</h2>
            <div className="price">₩29,900</div>
            <div className="period">PER MONTH</div>
            <StyledButton blue disabled>
              결제하기
            </StyledButton>
          </div>
          <div className="benefit">
            <ul>
              <li>퀀트로 베이직 패키지를 먼저 진행해주세요</li>
              <li className="bold">분당 주문 회수 40회</li>
              <li className="bold">전략 개발 의뢰 서비스 이용 가능 </li>
            </ul>
          </div>
        </div>
      </div>
    </LicenseIndexBlock>
  );
};

const LicenseIndexBlock = styled.div`
  width: 100%;
  .chose_package {
    width: 100%;
    display: grid;
    transition: all 0.2s;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-column-gap: 18px;
    -webkit-column-gap: 18px;
    -webkit-column-gap: 18px;
    column-gap: 18px;
    grid-row-gap: 18px;
    row-gap: 18px;
    word-break: keep-all;
    text-align: center;

    & > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      & > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
      }
      .package_con {
        width: 100%;
        border: 1px solid ${colors.gray[1]};
        border-radius: 14px;
        padding: 40px 12px;
        margin-bottom: 20px;
        h2 {
          font-size: 1.5rem;
          font-family: 'GmarketSansBold';
          word-break: keep-all;
          margin-bottom: 20px;
          white-space: nowrap;
          color: ${colors.gray[5]};
          br {
            display: none;
          }
          &.blue {
            color: ${colors.blue[2]};
          }
          &.red {
            color: ${colors.red[1]};
          }
        }
        .price {
          font-size: 3rem;
          color: ${colors.dark[1]};
          margin-bottom: 20px;
          white-space: nowrap;
        }
        .period {
          margin-bottom: 10px;
        }
      }
      &.basic {
        .package_con {
          h2 {
            color: ${colors.blue[2]};
          }
        }
      }

      &:last-child {
        margin-right: 0;
      }

      .benefit {
        width: 100%;
        background-color: ${colors.gray[0]};
        border-radius: 14px;
        font-size: 14px;
        padding: 10px;
        text-align: left;
        color: ${colors.gray[5]};
        .bold {
          font-family: 'GmarketSansBold';
        }
        ul {
          padding-left: 10px;
        }
      }
    }
  }
  .bottom {
    width: 100%;
    background-color: ${colors.gray[0]};
    border-radius: 14px;
    padding: 24px 40px;
    color: ${colors.gray[5]};
    position: relative;
    ul {
      list-style-position: inside;
      li {
        margin-bottom: 4px;
        transform: translateY(2px);
        font-size: 14px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  ${media.custom(1590)} {
    .chose_package {
      & > div {
        .package_con {
          h2 {
            font-size: 20px;
          }
          .price {
            font-size: 2rem;
            margin-bottom: 20px;
            white-space: nowrap;
          }
        }
      }
    }
  }
  ${media.custom(1200)} {
    .chose_package {
      & > div {
        .package_con {
          padding: 20px;
        }
      }
    }
  }
  ${media.tablet} {
    .chose_package {
      & > div {
        .package_con {
          padding: 20px;
          h2 {
            font-size: 1.5rem;
            margin-bottom: 20px;
            white-space: nowrap;
            br {
              display: block;
            }
          }
          .price {
            font-size: 3rem;
            margin-bottom: 20px;
            white-space: nowrap;
          }
        }

        &:first-child {
          margin-right: 8px;
        }

        .benefit {
        }
      }
    }
  }
`;

const StyledButton = styled(Button)`
  padding: 0;
  width: 168px;
  height: 64px;
  font-size: 1.25rem;
  min-height: auto;
  border-radius: 32px;

  ${media.tablet} {
    width: 100%;
    height: 56px;
    font-size: 16px;
  }
`;

export default LicenseIndex;
