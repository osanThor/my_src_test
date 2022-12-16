import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Radio, RadioGroup } from '@mui/material';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('@/src/admin/components/common/Editor/Editor'), { ssr: false });
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import { useDispatch } from 'react-redux';
import { adminCustomersActions } from '@/src/store/reducers';
import colors from '@/src/assets/Colors';
import { useRouter } from 'next/router';

const WriteGuideCon = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { createGuide } = useSelector(({ adminCustomers }: RootState) => ({
    createGuide: adminCustomers.createGuide,
  }));
  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, checked } = e.target;
    if (name === 'group') {
      dispatch(
        adminCustomersActions.changeAdminGuideField({
          title: createGuide?.title,
          content: createGuide?.content,
          group: value,
          isVisible: createGuide?.isVisible,
        }),
      );
    } else if (name === 'title') {
      dispatch(
        adminCustomersActions.changeAdminGuideField({
          title: value,
          content: createGuide?.content,
          group: createGuide?.group,
          isVisible: createGuide?.isVisible,
        }),
      );
    } else if (name === 'isVisible') {
      dispatch(
        adminCustomersActions.changeAdminGuideField({
          title: createGuide?.title,
          content: createGuide?.content,
          group: createGuide?.group,
          isVisible: JSON.parse(value),
        }),
      );
    }
  };

  const handleChangeContents = (val: string) => {
    dispatch(
      adminCustomersActions.changeAdminGuideField({
        title: createGuide?.title,
        content: val,
        group: createGuide?.group,
        isVisible: createGuide?.isVisible,
      }),
    );
  };
  console.log(createGuide);
  return (
    <WriteGuideConBlock>
      <div className="title">
        {router.pathname === '/admin/customers/write_guide' ? '이용안내 등록' : '이용안내 상세'}
      </div>
      <div className="category_title">이용안내 카테고리</div>
      <div className="check_con">
        <RadioGroup>
          <label>
            <Radio
              name="group"
              value={'DASHBOARD'}
              onChange={handleChangeField}
              checked={createGuide?.group === 'DASHBOARD'}
            />
            대시보드
          </label>
          <label>
            <Radio name="group" value={'QUANT'} onChange={handleChangeField} checked={createGuide?.group === 'QUANT'} />
            퀀트작성
          </label>
          <label>
            <Radio
              name="group"
              value={'SUBSCRIBE'}
              onChange={handleChangeField}
              checked={createGuide?.group === 'SUBSCRIBE'}
            />
            API Key/이용권 등록
          </label>
          <label>
            <Radio
              name="group"
              value={'STRATEGY'}
              onChange={handleChangeField}
              checked={createGuide?.group === 'STRATEGY'}
            />
            전략
          </label>
          <label>
            <Radio
              name="group"
              value={'COMMUNITY '}
              onChange={handleChangeField}
              checked={createGuide?.group === 'COMMUNITY '}
            />
            커뮤니티
          </label>
        </RadioGroup>
      </div>
      <Input
        name="title"
        value={createGuide?.title || ''}
        placeholder="이용안내 제목이 들어가는 곳이에요"
        sx={{ width: '100%', height: '58px', p: 2, fontFamily: 'GmarketSans', mb: '20px' }}
        onChange={handleChangeField}
      />
      <Editor onChange={handleChangeContents} />
      <div className="category_title">노출 여부</div>
      <div className="check_con">
        <RadioGroup>
          <label>
            <Radio name="isVisible" value={true} onChange={handleChangeField} checked={createGuide?.isVisible} />
            노출
          </label>
          <label>
            <Radio name="isVisible" value={false} onChange={handleChangeField} checked={!createGuide?.isVisible} />
            미노출
          </label>
        </RadioGroup>
      </div>
    </WriteGuideConBlock>
  );
};

const WriteGuideConBlock = styled.div`
  width: 100%;
  .category_title {
    font-family: 'GmarketSansBold';
    color: ${colors.gray[5]};
    margin-bottom: 0.5rem;
  }
  .check_con {
    width: 100%;
    .MuiFormGroup-root {
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;
      label {
        cursor: pointer;
        margin-right: 1rem;
        font-size: 14px;
        color: ${colors.gray[5]};
      }
    }
  }
`;

export default WriteGuideCon;
