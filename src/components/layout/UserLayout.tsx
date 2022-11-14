import React from 'react';
import styled from 'styled-components';
import Header from '../common/header/Header';

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserLayOutBlock>
      <Header>{children}</Header>
    </UserLayOutBlock>
  );
};

const UserLayOutBlock = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export default UserLayout;
