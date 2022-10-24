import Image from "next/image";
import React from "react";
import styled from "styled-components";
import colors from "../../assets/Colors";

const StyleInput = (props: any) => {
  return (
    <StyledInputBlock>
      <StyledInput {...props} />
      {props.icon && (
        <div className="inputIcon">
          <Image src={props.icon} alt="icon" />
        </div>
      )}
    </StyledInputBlock>
  );
};

const StyledInputBlock = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 20px;

  .inputIcon {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    right: 36px;
    transform: translateY(-50%);
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 72px;
  border-radius: 14px;
  border: none;
  background: ${colors.blue[0]};
  color: ${colors.blue[2]};
  padding: 0 36px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border: 1px solid ${colors.blue[2]};
  }

  &::placeholder {
    color: ${colors.blue[2]};
  }
`;

export default StyleInput;
