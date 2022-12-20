import FuncModal from '@/src/components/common/modals/FuncModal';
import Modal from '@/src/components/common/modals/Modal';
import UserLayout from '@/src/components/layout/UserLayout';
import InquiriesLayout from '@/src/components/mypage/inquiries/InquiriesLayout';
import InquiriesWriteCon from '@/src/components/mypage/inquiries/write/InquiriesWriteCon';
import { axiosInstance } from '@/src/store/api';
import { RootState } from '@/src/store/configureStore';
import { boardsActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const InquiriesModify: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { title, content, fileUrls, getInquiryResult, loadBoardsDone, loadBoardsError } = useSelector(
    ({ boards }: RootState) => ({
      title: boards.title,
      content: boards.content,
      fileUrls: boards.fileUrls,
      getInquiryResult: boards.getInquiryResult,
      loadBoardsDone: boards.loadBoardsDone,
      loadBoardsError: boards.loadBoardsError,
    }),
  );

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
    setOnce(false);
    dispatch(boardsActions.initializeBoardsForm());
  }, [dispatch]);

  useEffect(() => {
    if (once) {
      if (router.query.id) {
        dispatch(boardsActions.getUserInquiry({ inquiryId: parseInt(router.query.id as string) }));
      }
    }
  }, [router, once]);

  useEffect(() => {
    if (getInquiryResult) {
      dispatch(
        boardsActions.changeInquiries({
          title: getInquiryResult?.title,
          content: getInquiryResult?.content,
          fileUrls: getInquiryResult?.files?.map((file) => file.url),
        }),
      );
      if (getInquiryResult?.files) {
        setFile1name(getInquiryResult?.files[0]?.url);
        setFile2name(getInquiryResult?.files[1]?.url);
        setFile3name(getInquiryResult?.files[2]?.url);
        setFile1UrlName(getInquiryResult?.files[0]?.url);
        setFile2UrlName(getInquiryResult?.files[1]?.url);
        setFile3UrlName(getInquiryResult?.files[2]?.url);
      }
    }
  }, [getInquiryResult]);

  const hadnleChangeInquiriesField = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      dispatch(boardsActions.changeInquiries({ title: value, content, fileUrls }));
    } else if (name === 'content') {
      dispatch(boardsActions.changeInquiries({ title, content: value, fileUrls }));
    }
  };

  const [file1name, setFile1name] = useState('');
  const [file2name, setFile2name] = useState('');
  const [file3name, setFile3name] = useState('');
  const [fileUrlsSt, setFileUrlsSt] = useState([]);
  const [file1UrlName, setFile1UrlName] = useState('');
  const [file2UrlName, setFile2UrlName] = useState('');
  const [file3UrlName, setFile3UrlName] = useState('');

  const handleChangeFileUrls = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const formData = new FormData();

    if (files.length === 0) {
      return;
    } else {
      formData.append('files', files[0]);
      if (name === 'file1') {
        setFile1name(files[0].name);
      } else if (name === 'file2') {
        setFile2name(files[0].name);
      } else if (name === 'file3') {
        setFile3name(files[0].name);
      }
    }

    const res = await axiosInstance.post(`/uploads/files?zone=INQUIRY`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res) {
      if (name === 'file1') {
        setFile1UrlName(res.data.urls[0]);
      } else if (name === 'file2') {
        setFile2UrlName(res.data.urls[0]);
      } else if (name === 'file3') {
        setFile3UrlName(res.data.urls[0]);
      }
    }
  };

  useEffect(() => {
    if (file1UrlName && !file2UrlName && !file3UrlName) {
      setFileUrlsSt([file1UrlName]);
    } else if (file1UrlName && file2UrlName && !file3UrlName) {
      setFileUrlsSt([file1UrlName, file2UrlName]);
    } else if (file1UrlName && !file2UrlName && file3UrlName) {
      setFileUrlsSt([file1UrlName, file3UrlName]);
    } else if (!file1UrlName && file2UrlName && !file3UrlName) {
      setFileUrlsSt([file2UrlName]);
    } else if (!file1UrlName && file2UrlName && file3UrlName) {
      setFileUrlsSt([file2UrlName, file3UrlName]);
    } else if (!file1UrlName && !file2UrlName && file3UrlName) {
      setFileUrlsSt([file3UrlName]);
    } else if (file1UrlName && file2UrlName && file3UrlName) {
      setFileUrlsSt([file1UrlName, file2UrlName, file3UrlName]);
    }
  }, [file1UrlName, file2UrlName, file3UrlName]);

  const handleSubmitInquiry = () => {
    if (!title) {
      //no title
      setModalOpen(true);
      setModalMessage('제목을 입력해 주세요');
      setModalerr(true);
      return;
    } else if (!content) {
      //no content
      setModalOpen(true);
      setModalMessage('문의 내용을 입력해 주세요');
      setModalerr(true);
      return;
    } else if (content.length > 1000) {
      //content over 1000
      setModalOpen(true);
      setModalMessage('문의 내용은 최대 1000자까지 입력 가능해요');
      setModalerr(true);
      return;
    }
    console.info(title, content, fileUrls, fileUrlsSt);
    dispatch(
      boardsActions.updateInquiries({
        title,
        content,
        fileUrls: fileUrlsSt,
        inquiryId: parseInt(router.query.id as string),
      }),
    );
  };

  useEffect(() => {
    if (loadBoardsError) {
      setModalOpen(true);
      setModalMessage(loadBoardsError);
      setModalerr(true);
      return;
    }
    if (loadBoardsDone) {
      if (loadBoardsDone.message === 'UPDATED') {
        setfModalOpen(true);
      }
    }
  }, [loadBoardsError, loadBoardsDone]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalErr, setModalerr] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [fModalOpen, setfModalOpen] = useState(false);
  const handleCloseFuncModal = () => {
    setfModalOpen(false);
    router.push('/mypage?state=boards&board=inquiries');
  };

  return (
    <>
      <UserLayout>
        <InquiriesLayout>
          <InquiriesWriteCon
            hadnleChangeInquiriesField={hadnleChangeInquiriesField}
            handleChangeFileUrls={handleChangeFileUrls}
            file1name={file1name}
            file2name={file2name}
            file3name={file3name}
            handleSubmitInquiry={handleSubmitInquiry}
          />
        </InquiriesLayout>
      </UserLayout>
      <Modal open={modalOpen} close={handleCloseModal} message={modalMessage} error={modalErr} />
      <FuncModal
        open={fModalOpen}
        onClose={handleCloseFuncModal}
        message={{
          title: '1:1 문의 감사해요.',
          description: '확인 후 신속한 답변 남길게요.',
          btnTxt: '문의 리스트',
        }}
        dubBtn={true}
        onClick={() => router.push('/mypage?state=boards&board=inquiries')}
        onClick2={() => router.push('/mypage?state=boards&board=inquiries')}
      />
    </>
  );
};

export default InquiriesModify;
