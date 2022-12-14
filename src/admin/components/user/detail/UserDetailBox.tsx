import colors from '@/src/assets/Colors';
import { Profile1 } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { Input, TextareaAutosize } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const UserDetailBox = () => {
  const { getAdminUserDetailResult } = useSelector(({ adminUsers }: RootState) => ({
    getAdminUserDetailResult: adminUsers.getAdminUserDetailResult,
  }));
  return (
    <UserDetailBoxBlock>
      <div className="title">회원상세</div>
      <div className="profile_box">
        <div className="prfile_info">
          <div className="profile_top">
            <div className="profile_Image">
              <Image
                src={
                  getAdminUserDetailResult?.photoUrl &&
                  getAdminUserDetailResult.photoUrl != 'quantro.net' &&
                  getAdminUserDetailResult.photoUrl != 'byteria.co.kr' &&
                  getAdminUserDetailResult.photoUrl != 'default.com' &&
                  getAdminUserDetailResult.photoUrl != 'app.quantro.net'
                    ? getAdminUserDetailResult.photoUrl
                    : Profile1[1]
                }
                alt="user profile"
                layout="fill"
              />
            </div>
            <div className="profile_name">
              <Input style={{ flex: 1 }} value={getAdminUserDetailResult?.nickname || ''} readOnly />
              <Input style={{ flex: 1 }} value={getAdminUserDetailResult?.email || ''} readOnly />
            </div>
          </div>
          <div className="profile_bott">
            <div className="label">트래이딩 스타일</div>
            <div className="styles">
              {getAdminUserDetailResult?.styles?.map((st) => {
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
        </div>
        <TextareaAutosize
          style={{ flex: 1, height: 'auto' }}
          className="introduce"
          value={getAdminUserDetailResult?.introduction ? getAdminUserDetailResult?.introduction : ''}
          placeholder="자기소개"
          readOnly
        />
      </div>
    </UserDetailBoxBlock>
  );
};

const UserDetailBoxBlock = styled.div`
  width: 100%;
  margin-bottom: 54px;

  .profile_box {
    width: 100%;
    display: flex;

    .prfile_info {
      flex: 1;
      margin-right: 20px;
      .profile_top {
        width: 100%;
        display: flex;
        margin-bottom: 1rem;
        .profile_Image {
          width: 130px;
          min-width: 130px;
          height: 130px;
          margin-right: 20px;
          position: relative;
          border-radius: 50%;
          overflow: hidden;
        }
        .profile_name {
          flex: 1;
          display: flex;
          flex-direction: column;
          input {
            width: 100%;
            position: relative;
            border: none;
            font-size: 1rem;
            padding: 0 1rem;
            flex: 1;
            font-family: 'GmarketSansBold';

            &:read-only {
              color: ${colors.blue[2]};
            }
          }
        }
      }
      .profile_bott {
        width: 100%;
        display: flex;
        align-items: center;
        .label {
          min-width: 130px;
          font-size: 14px;
          padding: 4px 14px;
          border-radius: 24px;
          margin-right: 20px;
          background-color: ${colors.blue[0]};
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
    }

    .introduce {
      flex: 1;
      border: none;
      border: 1px solid ${colors.gray[3]};
      resize: none;
      font-size: 1rem;
      border-radius: 14px;
      padding: 1rem;
      transition: all 0.2s;
      &:focus {
        outline: none;
        border: 2px solid ${colors.blue[2]};
      }
    }
  }
`;

export default UserDetailBox;
