import colors from '@/src/assets/Colors';
import { StickArrowRight } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const ForgotPwLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ForgotPwLayoutBlock>
      <div className="main_con">
        <div className="top_con">
          <div className="top_status">
            <span className="on">아이디 입력 확인</span>
            <span className="arrow">
              <Image src={StickArrowRight} alt="arrow" />
            </span>
            <span>비밀번호 재설정</span>
          </div>
        </div>
        {children}
      </div>
    </ForgotPwLayoutBlock>
  );
};

const ForgotPwLayoutBlock = styled.div`
  width: calc(100% - 32px);
  max-width: 580px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .main_con {
    width: 100%;
    height: 100%;
    max-height: 608px;
    .top_con {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 3rem;

      .top_status {
        width: 100%;
        max-width: 270px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: ${colors.gray[3]};
        span {
          &.arrow {
            height: 16px;
            transform: translateY(-2px);
          }
          &.on {
            color: ${colors.gray[4]};
          }
        }
      }
    }

    color: ${colors.gray[5]};
    h2 {
      font-size: 26px;
      font-family: GmarketSansBold;
      margin-bottom: 1rem;
    }
    p.descript {
      margin-bottom: 3rem;
      br {
        display: none;
      }
    }
  }

  ${media.tablet} {
    .main_con {
      max-height: none;
      .top_con {
        display: none;
      }
      h2 {
        font-size: 24px;
        margin-bottom: 0.5rem;
      }
      p.descript {
        br {
          display: block;
        }
      }
    }
  }
`;

export default ForgotPwLayout;
