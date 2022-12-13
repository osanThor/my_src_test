import telegram from '@/pages/auth/telegram';
import colors from '@/src/assets/Colors';
import { Profile1 } from '@/src/assets/Images';
import Button from '@/src/components/common/Button';
import { RootState } from '@/src/store/configureStore';
import { Checkbox, Input } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CustomSelect from './items/CustomSelect';

const UserMiddleBox = () => {
  const { getAdminUserDetailResult } = useSelector(({ adminUsers }: RootState) => ({
    getAdminUserDetailResult: adminUsers.getAdminUserDetailResult,
  }));
  console.log(getAdminUserDetailResult);
  const [place, setPlace] = useState('선택');
  const [searchName, setSearchName] = useState('NORMAL');
  useEffect(() => {
    if (getAdminUserDetailResult) {
      if (getAdminUserDetailResult.grade === 'NORMAL') {
        setPlace('미신청');
      }
    }
  }, [getAdminUserDetailResult]);
  return (
    <UserMiddleBoxBlock>
      <div className="package_area">
        <div className="title">등록 라이센스</div>
        <div className="licenses">
          {getAdminUserDetailResult?.license ? (
            <div className="license">
              <div className="tit">{getAdminUserDetailResult?.license.package === 'BASIC' && '배이직 패키지'}</div>
              <div className="date">
                <Moment format="YYYY.MM.DD">{getAdminUserDetailResult.license.startedAt}</Moment> ~
                {getAdminUserDetailResult.license.endedAt && (
                  <Moment format="YYYY.MM.DD">{getAdminUserDetailResult.license.endedAt}</Moment>
                )}
              </div>
            </div>
          ) : (
            <div className="noLicense">등록된 패키지가 없습니다</div>
          )}
        </div>
        <div className="title">패키지 등록상태</div>
        <CustomSelect place={place} setSearchName={setSearchName} />
      </div>
      <div className="telegram_area">
        <div className="title">텔레그램</div>
        <div className="telegram_con">
          {getAdminUserDetailResult?.telegrams.length != 0 ? (
            <>
              <div className="telegram_list">
                {getAdminUserDetailResult?.telegrams?.map((telegram) => (
                  <label className="telegram" key={telegram.id}>
                    <Checkbox name="telegramId" value={telegram.id} />
                    사용자명: <span>{telegram.name}</span>
                  </label>
                ))}
              </div>
              <div className="send_notice">
                <Input placeholder="메시지를 작성해주세요." />
                <Button>전송</Button>
              </div>
            </>
          ) : (
            <>
              <div className="no_telegram">텔레그램 연동이 되어있지 않습니다</div>
            </>
          )}
        </div>
      </div>
    </UserMiddleBoxBlock>
  );
};

const UserMiddleBoxBlock = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 54px;

  & > div {
    flex: 1;
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }

  .package_area {
    max-width: 833px;
    .licenses {
      display: flex;
      width: 100%;
      flex-direction: column;
      margin-bottom: 20px;

      .license {
        padding: 7px 1rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid ${colors.blue[2]};
        border-radius: 24px;
        .tit {
          font-family: 'GmarketSansBold';
          color: ${colors.blue[2]};
        }
      }
      .noLicense {
        font-family: 'GmarketSansBold';
        color: ${colors.blue[2]};
        line-height: 2rem;
      }
    }
  }

  .telegram_area {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .telegram_con {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .telegram_list {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        .telegram {
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 7px 1rem;
          border: 1px solid ${colors.blue[2]};
          color: ${colors.gray[5]};
          border-radius: 34px;
          span {
            font-size: 1rem;
            font-family: 'GmarketSansBold';
            color: ${colors.blue[2]};
            margin-left: 1rem;
          }
        }
      }
      .send_notice {
        width: 100%;
        display: flex;
        .MuiInput-root {
          flex: 1;
        }
        input {
          padding: 1rem;
          font-family: 'GmarketSans';
        }
        button {
          width: 130px;
          min-height: auto;
          height: 58px;
        }
      }
      .no_telegram {
        font-family: 'GmarketSansBold';
        color: ${colors.blue[2]};
        line-height: 2rem;
      }
    }
  }
`;

const StyledInput = styled.input`
  width: 100%;
  position: relative;
  border: none;
  font-size: 1rem;
  border-bottom: 1px solid ${colors.gray[3]};
  padding: 0 1rem;
  flex: 1;

  &:focus {
    outline: none;
  }

  &:read-only {
    color: ${colors.blue[2]};
  }
`;

export default UserMiddleBox;
