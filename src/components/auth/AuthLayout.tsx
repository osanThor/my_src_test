import React from 'react';
import { media } from '@/styles/theme';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import colors from '../../assets/Colors';
import { Logo } from '../../assets/Images';
import Button from '../common/Button';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';

const AuthLayout = ({ type, children }: { type: string; children: React.ReactNode }) => {
  const { isDark } = useSelector(({ user }: RootState) => ({
    isDark: user.isDark,
  }));
  return (
    <AuthLayoutBlock>
      <AuthHead>
        <h1 className="logo">
          {type === 'forgot-password' && (
            <Link href="/">
              <a>
                <Image src={isDark ? Logo[1] : Logo[0]} alt="main Logo" />
              </a>
            </Link>
          )}
        </h1>
        {type != 'telegram' && (
          <div className="auth_Btn">
            {type === 'login' ? (
              <div className="onlyPc">
                <span>계정이 없다구요?</span>
                <Button href="/auth/terms">회원가입</Button>
              </div>
            ) : (
              <Button href="/auth/login">로그인 하기</Button>
            )}
          </div>
        )}
      </AuthHead>
      {children}
    </AuthLayoutBlock>
  );
};

const AuthLayoutBlock = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.tablet} {
    padding: 72px 0;
  }
`;

const AuthHead = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 80px;

  .logo {
    width: 170px;
    display: inline-block;
    cursor: pointer;
    img {
      width: 100%;
    }
  }

  .auth_Btn {
    color: ${colors.gray[4]};

    span {
      margin-right: 1rem;
    }

    a {
      color: ${colors.blue[2]};
      display: inline-block;
      background-color: ${colors.blue[0]};
      text-align: center;
      width: 126px;
      line-height: 48px;
      border-radius: 50px;
      transition: all 0.2s;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  //react
  @media (max-width: 768px) {
    padding: 1rem;
    .logo {
      width: 100px;
    }
    .auth_Btn {
      a {
        color: ${colors.dark[1]};
        width: auto;
        background: white;
      }
    }
    .onlyPc {
      display: none;
    }
  }
`;

export default AuthLayout;
