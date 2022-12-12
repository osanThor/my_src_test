import React, { useState } from 'react';
import styled from 'styled-components';
import AdminHeader from '../components/common/header/AdminHeader';
import AdminMenu from '../components/common/header/AdminMenu';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <AdminLayoutBlock>
      <AdminHeader open={open} setOpen={setOpen} />
      <div className="container">
        <AdminMenu open={open} />
        <div className={open ? 'main open' : 'main'}>{children}</div>
      </div>
    </AdminLayoutBlock>
  );
};

const AdminLayoutBlock = styled.div`
  width: 100%;
  .container {
    width: 100%;
    height: calc(100vh - 70px);
    overflow-y: auto;
    display: flex;
    .main {
      padding: 1rem 2rem 3rem;
      flex: 1;
      background-color: rgb(242, 245, 249);
      overflow-y: auto;
    }
  }
`;

export default AdminLayout;
