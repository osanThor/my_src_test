import { axiosInstance } from '@/src/store/api';
import { RootState } from '@/src/store/configureStore';
import { adminStrategiesActions } from '@/src/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CertifiedCon from '../../components/strategies/detail/certified/CertifiedCon';
import CertifiedTop from '../../components/strategies/detail/certified/CertifiedTop';

const CertifiedContainer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { getAdminStrategyDetailResult, certifiedStrategyPayload } = useSelector(({ adminStrategies }: RootState) => ({
    getAdminStrategyDetailResult: adminStrategies.getAdminStrategyDetailResult,
    certifiedStrategyPayload: adminStrategies.certifiedStrategyPayload,
  }));

  const [commuSt, setCommuSt] = useState('');
  const [commuUrlSt, setCommuUrlSt] = useState('');
  const [commuArr, setCommuArr] = useState<Array<{ channel: string; url: string }>>([]);
  const [selectPlace, setSelectPlace] = useState('');
  const [certifiedSt, setCertufuedSt] = useState('');
  const [platform, setPlatForm] = useState('');
  const [chartCycle, setChartCycle] = useState('');
  const [fileUrl, setfileUrl] = useState('');
  useEffect(() => {
    setCommuArr([]);
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
    //초기 세팅
    dispatch(
      adminStrategiesActions.changeCertifiedStarteField({
        id: parseInt(router.query.id as string),
        //** 커뮤니티 추가 시 추가 */
        //** 파일 추가 시 추가 */
        comminities: getAdminStrategyDetailResult?.strategy?.communities,
        //** !-- */
        platform: getAdminStrategyDetailResult?.strategy?.platform,
        symbol: getAdminStrategyDetailResult?.strategy?.symbol,
        chartCycle: getAdminStrategyDetailResult?.strategy?.chartCycle,
        profitPct: getAdminStrategyDetailResult?.strategy?.profitPct,
        confirmStatus: getAdminStrategyDetailResult?.strategy?.confirmStatus,
        fileUrl: getAdminStrategyDetailResult?.files[0]?.url,
      }),
    );
    getAdminStrategyDetailResult?.strategy?.communities?.map((cm) => setCommuArr((com) => [...com, cm]));
    setfileUrl(getAdminStrategyDetailResult?.files[0]?.url);
  }, [getAdminStrategyDetailResult]);

  //chagneEvent
  useEffect(() => {
    dispatch(
      adminStrategiesActions.changeCertifiedStarteField({
        id: parseInt(router.query.id as string),
        comminities: commuArr,
        platform,
        symbol: certifiedStrategyPayload?.symbol,
        chartCycle,
        profitPct: certifiedStrategyPayload?.profitPct,
        confirmStatus: certifiedSt,
        fileUrl,
      }),
    );
  }, [platform, chartCycle, certifiedSt, commuArr]);
  const handleChangeCertifiedField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === 'symbol') {
      dispatch(
        adminStrategiesActions.changeCertifiedStarteField({
          id: parseInt(router.query.id as string),
          comminities: commuArr,
          platform,
          symbol: value,
          chartCycle,
          profitPct: certifiedStrategyPayload?.profitPct,
          confirmStatus: certifiedSt,
          fileUrl,
        }),
      );
    } else if (name === 'profitPct') {
      dispatch(
        adminStrategiesActions.changeCertifiedStarteField({
          id: parseInt(router.query.id as string),
          comminities: commuArr,
          platform,
          symbol: certifiedStrategyPayload?.symbol,
          chartCycle,
          profitPct: parseInt(value as string),
          confirmStatus: certifiedSt,
          fileUrl,
        }),
      );
    }
  };

  //csv file
  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const formData = new FormData();

    if (files.length === 0) {
      return;
    } else {
      formData.append('file', files[0]);
    }
    const res = await axiosInstance.post(`/admin/uploads/strategies/csv`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(res);

    if (res) {
      setfileUrl(res.data.url);
      dispatch(
        adminStrategiesActions.changeCertifiedStarteField({
          id: parseInt(router.query.id as string),
          comminities: commuArr,
          platform,
          symbol: certifiedStrategyPayload?.symbol,
          chartCycle,
          profitPct: certifiedStrategyPayload?.profitPct,
          confirmStatus: certifiedSt,
          fileUrl: res.data.url,
        }),
      );
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
  //close community
  const handleCloseCommunity = (url: string) => {
    setCommuArr(commuArr.filter((cm) => cm.url != url));
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
        fileUrl={fileUrl}
        handleChangeCertifiedField={handleChangeCertifiedField}
        handleCloseCommunity={handleCloseCommunity}
        handleChangeImage={handleChangeImage}
      />
    </>
  );
};

export default CertifiedContainer;
