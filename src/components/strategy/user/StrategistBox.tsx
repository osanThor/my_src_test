import colors from '@/src/assets/Colors';
import { Profile1 } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StrategistBox = () => {
  const { getUserInfo } = useSelector(({ boards }: RootState) => ({
    getUserInfo: boards.getUserInfo,
  }));

  const { email, introduction, nickname, photoUrl, styles, _count } = getUserInfo;
  return (
    <StrategistBoxBlock>
      <div className="profile_image">
        <Image src={photoUrl ? photoUrl : Profile1[1]} alt="profile" layout="fill" />
      </div>
      <div className="profile_info">
        <div className="nickname">{nickname}</div>
        <div className="styles">
          {styles.map((st) => {
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
      <div className="intro">{introduction}</div>
      {/* <StyledTextarea value={introduction} readOnly /> */}
    </StrategistBoxBlock>
  );
};

const StrategistBoxBlock = styled.div`
  width: 100%;
  background-color: ${colors.gray[1]};
  display: flex;
  align-items: center;
  padding: 24px 40px;
  border-radius: 14px;
  margin-bottom: 40px;

  .profile_image {
    width: 56px;
    height: 56px;
    min-width: 56px;
    position: relative;
    margin-right: 24px;
  }
  .profile_info {
    display: flex;
    margin-right: 40px;
    .nickname {
      font-family: 'GmarketSansBold';
      font-size: 20px;
      margin-right: 20px;
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
        background-color: white;
        margin-left: 8px;
        &:first-child {
          margin-left: 0;
        }
      }
    }
  }
  .intro {
    width: 100%;
    flex: 1;
    background-color: white;
    padding: 14px 16px;
    border-radius: 8px;
    font-size: 14px;
  }

  ${media.tablet} {
    padding: 24px 20px;
    flex-wrap: wrap;
    .profile_image {
      margin-right: 8px;
    }
    .profile_info {
      width: calc(100% - 64px);
      margin-right: 0;
      flex-direction: column;
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
    .intro {
      flex: auto;
      margin-top: 16px;
    }
  }
`;

const StyledTextarea = styled.textarea`
  resize: none;
  border: none;
  font-size: 14px;
  padding: 14px 16px;
  border-radius: 8px;
  flex: 1;
  cursor: auto;
  &:focus {
    outline: none;
  }
`;

export default StrategistBox;
