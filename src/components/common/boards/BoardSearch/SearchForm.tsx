import colors from '@/src/assets/Colors';
import React from 'react';
import styled from 'styled-components';

const SearchForm = () => {
  return (
    <SearchFormBlock>
      <StyledInput placeholder="검색어를 입력해주세요" />
    </SearchFormBlock>
  );
};

const SearchFormBlock = styled.div`
  margin-right: 12px;
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  min-width: 320px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid ${colors.gray[2]};
  padding: 0 24px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 14px;
    color: ${colors.gray[3]};
  }
`;

export default SearchForm;
