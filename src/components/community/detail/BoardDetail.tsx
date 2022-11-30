import { RootState } from '@/src/store/configureStore';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const BoardDetail = () => {
  const { getBoardDone } = useSelector(({ boards }: RootState) => ({
    getBoardDone: boards.getBoardDone,
  }));
  console.log(getBoardDone);
  const { id, title } = getBoardDone;
  return <BoardDetailBlock className="container">board detail {id}</BoardDetailBlock>;
};

const BoardDetailBlock = styled.div`
  width: 100%;
`;

export default BoardDetail;
