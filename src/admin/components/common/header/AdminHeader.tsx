import colors from '@/src/assets/Colors';
import { Logo, MMenuWhtieBar } from '@/src/assets/Images';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const AdminHeader = ({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const router = useRouter();
  return (
    <>
      <AdminHeaderBlock>
        <StyledButton className="more_btn" onClick={() => setOpen(!open)}>
          <Image src={MMenuWhtieBar} alt="more" />
        </StyledButton>
        <div className="logo" onClick={() => router.push(`/`)}>
          <Image src={Logo[1]} alt="logo" />
        </div>
      </AdminHeaderBlock>
      <AdminHeaderSpacer />
    </>
  );
};

const AdminHeaderBlock = styled.div`
  width: 100%;
  height: 70px;
  background-color: ${colors.dark[1]};
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  position: fixed;
  box-shadow: ${({ theme }) => theme.boxShadow};

  .more_btn {
    width: 40px;
    height: 40px;
    color: white;
    margin-right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .logo {
    width: 170px;
    cursor: pointer;
  }
`;
const AdminHeaderSpacer = styled.div`
  width: 100%;
  height: 70px;
`;
const StyledButton = styled(Button)`
  padding: 0;
  width: 40px;
  min-width: auto;
  height: 40px;
`;

export default AdminHeader;
