import CertifiedCon from '@/src/components/board/strategy/CertifiedCon';
import StrategistBox from '@/src/components/board/strategy/StrategistBox';
import React from 'react';

const BoardCertifiedPage = ({
  handleSetBoardLike,
  handleSetBoardCollection,
}: {
  handleSetBoardLike: () => void;
  handleSetBoardCollection: () => void;
}) => {
  return (
    <>
      <StrategistBox handleSetBoardLike={handleSetBoardLike} handleSetBoardCollection={handleSetBoardCollection} />
      <CertifiedCon />
    </>
  );
};

export default BoardCertifiedPage;
