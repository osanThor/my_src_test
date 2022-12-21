import { Profile1 } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const PctStrategy = () => {
  const router = useRouter();
  const { profitPctStrategies } = useSelector(({ boards }: RootState) => ({
    profitPctStrategies: boards.getRankingResult?.profitPctStrategies,
  }));

  return (
    <PctStrategyBlock className="ri">
      {profitPctStrategies?.slice(0, 3).map((strategy) => (
        <div className="rankItem" key={strategy?.board?.id}>
          <div
            className="user"
            onClick={() =>
              router.push(`/strategy/strategist?user=${strategy?.board?.user?.nickname}&category=discussion`)
            }
          >
            <div className="photo">
              <Image
                src={strategy?.board?.user?.photoUrl ? strategy?.board?.user?.photoUrl : Profile1[1]}
                alt="profile"
                layout="fill"
              />
            </div>
            <div className="nickname">{strategy?.board?.user?.nickname}</div>
          </div>
          <div className="startegy_title" onClick={() => router.push(`/board/${strategy?.board?.id}`)}>
            {strategy?.board?.title}
          </div>
          <div className="count">
            <span>수익률: {strategy?.profitPct}</span>
          </div>
        </div>
      ))}
    </PctStrategyBlock>
  );
};
const PctStrategyBlock = styled.div`
  width: 100%;
`;

export default PctStrategy;
