import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useDispatch } from 'react-redux';
import BasicContainer from '../../layouts/BasicContainer';
import { adminUsersActions } from '@/src/store/reducers';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import { useRouter } from 'next/router';
import DetailCommonTop from '../../components/common/DetailCommonTop';
import UserDetailBox from '../../components/user/detail/UserDetailBox';
import UserMiddleBox from '../../components/user/detail/UserMiddleBox';
import FuncModal from '@/src/components/common/modals/FuncModal';
import Loading from '@/src/components/common/Loading';
import AcountTable from '../../components/user/detail/AcountTable';

const UserDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loadAdminAuthDone } = useSelector(({ adminAuth }: RootState) => ({
    loadAdminAuthDone: adminAuth.loadAdminAuthDone,
  }));
  const { email, loadAdminUsersdLoading, loadAdminUsersdDone, loadAdminUsersdError } = useSelector(
    ({ adminUsers }: RootState) => ({
      email: adminUsers.email,
      loadAdminUsersdLoading: adminUsers.loadAdminUsersdLoading,
      loadAdminUsersdDone: adminUsers.loadAdminUsersdDone,
      loadAdminUsersdError: adminUsers.loadAdminUsersdError,
    }),
  );
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
    dispatch(adminUsersActions.initializeAdminUsersForm());
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
    if (router.query.email) {
      if (isAdmin) {
        dispatch(adminUsersActions.getAdminUserDetail({ email: router.query.email as string }));
      }
    }
  }, [router, isAdmin]);

  //function modal
  const [fModalOpen, setFModalOpen] = useState(false);
  const [fModalMessage, setFModalMessage] = useState('');
  const [fModalSubMessage, setFModalSubMessage] = useState('');
  const [fModalBtnTxt, setFModalBtnTxt] = useState('');

  const handleModalClose = () => {
    setFModalOpen(false);
    setFModalSubMessage('');
    setIsDelete(false);
    setIsUpdate(false);
    setIsChangeImg(false);
  };

  //delete user
  const [isDelete, setIsDelete] = useState(false);
  const handleDeleteModalOpen = () => {
    setFModalOpen(true);
    setFModalMessage('해당 회원을 삭제하시겠습니까?');
    setFModalBtnTxt('삭제하기');
    setIsDelete(true);
  };
  // update user info
  const [isUpdate, setIsUpdate] = useState(false);
  const handleUpdateModalOpen = () => {
    setFModalOpen(true);
    setFModalMessage('변경 내용을 등록하시겠습니까?');
    setFModalBtnTxt('등록하기');
    setIsUpdate(true);
  };
  //change img
  const [isChangeImg, setIsChangeImg] = useState(false);
  const handleChangeImgModalOpen = () => {
    setFModalOpen(true);
    setFModalMessage('이미지를 변경하시겠습니까?');
    setFModalSubMessage('Default 이미지는 랜덤으로 지정돼요');
    setFModalBtnTxt('변경하기');
    setIsChangeImg(true);
  };
  //** Modal eventhandler */
  const handleModalClick = () => {
    if (isDelete) {
      dispatch(adminUsersActions.adminUserDelete({ email }));
    } else if (isUpdate) {
      //update user
    } else if (isChangeImg) {
      //change user img
      dispatch(adminUsersActions.changeAdminUserDefaultImage({ email }));
    }
  };

  useEffect(() => {
    if (loadAdminUsersdError) {
      alert(loadAdminUsersdError);
      return;
    }

    if (loadAdminUsersdDone) {
      if (loadAdminUsersdDone.message === 'UPDATED') {
        alert('변경 되었어요');
        setFModalOpen(false);
        dispatch(adminUsersActions.getAdminUserDetail({ email: router.query.email as string }));
      }
      if (loadAdminUsersdDone.message === 'DELETED') {
        alert('삭제 되었어요');
        router.push('/admin/users');
      }
      if (loadAdminUsersdDone.message === 'SUCCESS') {
        alert('전송에 성공했어요!');
      }
    }
  }, [loadAdminUsersdError, loadAdminUsersdDone]);

  //telegram message
  const [messageVal, setMessageVal] = useState('');
  const [idList, setIdList] = useState<Array<string>>([]);

  const handleChangeTelegramMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, type, checked } = e.target;
    if (type === 'text') {
      setMessageVal(value);
    } else if (type === 'checkbox') {
      if (checked) {
        setIdList((li) => [...li, value]);
      } else {
        setIdList(idList.filter((li) => li != value));
      }
    }
  };

  const handleSendTelegramMessage = () => {
    if (!messageVal) {
      alert('메세지를 입력 해주세요!');
      return;
    } else if (idList.length === 0) {
      alert('계정을 선택 해주세요!');
      return;
    }
    dispatch(
      adminUsersActions.sendTelegramMessage({
        contents: [messageVal],
        idList,
      }),
    );
  };

  return (
    <>
      <AdminLayout>
        <BasicContainer>
          <DetailCommonTop
            handleDeleteModalOpen={handleDeleteModalOpen}
            handleSubmit={null}
            handleUpdate={handleUpdateModalOpen}
          />
          <UserDetailBox handleChangeImgModalOpen={handleChangeImgModalOpen} />
          <UserMiddleBox
            messageVal={messageVal}
            idList={idList}
            handleChangeTelegramMessage={handleChangeTelegramMessage}
            handleSendTelegramMessage={handleSendTelegramMessage}
          />
          <AcountTable />
        </BasicContainer>
      </AdminLayout>
      <FuncModal
        open={fModalOpen}
        onClose={handleModalClose}
        message={{
          title: fModalMessage,
          description: fModalSubMessage,
          btnTxt: fModalBtnTxt,
        }}
        dubBtn={true}
        onClick={handleModalClick}
        onClick2={handleModalClose}
      />
      {loadAdminUsersdLoading && <Loading />}
    </>
  );
};

export default UserDetail;
