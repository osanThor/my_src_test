import colors from '@/src/assets/Colors';
import { Profile1 } from '@/src/assets/Images';
import Pagination from '@/src/components/common/Pagination';
import { RootState } from '@/src/store/configureStore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const UserList = () => {
  const router = useRouter();
  const { getAdminUsersResult } = useSelector(({ adminUsers }: RootState) => ({
    getAdminUsersResult: adminUsers.getAdminUsersResult,
  }));
  return (
    <UserListBlock>
      <div className="user_list_header">
        <div className="th">
          <div className="td">NO</div>
          <div className="td">사용자 프로필</div>
          <div className="td">로그인 방식</div>
          <div className="td">패키지</div>
          <div className="td">상태</div>
          <div className="td">가입일</div>
        </div>
      </div>
      <div className="user_list">
        {getAdminUsersResult &&
          getAdminUsersResult?.map((user) => (
            <div className="tr" key={user.email} onClick={() => router.push(`/admin/users/user?email=${user.email}`)}>
              <div className="td">1</div>
              <div className="td profile">
                <div className="profile_Image">
                  <Image
                    src={user.photoUrl && user.photoUrl != 'quantro.net' ? user.photoUrl : Profile1[1]}
                    alt="profile"
                    layout="fill"
                  />
                </div>
                <div className="profile_info">
                  <div className="nickname">{user.nickname ? user.nickname : '퀀트로'}</div>
                  <div className="email">{user.email ? user.email : '퀀트로'}</div>
                </div>
              </div>
              <div className="td">{user.snsType}</div>
              <div className="td">{user.license ? user.license.package : 'NULL'}</div>
              <div className="td">{user.grade}</div>
              <div className="td">
                <Moment format="YYYY.MM.DD">{user.createdAt}</Moment>
              </div>
            </div>
          ))}
      </div>
      <div className="bottom">
        <Pagination total={100} page={1} />
      </div>
    </UserListBlock>
  );
};
const UserListBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .td {
    padding: 8px 1rem;
    margin-right: 8px;
    text-align: center;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    &:first-child {
      width: 10%;
      max-width: 120px;
    }
    &:nth-child(2) {
      flex: 1;
      max-width: 450px;
      &.profile {
        display: flex;
        .profile_Image {
          width: 56px;
          min-width: 56px;
          height: 56px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          margin-right: 1rem;
          border: 1px solid ${colors.gray[1]};
        }
        .profile_info {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
      }
    }
    &:nth-child(3) {
      width: 20%;
      max-width: 250px;
    }
    &:nth-child(4) {
      width: 20%;
      max-width: 250px;
    }
    &:nth-child(5) {
      width: 20%;
      max-width: 250px;
    }
    &:nth-child(6) {
      width: 20%;
      max-width: 450px;
    }
    &:last-child {
      margin-right: 0;
    }
  }

  .user_list_header {
    width: 100%;
    margin-bottom: 8px;
    .th {
      width: 100%;
      display: flex;
      font-size: 12px;
      .td {
        background: ${colors.gray[1]};
        border: 1px solid ${colors.gray[3]};
        border-radius: 8px;
      }
    }
  }
  .user_list {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    .tr {
      cursor: pointer;
      width: 100%;
      display: flex;
      border-bottom: 1px solid ${colors.gray[2]};
      padding: 4px 0;
      font-size: 14px;
      color: ${colors.gray[5]};
    }
  }
  .bottom {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export default UserList;
