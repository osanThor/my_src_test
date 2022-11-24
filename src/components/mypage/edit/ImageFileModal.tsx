import React, { Dispatch, SetStateAction } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import Image from 'next/image';
import { Close, Profile1, Profile2, Profile3, Profile4 } from '@/src/assets/Images';
import Button from '../../common/Button';
import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';

const ImageFileModal = ({
  onClose,
  open,
  photoUrl,
  setProfileImg,
  handleChangeMyProfile,
}: {
  onClose: () => void;
  open: boolean;
  photoUrl: string;
  setProfileImg: Dispatch<SetStateAction<string>>;
  handleChangeMyProfile: (e: React.ChangeEvent) => void;
}) => {
  const handleClickIcon = (e: any) => {
    e.currentTarget.children[0].checked = true;
  };

  const handleSelectImage = () => {
    setProfileImg(photoUrl);
    onClose();
  };

  return (
    <DialogBlock onClose={onClose} open={open}>
      <ModalCon>
        <div className="imageTypes">
          <div className="description">변경하실 이미지를 업로드해주세요</div>
          <div className="charIcon">
            <ul>
              <li onClick={handleClickIcon}>
                <input
                  className="checkIcon"
                  type="radio"
                  name="photoUrl"
                  onChange={handleChangeMyProfile}
                  value="https://quantro-app.s3.ap-northeast-2.amazonaws.com/app/default-picture/01.png"
                  checked={
                    photoUrl === 'https://quantro-app.s3.ap-northeast-2.amazonaws.com/app/default-picture/01.png'
                      ? true
                      : false
                  }
                />
                <label />
              </li>
              <li onClick={handleClickIcon}>
                <input
                  className="checkIcon"
                  type="radio"
                  name="photoUrl"
                  onChange={handleChangeMyProfile}
                  value="https://quantro-app.s3.ap-northeast-2.amazonaws.com/app/default-picture/02.png"
                  checked={
                    photoUrl === 'https://quantro-app.s3.ap-northeast-2.amazonaws.com/app/default-picture/02.png'
                      ? true
                      : false
                  }
                />
                <label />
              </li>
              <li onClick={handleClickIcon}>
                <input
                  className="checkIcon"
                  type="radio"
                  name="photoUrl"
                  onChange={handleChangeMyProfile}
                  value="https://quantro-app.s3.ap-northeast-2.amazonaws.com/app/default-picture/03.png"
                  checked={
                    photoUrl === 'https://quantro-app.s3.ap-northeast-2.amazonaws.com/app/default-picture/03.png'
                      ? true
                      : false
                  }
                />
                <label />
              </li>
              <li onClick={handleClickIcon}>
                <input
                  className="checkIcon"
                  type="radio"
                  name="photoUrl"
                  onChange={handleChangeMyProfile}
                  value="https://quantro-app.s3.ap-northeast-2.amazonaws.com/app/default-picture/04.png"
                  checked={
                    photoUrl === 'https://quantro-app.s3.ap-northeast-2.amazonaws.com/app/default-picture/04.png'
                      ? true
                      : false
                  }
                />
                <label />
              </li>
            </ul>
          </div>
        </div>
        <StyledButton onClick={handleSelectImage}>확인</StyledButton>
      </ModalCon>
    </DialogBlock>
  );
};

const DialogBlock = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 14px;
  }
`;

const ModalCon = styled(DialogContent)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  &.MuiDialogContent-root {
    padding: 40px;
  }

  .imageTypes {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        color: ${colors.gray[4]};
      }
      &:last-child {
        margin-right: 0;
      }
    }
    .description {
      width: 100%;
      text-align: center;
      white-space: nowrap;
      margin-bottom: 24px;
      color: ${colors.gray[4]};
    }
    .charIcon {
      width: 190px;
      ul {
        width: 100%;
        list-style: none;
        height: 190px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;

        li {
          width: 84px;
          height: 84px;
          cursor: pointer;
          position: relative;
          input {
            visibility: hidden;
            &:hover {
              &::after {
                border: 1px solid ${colors.blue[2]};
              }
            }
          }
          input::after {
            content: '';
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            visibility: visible;
            border: 1px solid ${colors.gray[0]};
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.2s;
          }
          &:nth-child(1) {
            input::after {
              background: url(${Profile1[0].src}) no-repeat 50% / cover;
            }
            input:checked::after {
              background: url(${Profile1[1].src}) no-repeat 50% / cover;
            }
          }
          &:nth-child(2) {
            input::after {
              background: url(${Profile2[0].src}) no-repeat 50% / cover;
            }
            input:checked::after {
              background: url(${Profile2[1].src}) no-repeat 50% / cover;
            }
          }
          &:nth-child(3) {
            input::after {
              background: url(${Profile3[0].src}) no-repeat 50% / cover;
            }
            input:checked::after {
              background: url(${Profile3[1].src}) no-repeat 50% / cover;
            }
          }
          &:nth-child(4) {
            input::after {
              background: url(${Profile4[0].src}) no-repeat 50% / cover;
            }
            input:checked::after {
              background: url(${Profile4[1].src}) no-repeat 50% / cover;
            }
          }
        }
      }
    }
  }

  ${media.tablet} {
    &.MuiDialogContent-root {
      padding: 20px 32px;
    }
    .modalTopCon {
      padding: 12px;
    }
    .imageTypes {
      .charIcon {
        ul {
          width: 100%;
          height: 188px;
          li {
            width: 50%;
            max-width: 84px;
            height: 84px;
          }
        }
      }
    }
  }

  @media (max-width: 364px) {
    .imageTypes {
      & > div {
        margin-right: 1rem;
      }
      .charIcon {
        ul {
          width: 100%;
          li {
          }
        }
      }
    }
  }
`;

const StyledButton = styled(Button)`
  width: 160px;
  height: 48px;
  min-height: auto;
  border-radius: 24px;
  background-color: ${colors.blue[0]};
  color: ${colors.blue[2]};
  &:hover {
    background-color: ${colors.blue[0]};
    opacity: 0.7;
  }
`;
export default ImageFileModal;
