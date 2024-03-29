import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import styled from 'styled-components';
import Image from 'next/image';
import { Camera, PreviewBg } from '@/src/assets/Images';
import Button from '../../common/Button';
import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import { useDispatch } from 'react-redux';
import { fileActions } from '@/src/store/reducers';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';

const ImageFileModal = ({
  onClose,
  open,
  photoUrl,
  setProfileImg,
}: {
  onClose: () => void;
  open: boolean;
  photoUrl: string;
  setProfileImg: Dispatch<SetStateAction<string>>;
}) => {
  const dispatch = useDispatch();
  const { loadFileDone, loadFileError } = useSelector(({ file }: RootState) => ({
    loadFileDone: file.loadFileDone,
    loadFileError: file.loadFileError,
  }));
  // image data form
  const data = new FormData();

  //window local state
  const [localImageFile, setLocalImageFile] = useState<File | string>('');
  useEffect(() => {
    setLocalImageFile(photoUrl);
  }, [photoUrl]);

  // input click
  const handleClickInput = (e: any) => {
    e.currentTarget.children[0].click();
  };
  // preview image src
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer>('');

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileBlob = e.target.files[0];
    const fileSize = e.target.files[0].size;
    const maxSize = 700 * 1024; //700kb

    if (fileBlob === undefined) {
      return;
    } else if (fileSize > maxSize) {
      alert('이미지 용량은 700KB 이내로 가능해요');
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      setLocalImageFile(fileBlob);
      console.log(fileSize);
      return new Promise<void>((resolve) => {
        reader.onload = () => {
          setImageSrc(reader.result);
          resolve();
        };
      });
    }
  };
  //append dataform
  useEffect(() => {
    data.append('file', localImageFile);
  }, [imageSrc]);

  // dispatch file api
  const handleSelectImage = () => {
    if (data.get('file')) {
      dispatch(fileActions.uploadProfileImage(data));
    } else {
      handleNoImageClose();
    }
  };

  // event handler
  useEffect(() => {
    if (loadFileError) {
      alert(loadFileError);
      return;
    }

    if (loadFileDone.message === 'ADDED') {
      setProfileImg(loadFileDone.url);
      dispatch(fileActions.initializeFileState());
      setImageSrc('');
      onClose();
    }
  }, [loadFileDone, loadFileError]);

  const handleNoImageClose = () => {
    setImageSrc('');
    onClose();
  };

  return (
    <DialogBlock onClose={handleNoImageClose} open={open}>
      <ModalCon>
        <div className="imageTypes">
          <div className="description">변경하실 이미지를 업로드해주세요</div>
          <div className={imageSrc ? 'ImageCon on' : 'ImageCon'} onClick={handleClickInput}>
            <input type="file" accept=".gif, .jpg, .png" name="photoUrl" onChange={handleChangeImage} />
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
