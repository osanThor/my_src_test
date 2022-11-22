import colors from '@/src/assets/Colors';
import { SelectButtonIcon } from '@/src/assets/Images';
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const CustomSelect = ({
  place,
  options,
  disable,
}: {
  place: string;
  options: { name: string; value: string; txt: string }[];
  disable: boolean;
}) => {
  const [currentValue, setCurrentValue] = useState(place);
  const [showOptions, setShowOptions] = useState(false);
  const [placeHold, setPlaceHoder] = useState(Boolean);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOnChangeSelectValue = (e: any) => {
    const { innerText } = e.target;
    setCurrentValue(innerText);
  };
  const handleClickOutSide = (e: any) => {
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

  useEffect(() => {
    if (place === currentValue) {
      setPlaceHoder(true);
    } else {
      setPlaceHoder(false);
    }
  }, [currentValue]);

  return (
    <CustomSelectBox
      ref={selectRef}
      disable={disable}
      epect={showOptions}
      onClick={() => setShowOptions((prev) => !prev)}
    >
      <Label className="label" place={placeHold}>
        {currentValue}
      </Label>
      <SelectOptions show={showOptions}>
        {options.map((opt) => (
          <Option key={opt.value} onClick={handleOnChangeSelectValue}>
            {opt.txt}
          </Option>
        ))}
      </SelectOptions>
    </CustomSelectBox>
  );
};

type PropsType = {
  epect: boolean;
  disable: boolean;
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
  white-space: nowrap;
  text-overflow: ellipsis;

  &::before {
    content: '';
    width: 32px;
    height: 32px;
    position: absolute;
    top: 50%;
    right: 24px;
    color: #49c181;
    font-size: 20px;
    transform: ${(props: PropsType) => (props.epect ? `translateY(-50%) rotate(180deg);` : `translateY(-50%);`)};
    background: url(${SelectButtonIcon.src}) no-repeat 50% / cover;
    transition: all 0.2s;
  }

  ${(props: PropsType) =>
    props.disable &&
    css`
      background-color: ${colors.gray[1]};
      color: ${colors.gray[3]};
      pointer-events: none;
      &::before {
        background: ${colors.gray[1]};
        border-radius: 50%;
      }
      .label {
        color: ${colors.gray[3]};
      }
    `}
`;
const Label = styled.label`
  width: 100%;
  font-size: 16px;
  margin-left: 4px;
  text-align: center;
  color: ${(props: { place: boolean }) => (props.place ? `${colors.gray[2]}` : `${colors.dark[2]}`)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

export default React.memo(CustomSelect);
