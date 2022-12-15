import React from 'react';
import BoardsTop from '../../components/boards/BoardsTop';
import AdminLayout from '../../layouts/AdminLayout';
import BasicContainer from '../../layouts/BasicContainer';

const BoardsIndex = () => {
  return (
    <AdminLayout>
      <BasicContainer>
        <BoardsTop />
      </BasicContainer>
    </AdminLayout>
  );
};

export default BoardsIndex;
