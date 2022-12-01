import colors from '@/src/assets/Colors';
import { SearchIcon } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';

const SearchInput = ({
  searchVal,
  setSearchVal,
}: {
  searchVal: string;
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <SearchInputBlock>
      <StyledInput
        placeholder="검색어를 입력해주세요"
        value={searchVal}
        onChange={(e: any) => setSearchVal(e.target.value)}
      />
      <span className="icon">
        <Image src={SearchIcon[0]} alt="search icon" />
      </span>
    </SearchInputBlock>
  );
};

const SearchInputBlock = styled.div`
  margin-right: 12px;
  position: relative;

  span.icon {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
  ${media.tablet} {
    flex: 3;
    margin-right: 8px;
  }
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

  ${media.tablet} {
    height: 40px;
    min-width: auto;
    padding-right: 40px;
  }
`;

export default SearchInput;
