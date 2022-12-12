import colors from '@/src/assets/Colors';
import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DashBoardGraph = () => {
  const { getAllExchangeResult } = useSelector(({ adminDashBoards }: RootState) => ({
    getAllExchangeResult: adminDashBoards.getAllExchangeResult,
  }));

  return (
    <DashBoardGraphBlock>
      <div className="title">거래소 등록자 수 비교</div>
      {getAllExchangeResult ? (
        <Chart
          height={500}
          type="line"
          series={[
            {
              name: 'bybit',
              data: getAllExchangeResult?.countByPlatforms?.map((exc) => {
                return exc.bybit;
              }),
            },
            {
              name: 'binance',
              data: getAllExchangeResult?.countByPlatforms?.map((exc) => {
                return exc.binance;
              }),
            },
            {
              name: 'bitget',
              data: getAllExchangeResult?.countByPlatforms?.map((exc) => {
                return exc.bitget;
              }),
            },
          ]}
          options={{
            chart: {
              width: '100%',
              height: 100,
              type: 'line',
            },
            xaxis: {
              type: 'datetime',
              categories: getAllExchangeResult?.countByPlatforms.map((exc) => exc.date),
              labels: {
                style: {
                  colors: '#9c88ff',
                },
              },
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5,
              },
            },
            responsive: [
              {
                breakpoint: undefined,
                options: {},
              },
            ],
          }}
        />
      ) : (
        <>로딩중...</>
      )}
    </DashBoardGraphBlock>
  );
};

const DashBoardGraphBlock = styled.div`
  width: 100%;
  background-color: white;
  padding: 1.5rem 2rem;
  border-radius: 14px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  flex-direction: column;
  .title {
    color: ${colors.gray[5]};
    margin-bottom: 1rem;
    font-family: 'GmarketSansBold';
  }
  flex: 1;
  .chart {
    max-width: 100%;
    max-height: 700px;
  }
`;

export default DashBoardGraph;
