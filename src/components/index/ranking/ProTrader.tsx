import { Profile1 } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ProTrader = () => {
  const router = useRouter();
  const { profitTraders } = useSelector(({ boards }: RootState) => ({
    profitTraders: boards.getRankingResult?.profitTraders,
  }));

  return (
    <ProTraderBlock className="ri">
      {profitTraders?.slice(0, 3).map((td, idx) => (
        <div className="rankItem" key={idx}>
          <div
            className="user"
            onClick={() => router.push(`/strategy/strategist?user=${td?.user?.nickname}&category=discussion`)}
          >
            <div className="photo">
              <Image
                src={td?.user?.photoUrl && td?.user?.photoUrl != 'quantro.net' ? td?.user?.photoUrl : Profile1[1]}
                alt="profile"
                layout="fill"
              />
            </div>
            <div className="nickname">{td?.user?.nickname}</div>
          </div>
          <div className="count">
            <span>수익금: {td?.profit}</span>
          </div>
        </div>
      ))}
    </ProTraderBlock>
  );
};
const ProTraderBlock = styled.div`
  width: 100%;
`;

export default ProTrader;
