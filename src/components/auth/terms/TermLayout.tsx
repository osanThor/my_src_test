import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import colors from '../../../assets/Colors';
import { CheckedSqquare, CheckSquare, Logo } from '../../../assets/Images';
import Button from '../../common/Button';

const TermsLayOut = () => {
  const data = [
    { id: 0, type: 'privacy' },
    { id: 1, type: 'service' },
  ];

  return (
    <TermsBlock>
      <h1 className="logo">
        <Link href="/">
          <a>
            <Image src={Logo} alt="main_logo" />
          </a>
        </Link>
      </h1>
      <div className="checkAll">
        <label>
          <input className="checkSquare" type="checkbox" />
          <span className="checkSquare" />
          전체동의
        </label>
      </div>
      <Button blue fullWidth disabled>
        다음
      </Button>
    </TermsBlock>
  );
};

const TermsBlock = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1.logo {
    width: 170px;
    cursor: pointer;
    margin-bottom: 20px;
    img {
      width: 100%;
    }
  }
  .checkAll {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    line-height: 27px;
    font-weight: bold;
    label {
      padding-left: 3rem;
      position: relative;
      cursor: pointer;

      input {
        visibility: hidden;
      }
      span.checkSquare {
        width: 24px;
        height: 24px;
        position: absolute;
        top: 0;
        left: 24px;
        background: url(${CheckSquare.src});
        cursor: pointer;
      }
      span.disabled {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        left: 24px;
        border: 1px solid ${colors.gray[3]};
        background-color: ${colors.gray[1]};
      }
      input.checkSquare:checked + span.checkSquare {
        background: url(${CheckedSqquare.src});
      }
    }
  }

  @media (max-width: 768px) {
    width: calc(100% - 64px);
    max-height: 87vh;
  }
`;

export default TermsLayOut;
