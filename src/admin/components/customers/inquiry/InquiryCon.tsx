import colors from '@/src/assets/Colors';
import { Profile1 } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { adminCustomersActions } from '@/src/store/reducers';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
const Editor = dynamic(() => import('@/src/admin/components/common/Editor/Editor'), { ssr: false });

const InquiryCon = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { getInquiryDetailResult } = useSelector(({ adminCustomers }: RootState) => ({
    getInquiryDetailResult: adminCustomers.getInquiryDetailResult,
  }));
  const ViewContentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (getInquiryDetailResult?.content) {
      if (ViewContentsRef.current) {
        ViewContentsRef.current.innerHTML = getInquiryDetailResult?.content;
      }
    }
  }, [getInquiryDetailResult]);
  console.log(getInquiryDetailResult);

  const handleChangeContents = (val: string) => {
    dispatch(
      adminCustomersActions.changeAdminInquiryField({
        inquiryId: parseInt(router.query.id as string),
        content: val,
      }),
    );
  };

  return (
    <InquiryConBlock>
      <div className="title">1:1 질문</div>
      <div className="user_quaestion">
        <div className="top_area">
          <div className="state"></div>
          <div className="title">{getInquiryDetailResult?.title}</div>
          <div className="top_btns"></div>
        </div>
        <div className="bottom_area">
          <div className="thumbnail">
            <Image
              src={getInquiryDetailResult?.user?.photoUrl ? getInquiryDetailResult?.user?.photoUrl : Profile1[1]}
              alt="profile"
              layout="fill"
            />
          </div>
          <div className="info_con">
            <div className="profile_info">
              <div className="nickname">
                {getInquiryDetailResult?.user?.nickname ? getInquiryDetailResult?.user?.nickname : '퀀트로'}
              </div>
              <div className="styles">
                {getInquiryDetailResult?.user?.styles.map((st) => {
                  if (st.name === 'SCALPING') {
                    return (
                      <div key={st.name} className="style">
                        <span>#스캘핑</span>
                      </div>
                    );
                  } else if (st.name === 'SHORT_HIT') {
                    return (
                      <div key={st.name} className="style">
                        <span>#단타</span>
                      </div>
                    );
                  } else if (st.name === 'SWING') {
                    return (
                      <div key={st.name} className="style">
                        <span>#스윙</span>
                      </div>
                    );
                  } else if (st.name === 'TREND') {
                    return (
                      <div key={st.name} className="style">
                        <span>#추세매매</span>
                      </div>
                    );
                  } else if (st.name === 'R_TREND') {
                    return (
                      <div key={st.name} className="style">
                        <span>#역추세매매</span>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="board_info">
              <Moment format="YYYY.MM.DD HH:MM">{getInquiryDetailResult?.createdAt}</Moment>
            </div>
          </div>
        </div>
      </div>
      <div className="viewConent" ref={ViewContentsRef}></div>
      <div className="question_files">
        <div className="title">첨부파일</div>
        {getInquiryDetailResult?.files.length != 0 ? (
          <>
            {getInquiryDetailResult?.files.map((file) => (
              <a className="file" href={file.url} download>
                다운로드
              </a>
            ))}
          </>
        ) : (
          <div className="noFile">첨부파일이 없습니다</div>
        )}
      </div>
      <div className="status_con">
        <div className={getInquiryDetailResult?.answer ? 'status on' : 'status'}>
          {getInquiryDetailResult?.answer ? '답변' : '대기'}
        </div>
      </div>
      <Editor onChange={handleChangeContents} />
    </InquiryConBlock>
  );
};

const InquiryConBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  & > .title {
    width: 100%;
  }
  .user_quaestion {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 48px;
    margin-bottom: 20px;
    .top_area {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 1px solid ${colors.gray[5]};
      .state {
        width: 20%;
        max-width: 64px;
        text-align: center;
        color: ${colors.gray[4]};
      }
      & > .title {
        width: calc(100% - 84px);
        word-break: keep-all;
        font-size: 24px;
        margin-bottom: 0;
      }
      .top_btns {
        display: flex;
        .button {
          cursor: pointer;
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: ${colors.gray[0]};
          transition: all 0.2s;
          border-radius: 50%;
          font-size: 12px;
          .icon {
            width: 24px;
            height: 24px;
            position: relative;
          }
          &:hover {
            background-color: ${colors.gray[2]};
          }
          &:first-child {
            margin-right: 12px;
          }
        }
      }
    }
    .bottom_area {
      width: 100%;
      padding-top: 24px;
      display: flex;
      align-items: center;
      .thumbnail {
        width: 64px;
        min-width: 64px;
        height: 64px;
        margin-right: 20px;
        position: relative;
        overflow: hidden;
        border-radius: 50%;
      }
      .info_con {
        width: 100%;
        flex: 1;
        .profile_info {
          width: 100%;
          display: flex;
          margin-bottom: 12px;
          align-items: center;
          .nickname {
            font-family: 'GmarketSansBold';
            font-size: 20px;
            margin-right: 1rem;
            transform: translateY(2px);
            color: ${colors.blue[2]};
          }
          .styles {
            width: 100%;
            flex: 1;
            display: flex;
            .style {
              height: 28px;
              border-radius: 14px;
              padding: 4px 12px;
              font-size: 14px;
              border: 1px solid ${colors.blue[2]};
              color: ${colors.blue[2]};
              margin-left: 8px;
              &:first-child {
                margin-left: 0;
              }
            }
          }
        }
        .board_info {
          width: 100%;
          display: flex;
          font-size: 14px;
          color: ${colors.gray[3]};
          time {
            margin-right: 8px;
          }
        }
      }
    }
  }
  .viewConent {
    width: calc(100% - 84px);
    padding: 2rem;
    background-color: ${colors.gray[1]};
    min-height: 300px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  .question_files {
    width: 100%;
    margin-bottom: 58px;
    & > .title {
      font-size: 1.125rem;
      height: auto;
      margin-bottom: 1rem;
    }

    .file {
      padding: 7px 1rem;
      border: 1px solid ${colors.gray[3]};
      border-radius: 7px;
      transition: all 0.2s;
      margin-right: 0.5rem;
      &:last-child {
        margin-right: 0;
      }

      &:hover {
        background-color: ${colors.gray[1]};
      }
    }
    .noFile {
      font-size: 14px;
      padding: 1rem;
      color: ${colors.gray[5]};
    }
  }
  .status_con {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    .status {
      padding: 7px 1rem;
      border-radius: 24px;
      background-color: ${colors.gray[0]};
      color: ${colors.gray[5]};
      &.on {
        background-color: ${colors.blue[0]};
        color: ${colors.blue[2]};
      }
    }
  }
`;

export default InquiryCon;
