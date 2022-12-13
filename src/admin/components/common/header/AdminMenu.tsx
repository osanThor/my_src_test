import colors from '@/src/assets/Colors';
import { LogOutIcon, Menu1, Menu2, Menu3, Menu4, Menu5, Menu6 } from '@/src/assets/Images';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const AdminMenu = ({ open }: { open: boolean }) => {
  const router = useRouter();
  return (
    <>
      <AdminMenuBlock className={open && 'open'}>
        <div className="admin_menu_list">
          <div className="menu" onClick={() => router.push('/admin/dashboard')}>
            <div className="menu_icon">
              <Image src={router.pathname === '/admin/dashboard' ? Menu1[1] : Menu1[0]} alt="menu" />
            </div>
            <div className={router.pathname === '/admin/dashboard' ? 'menu_txt on' : 'menu_txt'}>대시보드</div>
          </div>
          <div className="menu" onClick={() => router.push('/admin/users')}>
            <div className="menu_icon">
              <Image src={router.pathname === '/admin/users' ? Menu2[1] : Menu2[0]} alt="menu" />
            </div>
            <div className={router.pathname === '/admin/users' ? 'menu_txt on' : 'menu_txt'}>회원관리</div>
          </div>
          <div className="menu">
            <div className="menu_icon">
              <Image src={Menu3[0]} alt="menu" />
            </div>
            <div className="menu_txt">배너관리</div>
          </div>
          <div className="menu">
            <div className="menu_icon">
              <Image src={Menu4[0]} alt="menu" />
            </div>
            <div className="menu_txt">전략관리</div>
          </div>
          <div className="menu">
            <div className="menu_icon">
              <Image src={Menu6[0]} alt="menu" />
            </div>
            <div className="menu_txt">커뮤니티관리</div>
          </div>
          <div className="menu">
            <div className="menu_icon">
              <Image src={Menu5[0]} alt="menu" />
            </div>
            <div className="menu_txt">고객센터</div>
          </div>
        </div>
        <div className="logout" onClick={() => router.push('/admin/login')}>
          <div className="icon">
            <Image src={LogOutIcon} alt="logout" />
          </div>
          <div className="logout_xt">로그아웃</div>
        </div>
      </AdminMenuBlock>
      <AdminMenuSpacer className={open && 'open'} />
    </>
  );
};

const AdminMenuBlock = styled.div`
  width: auto;
  height: calc(100% - 70px);
  background-color: whtie;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: all 0.3s ease-in;
  padding-bottom: 2rem;

  &.open {
    width: 275px;
    .admin_menu_list {
      .menu {
        .menu_txt {
          margin-left: 0.2rem;
          width: 100px;
        }
      }
    }
    .logout {
      .logout_xt {
        margin-left: 0.2rem;
        width: 100px;
      }
    }
  }
  .admin_menu_list {
    width: 100%;
    border-bottom: 1px solid ${colors.gray[2]};
    padding-bottom: 2rem;
    .menu {
      padding: 0 1rem;
      cursor: pointer;
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      transition: all 0.2s;

      .menu_icon {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .menu_txt {
        width: 0;
        margin-left: 0;
        font-size: 14px;
        color: ${colors.gray[5]};
        transition: all 0.2s;
        overflow: hidden;
        white-space: nowrap;
        transform: translateY(2px);
        &.on {
          color: ${colors.blue[2]};
        }
      }

      &:hover {
        background-color: ${colors.gray[1]};
      }
    }
  }
  .logout {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    font-size: 14px;
    cursor: pointer;
    .icon {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &:hover {
      background-color: ${colors.gray[1]};
    }
    .logout_xt {
      width: 0;
      margin-left: 0;
      font-size: 14px;
      color: ${colors.gray[5]};
      transition: all 0.2s;
      overflow: hidden;
      white-space: nowrap;
    }
  }
`;
const AdminMenuSpacer = styled.div`
  width: 72px;
  height: calc(100% - 70px);
  transition: all 0.1s;

  &.open {
    width: 275px;
  }
`;

export default AdminMenu;
