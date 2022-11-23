import UserLayout from '@/src/components/layout/UserLayout';
import MyBoards from '@/src/components/mypage/boards/MyBoards';
import EditMyProfile from '@/src/components/mypage/edit/EditMyProfile';
import MyPageLayout from '@/src/components/mypage/MyPageLayout';
import { RootState } from '@/src/store/configureStore';
import { localActions, userActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const MypageIndex = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { editMyProfile, myBoards } = useSelector(({ local }: RootState) => ({
    editMyProfile: local.editMyProfile,
    myBoards: local.myBoards,
  }));

  useEffect(() => {
    dispatch(userActions.getUserProfile());
  }, []);

  useEffect(() => {
    dispatch(localActions.initializeAuthForm());
  }, [dispatch]);

  useEffect(() => {
    if (router.query.state === 'edit') {
      dispatch(localActions.gotoEditMyProfile());
    } else if (router.query.state === 'boards') {
      dispatch(localActions.gotoMyBoards());
    }
  }, [router]);

  return (
    <UserLayout>
      <MyPageLayout>
        {editMyProfile && <EditMyProfile />}
        {myBoards && <MyBoards />}
      </MyPageLayout>
    </UserLayout>
  );
};

export default MypageIndex;
