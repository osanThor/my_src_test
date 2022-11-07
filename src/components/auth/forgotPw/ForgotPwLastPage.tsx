import { media } from '@/styles/theme';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';

const ForgotPwLastPage = () => {
  const router = useRouter();
  const onClick = () => {
    router.push('/auth/login');
  };
  return (
    <ForgetPwLastPageBlock>
      <h2>Forgot password</h2>
      <p className="descript">비밀번호 변경이 완료 되었어요!</p>
      <StyledButton blue onClick={onClick}>
        로그인 하기
      </StyledButton>
    </ForgetPwLastPageBlock>
  );
};

const ForgetPwLastPageBlock = styled.div`
  width: 100%;
  height: 67%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const StyledButton = styled(Button)`
  height: 72px;
  font-size: 20px;

  ${media.tablet} {
    height: 56px;
    font-size: 1rem;
  }
`;

export default ForgotPwLastPage;
