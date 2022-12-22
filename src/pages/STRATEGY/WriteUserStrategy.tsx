import Modal from '@/src/components/common/modals/Modal';
import UserLayout from '@/src/components/layout/UserLayout';
import StrategistLayout from '@/src/components/strategy/user/StrategistLayout';
import WriteUserStrategyCon from '@/src/components/strategy/write/user/WriteUserStrategyCon';
import { axiosInstance } from '@/src/store/api';
import { RootState } from '@/src/store/configureStore';
import { boardsActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const WriteUserStrategy: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  //id user
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) router.push('/auth/login');
  }, []);

  //reset
  useEffect(() => {
    dispatch(boardsActions.initializeBoardsForm());
  }, [dispatch]);

  const {
    title,
    content,
    fileUrls,
    platform,
    symbol,
    chartCycle,
    profitPct,
    communities,
    loadBoardsDone,
    loadBoardsError,
  } = useSelector(({ boards }: RootState) => ({
    category: boards.category,
    title: boards.title,
    content: boards.content,
    fileUrls: boards.fileUrls,
    platform: boards.platform,
    symbol: boards.symbol,
    chartCycle: boards.chartCycle,
    profitPct: boards.profitPct,
    communities: boards.communities,
    loadBoardsDone: boards.loadBoardsDone,
    loadBoardsError: boards.loadBoardsError,
  }));
  //change field
  const handleChangeStrategyField = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value }: { name: string; value: string | number } = e.target;
    if (name === 'title') {
      dispatch(
        boardsActions.changeCreateStrategyField({
          category: 'USER_STRATEGY',
          title: value,
          content,
          fileUrls,
          platform,
          symbol,
          chartCycle,
          profitPct,
          communities,
        }),
      );
    } else if (name === 'content') {
      dispatch(
        boardsActions.changeCreateStrategyField({
          category: 'USER_STRATEGY',
          title,
          content: value,
          fileUrls,
          platform,
          symbol,
          chartCycle,
          profitPct,
          communities,
        }),
      );
    } else if (name === 'symbol') {
      dispatch(
        boardsActions.changeCreateStrategyField({
          category: 'USER_STRATEGY',
          title,
          content,
          fileUrls,
          platform,
          symbol: value,
          chartCycle,
          profitPct,
          communities,
        }),
      );
    } else if (name === 'profitPct') {
      dispatch(
        boardsActions.changeCreateStrategyField({
          category: 'USER_STRATEGY',
          title,
          content,
          fileUrls,
          platform,
          symbol,
          chartCycle,
          profitPct: Number(value),
          communities,
        }),
      );
    }
  };

  const [fileUrl, setFileUrl] = useState('');

  const handleChangeFileUrls = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const formData = new FormData();

    if (files.length === 0) {
      return;
    } else {
      formData.append('files', files[0]);
    }

    const res = await axiosInstance.post(`/uploads/files?zone=STRATEGY`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res) {
      dispatch(
        boardsActions.changeCreateStrategyField({
          category: 'USER_STRATEGY',
          title,
          content,
          fileUrls: [res.data.urls[0]],
          platform,
          symbol,
          chartCycle,
          profitPct,
          communities,
        }),
      );
      setFileUrl(res.data.urls[0]);
    }
  };

  //submit
  const handleCreateStrategy = () => {
    if (!title) {
      setModalOpen(true);
      setModalMessage('제목을 입력해주세요');
      setModalError(true);
      return;
    }
    if (!content) {
      setModalOpen(true);
      setModalMessage('내용을 입력해주세요');
      setModalError(true);
      return;
    }
    if (!platform || !symbol || !chartCycle || !profitPct) {
      setModalOpen(true);
      setModalMessage('전략 상세를 확인해주세요');
      setModalError(true);
      return;
    }
    dispatch(
      boardsActions.CreateStrategyField({
        category: 'USER_STRATEGY',
        title,
        content,
        fileUrls,
        platform,
        symbol,
        chartCycle,
        profitPct,
        communities,
      }),
    );
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalError, setModalError] = useState(false);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  //event handler
  useEffect(() => {
    if (loadBoardsError) {
      setModalOpen(true);
      setModalMessage(loadBoardsError);
      setModalError(true);
      return;
    }

    if (loadBoardsDone) {
      if (loadBoardsDone?.message === 'CREATED') {
        setModalOpen(true);
        setModalMessage('전략 등록이 완료되었어요!');
        setModalError(false);
        router.push('/strategy?category=user');
      }
    }
  }, [loadBoardsDone, loadBoardsError]);

  return (
    <>
      <UserLayout>
        <StrategistLayout>
          <WriteUserStrategyCon
            handleChangeStrategyField={handleChangeStrategyField}
            fileUrl={fileUrl}
            handleChangeFileUrls={handleChangeFileUrls}
            handleCreateStrategy={handleCreateStrategy}
          />
        </StrategistLayout>
      </UserLayout>
      <Modal open={modalOpen} close={handleModalClose} message={modalMessage} error={modalError} />
    </>
  );
};

export default WriteUserStrategy;
