import React, { Dispatch, SetStateAction, useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import Image from 'next/image';
import { Camera, PreviewBg, Profile1, Profile2, Profile3, Profile4 } from '@/src/assets/Images';
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
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer>('');
  const data = new FormData();
  const handleClickInput = (e: any) => {
    e.currentTarget.children[0].click();
  };
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileBlob = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    data.append('file', fileBlob);
    console.log(data.get('file'));
    console.log(typeof data);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
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
          <div className={imageSrc ? 'ImageCon on' : 'ImageCon'} onClick={handleClickInput}>
            <input type="file" name="photoUrl" onChange={handleChangeImage} />
            <Image
              src={imageSrc ? imageSrc : Camera}
              alt="select Image file"
              layout={imageSrc ? 'fill' : 'intrinsic'}
            />
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
    .ImageCon {
      width: 160px;
      height: 188px;
      display: flex;
      background-color: ${colors.gray[1]};
      border: 1px solid ${colors.gray[3]};
      overflow: hidden;
      justify-content: center;
      align-items: center;
      border-radius: 14px;
      position: relative;
      cursor: pointer;
      input {
        display: none;
      }
      &.on {
        &::after {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: url(${PreviewBg.src}) no-repeat 50% / cover;
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
