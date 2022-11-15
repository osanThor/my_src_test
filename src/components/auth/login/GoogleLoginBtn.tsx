import { Google } from '@/src/assets/Images';
import { authActions } from '@/src/store/reducers';
import { useSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../../common/Button';

const GoogleLoginBtn = () => {
  const dispatch = useDispatch();

  const { data: session } = useSession();
  React.useEffect(() => {
    if (session) {
      const { accessToken } = session;
      console.log(accessToken);
      dispatch(authActions.googleLogin({ accessToken }));
    } else {
      localStorage.clear();
    }
  }, [session]);

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
