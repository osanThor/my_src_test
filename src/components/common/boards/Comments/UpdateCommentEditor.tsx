import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Image from 'next/image';
import { CameraDark, CloseWhite, Profile1 } from '@/src/assets/Images';
import { useDispatch } from 'react-redux';
import { boardsActions } from '@/src/store/reducers';
import { axiosInstance } from '@/src/store/api';

const UpdateCommentEditor = ({ file }: { file: string | null }) => {
  const dispatch = useDispatch();
  const { nickname } = useSelector(({ user }: RootState) => ({
    nickname: user.nickname,
  }));
  const { commentId, content, parentCommentId } = useSelector(({ boards }: RootState) => ({
    commentId: boards.commentId,
    content: boards.content,
    parentCommentId: boards.parentCommentId,
  }));

  //comment change handler
  const [fileUrl, setFileUrl] = useState<string>('');
  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    dispatch(
      boardsActions.updateCommentSt({
        commentId,
        content: value,
        parentCommentId: parentCommentId,
      }),
    );
  };
  useEffect(() => {
    if (file) {
      setFileUrl(file);
    }
  }, [file]);
  // request fileUrl
  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const formData = new FormData();

    if (files.length === 0) {
      return;
    } else {
      formData.append('files', files[0]);
    }
    const res = await axiosInstance.post(`/uploads/files?zone=COMMENT`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (res) {
      setFileUrl(res.data.urls[0]);
    }
  };

  //delete fileUrl
  const handleDeleteFileUrl = () => {
    setFileUrl('');
  };

  // update comment
  const handleCreateComment = () => {
    if (!content) {
      alert('댓글을 입려해주세요');
      return;
    }
    console.log('update comment');
    console.log(fileUrl);
    dispatch(boardsActions.updateComment({ commentId, parentCommentId, content, fileUrl }));
    setFileUrl('');
  };

  const handleCanelComment = () => {
    dispatch(boardsActions.initialCommentState());
    dispatch(boardsActions.changeCommentId({ commentId: 0 }));
    dispatch(boardsActions.changeParentCommentId({ parentCommentId: 0 }));
  };

  return (
    <div className="comments_Editor">
      <div className="nickname">{nickname} gpgp</div>
      <StyledTextArea name="content" placeholder="댓글을 남겨보세요" onChange={handleChangeComment} value={content} />
      <div className="photo_area">
        {fileUrl && (
          <div className="file_list">
            <div className="file">
              <div className="delete_file_btn" onClick={handleDeleteFileUrl}>
                <Image src={CloseWhite} alt="delete_file_btn" />
              </div>
              <Image src={fileUrl ? fileUrl : Profile1[0]} alt="file" layout="fill" />
            </div>
          </div>
        )}
        <div className="bottom_btns">
          <label className="icon">
            <input type="file" accept=".gif, .jpg, .png" onChange={handleChangeFile} />
            <Image src={CameraDark} alt="camera" />
          </label>
          <div className="comment_btns">
            {content && (
              <>
                <div className="btn cancel" onClick={handleCanelComment}>
                  취소
                </div>
                <div className="btn add" onClick={handleCreateComment}>
                  등록
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const StyledTextArea = styled.textarea`
  width: 100%;
  height: 60px;
  resize: none;
  font-size: 1rem;
  border: none;
  background: ${colors.gray[0]};
  margin-bottom: 8px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 1rem;
    color: ${colors.gray[4]};
  }
`;

export default UpdateCommentEditor;
