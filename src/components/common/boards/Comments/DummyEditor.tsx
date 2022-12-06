import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Image from 'next/image';
import { CameraDark } from '@/src/assets/Images';

const DummyEditor = ({ onClick }: { onClick: () => void }) => {
  const { nickname } = useSelector(({ user }: RootState) => ({
    nickname: user.nickname,
  }));

  return (
    <div className="comments_Editor" onClick={onClick}>
      <div className="nickname">{nickname}</div>
      <StyledTextArea name="content" placeholder="댓글을 남겨보세요" disabled />
      <div className="photo_area">
        <div className="bottom_btns">
          <label className="icon">
            <Image src={CameraDark} alt="camera" />
          </label>
          <div className="comment_btns"></div>
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

export default DummyEditor;
