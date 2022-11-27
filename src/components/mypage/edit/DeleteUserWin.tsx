import colors from '@/src/assets/Colors';
import { Email, Lock } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { userActions } from '@/src/store/reducers';
import { media } from '@/styles/theme';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../../common/Button';

const DeleteUserWin = ({
  deleteRef,
  onClose,
  setModalOpen,
  setModalMessage,
  setModalErr,
  deleteUserDone,
}: {
  deleteRef: React.MutableRefObject<HTMLDivElement>;
  onClose: () => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalMessage: React.Dispatch<React.SetStateAction<string>>;
  setModalErr: React.Dispatch<React.SetStateAction<boolean>>;
  deleteUserDone: boolean;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { email } = useSelector(({ user }: RootState) => ({
    email: user.email,
  }));
  //google
  const [isGoogle, setIsGoogle] = useState(false);
  useEffect(() => {
    const gId = localStorage.getItem('gId');
    if (gId) {
      setIsGoogle(true);
    }
  }, []);

  // state
  const [localEmail, setLacalEmail] = useState('');
  const [pw, setPw] = useState('');
  const [clickAble, setClickAble] = useState(false);

  const handleChangeDeleteUserFeild = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setLacalEmail(value);
    } else {
      setPw(value);
    }
  };
  useEffect(() => {
    const gId = localStorage.getItem('gId');

    if (localEmail && pw) {
      setClickAble(true);
    } else {
      setClickAble(false);
    }
    if (gId) {
      if (localEmail) {
        setClickAble(true);
      }
    }
  }, [localEmail, pw]);

  const handleDeleteUser = () => {
    console.log(email);
    console.log(localEmail);
    console.log(pw);
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(localEmail)) {
      setModalOpen(true);
      setModalMessage('이메일 형식이 잘못 되었어요');
      setModalErr(true);
      return;
    } else if (email != localEmail) {
      setModalOpen(true);
      setModalMessage('정보가 일치하지 않아요');
      setModalErr(true);
      return;
    }
    dispatch(userActions.deleteUser({ email: localEmail, pw }));
  };

  const handleCloseDeleteDone = () => {
    router.push('/auth/login');
    onClose();
  };

  return (
    <DeleteUserWinBlock ref={deleteRef}>
      {!deleteUserDone ? (
        <>
          <div className="delete_title">
            <h2>아쉬워요!</h2>
            <p>퀀트로를 정말 떠나실 건가요?</p>
          </div>
          <div className="delete_form">
            <div className="input">
              <StyledInput
                name="email"
                onChange={handleChangeDeleteUserFeild}
                placeholder="이메일 입력해요"
                value={localEmail}
              />
            </div>
            {!isGoogle && (
              <div className="input">
                <StyledInput
                  name="pw"
                  onChange={handleChangeDeleteUserFeild}
                  type="password"
                  placeholder="비밀번호를 변경해요"
                  value={pw}
                />
              </div>
            )}
          </div>
          <div className="bnts">
            <StyledButton lightBlue disabled={!clickAble} onClick={handleDeleteUser}>
              탈퇴하기
            </StyledButton>
            <StyledButton blue onClick={onClose}>
              계속 이용할게요
            </StyledButton>
          </div>
        </>
      ) : (
        <>
          <div className="delete_title">
            <h2>퀀트로를 사용해주셔서 감사합니다</h2>
            <p>
              정상 탈퇴 되었어요
              <br />
              다시 이용해주시기를 기다리겠습니다!
            </p>
          </div>
          <div className="bnts">
            <StyledButton blue onClick={handleCloseDeleteDone}>
              로그인페이지로 이동
            </StyledButton>
          </div>
        </>
      )}
    </DeleteUserWinBlock>
  );
};

const DeleteUserWinBlock = styled.div`
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
  ${media.tablet} {
    padding: 20px;
    .bnts {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 0;
      button {
        height: 56px;
      }
      button:last-child {
        margin-bottom: 0;
      }
    }
  }
  ${media.custom(472)} {
    width: calc(100% - 32px);
    .delete_form {
      width: 100%;
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
  color: ${colors.blue[2]};
  position: relative;
  &:focus {
    border-color: ${colors.blue[2]};
    outline: none;
  }
  &::placeholder {
    color: ${colors.blue[1]};
    font-size: 1rem;
  }
  ${media.tablet} {
    height: 56px;
  }
`;

const StyledButton = styled(Button)`
  min-height: auto;
  height: 72px;
`;

export default DeleteUserWin;
