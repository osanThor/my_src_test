import { ArrowLeft, Menu7, ShareIcon } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { boardsActions } from '@/src/store/reducers';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Modal from '../modals/Modal';

const MBoardHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { boardId, isCollect } = useSelector(({ boards }: RootState) => ({
    boardId: boards.boardId,
    isCollect: boards.isCollect,
  }));
  // collection
  const handleSetBoardCollection = () => {
    dispatch(boardsActions.setBoardCollection({ boardId, isCollect: !isCollect }));
  };
  const copyURL = () => {
    let currentUrl = window.document.location.href;
    let t = document.createElement('textarea');
    document.body.appendChild(t);
    t.value = currentUrl;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);

    setModalOpen(true);
    setModalMessage('링크가 복사되었습니다.');
    setModalError(false);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalError, setModalError] = useState(false);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <MBoardHeaderBlock>
        <div className="backBtn" onClick={() => router.back()}>
          <Image src={ArrowLeft} alt="back button" />
        </div>
        <div className="right_btns">
          <div className="button" onClick={handleSetBoardCollection}>
            {isCollect ? <Image src={Menu7[1]} alt="collection" /> : <Image src={Menu7[0]} alt="collection" />}
          </div>
          <div className="button" onClick={copyURL}>
            <Image src={ShareIcon} alt="share" />
          </div>
        </div>
      </MBoardHeaderBlock>
      <Modal open={modalOpen} close={handleModalClose} message={modalMessage} error={modalError} />
    </>
  );
};

const MBoardHeaderBlock = styled.div`
  width: 100%;
  height: 50px;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor};
  position: fixed;
  z-index: 997;

  .backBtn {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    cursor: pointer;
    span {
      width: 16px;
      height: 16px;
      position: relative;
    }
  }
  .right_btns {
    display: flex;
    align-items: center;
    .button {
      width: 24px;
      height: 24px;
      margin-left: 16px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
`;

export default MBoardHeader;
