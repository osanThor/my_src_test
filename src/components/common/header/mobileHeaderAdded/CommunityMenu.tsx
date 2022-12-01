import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const CommunityMenu = () => {
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
    <CommunityMenuBlock>
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
      <div className={communityRank ? 'button on' : 'button'} onClick={() => router.push('/community?category=rank')}>
        랭킹
      </div>
      <div
        className={communityNotice ? 'button on' : 'button'}
        onClick={() => router.push('/community?category=notice')}
      >
        공지사항
      </div>
    </CommunityMenuBlock>
  );
};

const CommunityMenuBlock = styled.div`
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

export default CommunityMenu;
