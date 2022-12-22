import colors from '@/src/assets/Colors';
import { Like, Menu6, Menu7, Profile1 } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const IndicatorTop = ({
  handleSetBoardLike,
  handleSetBoardCollection,
}: {
  handleSetBoardLike: () => void;
  handleSetBoardCollection: () => void;
}) => {
  const router = useRouter();
  const { getUserInfo } = useSelector(({ boards }: RootState) => ({
    getUserInfo: boards.getUserInfo,
  }));

  const { introduction, nickname, photoUrl, styles } = getUserInfo;
  return (
    <>
      {router.query.category != 'QUANTRO_STRATEGY' && router.query.category != 'QUANTRO_INDICATOR' && (
        <IndicatorTopBlock>
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
        </IndicatorTopBlock>
      )}
      <CertifiedMenu handleSetBoardLike={handleSetBoardLike} handleSetBoardCollection={handleSetBoardCollection} />
    </>
  );
};

const CertifiedMenu = ({
  handleSetBoardLike,
  handleSetBoardCollection,
}: {
  handleSetBoardLike: () => void;
  handleSetBoardCollection: () => void;
}) => {
  const router = useRouter();
  const { getBoardDone, isLike, isCollect } = useSelector(({ boards }: RootState) => ({
    getBoardDone: boards.getBoardDone,
    isLike: boards.isLike,
    isCollect: boards.isCollect,
  }));

  return (
    <CertifiedMenuBlock>
      <div className="top_area">
        <div className="state">
          {getBoardDone?.category === 'NOTICE' ? <div className="notice">공지</div> : getBoardDone?.id}
        </div>
        <div className="title">{getBoardDone?.title}</div>
        <div className="btns">
          <div className="button" onClick={handleSetBoardLike}>
            <div className="icon">
              <Image src={isLike ? Like[1] : Like[0]} alt="like" />
            </div>
          </div>
          <div className="button" onClick={handleSetBoardCollection}>
            <div className="icon">
              <Image src={isCollect ? Menu7[1] : Menu7[0]} alt="like" />
            </div>
          </div>
        </div>
      </div>
    </CertifiedMenuBlock>
  );
};

const CertifiedMenuBlock = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 24px;
  justify-content: space-between;
  align-items: center;
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
      display: flex;
      justify-content: center;
      align-items: center;
      .notice {
        background-color: ${colors.blue[0]};
        color: ${colors.blue[2]};
        border-radius: 24px;
        padding: 4px 8px;
      }
    }
    .title {
      width: 90%;
      flex: 1;
      word-break: keep-all;
      font-size: 24px;
    }

    .btns {
      display: flex;
      .button {
        cursor: pointer;
        width: 40px;
        height: 40px;
        background-color: ${colors.gray[0]};
        border-radius: 50%;
        transition: all 0.2s;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 1rem;
        &:last-child {
          margin-right: 0;
        }
        .icon {
          width: 24px;
          height: 24px;
        }
        &:hover {
          background-color: ${colors.gray[2]};
        }
      }
    }
  }
`;

const IndicatorTopBlock = styled.div`
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
    border-radius: 50%;
    overflow: hidden;
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
    margin-bottom: 24px;
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

export default IndicatorTop;
