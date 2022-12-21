import CenterLayout from '@/src/components/center/CenterLayout';
import UserLayout from '@/src/components/layout/UserLayout';
import { RootState } from '@/src/store/configureStore';
import { boardsActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CenterPageIndex: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { getGuidesResult } = useSelector(({ boards }: RootState) => ({
    getGuidesResult: boards.getGuidesResult,
  }));
  useEffect(() => {
    dispatch(boardsActions.getUserGuides());
  }, []);
  console.log(getGuidesResult);
  return (
    <UserLayout>
      <CenterLayout></CenterLayout>
    </UserLayout>
  );
};

export default CenterPageIndex;
