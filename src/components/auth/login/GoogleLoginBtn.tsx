import { Google } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { authActions } from '@/src/store/reducers';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../../common/Button';

const GoogleLoginBtn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAuthDone } = useSelector(({ auth }: RootState) => ({
    loadAuthDone: auth.loadAuthDone,
  }));
  const { user, userError } = useSelector(({ user }: RootState) => ({
    user: user.user,
    userError: user.userError,
  }));

  const { data: session, status } = useSession();
  React.useEffect(() => {
    if (!session) {
      console.log('not login');
    } else {
      const { accessToken } = session;
      let email;
      email = session.user.email;
      console.log(accessToken);
      console.log(email);
      dispatch(authActions.googleLogin({ accessToken }));
    }
  }, [session]);

  React.useEffect(() => {
    if (loadAuthDone.message != '') {
      if (loadAuthDone.message === 'CREATED') {
        const { accessToken, user } = session;
        console.log('새로운 회원');
        localStorage.setItem('gId', user.email);
        localStorage.setItem('Authorization', accessToken);
        router.push('/auth/register');
      }
      if (loadAuthDone.message === undefined) {
        console.log('구글이 먼저');
        console.log('이미 회원이거나 구글 로그인');
        localStorage.setItem('gId', 'true');
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('AuthStatus', '구글로그인');
        localStorage.setItem('Authorization', loadAuthDone.accessToken);
      }
    }
  }, [loadAuthDone]);

  return (
    <>
      <GoogleLoginBtnBlock type="button" onClick={() => signIn('google')}>
        구글 계정을 사용할래요
        <div className="icon">
          <Image src={Google} alt="google" />
        </div>
      </GoogleLoginBtnBlock>
    </>
  );
};
const GoogleLoginBtnBlock = styled(Button)`
  width: 100%;
  height: 72px;
  text-align: left;
  position: relative;
  margin-bottom: 30px;

  .icon {
    position: absolute;
    top: 50%;
    right: 36px;
    transform: translateY(-50%);
    display: flex;
  }
  @media (max-width: 768px) {
    height: 56px;
    margin-bottom: 20px;
  }
`;

export default GoogleLoginBtn;
