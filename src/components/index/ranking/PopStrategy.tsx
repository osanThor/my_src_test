import { Profile1 } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const PopStrategy = () => {
  const router = useRouter();
  const { popularityStrategies } = useSelector(({ boards }: RootState) => ({
    popularityStrategies: boards.getRankingResult?.popularityStrategies,
  }));

  return (
    <PopStrategyBlock className="ri">
      {popularityStrategies?.slice(0, 3).map((strategy) => (
        <div className="rankItem" key={strategy?.board?.id}>
          <div
            className="user"
            onClick={() =>
              router.push(`/strategy/strategist?user=${strategy?.board?.user?.nickname}&category=discussion`)
            }
          >
            <div className="photo">
              <Image
                src={
                  strategy?.board?.user?.photoUrl && strategy?.board?.user?.photoUrl != 'quantro.net'
                    ? strategy?.board?.user?.photoUrl
                    : Profile1[1]
                }
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
            <span>{strategy?.board?._count?.likes}</span> / <span>{strategy?.board?._count?.collectors}</span>
          </div>
        </div>
      ))}
    </PopStrategyBlock>
  );
};
const PopStrategyBlock = styled.div`
  width: 100%;
`;

export default PopStrategy;
