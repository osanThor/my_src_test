import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const MyBoardTab = () => {
  const dispatch = useDispatch();
  const { _count } = useSelector(({ user }: RootState) => ({
    _count: user._count,
  }));
  const { boards, comments } = _count;
  return (
    <MyBoardTabBlock>
      <div className="button on">
        작성글 <span>{boards}</span>
      </div>
      <div className="button">
        작성댓글 <span>{comments}</span>
      </div>
      <div className="button">좋아요한 글</div>
      <div className="button">컬렉션한 글</div>
      <div className="button">1:1 문의</div>
    </MyBoardTabBlock>
  );
};
const MyBoardTabBlock = styled.div`
  width: 100%;
  display: flex;

  .button {
    cursor: pointer;
    padding: 10px 12px;
    font-size: 14px;
    display: flex;
    color: ${colors.gray[4]};
    span {
      margin-left: 8px;
    }
    &.on {
      color: ${colors.blue[2]};
    }
  }
`;

export default MyBoardTab;
