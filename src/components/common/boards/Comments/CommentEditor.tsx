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

const CommentEditor = () => {
  const dispatch = useDispatch();
  const { nickname } = useSelector(({ user }: RootState) => ({
    nickname: user.nickname,
  }));
  const { boardId, content, parentCommentId } = useSelector(({ boards }: RootState) => ({
    boardId: boards.boardId,
    content: boards.content,
    parentCommentId: boards.parentCommentId,
  }));

  //comment change handler
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileUrls, setFileUrls] = useState<Array<string>>([]);
  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    dispatch(
      boardsActions.changeCommentState({
        boardId,
        content: value,
        parentCommentId: parentCommentId,
        fileUrls,
      }),
    );
  };
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
  //add fileUrl
  useEffect(() => {
    if (fileUrl) {
      setFileUrls((url) => [...url, fileUrl]);
    }
  }, [fileUrl]);
  //delete fileUrl
  const handleDeleteFileUrl = (e: React.MouseEvent<any>) => {
    const target: HTMLInputElement = e.currentTarget.children[0];
    console.log(target.value);
    const newArr = fileUrls.filter((url) => url != target.value);
    setFileUrls(newArr);
  };

  // create comment
  const handleCreateComment = () => {
    if (!content) {
      alert('댓글을 입려해주세요');
      return;
    }
    dispatch(boardsActions.createComment({ boardId, parentCommentId, content, fileUrls }));
    setFileUrls([]);
  };

  return (
    <div className="comments_Editor">
      <div className="nickname">{nickname}</div>
      <StyledTextArea name="content" placeholder="댓글을 남겨보세요" onChange={handleChangeComment} value={content} />
      <div className="photo_area">
        {fileUrls.length === 0 || (
          <div className="file_list">
            {fileUrls.map((url) => (
              <div className="file" key={url}>
                <div className="delete_file_btn" onClick={handleDeleteFileUrl}>
                  <input type="hidden" value={url} />
                  <Image src={CloseWhite} alt="delete_file_btn" />
                </div>
                <Image src={url ? url : Profile1[0]} alt="file" layout="fill" />
              </div>
            ))}
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
                <div className="btn cancel">취소</div>
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

export default CommentEditor;
