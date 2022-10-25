import React, { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import colors from "../../../assets/Colors";
import { CheckedSqquare, CheckSquare, Google } from "../../../assets/Images";

type TermType = {
  type: string;
};
const typeMap = {
  privacy: {
    name: "개인정보처리방침",
    info: "개인정보처리방침 내용개인정보처리방침 내용개인정보처리방침 내용개인정보처리방침 내용",
  },
  service: {
    name: "퀀트로 이용약관",
    info: "퀀트로 이용약관 내용 퀀트로 이용약관 내용퀀트로 이용약관 내용퀀트로 이용약관 내용퀀트로 이용약관 내용",
  },
};
const TermItem = ({ type }: TermType) => {
  const termType = typeMap[type];

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  return (
    <TermItemBlock>
      <div className="term_top">
        <label>
          <input
            ref={ref}
            className={isOpen ? "checkSquare" : "disabled"}
            type="checkbox"
            disabled={isOpen ? false : true}
          />
          <span className={isOpen ? "checkSquare" : "disabled"} />
        </label>
        <h3>{termType.name}</h3>
        <span
          className="more"
          onClick={() => {
            setIsOpen(!isOpen);
            ref.current.checked = false;
          }}
        >
          {isOpen ? "접기" : "더보기"}
        </span>
      </div>
      <div className={isOpen ? "term_bottom_open" : "term_bottom"}>
        {termType.info}
      </div>
    </TermItemBlock>
  );
};

const TermItemBlock = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 14px;
  border: 1px solid ${colors.gray[5]};
  padding: 1rem 24px;
  transition: all 0.2s;

  .term_top {
    width: 100%;
    display: flex;
    line-height: 27px;
    justify-content: space-between;
    align-items: center;
    label {
      width: 24px;
      margin-right: 1rem;
      position: relative;

      input {
        visibility: hidden;
      }
      span.checkSquare {
        width: 24px;
        height: 24px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
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
      input.checkSquare:checked + span.checkSquare {
        background: url(${CheckedSqquare.src});
      }
    }

    h3 {
      flex: 1;
      font-size: 1rem;
    }
    .more {
      font-weight: bold;
      text-decoration: underline;
      cursor: pointer;
      color: ${colors.blue[2]};
      transition: all 0.2s;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  .term_bottom {
    width: 100%;
    height: 0;
    overflow: hidden;
    transition: all 0.3s;
  }
  .term_bottom_open {
    width: 100%;
    height: 250px;
    margin-top: 1rem;
    overflow-y: auto;
    transition: all 0.3s;
  }
`;

export default TermItem;
