import CertifiedCon from '@/src/components/board/strategy/CertifiedCon';
import StrategistBox from '@/src/components/board/strategy/StrategistBox';
import StrategyCon from '@/src/components/board/strategy/StrategyCon';
import { useRouter } from 'next/router';
import React from 'react';

const BoardCertifiedPage = ({
  handleSetBoardLike,
  handleSetBoardCollection,
}: {
  handleSetBoardLike: () => void;
  handleSetBoardCollection: () => void;
}) => {
  const router = useRouter();
  return (
    <>
      <StrategistBox handleSetBoardLike={handleSetBoardLike} handleSetBoardCollection={handleSetBoardCollection} />
      {!router.query.opt && <StrategyCon />}
      {router.query.opt && <CertifiedCon />}
    </>
  );
};

export default BoardCertifiedPage;
