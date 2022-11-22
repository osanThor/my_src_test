import colors from '@/src/assets/Colors';
import { Profile1 } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

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
          <div className="nickname">{nickname}</div>
          <div className="licenses">이용권을 등록해주세요</div>
        </div>
      </div>
    </LicensesTopBlock>
  );
};

const LicensesTopBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .my_profile {
    width: 50%;
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
`;

export default LicensesTop;
