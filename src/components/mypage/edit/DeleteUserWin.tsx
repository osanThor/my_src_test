import colors from '@/src/assets/Colors';
import { Email, Lock } from '@/src/assets/Images';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';

const DeleteUserWin = ({ deleteRef }: { deleteRef: React.MutableRefObject<HTMLDivElement> }) => {
  //google
  const [isGoogle, setIsGoogle] = useState(false);
  useEffect(() => {
    const gId = localStorage.getItem('gId');
    if (gId) {
      setIsGoogle(true);
    }
  }, []);
  return (
    <DeleteUserWinBlock ref={deleteRef}>
      <div className="delete_title">
        <h2>아쉬워요!</h2>
        <p>퀀트로를 정말 떠나실 건가요?</p>
      </div>
      <div className="delete_form">
        <div className="input">
          <StyledInput name="oldPw" placeholder="이메일 입력해요" />
        </div>
        {!isGoogle && (
          <div className="input">
            <StyledInput name="newPw" type="password" placeholder="비밀번호를 변경해요" />
          </div>
        )}
      </div>
      <div className="bnts">
        <StyledButton disabled>탈퇴하기</StyledButton>
        <StyledButton blue>계속 이용할게요</StyledButton>
      </div>
    </DeleteUserWinBlock>
  );
};

const DeleteUserWinBlock = styled.div`
  width: calc(100% - 32px);
  max-width: 528px !important;
  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: 40px 64px 48px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 14px;
  z-index: 990;
  display: flex;
  flex-direction: column;
  align-items: center;
  .delete_title {
    text-align: center;
    margin-bottom: 24px;
    h2 {
      font-size: 24px;
      font-family: 'GmarketSansBold';
      color: ${colors.blue[2]};
      margin-bottom: 8px;
    }
    p {
      color: ${colors.gray[5]};
    }
  }
  .delete_form {
    width: 400px;
    margin-bottom: 32px;
    .input {
      position: relative;
      margin-bottom: 16px;
      &:last-child {
        margin-bottom: 0;
        &::after {
          background: url(${Lock[1].src}) no-repeat 50% / cover;
        }
      }

      &::after {
        content: '';
        width: 24px;
        height: 24px;
        position: absolute;
        top: 50%;
        right: 26px;
        transform: translateY(-50%);
        background: url(${Email.src}) no-repeat 50% / cover;
      }
    }
  }
  .bnts {
    width: 100%;
    display: flex;
    flex-direction: column;
    button:first-child {
      margin-bottom: 16px;
    }
  }
`;
const StyledInput = styled.input`
  width: 100%;
  height: 72px;
  padding: 0 24px;
  border: 1px solid ${colors.blue[0]};
  background-color: ${colors.blue[0]};
  border-radius: 8px;
  transition: all 0.2s;
  font-size: 1rem;
  color: ${colors.gray[5]};
  position: relative;
  &:focus {
    border-color: ${colors.blue[2]};
    outline: none;
  }
  &::placeholder {
    color: ${colors.blue[1]};
    font-size: 1rem;
  }
`;

const StyledButton = styled(Button)`
  min-height: auto;
  height: 72px;
`;

export default DeleteUserWin;
