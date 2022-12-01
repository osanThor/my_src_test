import colors from '@/src/assets/Colors';
import { CameraDark, CloseWhite, Profile1 } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const CommentsLayout = () => {
  const { nickname } = useSelector(({ user }: RootState) => ({
    nickname: user.nickname,
  }));
  return (
    <CommentsLayoutBlock>
      <span className="board_spacer" />
      <div className="comments_area">
        <div className="comments_title">댓글</div>
        <div className="comments_Editor">
          <div className="nickname">{nickname}</div>
          <StyledTextArea placeholder="댓글을 남겨보세요" />
          <div className="photo_area">
            <div className="file_list">
              <div className="file">
                <div className="delete_file_btn">
                  <Image src={CloseWhite} alt="delete_file_btn" />
                </div>
                <Image src={Profile1[0]} alt="file" layout="fill" />
              </div>
            </div>
            <label className="icon">
              <input type="file" accept=".gif, .jpg, .png" />
              <Image src={CameraDark} alt="camera" />
            </label>
          </div>
        </div>
      </div>
    </CommentsLayoutBlock>
  );
};

const CommentsLayoutBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .board_spacer {
    min-width: 84px;
  }
  .comments_area {
    flex: 1;
    max-width: 1420px;
    .comments_title {
      padding: 12px 83px;
      margin-bottom: 24px;
      border-bottom: 1px solid ${colors.gray[2]};
      font-family: 'GmarketSansBold';
      color: ${colors.gray[5]};
    }
    .comments_Editor {
      width: 100%;
      padding: 20px 24px;
      background-color: ${colors.gray[0]};
      border-radius: 8px;
      .nickname {
        font-family: 'GmarketSansBold';
        color: ${colors.gray[5]};
        margin-bottom: 8px;
      }
    }
    .photo_area {
      .file_list {
        width: 100%;
        display: flex;
        margin-bottom: 8px;
        .file {
          width: 56px;
          height: 56px;
          position: relative;
          .delete_file_btn {
            cursor: pointer;
            width: 16px;
            height: 16px;
            position: absolute;
            top: 4px;
            right: 4px;
            background-color: rgba(0, 0, 0, 0.7);
            border-radius: 50%;
            z-index: 7;
            padding: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        width: 24px;
        height: 24px;
        input {
          display: none;
        }
      }
    }
  }

  ${media.tablet} {
    .board_spacer {
      display: none;
    }
  }
`;

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

export default CommentsLayout;
