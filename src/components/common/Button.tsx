import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { css } from "styled-components";
import colors from "../../assets/Colors";

const Button = (props: any) => {
  return props.href ? <StyledLink {...props} /> : <StyledButton {...props} />;
};

const buttonStyle = css`
  border: none;
  border-radius: 14px;
  height: 76px;
  font-size: 1rem;
  padding: 0.25rem 36px;
  color: ${colors.gray[5]};
  outline: none;
  cursor: pointer;
  transition: all 0.2s;
  background: ${colors.gray[1]};
  &:hover {
    background: ${colors.gray[2]};
  }

  ${(props: any) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}
  ${(props: any) =>
    props.blue &&
    css`
      background: ${colors.blue[2]};
      color: white;
      &:hover {
        background: ${colors.blue[1]};
      }
    `}
    &:disabled {
    background: ${colors.gray[3]};
    color: ${colors.gray[0]};
    cursor: not-allowed;
  }
  @media (max-width: 768px) {
    height: 56px;
    font-size: 14px;
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;
const StyledLink = styled(Link)`
  ${buttonStyle}
`;

export default Button;
