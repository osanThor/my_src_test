import Button from '@/src/components/common/Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import type { RootState } from '@/src/store/configureStore';
import { userActions } from '@/src/store/reducers';

const IndexPage = () => {
  const dispatch = useDispatch();
  const { isDark } = useSelector(({ user }: RootState) => ({
    isDark: user.isDark,
  }));
  const onClick = () => {
    dispatch(userActions.changeTheme({ isDark }));
  };
  return (
    <>
      <h1>퀀트로 Index 페이지</h1>
      <Button onClick={onClick}>다크모드</Button>
    </>
  );
};

export default IndexPage;
