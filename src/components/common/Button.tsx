import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { css } from 'styled-components';
import colors from '../../assets/Colors';
import { media } from '@/styles/theme';

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
  ${(props: any) =>
    props.lightBlue &&
    css`
      background: ${colors.blue[0]};
      color: ${colors.blue[2]};
      &:hover {
        background: ${colors.blue[0]};
        opacity: 0.7;
      }
    `}
  ${(props: any) =>
    props.yellow &&
    css`
      background: lightyellow;
      color: orange;
      &:hover {
        background-color: orange;
        color: white;
        opacity: 0.7;
      }
    `}
  ${(props: any) =>
    props.red &&
    css`
      background: ${colors.red[0]};
      color: ${colors.red[1]};
      &:hover {
        background-color: ${colors.red[2]};
        color: white;
        opacity: 0.7;
      }
    `}
    &:disabled {
    background: ${colors.gray[0]};
    color: ${colors.gray[3]};
    cursor: not-allowed;
  }
  ${media.tablet} {
    height: 56px;
    min-height: 56px;
    font-size: 14px;
  }
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;
const StyledLink = styled(Link)`
  a {
    ${buttonStyle}
  }
`;

export default Button;
