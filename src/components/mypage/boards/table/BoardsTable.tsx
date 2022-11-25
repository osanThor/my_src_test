import React from 'react';
import styled from 'styled-components';

const BoardsTable = () => {
  return (
    <BoardsTableBlock>
      <div className="thead">
        <div className="th">
          <div className="td"></div>
        </div>
      </div>
    </BoardsTableBlock>
  );
};

const BoardsTableBlock = styled.div`
  width: 100%;
`;

export default BoardsTable;
