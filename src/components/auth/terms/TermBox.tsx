import React from "react";
import styled from "styled-components";
import TermItem from "./TermItem";

const TermBox = () => {
  return (
    <TermBoxBlock>
      <TermItem type="privacy" />
      <TermItem type="service" />
    </TermBoxBlock>
  );
};

const TermBoxBlock = styled.div`
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    max-height: 90%;
    overflow-y: auto;
  }
`;

export default TermBox;
