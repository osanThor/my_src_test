import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import colors from "../../../assets/Colors";
import { CheckedSqquare, CheckSquare, Logo } from "../../../assets/Images";
import Button from "../../common/Button";
import TermBox from "./TermBox";

const Terms = () => {
  const data = [
    { id: 0, title: "선택 1" },
    { id: 1, title: "선택 2" },
  ];

  const [checkItems, setCheckItems] = useState([]);

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };
  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      data.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };

  return (
    <TermsBlock>
      <h1 className="logo">
        <Link href="/">
          <a>
            <Image src={Logo} alt="main_logo" />
          </a>
        </Link>
      </h1>
      <TermBox />
      <div className="checkAll">
        <label>
          <input className="checkSquareAll" type="checkbox" />
          <span className="checkSquareAll" />
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

      input {
        visibility: hidden;
      }
      span.checkSquareAll {
        width: 24px;
        height: 24px;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-50%, -100%);
        background: url(${CheckSquare.src});
        cursor: pointer;
      }
      span.disabled {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid ${colors.gray[3]};
        background-color: ${colors.gray[1]};
      }
      input.checkSquareAll:checked + span.checkSquareAll {
        background: url(${CheckedSqquare.src});
      }
    }
  }

  @media (max-width: 768px) {
    width: calc(100% - 64px);
    max-height: 87vh;
  }
`;

export default Terms;
