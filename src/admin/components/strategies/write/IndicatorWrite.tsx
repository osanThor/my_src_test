import React from 'react';
import styled from 'styled-components';
import { Input } from '@mui/material';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('@/src/admin/components/common/Editor/Editor'), { ssr: false });
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import { useDispatch } from 'react-redux';
import { adminStrategiesActions } from '@/src/store/reducers';

const IndicatorWrite = () => {
  const dispatch = useDispatch();
  const { content, quantroIndicatorPayload } = useSelector(({ adminStrategies }: RootState) => ({
    content: adminStrategies.content,
    quantroIndicatorPayload: adminStrategies.quantroIndicatorPayload,
  }));
  const handleChangeTitle = (e: any) => {
    const { value } = e.target;
    console.log(value);
    dispatch(
      adminStrategiesActions.changeQuantroIndicatorField({
        title: value,
        category: 'QUANTRO_INDICATOR',
        content,
        fileUrls: [],
      }),
    );
  };

  const handleChangeContents = (val: string) => {
    dispatch(
      adminStrategiesActions.changeContent({
        content: val,
      }),
    );
    dispatch(
      adminStrategiesActions.changeQuantroIndicatorField({
        title: quantroIndicatorPayload?.title,
        category: 'QUANTRO_INDICATOR',
        content: val,
        fileUrls: [],
      }),
    );
  };
  return (
    <IndicatorWriteBlock>
      <Input
        value={quantroIndicatorPayload?.title || ''}
        placeholder="지표 이름이 들어가는 곳이에요"
        sx={{ width: '100%', height: '58px', p: 2, fontFamily: 'GmarketSans', mb: '20px' }}
        onChange={handleChangeTitle}
      />
      <Editor onChange={handleChangeContents} />
    </IndicatorWriteBlock>
  );
};

const IndicatorWriteBlock = styled.div`
  width: 100%;
`;

export default IndicatorWrite;
