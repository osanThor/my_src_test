import { RootState } from '@/src/store/configureStore';
import { adminBoardsActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardsList from '../../components/boards/BoardsList';
import BoardsTop from '../../components/boards/BoardsTop';
import AdminLayout from '../../layouts/AdminLayout';
import BasicContainer from '../../layouts/BasicContainer';

const BoardsIndex = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));
  const { page, category, title, user } = useSelector(({ adminBoards }: RootState) => ({
    page: adminBoards.page,
    category: adminBoards.category,
    title: adminBoards.title,
    user: adminBoards.user,
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
    dispatch(adminBoardsActions.initializeAdminBoardsForm());
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
      dispatch(
        adminBoardsActions.getAdminAllBoards({
          page,
          category,
          title,
          user,
        }),
      );

      if (router.query.page) {
        dispatch(adminBoardsActions.changePage({ page: parseInt(router.query.page as string) }));
      } else {
        dispatch(adminBoardsActions.changePage({ page: 1 }));
      }
      if (!router.query.category) {
        dispatch(adminBoardsActions.changeCategory({ category: '' }));
      } else {
        if (router.query.category === 'DISCUSSION') {
          dispatch(adminBoardsActions.changeCategory({ category: 'DISCUSSION' }));
        } else if (router.query.category === 'NOTICE') {
          dispatch(adminBoardsActions.changeCategory({ category: 'NOTICE' }));
        }
      }
      if (!router.query.user) {
        dispatch(adminBoardsActions.changeUser({ user: '' }));
      } else {
        dispatch(adminBoardsActions.changeUser({ user: router.query.user as string }));
      }

      if (!router.query.title) {
        dispatch(adminBoardsActions.changeTitle({ title: '' }));
      } else {
        dispatch(adminBoardsActions.changeTitle({ title: router.query.title as string }));
      }
    }
  }, [router, isAdmin, page, category, title, user]);
  return (
    <AdminLayout>
      <BasicContainer>
        <BoardsTop />
        <BoardsList />
      </BasicContainer>
    </AdminLayout>
  );
};

export default BoardsIndex;
