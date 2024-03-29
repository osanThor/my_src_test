import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import { localActions } from '@/src/store/reducers';
import { media } from '@/styles/theme';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Modal from '../common/modals/Modal';

const CommunityWriteLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { communityDiscussion, communityCommission } = useSelector(({ local }: RootState) => ({
    communityDiscussion: local.communityDiscussion,
    communityCommission: local.communityCommission,
  }));
  const { license } = useSelector(({ user }: RootState) => ({
    license: user.license,
  }));
  const [modalOpen, setModalOpen] = useState(false);
  const handleOnClose = () => {
    setModalOpen(false);
  };
  const handleCommission = () => {
    if (!license || license?.package === 'BASIC') {
      setModalOpen(true);
      return;
    } else {
      dispatch(localActions.gotoComCommission());
    }
  };
  return (
    <>
      <CommunityLayoutBlock className="container">
        <h2 className="write_title">{router.pathname != '/community/modify' ? '게시판' : '전략토론'}</h2>
        {router.pathname != '/community/modify' && (
          <div className="community_top">
            <div className="community_tab">
              <div
                className={communityDiscussion ? 'button on' : 'button'}
                onClick={() => dispatch(localActions.gotoComDiscussion())}
              >
                전략토론
              </div>
              <div className={communityCommission ? 'button on' : 'button'} onClick={handleCommission}>
                전략 개발 의뢰
              </div>
            </div>
          </div>
        )}

        {children}
      </CommunityLayoutBlock>
      <Modal
        open={modalOpen}
        close={handleOnClose}
        message={'전략 개발 의뢰는 레귤러 패키지 이상부터 가능해요'}
        error={true}
      />
    </>
  );
};

const CommunityLayoutBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .write_title {
    font-size: 18px;
    color: ${colors.gray[5]};
    margin-bottom: 12px;
  }
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
    .write_title {
      display: none;
    }
  }
`;

export default CommunityWriteLayout;
