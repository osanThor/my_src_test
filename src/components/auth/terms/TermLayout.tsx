import { term1, term2, term3 } from '@/src/assets/terms';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import colors from '../../../assets/Colors';
import { CheckedSqquare, CheckSquare, Logo } from '../../../assets/Images';
import Button from '../../common/Button';

const TermsLayOut = () => {
  const { isDark } = useSelector(({ user }: RootState) => ({
    isDark: user.isDark,
  }));
  const terms = [
    { id: 0, type: 'privacy' },
    { id: 1, type: 'service' },
    { id: 2, type: 'advertisement' },
  ];

  const [checkItems, setCheckItems] = useState([]);
  const [openItems, setOpenItems] = useState([false, false, false]);
  const [allCheck, setAllCheck] = useState(false);
  const [checkAble, setCheckAble] = useState(false);

  const handleAllCheck = (checked: boolean) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray: number[] = [];
      terms.forEach((el: { id: number; type: string }) => idArray.push(el.id));
      setCheckItems(idArray);
      setAllCheck(true);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
      setOpenItems([false, false, false]);
      setAllCheck(false);
    }
  };

  const handleOpenTerm = (target: boolean, id: number): void => {
    const bArr = [...openItems];
    bArr[id] = !target;
    setOpenItems(bArr);

    if (target) {
      setAllCheck(false);
      setCheckItems(checkItems.filter((el) => el !== id));
      setCheckAble(false);
    } else {
      setCheckItems((prev) => [...prev, id]);
      if (checkItems.length === 2) {
        setAllCheck(true);
      }
    }
  };
  const canOpen = openItems.filter((el) => el === true);
  useEffect(() => {
    if (canOpen.length === 3) {
      setCheckAble(true);
    } else {
      setCheckAble(false);
    }
  }, [openItems]);

  const router = useRouter();

  const handleMoveRegister = () => {
    router.push('/auth/register');
  };

  return (
    <TermsBlock>
      <h1 className="logo">
        <Link href="/">
          <a>
            <Image src={isDark ? Logo[1] : Logo[0]} alt="main_logo" />
          </a>
        </Link>
      </h1>
      <div className="termBox">
        {terms.map((term) => (
          <TermItem
            key={term.id}
            term={term}
            checkItems={checkItems}
            openItems={openItems}
            handleOpenTerm={handleOpenTerm}
          />
        ))}
      </div>
      <div className="checkAll">
        <label className={checkAble ? 'checkSquare' : 'disabled'}>
          <input
            className="checkSquare"
            type="checkbox"
            onChange={(e) => handleAllCheck(e.target.checked)}
            checked={checkItems.length === terms.length ? true : false}
          />
          <span className="check" />
          전체동의
        </label>
      </div>
      <Button blue fullWidth disabled={allCheck ? false : true} onClick={handleMoveRegister}>
        다음
      </Button>
    </TermsBlock>
  );
};

interface TermType {
  privacy: {
    name: string;
    info: string;
  };
  service: {
    name: string;
    info: string;
  };
  advertisement: {
    name: string;
    info: string;
  };
  [prop: string]: any;
}
const typeMap: TermType = {
  privacy: term1,
  service: term2,
  advertisement: term3,
};
const TermItem = ({
  term,
  checkItems,
  openItems,
  handleOpenTerm,
}: {
  term: { id: number; type: string };
  checkItems: Array<number>;
  openItems: Array<boolean>;
  handleOpenTerm: (target: boolean, id: number) => void;
}) => {
  const { id, type } = term;

  const termType = typeMap[type];
  const target = openItems[id];

  return (
    <div className="termItem">
      <div
        className={checkItems.includes(term.id) ? 'term_top on' : 'term_top'}
        onClick={() => handleOpenTerm(target, id)}
      >
        <label className={target ? 'checkSquare' : 'disabled'}>
          <input
            className="checkSquare"
            type="checkbox"
            onChange={(e) => handleOpenTerm(e.target.checked, id)}
            checked={checkItems.includes(term.id) ? true : false}
          />
          <span className="check" />
          {termType.name}
        </label>
        <span className="more">{target ? '접기' : '더보기'}</span>
      </div>
      <div className={target ? 'term_bottom_open' : 'term_bottom'} style={{ whiteSpace: 'pre-wrap' }}>
        {termType.info}
      </div>
    </div>
  );
};

const TermsBlock = styled.div`
  width: 100%;
  max-width: 616px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1.logo {
    width: 230px;
    cursor: pointer;
    margin-bottom: 40px;
    a {
      display: block;
    }
    img {
      width: 100%;
    }
  }

  .termBox {
    width: 100%;
    margin-bottom: 20px;

    .termItem {
      width: 100%;
      border: 1px solid ${colors.gray[3]};
      border-radius: 14px;
      transition: all 0.2s;
      margin-bottom: 1rem;
      overflow: hidden;

      .term_top {
        width: 100%;
        padding: 8px 23px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 24px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s;
        &.on {
          background-color: ${colors.blue[2]};
          color: white;
          label {
            span {
              background-color: white;
            }
          }
          span {
            color: white;
          }
        }
      }

      .term_bottom {
        height: 0;
        transition: all 0.2s;
        overflow: hidden;
        padding: 0 23px;
      }
      .term_bottom_open {
        height: 160px;
        transition: all 0.2s;
        overflow-y: auto;
        border-top: 1px solid ${colors.gray[2]};
        padding: 1.3rem 23px;
        font-size: 12px;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    label.checkSquare {
      padding-left: 24px;
      span.check {
        left: 0;
      }
    }
    label.disabled {
      padding-left: 24px;
      span.check {
        left: 2px;
        top: 50%;
        transform: translateY(-58%);
      }
    }
    span.more {
      cursor: pointer;
      color: ${colors.blue[2]};
      line-height: 37px;
      font-size: 14px;

      &:hover {
        color: ${colors.blue[1]};
      }
    }
  }

  .checkAll {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    line-height: 27px;
    font-weight: bold;
  }
  label {
    padding-left: 3rem;
    position: relative;
    line-height: 27px;

    input {
      visibility: hidden;
    }
    &.checkSquare {
      cursor: pointer;
      span.check {
        width: 24px;
        height: 24px;
        position: absolute;
        top: 0;
        left: 24px;
        background: url(${CheckSquare.src});
        cursor: pointer;
      }
    }
    &.disabled {
      cursor: not-allowed;
      pointer-events: none;
      span.check {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        left: 24px;
        border: 1px solid ${colors.gray[2]};
        background-color: ${colors.gray[1]};
      }
    }
    input.checkSquare:checked + span.check {
      border-color: ${colors.blue[2]};
      background: url(${CheckedSqquare.src}) no-repeat 50%;
    }
  }

  ${media.tablet} {
    width: calc(100% - 32px);
    justify-content: flex-start;
    overflow-y: auto;
    h1.logo {
      width: 210px;
    }
  }
`;

export default TermsLayOut;
