import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useDispatch } from 'react-redux';
import BasicContainer from '../../layouts/BasicContainer';
import { adminBannersActions } from '@/src/store/reducers';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import { useRouter } from 'next/router';
import DetailCommonTop from '../../components/common/DetailCommonTop';
import FuncModal from '@/src/components/common/modals/FuncModal';
import Loading from '@/src/components/common/Loading';
import BannerTop from '../../components/banners/detail/BannerTop';
import BannerBottom from '../../components/banners/detail/BannerBottom';
import { axiosInstance } from '@/src/store/api';

const BannerDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));
  const { id, loadAdminBannersLoading, getBannerDetailResult } = useSelector(({ adminBanners }: RootState) => ({
    id: adminBanners.id,
    loadAdminBannersLoading: adminBanners.loadAdminBannersLoading,
    getBannerDetailResult: adminBanners.getBannerDetailResult,
  }));
  //admin auth
  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      alert('권한이 없습니다');
      router.push('/admin/login');
    }
  }, []);

  useEffect(() => {
    setIsAdmin(false);
    dispatch(adminBannersActions.initializeAdminBannersForm());
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
    if (router.query.id) {
      if (isAdmin) {
        dispatch(adminBannersActions.getAdminBannerDetail({ id: parseInt(router.query.id as string) }));
      }
    }
  }, [router, isAdmin]);

  //function modal
  const [fModalOpen, setFModalOpen] = useState(false);
  const handleDeleteModalOpen = () => {
    setFModalOpen(true);
  };
  const handleModalClose = () => {
    setFModalOpen(false);
  };

  const [position, setPosition] = useState('');
  const [pcFile, setPcFile] = useState('');
  const [mobileFile, setBobileFile] = useState('');
  const [isVisPc, setIsVisPc] = useState(false);
  const [isVisMobile, setIsVisMobile] = useState(false);

  useEffect(() => {
    if (getBannerDetailResult) {
      if (getBannerDetailResult?.position === 'MAIN') {
        setPosition('MAIN');
      } else if (getBannerDetailResult?.position === 'SUBSCRIBE_BYBIT') {
        setPosition('SUBSCRIBE_BYBIT');
      } else if (getBannerDetailResult?.position === 'SUBSCRIBE_BINANCE') {
        setPosition('SUBSCRIBE_BINANCE');
      } else if (getBannerDetailResult?.position === 'SUBSCRIBE_BITGET') {
        setPosition('SUBSCRIBE_BITGET');
      }
      if (getBannerDetailResult?.isVisiblePc) {
        setIsVisPc(true);
      } else {
        setIsVisPc(false);
      }
      if (getBannerDetailResult?.isVisibleMobile) {
        setIsVisMobile(true);
      } else {
        setIsVisMobile(false);
      }
    } else {
      setPosition('');
    }
  }, [getBannerDetailResult]);

  useEffect(() => {
    if (getBannerDetailResult) {
      if (getBannerDetailResult.files.length != 0) {
        setPcFile(getBannerDetailResult.files[0]?.name);
        setBobileFile(getBannerDetailResult.files[1]?.name);
      }
    }
  }, [getBannerDetailResult]);

  const handleChangeBannerImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files, name } = e.target;
    const formData = new FormData();

    if (files.length === 0) {
      return;
    } else {
      formData.append('files', files[0]);
    }
    const res = await axiosInstance.post(`/uploads/files?zone=BANNER`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res) {
      if (name === 'fileUrlPc') {
        setPcFile(res.data.urls[0]);
      } else if (name === 'fileUrlMobile') {
        setBobileFile(res.data.urls[0]);
      }
    }
  };
  const handleChangeIsVisble = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'isVisiblePc') {
      if (value === 'true') {
        setIsVisPc(true);
      } else {
        setIsVisPc(false);
      }
    } else if (name === 'isVisibleMobile') {
      if (value === 'true') {
        setIsVisMobile(true);
      } else {
        setIsVisMobile(false);
      }
    }
  };

  return (
    <>
      <AdminLayout>
        <BasicContainer>
          <DetailCommonTop handleDeleteModalOpen={handleDeleteModalOpen} handleSubmit={null} />
          <BannerTop
            onChangeFile={handleChangeBannerImage}
            pcFile={pcFile}
            isVisPc={isVisPc}
            onChangeVisible={handleChangeIsVisble}
            setPosition={setPosition}
          />
          <BannerBottom
            onChangeFile={handleChangeBannerImage}
            mobileFile={mobileFile}
            isVisMobile={isVisMobile}
            onChangeVisible={handleChangeIsVisble}
          />
        </BasicContainer>
      </AdminLayout>
      <FuncModal
        open={fModalOpen}
        onClose={handleModalClose}
        message={{
          title: '해당 배너를 삭제하시겠습니까?',
          description: '',
          btnTxt: '삭제하기',
        }}
        dubBtn={true}
        onClick={() => alert('임시')}
        onClick2={handleModalClose}
      />
      {loadAdminBannersLoading && <Loading />}
    </>
  );
};

export default BannerDetail;
