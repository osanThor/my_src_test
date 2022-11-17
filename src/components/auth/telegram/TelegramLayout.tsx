import colors from '@/src/assets/Colors';
import { Logo } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../common/Button';

const TelegramLayout = ({
  children,
  setOpen,
}: {
  children: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isDark } = useSelector(({ user }: RootState) => ({
    isDark: user.isDark,
  }));
  const handleActionOpenModal = () => {
    setOpen(true);
  };
  return (
    <LoginFormBlock>
      <h1 className="logo">
        <Link href="/">
          <a>
            <Image src={isDark ? Logo[1] : Logo[0]} alt="main_logo" />
          </a>
        </Link>
      </h1>
      {children}
      <StyledButton fullWidth onClick={handleActionOpenModal}>
        건너뛰기
      </StyledButton>
    </LoginFormBlock>
  );
};

const LoginFormBlock = styled.div`
  width: 100%;
  max-width: 400px;
  height: 100%;
  color: ${colors.gray[5]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1.logo {
    width: 210px;
    cursor: pointer;
    margin-bottom: 28px;
    a {
      display: block;
    }
    img {
      width: 100%;
    }
  }

  h2 {
    color: ${colors.blue[2]};
    margin-bottom: 1rem;
  }
  .import_connect {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
  }

  .description {
    width: 100%;
    height: 370px;
    margin-bottom: 1rem;
    overflow-y: auto;
    padding: 1rem;
  }

  ${media.tablet} {
    width: calc(100% - 32px);
  }
`;
const StyledButton = styled(Button)`
  height: 72px;
  ${media.tablet} {
    height: 56px;
  }
`;

export default TelegramLayout;
