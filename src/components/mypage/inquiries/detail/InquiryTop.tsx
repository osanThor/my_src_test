import colors from '@/src/assets/Colors';
import { Menu7, Profile1, ShareIcon } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import styled from 'styled-components';
import { media } from '@/styles/theme';

const InquiryTop = () => {
  const { getInquiryResult, inquiryId } = useSelector(({ boards }: RootState) => ({
    getInquiryResult: boards.getInquiryResult,
    inquiryId: boards.inquiryId,
  }));
  const { photoUrl } = useSelector(({ user }: RootState) => ({
    photoUrl: user.photoUrl,
  }));

  return (
    <InquiryTopBlock>
      <div className="top_area">
        <div className="state">{inquiryId}</div>
        <div className="title">{getInquiryResult?.title}</div>
        <div className="top_btns"></div>
      </div>
      <div className="bottom_area">
        <div className="thumbnail">
          <Image src={photoUrl ? photoUrl : Profile1[1]} alt="profile" layout="fill" />
        </div>
        <div className="info_con">
          <div className="profile_info">
            <div className="nickname">
              {getInquiryResult?.user.nickname ? getInquiryResult?.user.nickname : '퀀트로'}
            </div>
            <div className="styles">
              {getInquiryResult?.user.styles.map((st) => {
                if (st.name === 'SCALPING') {
                  return (
                    <div key={st.name} className="style">
                      <span>#스캘핑</span>
                    </div>
                  );
                } else if (st.name === 'SHORT_HIT') {
                  return (
                    <div key={st.name} className="style">
                      <span>#단타</span>
                    </div>
                  );
                } else if (st.name === 'SWING') {
                  return (
                    <div key={st.name} className="style">
                      <span>#스윙</span>
                    </div>
                  );
                } else if (st.name === 'TREND') {
                  return (
                    <div key={st.name} className="style">
                      <span>#추세매매</span>
                    </div>
                  );
                } else if (st.name === 'R_TREND') {
                  return (
                    <div key={st.name} className="style">
                      <span>#역추세매매</span>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="board_info">
            <Moment format="YYYY.MM.DD HH:MM">{getInquiryResult?.createdAt}</Moment>
          </div>
        </div>
      </div>
    </InquiryTopBlock>
  );
};

const InquiryTopBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
  .top_area {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid ${colors.gray[5]};
    .state {
      width: 20%;
      max-width: 64px;
      text-align: center;
      color: ${colors.gray[4]};
    }
    .title {
      width: 90%;
      flex: 1;
      word-break: keep-all;
      font-size: 24px;
    }
    .top_btns {
      display: flex;
      .button {
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${colors.gray[0]};
        transition: all 0.2s;
        border-radius: 50%;
        font-size: 12px;
        .icon {
          width: 24px;
          height: 24px;
          position: relative;
        }
        &:hover {
          background-color: ${colors.gray[2]};
        }
        &:first-child {
          margin-right: 12px;
        }
      }
    }
  }
  .bottom_area {
    width: 100%;
    padding-top: 24px;
    display: flex;
    align-items: center;
    .thumbnail {
      width: 64px;
      min-width: 64px;
      height: 64px;
      margin-right: 20px;
      position: relative;
      overflow: hidden;
      border-radius: 50%;
    }
    .info_con {
      width: 100%;
      flex: 1;
      .profile_info {
        width: 100%;
        display: flex;
        margin-bottom: 12px;
        align-items: center;
        .nickname {
          font-family: 'GmarketSansBold';
          font-size: 20px;
          margin-right: 1rem;
          transform: translateY(2px);
          color: ${colors.blue[2]};
        }
        .styles {
          width: 100%;
          flex: 1;
          display: flex;
          .style {
            height: 28px;
            border-radius: 14px;
            padding: 4px 12px;
            font-size: 14px;
            border: 1px solid ${colors.blue[2]};
            color: ${colors.blue[2]};
            margin-left: 8px;
            &:first-child {
              margin-left: 0;
            }
          }
        }
      }
      .board_info {
        width: 100%;
        display: flex;
        font-size: 14px;
        color: ${colors.gray[3]};
        time {
          margin-right: 8px;
        }
      }
    }
  }

  ${media.tablet} {
    margin-bottom: 16px;
    .top_area {
      padding-bottom: 16px;
      .state {
        width: auto;
        margin-right: 8px;
      }
      .title {
        width: 100%;
        font-size: 16px;
      }
      .top_btns {
        display: none;
      }
    }
    .bottom_area {
      padding-top: 16px;
      .thumbnail {
        width: 40px;
        min-width: 40px;
        height: 40px;
        margin-right: 8px;
      }
      .info_con {
        .profile_info {
          margin-bottom: 4px;
          .nickname {
            font-size: 14px;
            margin-right: 8px;
          }
          .styles {
            width: 100%;
            flex: 1;
            display: flex;
            overflow-x: auto;
            .style {
              height: 28px;
              padding: 4px;
              font-size: 12px;
              margin-left: 4px;
              white-space: nowrap;
            }
          }
        }
        .board_info {
          font-size: 12px;
          time {
            margin-right: 8px;
          }
        }
      }
    }
  }
`;

export default InquiryTop;
