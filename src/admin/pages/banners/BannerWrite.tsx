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

const BannerWrite = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));
  const { loadAdminBannersLoading } = useSelector(({ adminBanners }: RootState) => ({
    loadAdminBannersLoading: adminBanners.loadAdminBannersLoading,
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
    console.log(res);
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

  const handleSubmitBanner = () => {
    if (!position) {
      alert('노출 위치를 설정해주세요!');
      return;
    } else if (!pcFile) {
      alert('PC 파일을 등록해주세요!');
      return;
    } else if (!mobileFile) {
      alert('Mobile 파일을 등록해주세요!');
      return;
    }
    dispatch(
      adminBannersActions.createAdminBanner({
        position,
        fileUrlPc: pcFile,
        fileUrlMobile: mobileFile,
        isVisiblePc: isVisPc,
        isVisibleMobile: isVisMobile,
      }),
    );
  };

  return (
    <>
      <AdminLayout>
        <BasicContainer>
          <DetailCommonTop handleDeleteModalOpen={null} handleSubmit={handleDeleteModalOpen} />
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
          title: '해당 배너를 등록하시겠습니까?',
          description: '',
          btnTxt: '등록하기',
        }}
        dubBtn={true}
        onClick={handleSubmitBanner}
        onClick2={handleModalClose}
      />
      {loadAdminBannersLoading && <Loading />}
    </>
  );
};

export default BannerWrite;
