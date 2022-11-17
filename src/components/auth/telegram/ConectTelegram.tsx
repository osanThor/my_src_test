import colors from '@/src/assets/Colors';
import { ArrowBottom } from '@/src/assets/Images';
import { media } from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';

const ConectTelegram = ({
  onChange,
  username,
  handlePutTelegram,
}: {
  username: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePutTelegram: () => void;
}) => {
  // 리스트 색상 이벤트
  const handleClickEvent = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    siblings(target, 'on');
  };
  function siblings(t: EventTarget & HTMLLIElement, className: string) {
    const children = t.parentElement.children;

    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove(className);
      t.classList.add(className);
    }
  }
  // 사용자명 입력창 노출
  const [inputVisible, setInputVisible] = React.useState(false);

  return (
    <ConnectTelegramBlock>
      <h2>텔레그램 연동 방법</h2>
      <div className="descript">
        <ul>
          <li className="on" onClick={handleClickEvent}>
            <span className="num">1</span>
            <p>링크 접속 버튼을 클릭해요</p>
          </li>
          <li onClick={handleClickEvent}>
            <span className="num">2</span>
            <p>텔레그램 봇에 /atrat를 입력해요</p>
          </li>
          <li onClick={handleClickEvent}>
            <span className="num">3</span>
            <p>퀀트로 페이지에 @사용자명을 입력하고 등록버튼을 눌러요</p>
          </li>
        </ul>
      </div>
      {inputVisible && (
        <StyledInputForm>
          <input type="text" placeholder="텔레그램 '@사용자명'을 입력해주세요" value={username} onChange={onChange} />
          <StyledButton blue onClick={handlePutTelegram}>
            등록
          </StyledButton>
        </StyledInputForm>
      )}
      <StyledButton href="https://t.me/quantro_alarm_bot" passHref>
        <a onClick={() => setInputVisible(true)} target="_blank">
          링크 접속
        </a>
      </StyledButton>
    </ConnectTelegramBlock>
  );
};

const ConnectTelegramBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;

  a {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: white;
    border-radius: 14px;
    line-height: 72px;
    background-color: ${colors.blue[2]};
    transition: all 0.2s;
    &:hover {
      background: ${colors.blue[1]};
    }
  }

  .descript {
    width: 100%;
    margin-bottom: 1rem;
    ul {
      width: 100%;
      li {
        width: 100%;
        list-style: none;
        display: flex;
        align-items: center;
        padding: 18px 20px;
        background-color: ${colors.gray[0]};
        border-radius: 14px;
        margin-bottom: 28px;
        position: relative;
        cursor: pointer;

        span.num {
          width: 24px;
          padding: 3px 0 0;
          border-radius: 50%;
          font-size: 14px;
          background-color: ${colors.gray[5]};
          text-align: center;
          color: white;
          margin-right: 0.5rem;
        }
        p {
          /* transform: translateY(2px); */
          flex: 1;
        }

        &.on {
          background-color: ${colors.blue[0]};
          color: ${colors.blue[2]};
          span.num {
            background-color: ${colors.blue[2]};
          }
        }
        &::after {
          content: '';
          width: 24px;
          height: 24px;
          background: url(${ArrowBottom.src}) no-repeat 50% / cover;
          position: absolute;
          bottom: -39px;
          left: 50%;
          transform: translate(-100%, -50%);
          cursor: auto;
        }
        &:last-child {
          margin-bottom: 0;
          &::after {
            display: none;
          }
        }
      }
    }
  }
  ${media.tablet} {
    a {
      font-size: 14px;
      line-height: 56px;
    }
  }
`;

const StyledInputForm = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  input {
    flex: 1;
    height: 72px;
    margin-right: 0.5rem;
    border-radius: 14px;
    border: none;
    background: ${colors.blue[0]};
    color: ${colors.blue[2]};
    padding: 0 1rem;
    font-size: 1rem;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border: 1px solid ${colors.blue[2]};
    }

    &::placeholder {
      font-size: 14px;
      color: ${colors.blue[1]};
    }
    @media (max-width: 768px) {
      height: 56px;
      font-size: 14px;
      padding: 0 1rem;
    }
  }

  ${media.mobile} {
    input {
      width: 65%;
      &::placeholder {
        font-size: 13px;
      }
    }
    button {
      padding: 0 1.5rem;
    }
  }
`;

const StyledButton = styled(Button)`
  height: 72px;
  ${media.tablet} {
    height: 56px;
  }
  ${media.mobile} {
  }
`;
export default ConectTelegram;
