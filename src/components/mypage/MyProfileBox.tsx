import colors from '@/src/assets/Colors';
import { Profile1 } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const MyProfileBox = () => {
  const { email, nickname, photoUrl, license, _count } = useSelector(({ user }: RootState) => ({
    email: user.email,
    nickname: user.nickname,
    photoUrl: user.photoUrl,
    license: user.license,
    _count: user._count,
  }));
  const { boards, comments } = _count;
  const [isBasic, setIsBasic] = useState('');
  useEffect(() => {
    if (!Array.isArray(license)) {
      setIsBasic('Quantro Basic Package');
    } else {
      setIsBasic('');
    }
  }, [license]);
  return (
    <MyProfileBoxBlock>
      <div className="profile_image">
        <Image src={photoUrl && photoUrl != 'default.com' ? photoUrl : Profile1[1]} alt="profile" layout="fill" />
      </div>
      <div className="profile_con">
        <div className="name">
          <div className="profile_image">
            <Image src={photoUrl && photoUrl != 'default.com' ? photoUrl : Profile1[1]} alt="profile" layout="fill" />
          </div>
          <div className="profile_info">
            <div className="nickname">{nickname ? nickname : '로딩중'}</div>
            <div className="email">{email}</div>
          </div>
        </div>
        <div className="licenses">
          {!license && <div className="license">이용권을 등록해주세요</div>}
          {license && (
            <>
              {Array.isArray(license) ? (
                license.map((pack) => (
                  <div className="license" key={pack.package}>
                    {pack.package}
                    <div className="period">
                      <Moment format="YY.MM.DD">{pack.startedAt}</Moment>~
                      <Moment format="YY.MM.DD">{pack.endedAt}</Moment>
                    </div>
                  </div>
                ))
              ) : (
                <div className="license">
                  {isBasic}
                  <div className="period">무제한 이용</div>
                </div>
              )}
            </>
          )}
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
  .profile_con {
    flex: 1;
    .name {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      .profile_image {
        display: none;
      }
      .profile_info {
        display: flex;
        align-items: center;
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
        display: flex;
        justify-content: space-between;
        .period {
          white-space: nowrap;
          font-size: 1rem;
          color: ${colors.gray[3]};
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

  ${media.tablet} {
    padding: 16px;
    margin-bottom: 20px;
    .profile_image {
      display: none;
    }
    .profile_con {
      .name {
        margin-bottom: 12px;
        .profile_image {
          display: block;
          width: 48px;
          min-width: 48px;
          height: 48px;
          margin-right: 16px;
        }
        .profile_info {
          flex-direction: column;
          align-items: flex-start;
          .nickname {
            font-size: 16px;
          }
        }
      }
      .licenses {
        .license {
          border-radius: 38px;
          max-width: none;
          font-size: 14px;
          color: ${colors.blue[2]};
          padding: 8px 20px;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 8px;
        }
      }
      .counts {
        & > div {
          margin-right: 20px;
        }
      }
    }
  }
`;
export default MyProfileBox;
