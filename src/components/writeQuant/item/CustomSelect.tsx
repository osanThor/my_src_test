import colors from '@/src/assets/Colors';
import { SelectButtonIcon } from '@/src/assets/Images';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const CustomSelect = () => {
  const [currentValue, setCurrentValue] = useState('거래소를 선택하세요');
  const [showOptions, setShowOptions] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOnChangeSelectValue = (e: any) => {
    const { innerText } = e.target;
    setCurrentValue(innerText);
  };
  const handleClickOutSide = (e: any) => {
    console.log(selectRef.current.contains(e.target));
    if (showOptions && !selectRef.current.contains(e.target)) {
      setShowOptions(false);
    }
  };
  useEffect(() => {
    if (showOptions) document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });

  return (
    <CustomSelectBox ref={selectRef} epect={showOptions} onClick={() => setShowOptions((prev) => !prev)}>
      <Label place={showOptions}>{currentValue}</Label>
      <SelectOptions show={showOptions}>
        <Option onClick={handleOnChangeSelectValue}>option1</Option>
        <Option onClick={handleOnChangeSelectValue}>option2</Option>
        <Option onClick={handleOnChangeSelectValue}>option3</Option>
      </SelectOptions>
    </CustomSelectBox>
  );
};

const CustomSelectBox = styled.div`
  position: relative;
  max-height: 56px;
  width: 100%;
  flex: 1;
  padding: 1rem 24px;
  border-radius: 12px;
  background-color: #ffffff;
  align-self: center;
  border: 1px solid ${colors.gray[2]};
  cursor: pointer;
  &::before {
    content: '';
    width: 32px;
    height: 32px;
    position: absolute;
    top: 50%;
    right: 24px;
    color: #49c181;
    font-size: 20px;
    transform: ${(props: { epect: boolean }) =>
      props.epect ? `translateY(-50%) rotate(180deg);` : `translateY(-50%);`};
    background: url(${SelectButtonIcon.src}) no-repeat 50% / cover;
    transition: all 0.2s;
  }
`;
const Label = styled.label`
  font-size: 16px;
  margin-left: 4px;
  text-align: center;
  color: ${(props: { place: boolean }) => (props.place ? `${colors.gray[2]}` : `${colors.dark[2]}`)};
`;
const SelectOptions = styled.ul`
  position: absolute;
  z-index: 960;
  list-style: none;
  top: 110%;
  left: 0;
  width: 100%;
  overflow: hidden;
  max-height: ${(props: { show: boolean }) => (props.show ? 'none' : '0')};
  padding: 0;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;
const Option = styled.li`
  font-size: 16px;
  padding: 6px 24px;
  transition: background-color 0.2s ease-in;
  color: ${colors.gray[4]};
  &:hover {
    background-color: ${colors.gray[1]};
  }
`;

export default CustomSelect;
