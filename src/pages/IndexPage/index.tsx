import Button from '@/src/components/common/Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';

import type { RootState } from '@/src/store/configureStore';
import { userActions } from '@/src/store/reducers';
import Link from 'next/link';

const IndexPage: NextPage = () => {
  const dispatch = useDispatch();
  const { isDark } = useSelector(({ user }: RootState) => ({
    isDark: user.isDark,
  }));
  const onClick = async () => {
    dispatch(userActions.changeTheme({ isDark }));
  };
  return (
    <>
      <h1>퀀트로 Index 페이지</h1>
      <Button onClick={onClick}>다크모드</Button>
      <Link href="/auth/login">로그인</Link>
    </>
  );
};

export default IndexPage;
