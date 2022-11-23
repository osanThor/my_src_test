import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const MyPageMenu = () => {
  const router = useRouter();
  const { editMyProfile, myBoards } = useSelector(({ local }: RootState) => ({
    editMyProfile: local.editMyProfile,
    myBoards: local.myBoards,
  }));
  return (
    <MyPageMenuBlock>
      <div className={editMyProfile ? 'button on' : 'button'} onClick={() => router.push('/mypage?state=edit')}>
        내정보 변경
      </div>
      <div className={myBoards ? 'button on' : 'button'} onClick={() => router.push('/mypage?state=boards')}>
        게시글 관리
      </div>
    </MyPageMenuBlock>
  );
};

const MyPageMenuBlock = styled.div`
  width: 100%;
  height: 56px;
  position: absolute;
  top: 100%;
  left: 0;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.gray[1]};
  background-color: ${({ theme }) => theme.bgColor};
  overflow-x: auto;
  white-space: nowrap;

  .button {
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 8px 16px;
    border-radius: 20px;
    background-color: ${colors.gray[1]};
    color: ${colors.gray[5]};
    margin-right: 8px;
    &:last-child {
      margin-right: 0;
    }

    &.on {
      background-color: ${colors.blue[2]};
      color: white;
    }
    &.error {
      background-color: ${colors.red[2]};
      color: white;
    }
  }
`;

export default MyPageMenu;
