import { RootState } from '@/src/store/configureStore';
import { adminCustomersActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardsList from '../../components/boards/BoardsList';
import BoardsTop from '../../components/boards/BoardsTop';
import CustomersList from '../../components/customers/CustomersList';
import CustomersTop from '../../components/customers/CustomersTop';
import InquiriesList from '../../components/customers/InquiriesList';
import AdminLayout from '../../layouts/AdminLayout';
import BasicContainer from '../../layouts/BasicContainer';

const CustomersIndex = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));
  const { page, group, nickname, title, isWait } = useSelector(({ adminCustomers }: RootState) => ({
    page: adminCustomers.page,
    group: adminCustomers.group,
    nickname: adminCustomers.nickname,
    title: adminCustomers.title,
    isWait: adminCustomers.isWait,
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
    dispatch(adminCustomersActions.initializeAdminCustomersForm());
  }, [dispatch]);

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (loadAdminAuthDone) {
      if (loadAdminAuthDone.accessToken) {
        setIsAdmin(true);
      }
    }
  }, [loadAdminAuthDone]);

  useEffect(() => {
    if (isAdmin) {
      if (router.query.state === 'guide') {
        dispatch(
          adminCustomersActions.getAdminAllGuides({
            page,
            group,
          }),
        );

        if (router.query.group) {
          dispatch(adminCustomersActions.changeGroup({ group: router.query.group as string }));
        } else {
          dispatch(adminCustomersActions.changeGroup({ group: '' }));
        }
      } else if (router.query.state === 'inquiry') {
        dispatch(
          adminCustomersActions.getAdminAllInquiries({
            page,
            nickname,
            title,
            isWait,
          }),
        );
        if (router.query.nickname) {
          dispatch(adminCustomersActions.changeNickname({ nickname: router.query.nickname as string }));
        } else {
          dispatch(adminCustomersActions.changeNickname({ nickname: '' }));
        }

        if (router.query.title) {
          dispatch(adminCustomersActions.changeTitle({ title: router.query.title as string }));
        } else {
          dispatch(adminCustomersActions.changeTitle({ title: '' }));
        }
        if (router.query.isWait) {
          dispatch(adminCustomersActions.changeIsWait({ isWait: 'true' }));
        } else {
          dispatch(adminCustomersActions.changeIsWait({ isWait: '' }));
        }
      }
      if (router.query.page) {
        dispatch(adminCustomersActions.changePage({ page: parseInt(router.query.page as string) }));
      } else {
        dispatch(adminCustomersActions.changePage({ page: 1 }));
      }
    }
  }, [router, isAdmin, page, group, nickname, title, isWait]);
  return (
    <AdminLayout>
      <BasicContainer>
        <CustomersTop />
        {router.query.state === 'guide' && <CustomersList />}
        {router.query.state === 'inquiry' && <InquiriesList />}
      </BasicContainer>
    </AdminLayout>
  );
};

export default CustomersIndex;
