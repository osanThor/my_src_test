import React, { useEffect } from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/login/LoginForm';
import { axiosInstance } from '@/src/store/api';
import { END } from 'redux-saga';

import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { authActions } from '@/src/store/reducers';
import wrapper, { RootState } from '@/src/store/configureStore';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Login: NextPage = () => {
  const dispatch = useDispatch();
  const { email, pw } = useSelector(({ auth }: RootState) => ({
    email: auth.email,
    pw: auth.pw,
  }));
  const onChange = (e: any) => {
    const { name, value } = e.target;
    let emailVal = email;
    let pwVal = pw;
    if (name === 'email') {
      emailVal = value;
    } else {
      pwVal = value;
    }
    dispatch(
      authActions.changeLoginField({
        email: emailVal,
        pw: pwVal,
      }),
    );
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(authActions.userLogin({ email, pw }));
  };

  useEffect(() => {
    dispatch(authActions.initializeAuthForm());
  }, [dispatch]);

  return (
    <AuthLayout type="login">
      <LoginForm email={email} pw={pw} onChange={onChange} onSubmit={onSubmit} />
    </AuthLayout>
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
//     store.dispatch(authActions.userLogin({ email: , pw: pw }));

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
export default Login;
