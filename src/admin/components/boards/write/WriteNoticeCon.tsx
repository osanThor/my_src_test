import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Checkbox, Input, Radio, RadioGroup } from '@mui/material';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('@/src/admin/components/common/Editor/Editor'), { ssr: false });
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import { useDispatch } from 'react-redux';
import { adminBoardsActions } from '@/src/store/reducers';
import colors from '@/src/assets/Colors';

const WriteNoticeCon = () => {
  const dispatch = useDispatch();
  const { createAdminNotice } = useSelector(({ adminBoards }: RootState) => ({
    createAdminNotice: adminBoards.createAdminNotice,
  }));
  const [targetArr, setTargetArr] = useState<Array<string>>([]);
  const handleChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name, checked } = e.target;
    if (name === 'title') {
      dispatch(
        adminBoardsActions.changeAdminNoticeField({
          title: value,
          content: createAdminNotice?.content,
          targetCategory: createAdminNotice?.targetCategory,
        }),
      );
    } else if (name === 'targetCategory') {
      if (checked) {
        setTargetArr((tg) => [...tg, value]);
      } else {
        setTargetArr(targetArr.filter((tg) => tg != value));
      }
    }
  };

  useEffect(() => {
    dispatch(
      adminBoardsActions.changeAdminNoticeField({
        title: createAdminNotice?.title,
        content: createAdminNotice?.content,
        targetCategory: targetArr,
      }),
    );
  }, [targetArr]);

  console.log(createAdminNotice);

  const handleChangeContents = (val: string) => {
    dispatch(
      adminBoardsActions.changeAdminNoticeField({
        title: createAdminNotice?.title,
        content: val,
        targetCategory: createAdminNotice?.targetCategory,
      }),
    );
  };
  return (
    <WriteNoticeConBlock>
      <div className="title">공지등록</div>
      <Input
        name="title"
        value={createAdminNotice?.title || ''}
        placeholder="공지 제목이 들어가는 곳이에요"
        sx={{ width: '100%', height: '58px', p: 2, fontFamily: 'GmarketSans', mb: '20px' }}
        onChange={handleChangeField}
      />
      <Editor onChange={handleChangeContents} />
      <div className="check_con">
        <label>
          <Checkbox name="targetCategory" value={'CERTIFIED_STRATEGY'} onChange={handleChangeField} />
          퀀트로 인증전략
        </label>
        <label>
          <Checkbox name="targetCategory" value={'USER_STRATEGY'} onChange={handleChangeField} />
          사용자 전략
        </label>
        <label>
          <Checkbox name="targetCategory" value={'DISCUSSION'} onChange={handleChangeField} />
          전략토론
        </label>
        <label>
          <Checkbox name="targetCategory" value={'COMMISSION '} onChange={handleChangeField} />
          전략 개발의뢰
        </label>
        <label>
          <Checkbox name="targetCategory" value={'QUANTRO_STRATEGY'} onChange={handleChangeField} />
          공개 전략
        </label>
        <label>
          <Checkbox name="targetCategory" value={'QUANTRO_INDICATOR'} onChange={handleChangeField} />
          공개 지표
        </label>
      </div>
    </WriteNoticeConBlock>
  );
};

const WriteNoticeConBlock = styled.div`
  width: 100%;
  .check_con {
    width: 100%;
    display: flex;
    flex-direction: row;
    label {
      cursor: pointer;
      margin-right: 1rem;
      font-size: 14px;
      color: ${colors.gray[5]};
    }
  }
`;

export default WriteNoticeCon;
