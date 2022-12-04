import colors from '@/src/assets/Colors';
import * as React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import Button from '../../common/Button';
import { media } from '@/styles/theme';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Editor = dynamic(() => import('@/src/components/common/boards/Editor/Editor'), { ssr: false }); // client 사이드에서만 동작되기 때문에 ssr false로 설정

const CommunityEditor = ({
  handleChangeCreateBoardsField,
  handleChangeContent,
  handleCreateBoards,
}: {
  handleChangeCreateBoardsField: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeContent: (val: string) => void;
  handleCreateBoards: () => void;
}) => {
  const router = useRouter();
  const { title } = useSelector(({ boards }: RootState) => ({
    title: boards.title,
  }));

  const pathname = router.pathname;
  const [isWrite, setIsWrite] = useState(true);

  useEffect(() => {
    if (pathname === '/community/modify') {
      setIsWrite(false);
    } else {
      setIsWrite(true);
    }
  }, [router]);

  return (
    <CommunityEditorLayoutBlock>
      <StyledInput
        name="title"
        placeholder="제목을 입력해 주세요"
        value={title}
        onChange={handleChangeCreateBoardsField}
      />
      <Editor onChange={handleChangeContent} />
      <div className="bottom_btn">
        <StyledButton lightBlue onClick={handleCreateBoards}>
          {isWrite ? '등록' : '수정'}
        </StyledButton>
      </div>
    </CommunityEditorLayoutBlock>
  );
};

const CommunityEditorLayoutBlock = styled.div`
  width: 100%;
  .bottom_btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 62px;
  padding: 0 36px;
  border-radius: 14px;
  font-size: 16px;
  border: 1px solid ${colors.blue[2]};
  margin-bottom: 8px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 16px;
    color: ${colors.gray[3]};
  }

  ${media.tablet} {
    height: 58px;
    padding: 0 16px;
  }
`;

const StyledButton = styled(Button)`
  min-height: auto;
  width: 160px;
  height: 48px;

  ${media.tablet} {
    width: 100%;
  }
`;

export default CommunityEditor;