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
import { useRouter } from 'next/router';

const WriteNoticeCon = () => {
  const router = useRouter();
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
      <div className="title">{router.pathname === '/admin/boards/notice' ? '공지상세' : '공지등록'}</div>
      <Input
        name="title"
        value={createAdminNotice?.title || ''}
        placeholder="공지 제목이 들어가는 곳이에요"
        sx={{ width: '100%', height: '58px', p: 2, fontFamily: 'GmarketSans', mb: '20px' }}
        onChange={handleChangeField}
      />
      <Editor onChange={handleChangeContents} />
      <div className="category_title">게시판 최상단 위치선택</div>
      <div className="check_con">
        <label>
          <Checkbox
            name="targetCategory"
            value={'CERTIFIED_STRATEGY'}
            onChange={handleChangeField}
            checked={targetArr?.includes('CERTIFIED_STRATEGY')}
          />
          퀀트로 인증전략
        </label>
        <label>
          <Checkbox
            name="targetCategory"
            value={'USER_STRATEGY'}
            onChange={handleChangeField}
            checked={targetArr?.includes('USER_STRATEGY')}
          />
          사용자 전략
        </label>
        <label>
          <Checkbox
            name="targetCategory"
            value={'DISCUSSION'}
            onChange={handleChangeField}
            checked={targetArr?.includes('DISCUSSION')}
          />
          전략토론
        </label>
        <label>
          <Checkbox
            name="targetCategory"
            value={'COMMISSION'}
            onChange={handleChangeField}
            checked={targetArr?.includes('COMMISSION')}
          />
          전략 개발의뢰
        </label>
        <label>
          <Checkbox
            name="targetCategory"
            value={'QUANTRO_STRATEGY'}
            onChange={handleChangeField}
            checked={targetArr?.includes('QUANTRO_STRATEGY')}
          />
          공개 전략
        </label>
        <label>
          <Checkbox
            name="targetCategory"
            value={'QUANTRO_INDICATOR'}
            onChange={handleChangeField}
            checked={targetArr?.includes('QUANTRO_INDICATOR')}
          />
          공개 지표
        </label>
      </div>
    </WriteNoticeConBlock>
  );
};

const WriteNoticeConBlock = styled.div`
  width: 100%;
  .category_title {
    font-family: 'GmarketSansBold';
    color: ${colors.gray[5]};
    margin-bottom: 0.5rem;
  }
  .check_con {
    width: 100%;
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
`;

export default WriteNoticeCon;
