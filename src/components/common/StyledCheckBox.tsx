import React, { useRef, useState } from "react";
import styled from "styled-components";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

type CheckStyle = "round" | "switch" | "squar";

const StyledCheckBox = ({ style }: { style: CheckStyle }) => {
  if (style === "round") {
    return <RoundCheckBox />;
  } else {
    return <input type="checkBox" />;
  }
};

const RoundCheckBoxBlock = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
  padding: 2px;

  input {
    width: 1px;
    height: 1px;
    position: absolute;
    visibility: hidden;
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    transform: translateY(-3px);
  }
`;
const RoundCheckBox = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <RoundCheckBoxBlock>
      <label>
        <input onClick={() => setIsChecked(!isChecked)} type="checkBox" />
        {isChecked ? (
          <RadioButtonCheckedIcon color="primary" />
        ) : (
          <RadioButtonUncheckedIcon />
        )}
      </label>
    </RoundCheckBoxBlock>
  );
};

export default StyledCheckBox;
