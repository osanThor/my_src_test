import colors from '@/src/assets/Colors';
import React from 'react';
import styled from 'styled-components';

const UserStrategyTop = ({}: {}) => {
  return (
    <UserStrategyTopBlock>
      <div className="title">사용자 전략</div>
    </UserStrategyTopBlock>
  );
};
const UserStrategyTopBlock = styled.div`
  width: 100%;
  margin-bottom: 20px;
  & > .title {
    display: flex;
    justify-content: space-between;
  }
  .boardTop {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .admin_tab {
      display: flex;
      align-items: center;
      .menu {
        padding: 4px 1rem;
        background-color: ${colors.blue[0]};
        border-radius: 24px;
        color: ${colors.blue[2]};
        cursor: pointer;
        margin-right: 1rem;
        transition: all 0.2s;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          background-color: ${colors.blue[2]};
          color: white;
        }
        &.on {
          background-color: ${colors.blue[2]};
          color: white;
        }
      }
    }
  }
`;

export default UserStrategyTop;
