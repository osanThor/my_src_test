import Link from 'next/link';
import React from 'react';

const GnbMenu = () => {
  return (
    <>
      <div className="gnb_menu_list">
        <div className="gnb_menu">
          <Link href="/dashboard">
            <a>
              <div className="headerIcon" />
              <span>대시보드</span>
            </a>
          </Link>
        </div>
        <div className="gnb_menu">
          <Link href="/write-quant">
            <a>
              <div className="headerIcon" />
              <span>퀀트작성</span>
            </a>
          </Link>
        </div>
        <div className="gnb_menu">
          <Link href="/licenses">
            <a>
              <div className="headerIcon" />
              <span>이용권 등록 / API Key</span>
            </a>
          </Link>
        </div>
        <div className="gnb_menu">
          <Link href="/message">
            <a>
              <div className="headerIcon" />
              <span>주문내역 / 에러 메세지</span>
            </a>
          </Link>
        </div>
        <div className="gnb_menu">
          <Link href="/strategy">
            <a>
              <div className="headerIcon" />
              <span>전략</span>
            </a>
          </Link>
        </div>
        <div className="gnb_menu">
          <Link href="/community">
            <a>
              <div className="headerIcon" />
              <span>커뮤니티</span>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default GnbMenu;
