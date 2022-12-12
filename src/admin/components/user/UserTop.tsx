import React from 'react';
import styled from 'styled-components';

const UserTop = () => {
  return (
    <UserTopBlock>
      <div className="title">회원관리</div>
    </UserTopBlock>
  );
};

const UserTopBlock = styled.div`
  width: 100%;
`;

export default UserTop;
