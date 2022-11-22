import colors from '@/src/assets/Colors';
import { CheckCircle, GuidGoIcon, Notice, Profile1, TelegramAlramBot } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../common/Button';

const LicensesTop = () => {
  const { isDark, photoUrl, nickname, licenses } = useSelector(({ user }: RootState) => ({
    isDark: user.isDark,
    photoUrl: user.photoUrl,
    nickname: user.nickname,
    licenses: user.licenses,
  }));
  return (
    <LicensesTopBlock>
      <div className="my_profile">
        <div className="thumnail">
          <Image src={photoUrl ? photoUrl : Profile1[1]} alt="profile" layout="fill" />
        </div>
        <div className="profile_info">
          <div className="nickname">{nickname ? nickname : '로딩중...'}</div>
          <div className="licenses">이용권을 등록해주세요</div>
        </div>
      </div>
      <div className="information">
        <div className="info_top">
          <div className="left_con">
            <div className="telegram_alram_bot">
              <div className="icon">
                <Image src={TelegramAlramBot} alt="alram_bot" />
              </div>
              <span>텔레그램 알림봇 설정</span>
            </div>
            <label>
              <input type="checkbox" />
              <span className="styled_checkbox" />
              매매와 여러정보 알림 받기
            </label>
          </div>
          <div className="how_to_telegram_btn">
            <span className="dis_p">텔레그램 알림봇 이용 가이드</span>
            <span className="dis_m">이용 가이드</span>
            <div className="icon">
              <Image src={GuidGoIcon[0]} alt="quide" />
            </div>
          </div>
        </div>
        <div className="info_bottom">
          <StyledInput placeholder="텔레그램 ‘@사용자명’을 입력해요" />
          <StyledButton blue>사용자명 등록</StyledButton>
          <div className="notice">
            <div className="icon">
              <Image src={Notice[0]} alt="notice" />
            </div>
            <span>텔레그램의 사용자명을 등록하시면 매매와 여러정보를 알림으로 받아 보실 수 있어요.</span>
          </div>
        </div>
      </div>
    </LicensesTopBlock>
  );
};

const LicensesTopBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 100px;
  .dis_m {
    display: none;
  }

  .my_profile {
    width: 50%;
    max-width: 736px;
    margin-right: 20px;
    background-color: ${colors.gray[0]};
    border-radius: 14px;
    padding: 28px 40px;
    display: flex;

    .thumnail {
      width: 72px;
      height: 72px;
      min-width: 72px;
      position: relative;
      margin-right: 20px;
      border-radius: 50%;
      overflow: hidden;
      background-color: ${colors.blue[2]};
    }

    .profile_info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .nickname {
        font-size: 20px;
        font-family: 'GmarketSansBold';
        margin-bottom: 0.5rem;
      }
      .licenses {
        width: 100%;
        flex: 1;
        padding: 8px 20px;
        background-color: white;
        font-family: 'GmarketSansBold';
        border-radius: 18px;
        color: ${colors.blue[2]};
        font-size: 14px;
      }
    }
  }
  .information {
    width: 50%;
    max-width: 748px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .info_top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      .left_con {
        display: flex;
        align-items: center;
        .telegram_alram_bot {
          display: flex;
          align-items: center;
          margin-right: 14px;
          color: ${colors.blue[2]};
          .icon {
            min-width: 34px;
            margin-right: 1rem;
          }
        }
        label {
          display: flex;
          align-items: center;
          margin-right: 24px;
          color: ${colors.gray[4]};
          cursor: pointer;
          input {
            display: none;
          }
          span.styled_checkbox {
            display: inline-block;
            min-width: 24px;
            width: 24px;
            height: 24px;
            margin-right: 4px;
            background: url(${CheckCircle[2].src}) no-repeat 50% / cover;
            transform: translateY(-2px);
          }
          input:checked + span.styled_checkbox {
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 4px;
            background: url(${CheckCircle[3].src}) no-repeat 50% / cover;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
      .how_to_telegram_btn {
        cursor: pointer;
        padding: 6px 20px;
        background-color: ${colors.gray[0]};
        border-radius: 16px;
        font-size: 14px;
        color: ${colors.gray[5]};
        display: flex;
        align-items: center;
        transition: all 0.2s;
        span {
          transform: translateY(2px);
        }
        .icon {
          min-width: 18px;
          width: 18px;
          height: 18px;
          margin-left: 14px;
        }

        &:hover {
          background-color: ${colors.gray[2]};
        }
      }
    }
    .info_bottom {
      width: 100%;
      display: flex;
      position: relative;
      align-items: center;

      .notice {
        width: 100%;
        position: absolute;
        bottom: 0;
        transform: translateY(130%);
        display: flex;
        font-size: 14px;
        color: ${colors.gray[4]};
        .icon {
          min-width: 18px;
          margin-right: 8px;
        }
      }
    }
  }
  ${media.pc} {
    .my_profile {
      width: 40%;
      flex-wrap: wrap;
      padding: 24px;
      .thumnail {
        margin-bottom: 7px;
      }

      .profile_info {
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .information {
      width: 60%;
    }
  }

  ${media.tablet} {
    .dis_p {
      display: none;
    }
    .dis_m {
      display: inline-block;
    }

    .my_profile {
      display: none;
    }
    .information {
      width: 100%;
      .info_top {
        align-items: flex-start;
        margin-bottom: 20px;
        .left_con {
          flex-direction: column;
          .telegram_alram_bot {
            margin-bottom: 7px;
            .icon {
              margin-right: 8px;
            }
          }
        }
        .how_to_telegram_btn {
          padding: 6px;
          font-size: 14px;
          color: ${colors.gray[5]};
          display: flex;
          align-items: center;
          transition: all 0.2s;
          span {
            transform: translateY(2px);
          }
          .icon {
            width: 18px;
            height: 18px;
            margin-left: 4px;
            transform: translateY(-2px);
          }

          &:hover {
            background-color: ${colors.gray[2]};
          }
        }
      }
    }
  }
`;

const StyledInput = styled.input`
  flex: 1;
  width: 100%;
  height: 56px;
  border: none;
  background-color: ${colors.gray[0]};
  border-radius: 8px;
  font-size: 1rem;
  padding: 0 24px;
  margin-right: 1rem;
  &::placeholder {
    font-size: 1rem;
    color: ${colors.gray[3]};
  }

  &:focus {
    outline: none;
  }

  ${media.tablet} {
    margin-right: 8px;
  }
`;

const StyledButton = styled(Button)`
  padding: 0;
  width: 152px;
  height: 56px;
  ${media.tablet} {
    flex: 1;
    width: 100%;
    max-width: 114px;
  }
`;

export default LicensesTop;
