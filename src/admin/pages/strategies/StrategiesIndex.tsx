import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useDispatch } from 'react-redux';
import BasicContainer from '../../layouts/BasicContainer';
import { adminUsersActions } from '@/src/store/reducers';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import { useRouter } from 'next/router';
import StrategyTop from '../../components/strategies/StrategyTop';

const StrategiesIndex = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      alert('권한이 없습니다');
      router.push('/admin/login');
    }
  }, []);

  useEffect(() => {
    setIsAdmin(false);
    dispatch(adminUsersActions.initializeAdminUsersForm());
  }, [dispatch]);

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (loadAdminAuthDone) {
      if (loadAdminAuthDone.accessToken) {
        setIsAdmin(true);
      }
    }
  }, [loadAdminAuthDone]);

  //   useEffect(() => {
  //     if (isAdmin) {
  //       dispatch(
  //         adminUsersActions.getAdminUsers({
  //           page,
  //           snsType,
  //           nickname,
  //           licensePackage,
  //           grade,
  //           email,
  //         }),
  //       );

  //       if (router.query.page) {
  //         dispatch(adminUsersActions.changePage({ page: parseInt(router.query.page as string) }));
  //       } else {
  //         dispatch(adminUsersActions.changePage({ page: 1 }));
  //       }
  //       if (router.query.snsType) {
  //         dispatch(adminUsersActions.changeSnsType({ snsType: router.query.snsType as string }));
  //       } else {
  //         dispatch(adminUsersActions.changeSnsType({ snsType: '' }));
  //       }
  //       if (router.query.nickname) {
  //         dispatch(adminUsersActions.changeNickname({ nickname: router.query.nickname as string }));
  //       } else {
  //         dispatch(adminUsersActions.changeNickname({ nickname: '' }));
  //       }
  //       if (router.query.licensePackage) {
  //         dispatch(adminUsersActions.changeLicensePakage({ licensePackage: router.query.licensePackage as string }));
  //       } else {
  //         dispatch(adminUsersActions.changeLicensePakage({ licensePackage: '' }));
  //       }
  //       if (router.query.grade) {
  //         dispatch(adminUsersActions.changeGrade({ grade: router.query.grade as string }));
  //       } else {
  //         dispatch(adminUsersActions.changeGrade({ grade: '' }));
  //       }
  //       if (router.query.email) {
  //         dispatch(adminUsersActions.changeEmail({ email: router.query.email as string }));
  //       } else {
  //         dispatch(adminUsersActions.changeEmail({ email: '' }));
  //       }
  //     }
  //   }, [router, isAdmin, page, snsType, nickname, licensePackage, grade, email]);
  return (
    <AdminLayout>
      <BasicContainer>
        <StrategyTop />
      </BasicContainer>
    </AdminLayout>
  );
};

export default StrategiesIndex;
