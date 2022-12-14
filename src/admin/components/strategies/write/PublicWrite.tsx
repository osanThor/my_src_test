import React from 'react';
import styled from 'styled-components';
import colors from '@/src/assets/Colors';
import { Input } from '@mui/material';

const PublicWrite = () => {
  return (
    <PublicWriteBlock>
      <Input
        placeholder="전략 이름이 들어가는 곳이에요"
        sx={{ width: '100%', height: '58px', p: 2, fontFamily: 'GmarketSans', mb: '20px' }}
      />
    </PublicWriteBlock>
  );
};

const PublicWriteBlock = styled.div`
  width: 100%;
`;

export default PublicWrite;
