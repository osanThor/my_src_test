import colors from '@/src/assets/Colors';
import { ArrowBottomDark } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const CustomSelect = ({
  options,
  place,
  setSearchName,
}: {
  options: Array<{ txt: string; value: string }>;
  place: string;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [currentValue, setCurrentValue] = useState(place);
  const [showOptions, setShowOptions] = useState(false);
  const [placeHold, setPlaceHoder] = useState(Boolean);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentValue(place);
  }, [place]);

  const handleOnChangeSelectValue = (e: any) => {
    const { innerText } = e.target;
    setCurrentValue(innerText);
    setSearchName(e.target.children[0].value);
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
    <CustomSelectBox ref={selectRef} epect={showOptions} onClick={() => setShowOptions((prev) => !prev)}>
      <Label className="label" place={placeHold}>
        {currentValue}
      </Label>
      <SelectOptions show={showOptions}>
        {options.map((opt) => (
          <Option key={opt.value} onClick={handleOnChangeSelectValue}>
            <input type="hidden" value={opt.value} />
            {opt.txt}
          </Option>
        ))}
      </SelectOptions>
    </CustomSelectBox>
  );
};

type PropsType = {
  epect: boolean;
};

const CustomSelectBox = styled.div`
  position: relative;
  height: 48px;
  max-height: 48px;
  margin-right: 12px;
  width: 100%;
  min-width: 200px;
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: #ffffff;
  transition: all 0.2s;
  align-self: center;
  border: 1px solid ${colors.gray[2]};
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;

  &::before {
    content: '';
    width: 16px;
    height: 16px;
    position: absolute;
    top: 50%;
    right: 16px;
    color: #49c181;
    font-size: 20px;
    transform: ${(props: PropsType) => (props.epect ? `translateY(-50%) rotate(180deg);` : `translateY(-50%);`)};
    background: url(${ArrowBottomDark.src}) no-repeat 50% / cover;
    transition: all 0.2s;
  }

  &:hover {
    background-color: ${colors.gray[0]};
  }

  ${media.tablet} {
    height: 40px;
    padding: 10px 16px;
    margin-right: 8px;
  }
  ${media.mobile} {
    min-width: auto;
  }
`;
const Label = styled.label`
  width: 100%;
  font-size: 14px;
  margin-left: 4px;
  text-align: center;
  color: ${(props: { place: boolean }) => (props.place ? `${colors.gray[5]}` : `${colors.dark[2]}`)};
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  text-overflow: ellipsis;

  .icon {
    width: 18px;
    min-width: 18px;
    height: 18px;
    margin-right: 12px;
  }
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
