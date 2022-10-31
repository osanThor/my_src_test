import React, { useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import Image from 'next/image';
import { Camera, Close, PreviewBg, Profile1, Profile2, Profile3, Profile4 } from '@/src/assets/Images';
import Button from '../../common/Button';
import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';

const ImageModal = ({ onClose, open }: { onClose: () => void; open: boolean }) => {
  const handleClickIcon = (e: any) => {
    e.currentTarget.children[0].checked = true;
  };
  const handleClickImage = (e: any) => {
    e.currentTarget.children[1].click();
  };

  const [imageSrc, setImageSrc] = useState(null);

  const handleChangeImage = (fileBlob: Blob | null) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const handleNoImageClose = () => {
    setImageSrc(null);
    onClose();
  };

  return (
    <DialogBlock onClose={handleNoImageClose} open={open}>
      <ModalCon>
        <div className="modalTopCon">
          <span className="closeBtn" onClick={handleNoImageClose}>
            <Image src={Close} alt="closeBtn" />
          </span>
        </div>
        <div className="imageTypes">
          <div className="charIcon">
            <ul>
              <li onClick={handleClickIcon}>
                <input className="checkIcon" type="radio" name="profile" value={Profile1[1]} />
                <label />
              </li>
              <li onClick={handleClickIcon}>
                <input className="checkIcon" type="radio" name="profile" value={Profile2[1]} />
                <label />
              </li>
              <li onClick={handleClickIcon}>
                <input className="checkIcon" type="radio" name="profile" value={Profile3[1]} />
                <label />
              </li>
              <li onClick={handleClickIcon}>
                <input className="checkIcon" type="radio" name="profile" value={Profile4[1]} />
                <label />
              </li>
            </ul>
            <span>기본 제공</span>
          </div>
          <div className="fileImage">
            <div className="preview" onClick={(e) => handleClickImage(e)}>
              {!imageSrc ? (
                <>
                  <div>
                    <Image src={Camera} alt="preview" />
                  </div>
                  <input type="file" accept="image/*" onChange={(e) => handleChangeImage(e.target.files[0])} />
                </>
              ) : (
                <>
                  <div className="preview_layout">
                    <Image src={imageSrc} alt="preview" layout="fill" />
                  </div>
                  <input type="file" accept="image/*" onChange={(e) => handleChangeImage(e.target.files[0])} />
                </>
              )}
            </div>
            <span>이미지 업로드</span>
          </div>
        </div>
        <StyledButton>확인</StyledButton>
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
      width: 188px;
      ul {
        width: 100%;
        list-style: none;
        height: 188px;
        margin-bottom: 1rem;
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
    .fileImage {
      width: 160px;
      .preview {
        width: 100%;
        height: 188px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid ${colors.gray[2]};
        border-radius: 14px;
        background-color: ${colors.gray[0]};
        margin-bottom: 1rem;
        transition: all 0.2s;
        cursor: pointer;
        position: relative;
        overflow: hidden;

        &:hover {
          border-color: ${colors.blue[2]};
        }

        input {
          display: none;
        }

        .preview_layout::after {
          content: '';
          width: 101%;
          height: 101%;
          background: url(${PreviewBg.src}) no-repeat 50% / cover;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
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
      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 2rem;
        span {
          color: ${colors.gray[4]};
        }
        &:last-child {
          margin-right: 0;
        }
      }
      .charIcon {
        width: 104px;
        ul {
          width: 100%;
          height: 104px;
          li {
            width: 48px;
            height: 48px;
          }
        }
      }
      .fileImage {
        width: 104px;
        .preview {
          width: 100%;
          height: 104px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid ${colors.gray[2]};
          border-radius: 14px;
          background-color: ${colors.gray[0]};
          margin-bottom: 1rem;
          transition: all 0.2s;
          cursor: pointer;
          position: relative;
          overflow: hidden;
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
        width: 104px;
        ul {
          width: 100%;
          height: 104px;
          li {
            width: 49%;
            height: 48px;
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
