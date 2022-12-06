import UserLayout from '@/src/components/layout/UserLayout';
import InquiryAnswer from '@/src/components/mypage/inquiries/detail/InquiryAnswer';
import InquiryContent from '@/src/components/mypage/inquiries/detail/InquiryContent';
import InquiryTop from '@/src/components/mypage/inquiries/detail/InquiryTop';
import InquiriesLayout from '@/src/components/mypage/inquiries/InquiriesLayout';
import { RootState } from '@/src/store/configureStore';
import { boardsActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const InquiriesDetail: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { getInquiryResult } = useSelector(({ boards }: RootState) => ({
    getInquiryResult: boards.getInquiryResult,
  }));
  const [boardIdSt, setBoardIdSt] = useState(0);
  const { loadAuthLoading, loadAuthDone } = useSelector(({ auth }: RootState) => ({
    loadAuthLoading: auth.loadAuthLoading,
    loadAuthDone: auth.loadAuthDone,
  }));

  // api request once
  const [once, setOnce] = useState(false);
  useEffect(() => {
    setOnce(false);
  }, [router]);

  useEffect(() => {
    if (!loadAuthLoading) {
      if (loadAuthDone) {
        if (loadAuthDone.accessToken) {
          setOnce(true);
        }
      }
    }
  }, [loadAuthLoading, loadAuthDone]);

  useEffect(() => {
    dispatch(boardsActions.initializeBoardsForm());
  }, [router]);
  // local baordId
  const { qId } = router.query;
  useEffect(() => {
    setOnce(false);
    if (qId) {
      setBoardIdSt(parseInt(qId as string));
    }
  }, [qId]);

  console.log(getInquiryResult);

  useEffect(() => {
    if (once) {
      if (boardIdSt != 0) {
        dispatch(boardsActions.getUserInquiry({ inquiryId: boardIdSt }));
      }
    }
  }, [once]);

  return (
    <>
      <UserLayout>
        <InquiriesLayout>
          <InquiryTop />
          <InquiryContent />
          <InquiryAnswer />
        </InquiriesLayout>
      </UserLayout>
    </>
  );
};

export default InquiriesDetail;
