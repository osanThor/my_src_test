import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MyProfileBox from './MyProfileBox';

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { editMyProfile, myBoards } = useSelector(({ local }: RootState) => ({
    editMyProfile: local.editMyProfile,
    myBoards: local.myBoards,
  }));
  return (
    <MyPageLayoutBlock className="container">
      <MyPageHeaderSpacer />
      <MyProfileBox />
      <div className="mypage_tap">
        <div className={editMyProfile ? 'button on' : 'button'} onClick={() => router.push('/mypage?state=edit')}>
          내정보 변경
        </div>
        <div className={myBoards ? 'button on' : 'button'} onClick={() => router.push('/mypage?state=boards')}>
          게시글 관리
        </div>
      </div>
      {children}
    </MyPageLayoutBlock>
  );
};

const MyPageLayoutBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .mypage_tap {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    .button {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 20px;
      border-radius: 20px;
      background-color: ${colors.gray[1]};
      color: ${colors.gray[5]};
      margin-right: 1rem;
      transition: all 0.2s;
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        background-color: ${colors.gray[2]};
      }

      &.on {
        background-color: ${colors.blue[2]};
        color: white;
        &:hover {
          background-color: ${colors.blue[1]};
        }
      }
      &.error {
        background-color: ${colors.red[2]};
        color: white;
        &:hover {
          background-color: ${colors.red[1]};
        }
      }
    }
  }

  ${media.tablet} {
    .mypage_tap {
      display: none;
    }
  }
`;
const MyPageHeaderSpacer = styled.div`
  ${media.tablet} {
    width: 100%;
    height: 56px;
  }
`;
export default MyPageLayout;
