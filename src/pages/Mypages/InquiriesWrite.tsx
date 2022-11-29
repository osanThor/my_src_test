import UserLayout from '@/src/components/layout/UserLayout';
import InquiriesLayout from '@/src/components/mypage/inquiries/InquiriesLayout';
import InquiriesWriteCon from '@/src/components/mypage/inquiries/write/InquiriesWriteCon';
import { axiosInstance } from '@/src/store/api';
import { RootState } from '@/src/store/configureStore';
import { userActions } from '@/src/store/reducers';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const InquiriesWrite: NextPage = () => {
  const dispatch = useDispatch();
  const { title, content, fileUrls } = useSelector(({ user }: RootState) => ({
    title: user.title,
    content: user.content,
    fileUrls: user.fileUrls,
  }));

  const hadnleChangeInquiriesField = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      dispatch(userActions.changeInquiries({ title: value, content, fileUrls }));
    } else if (name === 'content') {
      dispatch(userActions.changeInquiries({ title, content: value, fileUrls }));
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

    const res = await axiosInstance.post(`/uploads/files/board`, formData, {
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
    setFileUrlsSt([file1UrlName, file2UrlName, file3UrlName]);
  }, [file1UrlName, file2UrlName, file3UrlName]);
  console.log(fileUrlsSt);

  return (
    <UserLayout>
      <InquiriesLayout>
        <InquiriesWriteCon
          hadnleChangeInquiriesField={hadnleChangeInquiriesField}
          handleChangeFileUrls={handleChangeFileUrls}
          file1name={file1name}
          file2name={file2name}
          file3name={file3name}
        />
      </InquiriesLayout>
    </UserLayout>
  );
};

export default InquiriesWrite;
