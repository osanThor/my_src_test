import colors from '@/src/assets/Colors';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const DefaultTop = ({}: {}) => {
  const router = useRouter();
  return (
    <DefaultTopBlock>
      <div className="title">
        {router.query.category === 'COMMISSION' && '전략개발의뢰'}
        {router.query.category === 'QUANTRO_STRATEGY' && '공개전략'}
        {router.query.category === 'QUANTRO_INDICATOR' && '공개지표'}
      </div>
    </DefaultTopBlock>
  );
};
const DefaultTopBlock = styled.div`
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

export default DefaultTop;
