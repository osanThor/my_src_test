import React from 'react';
import styled from 'styled-components';

const ResetPw = () => {
  return (
    <ResetPwBlock>
      <h2>Forgot password</h2>
      <p className="descript">비밀번호를 재설정 하세요!</p>
    </ResetPwBlock>
  );
};
const ResetPwBlock = styled.div`
  width: 100%;
  height: 100%;
  .form {
    width: 100%;
    margin-bottom: 4.5rem;
    .input_area {
      width: 100%;
      display: flex;
      position: relative;

      &:first-child {
        margin-bottom: 1rem;
      }
    }
  }
`;

export default ResetPw;
