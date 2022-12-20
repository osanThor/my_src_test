import telegram from '@/pages/auth/telegram';
import colors from '@/src/assets/Colors';
import { Profile1 } from '@/src/assets/Images';
import Button from '@/src/components/common/Button';
import { RootState } from '@/src/store/configureStore';
import { adminUsersActions } from '@/src/store/reducers';
import { Checkbox, Input } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CustomSelect from './items/CustomSelect';

const gradeOptions = [
  { value: 'NORMAL', txt: 'NORMAL' },
  { value: 'STRATEGIST ', txt: 'STRATEGIST ' },
];
const packageOptions = [
  { value: 'BASIC', txt: 'BASIC' },
  { value: 'REGULAR', txt: 'REGULAR' },
  { value: 'PREMIUM ', txt: 'PREMIUM ' },
];
const depositStatusOptions = [
  { value: 'WAIT', txt: '입금대기' },
  { value: 'COMPLETED', txt: '입금완료' },
  { value: 'CHECKED', txt: '입금확인' },
];

const UserMiddleBox = ({
  messageVal,
  idList,
  handleChangeTelegramMessage,
  handleSendTelegramMessage,
  handleChangeUserField,
  handleAddTelegramOpen,
  handleDeleteTelegramOpen,
}: {
  messageVal: string | null;
  idList: Array<string> | null;
  handleChangeTelegramMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendTelegramMessage: () => void;
  handleChangeUserField: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleAddTelegramOpen: () => void;
  handleDeleteTelegramOpen: (val: string) => void;
}) => {
  const dispatch = useDispatch();
  const { getAdminUserDetailResult, updateUserPayload } = useSelector(({ adminUsers }: RootState) => ({
    getAdminUserDetailResult: adminUsers.getAdminUserDetailResult,
    updateUserPayload: adminUsers.updateUserPayload,
  }));

  const [gradeSt, setGradeSt] = useState('NORMAL');
  const [packageSt, setPackageSt] = useState('선택');
  const [depositSt, setDepositSt] = useState('WAIT');
  useEffect(() => {
    if (updateUserPayload) {
      if (updateUserPayload?.grade === 'NORMAL') {
        setGradeSt('NORMAL');
      } else if (updateUserPayload?.grade === 'STRATEGIST') {
        setGradeSt('STRATEGIST');
      }

      if (updateUserPayload?.licensePackageInfo?.licensePackage === 'BASIC') {
        setPackageSt('BASIC');
      } else if (updateUserPayload?.licensePackageInfo?.licensePackage === 'REGULAR') {
        setPackageSt('REGULAR');
      } else if (updateUserPayload?.licensePackageInfo?.licensePackage === 'PREMIUM') {
        setPackageSt('PREMIUM');
      }

      if (updateUserPayload?.depositStatus === 'WAIT') {
        setDepositSt('WAIT');
      } else if (updateUserPayload?.depositStatus === 'COMPLETED') {
        setDepositSt('COMPLETED');
      } else if (updateUserPayload?.depositStatus === 'CHECKED') {
        setDepositSt('CHECKED');
      }
    }
  }, [getAdminUserDetailResult, updateUserPayload]);

  useEffect(() => {
    dispatch(
      adminUsersActions.chagneAdminUserField({
        email: updateUserPayload?.email,
        nickname: updateUserPayload?.nickname,
        introduction: updateUserPayload?.introduction,
        grade: gradeSt,
        licensePackageInfo: {
          licensePackage: packageSt,
          startedAt: updateUserPayload?.licensePackageInfo?.startedAt,
          endedAt: updateUserPayload?.licensePackageInfo?.endedAt,
        },
        depositStatus: depositSt,
      }),
    );
  }, [gradeSt, packageSt, depositSt]);
  return (
    <UserMiddleBoxBlock>
      <div className="package_area">
        <div className="title">사용자 상태</div>
        <div className="licenses">
          <CustomSelect options={gradeOptions} place={gradeSt} setSearchName={setGradeSt} />
        </div>
        <div className="title">라이센스</div>
        <div className="licenses">
          <div className="license">
            <CustomSelect options={packageOptions} place={packageSt} setSearchName={setPackageSt} />
            <div className="date">
              <input
                name="startedAt"
                type="datetime-local"
                value={moment(updateUserPayload?.licensePackageInfo?.startedAt).format('yyyy-MM-DDThh:mm')}
                onChange={handleChangeUserField}
              />
              ~
              <input
                name="endedAt"
                type="datetime-local"
                value={moment(updateUserPayload?.licensePackageInfo?.endedAt).format('yyyy-MM-DDThh:mm')}
                onChange={handleChangeUserField}
              />
            </div>
          </div>
        </div>
        <div className="title">패키지 등록상태</div>
        <CustomSelect options={depositStatusOptions} place={depositSt} setSearchName={setDepositSt} />
      </div>
      <div className="telegram_area">
        <div className="title">
          텔레그램
          <div className="add_btn" onClick={handleAddTelegramOpen}>
            +
          </div>
        </div>
        <div className="telegram_con">
          {getAdminUserDetailResult?.telegrams?.length != 0 ? (
            <>
              <div className="telegram_list">
                {getAdminUserDetailResult?.telegrams?.map((telegram) => (
                  <label className="telegram" key={telegram.id}>
                    <Checkbox
                      name="telegramId"
                      value={telegram.id}
                      onChange={handleChangeTelegramMessage}
                      checked={idList.includes(telegram.id)}
                    />
                    사용자명: <span>{telegram.name}</span>
                    <span className="delete_btn" onClick={() => handleDeleteTelegramOpen(telegram.name)}>
                      삭제
                    </span>
                  </label>
                ))}
              </div>
              <div className="send_notice">
                <Input placeholder="메시지를 작성해주세요." value={messageVal} onChange={handleChangeTelegramMessage} />
                <Button onClick={handleSendTelegramMessage}>전송</Button>
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
    .title {
      height: auto;
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
        padding: 7px 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .tit {
          font-family: 'GmarketSansBold';
          color: ${colors.blue[2]};
        }
        .date {
          input[type='datetime-local'] {
            height: 48px;
            cursor: pointer;
            border: none;
            margin: 0 0.5rem;
            &:focus {
              outline: none;
              border-bottom: 1px solid ${colors.blue[2]};
            }
          }
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

    .title {
      display: flex;
      align-items: center;
      position: relative;
      .add_btn {
        cursor: pointer;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'GmarketSansBold';
        color: ${colors.blue[2]};
        margin-left: 1rem;
        font-size: 1.75rem;
        position: absolute;
        top: 0;
        left: 70px;
        transition: all 0.2s;
        &:hover {
          transform: scale(1.15);
        }
      }
    }
    .telegram_con {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      .telegram_list {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        max-height: 300px;
        overflow-y: auto;
        .telegram {
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 7px 1rem;
          border: 1px solid ${colors.blue[2]};
          color: ${colors.gray[5]};
          border-radius: 34px;
          position: relative;
          span {
            font-size: 1rem;
            font-family: 'GmarketSansBold';
            color: ${colors.blue[2]};
            &:last-child {
              margin-left: 1rem;
            }
          }
          span.delete_btn {
            color: ${colors.red[2]};
            position: absolute;
            right: 2rem;
            top: 50%;
            transform: translateY(-50%);
            &:hover {
              opacity: 0.7;
            }
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

export default UserMiddleBox;
