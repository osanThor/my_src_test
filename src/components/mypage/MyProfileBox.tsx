import colors from '@/src/assets/Colors';
import { Profile1 } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const MyProfileBox = () => {
  const { email, nickname, photoUrl, license, _count } = useSelector(({ user }: RootState) => ({
    email: user.email,
    nickname: user.nickname,
    photoUrl: user.photoUrl,
    license: user.licenses,
    _count: user._count,
  }));
  const { boards, comments } = _count;
  return (
    <MyProfileBoxBlock>
      <div className="profile_image">
        <Image src={photoUrl} alt="profile" layout="fill" />
      </div>
      <div className="profile_info">
        <div className="name">
          <div className="nickname">{nickname}</div>
          <div className="email">{email}</div>
        </div>
        <div className="licenses">
          <div className="license">이용권을 등록해주세요</div>
        </div>
        <div className="counts">
          <div className="boards">
            게시글 <span>{boards}</span>
          </div>
          <div className="comments">
            댓글 <span>{comments}</span>
          </div>
        </div>
      </div>
    </MyProfileBoxBlock>
  );
};

const MyProfileBoxBlock = styled.div`
  width: 100%;
  background-color: ${colors.gray[0]};
  border-radius: 14px;
  padding: 32px 40px;
  display: flex;
  margin-bottom: 64px;
  .profile_image {
    width: 104px;
    min-width: 104px;
    height: 104px;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 32px;
    background-color: ${colors.blue[2]};
  }
  .profile_info {
    flex: 1;
    .name {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      .nickname {
        font-family: 'GmarketSansBold';
        font-size: 20px;
        margin-right: 12px;
      }
      .email {
        font-size: 14px;
        color: ${colors.gray[4]};
      }
    }
    .licenses {
      display: flex;
      flex-direction: column;
      margin-bottom: 12px;
      .license {
        width: 100%;
        max-width: 424px;
        border-radius: 20px;
        align-items: center;
        background-color: white;
        font-family: 'GmarketSansBold';
        font-size: 14px;
        color: ${colors.blue[2]};
        display: flex;
        justify-content: space-between;
        padding: 8px 20px;
        margin-bottom: 1rem;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .counts {
      display: flex;
      font-size: 14px;
      & > div {
        margin-right: 24px;
        color: ${colors.gray[4]};
        span {
          color: ${colors.gray[5]};
        }
      }
    }
  }
`;
export default MyProfileBox;
