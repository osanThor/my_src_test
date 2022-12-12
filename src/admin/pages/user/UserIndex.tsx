import React from 'react';
import UserTop from '../../components/user/UserTop';
import AdminLayout from '../../layouts/AdminLayout';
import BasicContainer from '../../layouts/BasicContainer';

const UserIndex = () => {
  return (
    <AdminLayout>
      <BasicContainer>
        <UserTop />
      </BasicContainer>
    </AdminLayout>
  );
};

export default UserIndex;
