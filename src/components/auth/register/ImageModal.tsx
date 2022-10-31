import React, { Dispatch, SetStateAction, useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import Image from 'next/image';
import { Close, Profile1, Profile2, Profile3, Profile4 } from '@/src/assets/Images';
import Button from '../../common/Button';
import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';

const ImageModal = ({
  onClose,
  open,
  photoUrl,
  setProfileImg,
  handleChangeRegisterForm,
}: {
  onClose: () => void;
  open: boolean;
  photoUrl: string;
  setProfileImg: Dispatch<SetStateAction<string>>;
  handleChangeRegisterForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const handleClickIcon = (e: any) => {
    e.currentTarget.children[0].checked = true;
    console.log(e.currentTarget.children[0].value.src);
    console.log(Profile1[1]);
  };

  const handleSelectImage = () => {
    setProfileImg(photoUrl);
    onClose();
  };

  return (
    <DialogBlock onClose={handleSelectImage} open={open}>
      <ModalCon>
        <div className="modalTopCon">
          <span className="closeBtn" onClick={handleSelectImage}>
            <Image src={Close} alt="closeBtn" />
          </span>
        </div>
        <div className="imageTypes">
          <div className="charIcon">
            <ul>
              <li onClick={handleClickIcon}>
                <input
                  className="checkIcon"
                  type="radio"
                  name="photoUrl"
                  value={Profile1[1].src}
                  onChange={handleChangeRegisterForm}
                  checked={photoUrl === Profile1[1].src ? true : false}
                />
                <label />
              </li>
              <li onClick={handleClickIcon}>
                <input
                  className="checkIcon"
                  type="radio"
                  name="photoUrl"
                  value={Profile2[1].src}
                  onChange={handleChangeRegisterForm}
                  checked={photoUrl === Profile2[1].src ? true : false}
                />
                <label />
              </li>
              <li onClick={handleClickIcon}>
                <input
                  className="checkIcon"
                  type="radio"
                  name="photoUrl"
                  value={Profile3[1].src}
                  onChange={handleChangeRegisterForm}
                  checked={photoUrl === Profile3[1].src ? true : false}
                />
                <label />
              </li>
              <li onClick={handleClickIcon}>
                <input
                  className="checkIcon"
                  type="radio"
                  name="photoUrl"
                  value={Profile4[1].src}
                  onChange={handleChangeRegisterForm}
                  checked={photoUrl === Profile4[1].src ? true : false}
                />
                <label />
              </li>
            </ul>
            <span>기본 제공</span>
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
    padding: 80px 80px 48px;
  }

  .modalTopCon {
    width: 100%;
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    justify-content: flex-end;
    margin-bottom: 1.5rem;
    padding: 28px;

    .closeBtn {
      cursor: pointer;
    }
  }

  .imageTypes {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;

    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 90px;
      span {
        color: ${colors.gray[4]};
      }
      &:last-child {
        margin-right: 0;
      }
    }
    .charIcon {
      width: 190px;
      ul {
        width: 100%;
        list-style: none;
        height: 190px;
        margin-bottom: 1rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;

        li {
          width: 90px;
          height: 90px;
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
      padding: 60px 40px 40px;
    }
    .modalTopCon {
      padding: 12px;
    }
    .imageTypes {
      .charIcon {
        ul {
          width: 100%;
          height: 190px;
          li {
            width: 50%;
            max-width: 85px;
            height: 85px;
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
  border-radius: 24px;
  background-color: ${colors.blue[0]};
  color: ${colors.blue[2]};
  &:hover {
    background-color: ${colors.blue[0]};
    opacity: 0.7;
  }
`;

export default ImageModal;
