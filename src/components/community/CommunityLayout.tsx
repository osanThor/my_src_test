import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const CommunityLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { communityDiscussion, communityCommission, communityRank, communityNotice } = useSelector(
    ({ local }: RootState) => ({
      communityDiscussion: local.communityDiscussion,
      communityCommission: local.communityCommission,
      communityRank: local.communityRank,
      communityNotice: local.communityNotice,
    }),
  );
  return (
    <CommunityLayoutBlock className="container">
      <CommunityLayoutSpacer />
      <div className="community_top">
        <div className="community_tab">
          <div
            className={communityDiscussion ? 'button on' : 'button'}
            onClick={() => router.push('/community?category=discussion')}
          >
            전략토론
          </div>
          <div
            className={communityCommission ? 'button on' : 'button'}
            onClick={() => router.push('/community?category=commission')}
          >
            전략 개발 의뢰
          </div>
          <div
            className={communityRank ? 'button on' : 'button'}
            onClick={() => router.push('/community?category=rank')}
          >
            랭킹
          </div>
          <div
            className={communityNotice ? 'button on' : 'button'}
            onClick={() => router.push('/community?category=notice')}
          >
            공지사항
          </div>
        </div>
      </div>
      {children}
    </CommunityLayoutBlock>
  );
};

const CommunityLayoutBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .community_top {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    .community_tab {
      display: flex;
      align-items: center;
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
  }
  ${media.tablet} {
    .community_top {
      display: none;
    }
  }
`;
const CommunityLayoutSpacer = styled.div`
  ${media.tablet} {
    width: 100%;
    height: 56px;
  }
`;
export default CommunityLayout;
