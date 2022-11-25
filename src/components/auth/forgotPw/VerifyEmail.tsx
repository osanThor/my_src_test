import colors from '@/src/assets/Colors';
import { CloseRed, Email, Key, Notice } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import Button from '../../common/Button';
import Timer from '../../common/Timer';

const VerifyEmail = ({
  onChange,
  operEmail,
  veriftAble,
  verifyErr,
  nextBtn,
  handleReqVerify,
  min,
  timerErr,
  setTimerErr,
  hadleCheckVerifyCode,
  handleGoToSec,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  operEmail: boolean;
  veriftAble: boolean;
  verifyErr: boolean;
  nextBtn: boolean;
  handleReqVerify: () => void;
  min: number;
  timerErr: boolean;
  setTimerErr: React.Dispatch<React.SetStateAction<boolean>>;
  hadleCheckVerifyCode: () => void;
  handleGoToSec: () => void;
}) => {
  const [verifyBtn, setVerifyBtn] = React.useState(true);

  const { email, verifyCode } = useSelector(({ user }: RootState) => ({
    email: user.email,
    verifyCode: user.verifyCode,
  }));
  // 이메일 실시간 유효성검사
  const [emailError, setEmailError] = React.useState<boolean>(false);
  const [emailErrMessage, setEmailErrMessage] = React.useState<string>('이메일 형식이 잘못 되었어요');
  React.useEffect(() => {
    if (email.length <= 0) {
      setEmailError(false);
    } else {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      setEmailErrMessage('이메일 형식이 잘못 되었어요');
      if (!emailRegex.test(email)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }
  }, [email]);

  // 인증확인버튼 활성화
  React.useEffect(() => {
    if (veriftAble) {
      setVerifyBtn(true);
    } else {
      if (verifyCode.toString().length === 0 || !verifyCode) {
        setVerifyBtn(true);
      } else {
        setVerifyBtn(false);
        if (verifyCode.toString().length > 4) {
          setVerifyBtn(true);
        }
      }
    }
  }, [veriftAble, verifyCode]);

  return (
    <VerifyEmailBlock>
      <h2>Forgot password</h2>
      <p className="descript">
        메일로 인증번호를 보낸 후 입력하면
        <br /> 비밀번호를 리셋할 수 있어요!
      </p>
      <div className="form">
        <div className="input_area">
          <StyleInput
            name="email"
            icon={Email}
            value={email}
            onChange={onChange}
            readOnly={operEmail}
            placeholder="이메일 입력해요"
          />
          <StyledButton blue verify disabled={email.length <= 0 || emailError || operEmail} onClick={handleReqVerify}>
            메일전송
          </StyledButton>
        </div>
        {emailError && (
          <div className="err">
            <div>
              <Image src={Notice[1]} alt="notice" />
            </div>
            <span className="error">{emailErrMessage}</span>
          </div>
        )}
        <div className="input_area">
          <StyleInput
            type="number"
            name="verifyCode"
            icon={verifyErr ? CloseRed : Key}
            value={verifyCode}
            onChange={onChange}
            readOnly={veriftAble}
            placeholder="인증번호를 입력해요"
            error={verifyErr}
          />
          <StyledButton blue verify disabled={verifyBtn} onClick={hadleCheckVerifyCode}>
            인증확인
          </StyledButton>
          {!veriftAble && <Timer error={timerErr} setError={setTimerErr} min={min} />}
        </div>
      </div>
      <StyledButton fullWidth lightBlue style={{ marginBottom: '1rem' }} disabled={!nextBtn} onClick={handleGoToSec}>
        다음
      </StyledButton>
      <div className="notice">
        <span>
          <Image src={Notice[0]} alt="notice" />
        </span>
        <p>
          텔레그램 @quantro_alarm_bot 봇에 /myemail 을 입력하시면, 가입 Email 주소를 찾을 수 있어요. (텔레그램 연동
          없으면, 찾기 불가)
        </p>
      </div>
    </VerifyEmailBlock>
  );
};

const VerifyEmailBlock = styled.div`
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
    .err {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      color: ${colors.red[2]};
      font-size: 14px;
      & > div:first-child {
        width: 18px;
        height: 18px;
        transform: translateY(-1px);
        margin-right: 0.5rem;
      }
    }
  }
  .notice {
    width: 100%;
    display: flex;
    align-items: flex-start;
    color: ${colors.gray[3]};
    font-size: 14px;
    span {
      width: 18px;
      height: 18px;
      transform: translateY(1px);
      margin-right: 0.5rem;
    }
    p {
      flex: 1;
      margin-bottom: 0;
      letter-spacing: -0.1px;
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
  ${media.tablet} {
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
  ${media.tablet} {
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

  ${(props: any) =>
    props.verify &&
    css`
      font-size: 1rem;
      ${media.tablet} {
        padding: 1rem;
      }
    `}
  ${media.tablet} {
    height: 56px;
    font-size: 1rem;
  }
`;
export default VerifyEmail;
