import styled from 'styled-components';
import React from 'react';
import Image from 'next/image';
import { Mark } from '@/src/assets/Images';
import CustomSelect from '../item/CustomSelect';
import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import Button from '../../common/Button';
import { useDispatch } from 'react-redux';
import { localActions } from '@/src/store/reducers';

const Basic = () => {
  const dispatch = useDispatch();
  return (
    <BasicBlock>
      <div className="intro_box">
        <div className="intro_title">
          <div className="mark">
            <Image src={Mark} alt="mark" />
          </div>
          <span className="txt">기본정보</span>
        </div>
        <div className="description">거래하실 거래소, 계정, 코인, 마켓을 선택해야 주문이 들어가요</div>
      </div>
      <div className="basic_form">
        <div className="first_con">
          <div className="write_quant_item">
            <div className="bg_title">거래소</div>
            <CustomSelect />
          </div>
          <div className="write_quant_item">
            <div className="bg_title">거래마켓</div>
            <CustomSelect />
          </div>
          <div className="write_quant_item">
            <div className="bg_title">계정</div>
            <CustomSelect />
          </div>
        </div>
        <div className="first_con">
          <div className="write_quant_item">
            <div className="bg_title">거래코인</div>
            <CustomSelect />
          </div>
        </div>
      </div>
      <div className="write_quant_bottom">
        <StyledButton lightBlue onClick={() => dispatch(localActions.gotoOrder())}>
          다음
        </StyledButton>
      </div>
    </BasicBlock>
  );
};
const BasicBlock = styled.div`
  width: 100%;

  .basic_form {
    width: 100%;
    display: flex;
    margin-bottom: 100px;
    & > div {
      width: 50%;
      max-width: 732px;
      flex: 1;
      &:first-child {
        margin-right: 40px;
      }

      .write_quant_item {
        width: 100%;
        display: flex;
        margin-bottom: 64px;
        &:last-child {
          margin-bottom: 0;
        }
        .bg_title {
          min-width: 162px;
          padding: 1rem;
          text-align: center;
          white-space: nowrap;
          border-radius: 8px;
          background-color: ${colors.gray[1]};
          margin-right: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
      }
    }
  }

  ${media.pc} {
    .basic_form {
      flex-direction: column;
      margin-bottom: 40px;
      & > div {
        width: 100%;
        max-width: none;
        &:first-child {
          margin-right: 0;
          margin-bottom: 24px;
        }
        .write_quant_item {
          margin-bottom: 24px;
        }
      }
    }
  }
  ${media.mobile} {
    .basic_form {
      & > div {
        .write_quant_item {
          flex-direction: column;
          align-items: flex-start;
          .bg_title {
            padding: 0;
            min-width: auto;
            text-align: center;
            white-space: nowrap;
            border-radius: 8px;
            background-color: inherit;
            margin-bottom: 8px;
          }
        }
      }
    }
  }
`;

const StyledButton = styled(Button)`
  width: 152px;
  min-height: auto;
  height: 50px;
  border-radius: 8px;
  ${media.tablet} {
    width: 100%;
    height: 56px;
  }
`;

export default Basic;