import colors from '@/src/assets/Colors';
import { ArrowLeft } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const BoardDetailLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <BoardDetailBlock className="container">
      <div className="top_con">
        <div className="Inquiries_block" onClick={() => router.back()}>
          <div className="button">
            <Image src={ArrowLeft} alt="arrow left" />
          </div>
          <span className="txt">목록</span>
        </div>
      </div>
      {children}
    </BoardDetailBlock>
  );
};

const BoardDetailBlock = styled.div`
  width: 100%;
  .top_con {
    width: 100%;
    margin-bottom: 34px;
    .Inquiries_block {
      display: flex;
      align-items: center;
      cursor: pointer;
      .button {
        width: 24px;
        height: 24px;
        border: 1px solid ${colors.gray[3]};
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
        span {
          width: 11px !important;
          height: 16px !important;
        }
      }
      .txt {
        transition: all 0.2s;
        color: ${colors.gray[5]};
        transform: translateY(2px);
      }

      &:hover {
        .button {
          background-color: ${colors.gray[1]};
        }
        .txt {
          color: ${colors.dark[0]};
        }
      }
    }
  }
  ${media.tablet} {
    .top_con {
      display: none;
    }
  }
`;

export default BoardDetailLayout;
