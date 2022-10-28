import Button from '@/src/components/common/Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { axiosInstance } from '@/src/store/api';
import { END } from 'redux-saga';

import type { RootState } from '@/src/store/configureStore';
import { userActions } from '@/src/store/reducers';
import wrapper from '@/src/store/configureStore';

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
    </>
  );
};
// export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context: GetServerSidePropsContext) => {
//     /**
//      * front-server와 backend-server가 서로 다르기때문에
//      * axios의 "withCredentials" 옵션으로 브라우저의 쿠키를 전달할 수 없음
//      * 따라서 직접 axios에 쿠키를 넣어주고 서버로 요청 후 다시 axios의 쿠키를 제거해주는 과정을 거침
//      * 클라이언트는 여러 대지만 서버는 한대이기 때문에 서버 사용한 쿠키는 반드시 제거해 줘야 함
//      */
//     let cookie = context.req?.headers?.cookie;
//     cookie = cookie ? cookie : '';
//     axiosInstance.defaults.headers.Cookie = cookie;

//     // 서버 사이드에서 dispatch할 내용을 적어줌
//     store.dispatch(userActions.changeTheme({ isDark: false }));

//     // 밑에 두 개는 REQUEST이후 SUCCESS가 될 때까지 기다려주게 해주는 코드
//     store.dispatch(END);
//     await store.sagaTask?.toPromise();

//     // 위에서 말한대로 axios의 쿠키 제거
//     axiosInstance.defaults.headers.Cookie = '';

//     // 위의 작업들이 정상작동을 한다면 클라이언트에서 렌더링할 때 이미 redux의 store에 데이터가 들어가 있음
//     // 따라서 props에 데이터를 전달할 필요 없음
//     return {
//       props: {},
//     };
//   },
// );

export default IndexPage;
