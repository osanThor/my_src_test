import { axiosInstance } from '@/src/store/api';
import { RootState } from '@/src/store/configureStore';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import CertifiedCon from '../../components/strategies/detail/certified/CertifiedCon';
import CertifiedTop from '../../components/strategies/detail/certified/CertifiedTop';

const CertifiedContainer = () => {
  const router = useRouter();

  const { getAdminStrategyDetailResult } = useSelector(({ adminStrategies }: RootState) => ({
    getAdminStrategyDetailResult: adminStrategies.getAdminStrategyDetailResult,
  }));

  const [commuSt, setCommuSt] = useState('');
  const [commuUrlSt, setCommuUrlSt] = useState('');
  const [commuArr, setCommuArr] = useState<Array<{ channel: string; url: string }>>([]);
  const [selectPlace, setSelectPlace] = useState('');
  const [certifiedSt, setCertufuedSt] = useState('');
  const [platform, setPlatForm] = useState('');
  const [chartCycle, setChartCycle] = useState('');
  const [filUrl, setfilUrl] = useState('');
  useEffect(() => {
    // confirm state
    if (getAdminStrategyDetailResult?.strategy?.confirmStatus === 'CONFIRMED') {
      setSelectPlace('인증완료');
      setCertufuedSt('CONFIRMED');
    } else if (getAdminStrategyDetailResult?.strategy?.confirmStatus === 'CHECKING') {
      setSelectPlace('확인중');
      setCertufuedSt('CHECKING');
    } else if (getAdminStrategyDetailResult?.strategy?.confirmStatus === 'REQUEST') {
      setSelectPlace('인증 요청');
      setCertufuedSt('REQUEST');
    } else {
      setSelectPlace('선택');
      setCertufuedSt('');
    }

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
  //add community
  const handleAddCommunity = () => {
    if (!commuSt) {
      alert('커뮤니티 채널을 선택해주세요');
      return;
    } else if (commuArr.find(handleFindSameCommunity)) {
      alert('동일한 채널을 선택할 수 없습니다.');
      return;
    } else if (!commuUrlSt) {
      alert('채널URL을 입력해주세요.');
      return;
    }
    setCommuArr((cm) => [...cm, { channel: commuSt, url: commuUrlSt }]);
    setCommuUrlSt('');
    setCommuSt('');
  };

  function handleFindSameCommunity(el: { channel: string; url: string }) {
    if (el.channel === commuSt) {
      return true;
    }
  }

  return (
    <>
      <CertifiedTop selectPlace={selectPlace} setCertufuedSt={setCertufuedSt} />
      <CertifiedCon
        setCommuSt={setCommuSt}
        commuUrlSt={commuUrlSt}
        setCommuUrlSt={setCommuUrlSt}
        handleAddCommunity={handleAddCommunity}
        commuArr={commuArr}
        platform={platform}
        setPlatForm={setPlatForm}
        chartCycle={chartCycle}
        setChartCycle={setChartCycle}
        filUrl={filUrl}
        handleChangeImage={handleChangeImage}
      />
    </>
  );
};

export default CertifiedContainer;
