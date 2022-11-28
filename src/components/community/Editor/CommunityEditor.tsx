import colors from '@/src/assets/Colors';
import React from 'react';
import styled from 'styled-components';

const CommunityEditor = () => {
  return (
    <CommunityEditorLayoutBlock>
      <StyledInput placeholder="제목을 입력해 주세요" />
      <div className="input">에디터</div>
    </CommunityEditorLayoutBlock>
  );
};

const CommunityEditorLayoutBlock = styled.div`
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 62px;
  padding: 0 36px;
  border-radius: 14px;
  font-size: 1rem;
  border: 1px solid ${colors.blue[2]};
  margin-bottom: 8px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 1rem;
    color: ${colors.gray[3]};
  }
`;

export default CommunityEditor;
