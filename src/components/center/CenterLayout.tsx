import colors from '@/src/assets/Colors';
import { ArrowLeft, Close } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';

const FAQ = [
  {
    id: 0,
    category: '대시보드',
    FAQ: [
      {
        id: 0,
        q: '퀀트로가 무엇인가요?',
        a: '대답입니다',
      },
      {
        id: 1,
        q: '시스템트레이딩이 뭔가요?',
        a: '대답입니다2',
      },
      {
        id: 2,
        q: '전략"이 무엇인가요?',
        a: '대답입니다3',
      },
      {
        id: 3,
        q: '전략"이 무엇인가요?',
        a: '대답입니다4',
      },
      {
        id: 4,
        q: '전략"이 무엇인가요?',
        a: '대답입니다5',
      },
      {
        id: 5,
        q: '전략"이 무엇인가요?',
        a: '대답입니다6',
      },
      {
        id: 6,
        q: '전략"이 무엇인가요?',
        a: '대답입니다7',
      },
      {
        id: 7,
        q: '전략"이 무엇인가요?',
        a: '대답입니다7',
      },
    ],
  },
  {
    id: 1,
    category: '퀀트작성',
    FAQ: [
      {
        id: 6,
        q: '퀀트로가 무엇인가요?',
        a: '대답입니다',
      },
      {
        id: 7,
        q: '시스템트레이딩이 뭔가요?',
        a: '대답입니다2',
      },
      {
        id: 8,
        q: '전략"이 무엇인가요?',
        a: '대답입니다3',
      },
      {
        id: 9,
        q: '전략"이 무엇인가요?',
        a: '대답입니다4',
      },
      {
        id: 10,
        q: '전략"이 무엇인가요?',
        a: '대답입니다5',
      },
      {
        id: 11,
        q: '전략"이 무엇인가요?',
        a: '대답입니다6',
      },
      {
        id: 12,
        q: '전략"이 무엇인가요?',
        a: '대답입니다7',
      },
    ],
  },
];

const CenterLayout = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const handleSelectQ = (faq: { id: number; q: string; a: string }) => {
    setIsSelected(true);
    setQuestion(faq.q);
    setAnswer(faq.a);
  };

  const handleCloseQ = () => {
    setIsSelected(false);
    setQuestion('');
    setAnswer('');
  };
  return (
    <CenterLayoutBlock className="container">
      <div className="FAQ_top">
        <div className="FAQ_title">
          <h2>안전하고 쉬운 투자의 길로 안내할게요,</h2>
          <p>무엇이 궁금하신가요?</p>
        </div>
      </div>
      <div className={isSelected ? 'FAQ_main_box on' : 'FAQ_main_box'}>
        <div className="FAQ_list">
          {FAQ.map((cate) => (
            <div className="FAQ_contents" key={cate.id}>
              <div className="FAQ_category">{cate.category}</div>
              <div className="FAQ_content_list">
                {cate.FAQ.map((faq) => (
                  <div className="FAQ_content " key={faq.id} onClick={() => handleSelectQ(faq)}>
                    <div className="FAQ_Q">{faq.q}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="answer_box">
          <div className="m_answer_top">
            <div className="icon" onClick={handleCloseQ}>
              <Image src={ArrowLeft} alt="arrow" />
            </div>
            <div className="question">{question}</div>
          </div>
          <div className="gray_box">
            <div className="answer_top">
              <div className="answer_close_btn" onClick={handleCloseQ}>
                <Image src={Close} alt="closeButton" />
              </div>
            </div>
            {answer}
          </div>
        </div>
      </div>

      <div className="FAQ_bottom">
        <div className="info_box">
          퀀트로는 여러분의 안전한 퀀트 매매를 위해 프로그램 및 커뮤니티를 제공하며, 그 외 전략 및 투자를 권장하지
          않습니다.
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
  .FAQ_main_box {
    display: flex;
    position: relative;
    transition: all 0.2s;
    &.on {
      .answer_box {
        width: 65%;
        height: calc(100% - 60px);
        top: 0;
        right: 0;
        .m_answer_top {
          display: none;
        }
        .gray_box {
          height: 100%;
          background-color: ${colors.gray[1]};
          border-radius: 14px;
          padding: 24px;
          .answer_top {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            .answer_close_btn {
              cursor: pointer;
            }
          }
        }
      }
      .FAQ_list {
        transform: translateX(-67%);
      }
    }
  }
  .FAQ_list {
    width: 100%;
    margin-bottom: 64px;
    transition: all 0.2s;
    .FAQ_contents {
      width: 100%;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      margin-bottom: 62px;

      &:last-child {
        margin-bottom: 0;
      }
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
        grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
        grid-column-gap: 24px;
        -webkit-column-gap: 20px;
        column-gap: 56px;
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
  .answer_box {
    width: 0;
    overflow: hidden;
    position: absolute;
    transition: all 0.2s;
  }
  .FAQ_bottom {
    width: 100%;
    display: flex;
    justify-content: center;
    .info_box {
      width: 100%;
      max-width: 1060px;
      line-height: 32px;
      background-color: rgba(128, 172, 245, 0.5);
      border-radius: 14px;
      text-align: center;
      word-break: keep-all;
      font-size: 15px;
    }
  }
  ${media.tablet} {
    .FAQ_top {
      margin-bottom: 56px;
      .FAQ_title {
        font-size: 18px;
        h2 {
          font-size: 18px;
        }
      }
    }
    .FAQ_main_box {
      display: flex;
      position: relative;
      transition: all 0.2s;
      &.on {
        .answer_box {
          width: 100%;
          height: calc(100% - 60px);
          top: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          overflow: inherit;
          .m_answer_top {
            display: block;
            position: relative;
            .icon {
              width: 40px;
              height: 40px;
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
              top: 0;
              left: 0;
              transform: translateY(-120%);
            }
            .question {
              width: 100%;
              border: 1px solid ${colors.blue[1]};
              background-color: ${colors.blue[0]};
              padding: 4px 12px;
              border-radius: 14px;
              margin-bottom: 30px;
            }
          }
          .gray_box {
            height: 100%;
            background-color: ${colors.gray[1]};
            border-radius: 14px;
            padding: 24px;
            .answer_top {
              display: none;
            }
          }
        }
        .FAQ_list {
          width: 0;
          overflow: hidden;
          transform: translateX(0);
        }
      }
    }
    .FAQ_list {
      .FAQ_contents {
        margin-bottom: 39px;

        .FAQ_category {
          min-width: 160px;
          margin-bottom: 20px;
          padding: 2px 14.5px;
        }
        .FAQ_content_list {
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          grid-column-gap: 12px;
          -webkit-column-gap: 12px;
          column-gap: 12px;
          grid-row-gap: 12px;
          row-gap: 12px;
          .FAQ_content {
            .FAQ_Q {
              min-height: auto;
              padding: 4px 16px;
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
    .answer_box {
      .gray_box {
        .answer_top {
          display: none;
        }
      }
    }
    .FAQ_bottom {
      .info_box {
        width: 100%;
        line-height: inherit;
        border-radius: 14px;
        padding: 4px 12px;
        text-align: center;
        word-break: keep-all;
        font-size: 12px;
      }
    }
  }
`;

export default CenterLayout;
