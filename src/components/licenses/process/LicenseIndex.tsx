import colors from '@/src/assets/Colors';
import React from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';

const LicenseIndex = () => {
  return (
    <LicenseIndexBlock>
      <div className="chose_package">
        <div className="referral">
          <div className="package_con">
            <h2>QUANTRO REFERRAL PACKAGE</h2>
            <div className="price">평생무료</div>
            <StyledButton>레퍼럴 등록</StyledButton>
          </div>
          <div className="benefit">
            <h3>
              퀀트로 레퍼럴 패키지 <span className="bold">추가 혜택</span>
            </h3>
            <p>
              제휴 맺은 전략가의 전략들을 <span className="bold">무료로 사용 가능</span>해요!
            </p>
          </div>
        </div>
        <div className="basic">
          <div className="package_con">
            <h2>QUANTRO BASIC PACKAGE</h2>
            <div className="price">29,900원(월)</div>
            <StyledButton blue>결제하기</StyledButton>
          </div>
          <div className="benefit">
            <h3>
              퀀트로 레퍼럴 패키지 <span className="bold">추가 혜택</span>
            </h3>
            <p>
              여러분만의 <span className="bold">전략을 제작</span>해해드려요! (월 1회)
            </p>
          </div>
        </div>
      </div>
      <div className="bottom">
        <ul>
          <li>결제는 암호화폐로 결제 가능하며 기타 결제 방법은 오른쪽 메신저로 문의주세요</li>
          <li>계정당 1개의 인증키만 사용가능하며 1개의 인증키로 여러 이메일에 사용하는 것은 불가능해요</li>
        </ul>
      </div>
    </LicenseIndexBlock>
  );
};

const LicenseIndexBlock = styled.div`
  width: 100%;
  .chose_package {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    word-break: keep-all;
    text-align: center;

    & > div {
      width: 50%;
      display: flex;
      flex-direction: column;
      & > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .package_con {
        width: 100%;
        border: 1px solid ${colors.gray[1]};
        border-radius: 14px;
        padding: 40px;
        margin-bottom: 20px;
        h2 {
          font-size: 14px;
          font-family: 'GmarketSansBold';
          word-break: keep-all;
          margin-bottom: 20px;
          color: ${colors.gray[5]};
        }
        .price {
          font-size: 28px;
          color: ${colors.dark[1]};
          margin-bottom: 20px;
        }
      }
      &.basic {
        .package_con {
          h2 {
            color: ${colors.blue[2]};
          }
        }
      }

      &:first-child {
        margin-right: 20px;
      }

      .benefit {
        width: 100%;
        background-color: ${colors.gray[0]};
        border-radius: 14px;
        padding: 28px;
        .bold {
          font-family: 'GmarketSansBold';
        }
        h3 {
          font-size: 1rem;
        }
        p {
          color: ${colors.gray[4]};
        }
      }

      &:last-child {
        .benefit {
          background-color: ${colors.blue[0]};
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
        margin-bottom: 6px;
        transform: translateY(2px);

        &:last-child {
          margin-bottom: 0;
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
`;

export default LicenseIndex;
