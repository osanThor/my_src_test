import { axiosInstance } from '@/src/store/api';
import { RootState } from '@/src/store/configureStore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import UserStrategyCon from '../../components/strategies/detail/userStrategy/UserStrategyCon';
import UserStrategyTop from '../../components/strategies/detail/userStrategy/UserStrategyTop';

const UserStrategyContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { getAdminStrategyDetailResult, certifiedStrategyPayload } = useSelector(({ adminStrategies }: RootState) => ({
    getAdminStrategyDetailResult: adminStrategies.getAdminStrategyDetailResult,
    certifiedStrategyPayload: adminStrategies.certifiedStrategyPayload,
  }));

  const [platform, setPlatForm] = useState('');
  const [chartCycle, setChartCycle] = useState('');
  const [filUrl, setfilUrl] = useState('');
  useEffect(() => {
    //platform
    if (getAdminStrategyDetailResult?.strategy?.platform) {
      setPlatForm(getAdminStrategyDetailResult?.strategy?.platform);
    } else {
      setPlatForm('선택');
    }

    //chartCycle
    if (getAdminStrategyDetailResult?.strategy?.chartCycle) {
      setChartCycle(getAdminStrategyDetailResult?.strategy?.chartCycle);
    } else {
      setChartCycle('선택');
    }
  }, [getAdminStrategyDetailResult]);
  useEffect(() => {
    if (certifiedStrategyPayload) {
      //** 커뮤니티 업데이트 되면 추가 */
      //** csv 파일 업데이트 되면 추가 */
    }
  }, [certifiedStrategyPayload]);

  //chagneEvent
  useEffect(() => {
    //** dispatch */
  }, [platform, chartCycle]);
  const handleChangeCertifiedField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === 'symbol') {
    } else if (name === 'profitPct') {
    }
  };

  //file image
  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files, name } = e.target;
    const formData = new FormData();

    if (files.length === 0) {
      return;
    } else {
      formData.append('files', files[0]);
    }
    const res = await axiosInstance.post(`/admin/uploads/files?zone=BANNER`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res) {
      setfilUrl(res.data.urls[0]);
    }
  };

  return (
    <>
      <UserStrategyTop />
      <UserStrategyCon
        platform={platform}
        setPlatForm={setPlatForm}
        chartCycle={chartCycle}
        setChartCycle={setChartCycle}
        handleChangeImage={handleChangeImage}
        filUrl={filUrl}
      />
    </>
  );
};

export default UserStrategyContainer;
