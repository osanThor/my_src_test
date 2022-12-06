import colors from '@/src/assets/Colors';
import React from 'react';
import styled from 'styled-components';

const CenterLayout = () => {
  return (
    <CenterLayoutBlock className="container">
      <div className="FAQ_top">
        <div className="FAQ_title">
          <h2>안전하고 쉬운 투자의 길로 안내할게요,</h2>
          <p>무엇이 궁금하신가요?</p>
        </div>
      </div>
      <div className="FAQ_list">
        <div className="FAQ_contents">
          <div className="FAQ_category">대시보드</div>
          <div className="FAQ_content_list">
            <div className="FAQ_content">
              <div className="FAQ_Q">퀀트로가 무엇인가요?</div>
            </div>
            <div className="FAQ_content">
              <div className="FAQ_Q">시스템트레이딩이 뭔가요?</div>
            </div>
            <div className="FAQ_content">
              <div className="FAQ_Q">"전략"이 무엇인가요?</div>
            </div>
            <div className="FAQ_content">
              <div className="FAQ_Q">"전략"이 무엇인가요?</div>
            </div>
          </div>
        </div>
      </div>
    </CenterLayoutBlock>
  );
};

const CenterLayoutBlock = styled.div`
  width: 100%;
  .FAQ_top {
    display: flex;
    justify-content: center;
    margin-bottom: 56px;
    .FAQ_title {
      text-align: center;
      color: ${colors.blue[2]};
      font-size: 2rem;
      h2 {
        font-size: 2rem;
        font-family: 'GmarketSansBold';
      }
    }
  }
  .FAQ_list {
    width: 100%;
    .FAQ_contents {
      width: 100%;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      .FAQ_category {
        width: auto;
        min-width: 256px;
        margin-bottom: 26px;
        text-align: center;
        padding: 8px 20px;
        color: white;
        border-radius: 20px;
        background-color: ${colors.blue[2]};
      }
      .FAQ_content_list {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        grid-column-gap: 24px;
        -webkit-column-gap: 20px;
        column-gap: 24px;
        grid-row-gap: 24px;
        row-gap: 24px;
        .FAQ_content {
          .FAQ_Q {
            min-height: 40px;
            padding: 8px 24px;
            background-color: ${colors.blue[0]};
            border: 1px solid ${colors.blue[2]};
            border-radius: 14px;
            cursor: pointer;
            transition: all 0.2s;
            &:hover {
              background-color: ${colors.blue[1]};
              border-color: ${colors.blue[1]};
              color: white;
            }
            &.on {
              background-color: ${colors.blue[1]};
              border-color: ${colors.blue[1]};
              color: white;
            }
          }
        }
      }
    }
  }
`;

export default CenterLayout;
