import colors from '@/src/assets/Colors';
import { Lock, Notice } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { authActions } from '@/src/store/reducers';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import Button from '../../common/Button';

const ResetPw = ({
  onChange,
  handleGoToLast,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGoToLast: () => void;
}) => {
  const dispatch = useDispatch();
  // pw 유효성 검사
  const [pwErr, setPwErr] = React.useState(true);
  const [pwErrMessage, setPwErrMessage] = React.useState('');
  const [nextBtn, setNextBtn] = React.useState(true);

  const { loadAuthDone } = useSelector(({ auth }: RootState) => ({
    loadAuthDone: auth.loadAuthDone,
  }));

  const { email, pw, pwConfirm } = useSelector(({ user }: RootState) => ({
    email: user.email,
    pw: user.pw,
    pwConfirm: user.pwConfirm,
  }));

  React.useEffect(() => {
    var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (pw.length != 0) {
      if (pw.length < 8 || pw.length > 20) {
        setPwErr(true);
        setPwErrMessage('비밀번호는 최소 8자리, 최대 20자리까지에요.');
      } else if (reg.test(pw) === false) {
        setPwErr(true);
        setPwErrMessage('비밀번호 형식이 잘못되었어요');
      } else {
        setPwErr(false);
        setPwErrMessage('');
      }
    } else {
      setPwErr(false);
      setPwErrMessage('');
    }
    if (pwConfirm.length != 0) {
      if (pw != pwConfirm) {
        setPwErr(true);
        setPwErrMessage('비밀번호가 일치하지 않아요.');
      } else {
        setPwErr(false);
        setPwErrMessage('');
      }
    }
  }, [pw, pwConfirm, pwErr]);

  React.useEffect(() => {
    if (pw.length > 0 && pwConfirm.length > 0) {
      if (!pwErr) {
        setNextBtn(false);
      }
    } else {
      setNextBtn(true);
    }
  }, [pwErr]);

  // reset pw
  const onClick = () => {
    dispatch(authActions.userResetPw({ email, pw }));
  };

  React.useEffect(() => {
    if (loadAuthDone.message === 'CHANGED') {
      handleGoToLast();
    }
  }, [loadAuthDone]);

  return (
    <ResetPwBlock>
      <h2>Forgot password</h2>
      <p className="descript">비밀번호를 재설정 하세요!</p>
      <div className="form">
        <div className="input_area">
          <StyleInput
            type="password"
            name="pw"
            icon={Lock[1]}
            onChange={onChange}
            value={pw}
            placeholder="비밀번호를 다시 설정해요"
          />
        </div>
        <div className="input_area">
          <StyleInput
            type="password"
            name="pwConfirm"
            icon={Lock[1]}
            onChange={onChange}
            value={pwConfirm}
            placeholder="비밀번호를 한번 더 입력해요"
          />
        </div>
        {pwErr && (
          <div className="err">
            <div>
              <Image src={Notice[1]} alt="notice" />
            </div>
            <span className="error">{pwErrMessage}</span>
          </div>
        )}
      </div>
      <StyledButton fullWidth lightBlue disabled={nextBtn} onClick={onClick}>
        다음
      </StyledButton>
    </ResetPwBlock>
  );
};
const ResetPwBlock = styled.div`
  width: 100%;
  height: 100%;
  .form {
    width: 100%;
    margin-bottom: 4.5rem;
    position: relative;
    .input_area {
      width: 100%;
      display: flex;
      position: relative;

      &:first-child {
        margin-bottom: 1rem;
      }
    }
    .err {
      width: 100%;
      display: flex;
      align-items: center;
      color: ${colors.red[2]};
      position: absolute;
      bottom: 0;
      transform: translateY(130%);
      font-size: 14px;
      & > div:first-child {
        width: 18px;
        height: 18px;
        transform: translateY(-1px);
        margin-right: 0.5rem;
      }
    }
  }
`;

const StyleInput = (props: any) => {
  const { icon, onChange } = props;
  return (
    <StyledInputBlock>
      <StyledInput onChange={onChange} {...props} autoComplete="on" />
      {icon && (
        <div className="inputIcon">
          <Image src={icon} alt="icon" />
        </div>
      )}
    </StyledInputBlock>
  );
};

const StyledInputBlock = styled.div`
  width: 100%;
  position: relative;
  flex: 1;
  margin-right: 0.5rem;

  .inputIcon {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    right: 36px;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: text;
  }
  @media (max-width: 768px) {
    .inputIcon {
      right: 1rem;
    }
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 72px;
  border-radius: 14px;
  border: none;
  background: ${colors.blue[0]};
  color: ${colors.blue[2]};
  padding: 0 36px;
  padding-right: 80px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border: 1px solid ${colors.blue[2]};
  }

  &::placeholder {
    color: ${colors.blue[1]};
  }
  @media (max-width: 768px) {
    height: 56px;
    font-size: 14px;
    padding: 0 1rem;
    padding-right: 2.9rem;
  }
  ${(props: any) =>
    props.error &&
    css`
      color: ${colors.red[2]};
      background: ${colors.red[0]};
      border: 1px solid ${colors.red[1]};
      &::placeholder {
        color: ${colors.red[2]};
      }
      &:focus {
        outline: none;
        border: 1px solid ${colors.red[1]};
      }
    `}
`;
const StyledButton = styled(Button)`
  height: 72px;
  font-size: 20px;

  ${media.tablet} {
    height: 56px;
    font-size: 1rem;
  }
`;

export default ResetPw;
