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
    display: flex;
    .main {
      flex: 1;
    }
  }
`;

export default AdminLayout;
