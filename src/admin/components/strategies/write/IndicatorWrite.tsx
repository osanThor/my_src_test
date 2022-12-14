import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '@/src/assets/Colors';
import { Input } from '@mui/material';
import Editor from '../../common/Editor/Editor';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import { useDispatch } from 'react-redux';
import { adminStrategiesActions } from '@/src/store/reducers';

const IndicatorWrite = () => {
  const dispatch = useDispatch();
  const { quantroIndicatorPayload } = useSelector(({ adminStrategies }: RootState) => ({
    quantroIndicatorPayload: adminStrategies.quantroIndicatorPayload,
  }));
  const handleChangeTitle = (e: any) => {
    const { value } = e.target;
    console.log(value);
    dispatch(
      adminStrategiesActions.changeQuantroIndicatorField({
        title: value,
        category: 'QUANTRO_INDICATOR',
        content: quantroIndicatorPayload?.content,
        fileUrls: [],
      }),
    );
  };

  const [contents, setContents] = useState('');
  const handleChangeContents = (val: string) => {
    setContents(val);
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
      <Editor content={contents} onChange={handleChangeContents} />
    </IndicatorWriteBlock>
  );
};

const IndicatorWriteBlock = styled.div`
  width: 100%;
`;

export default IndicatorWrite;
