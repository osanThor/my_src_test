import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import { Input } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const CommissionCon = ({
  handleChangeCommisssionField,
}: {
  handleChangeCommisssionField: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  const router = useRouter();
  const { content, answer, getAdminCommissionDetailResult } = useSelector(({ adminStrategies }: RootState) => ({
    content: adminStrategies.content,
    answer: adminStrategies.answer,
    getAdminCommissionDetailResult: adminStrategies.getAdminCommissionDetailResult,
  }));

  const ViewContentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ViewContentsRef.current) {
      ViewContentsRef.current.innerHTML = content;
    }
  }, [content]);

  return (
    <CommissionConBlock>
      <div className="question">
        <div className="title_user">
          <Input
            placeholder="전략 제목(사용자가 작성한 전략명)"
            sx={{ width: '50%', height: '58px', p: 2, fontFamily: 'GmarketSans', mr: '20px' }}
            value={getAdminCommissionDetailResult?.title || ''}
            readOnly
          />
          <div className="user">
            <div className="strategist">
              <div className="label">전략가명</div> {getAdminCommissionDetailResult?.user?.nickname}
            </div>
          </div>
        </div>
        <div className="ViewContent" ref={ViewContentsRef} />
        {getAdminCommissionDetailResult?.commission?.refBoardId && (
          <div className="refCommission">
            <div className="label">연관 전략개발의뢰</div>
            <Link
              href={`/admin/strategies/strategy?id=${getAdminCommissionDetailResult?.commission?.refBoardId}&category=COMMISSION&edit=true`}
            >
              <a className="link" target="_blank" rel="noreferrer noopener">
                바로가기
              </a>
            </Link>
          </div>
        )}
        <div className="file_zone">
          <div className="label">첨부파일</div>
          <div className="files">
            {getAdminCommissionDetailResult?.files.length != 0 ? (
              <>
                <a className="file" href="#" download={true}>
                  첨부파일1
                </a>
              </>
            ) : (
              <div className="no_file">파일이 없습니다.</div>
            )}
          </div>
        </div>
      </div>
      <div className="answer">
        <div className="answer_top">
          <div className={getAdminCommissionDetailResult?.commission?.answer ? 'status on' : 'status'}>
            {getAdminCommissionDetailResult?.commission?.answer ? '답변' : '대기'}
          </div>
        </div>
        <div className="answer_con">
          <textarea
            name="answer"
            placeholder="개발전략을 입력해주세요"
            value={answer || ''}
            onChange={handleChangeCommisssionField}
          />
        </div>
      </div>
    </CommissionConBlock>
  );
};
const CommissionConBlock = styled.div`
  width: 100%;
  margin-bottom: 20px;
  .question {
    width: 100%;
    .title_user {
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      align-items: center;
      .user {
        .strategist {
          display: flex;
          align-items: center;
          .label {
            color: ${colors.gray[5]};
            margin-right: 8px;
          }
          font-family: 'GmarketSansBold';
          color: ${colors.blue[2]};
        }
      }
    }
    .ViewContent {
      min-height: 300px;
      margin-bottom: 20px;
      padding: 1rem;
      border-radius: 14px;
      border: 1px solid ${colors.blue[2]};
      max-height: 500px;
      overflow-y: auto;
      img {
        max-width: 100%;
      }
    }
    .file_zone {
      width: 100%;
      margin-bottom: 20px;
      padding: 1rem;
      .label {
        color: ${colors.gray[5]};
        margin-bottom: 8px;
      }
      .files {
        width: 100%;
        display: flex;
        .file {
          max-width: 120px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          padding: 4px 7px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid ${colors.gray[4]};
          margin-right: 8px;
          &:last-child {
            margin-right: 0;
          }
          &:hover {
            background-color: ${colors.gray[1]};
          }
        }
      }
    }

    & > .file {
      width: 50%;
      padding: 7px 1rem;
      display: flex;
      align-items: center;
      position: relative;
      .file_label {
        white-space: nowrap;
        width: 145px;
        font-family: 'GmarketSansBold';
        color: ${colors.gray[5]};
        font-size: 1rem;
        margin-right: 1rem;
      }
      label {
        cursor: pointer;
        margin-right: 1rem;
        input {
          display: none;
        }
        span.button {
          padding: 7px 1rem;
          border: 1px solid ${colors.gray[4]};
          border-radius: 8px;
          transition: all 0.2s;
          &:hover {
            background-color: ${colors.gray[1]};
          }
        }
      }
      .filename {
        width: 70%;
        flex: 1;
        color: ${colors.gray[3]};
        white-space: nowrap;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .guide {
        width: 100%;
        position: absolute;
        font-size: 12px;
        color: ${colors.gray[4]};
        top: -10%;
        left: 180px;
        transform: translateY(-100%);
      }
    }
  }
  .refCommission {
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .label {
      color: ${colors.gray[5]};
      margin-bottom: 8px;
    }
    .link {
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: underline;
      color: ${colors.blue[2]};

      &:hover {
        color: ${colors.gray[5]};
      }
    }
  }
  .answer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .status {
      margin-bottom: 20px;
      padding: 4px 1rem;
      border-radius: 24px;
      background-color: ${colors.gray[0]};
      color: ${colors.gray[5]};

      &.on {
        background-color: ${colors.blue[0]};
        color: ${colors.blue[2]};
      }
    }
    .answer_con {
      width: 100%;
      textarea {
        width: 100%;
        height: 300px;
        resize: none;
        border: none;
        padding: 1rem;
        font-size: 1rem;
        transition: all 0.2s;
        border-radius: 14px;
        border: 1px solid ${colors.gray[4]};

        &:focus {
          outline: none;
          border: 2px solid ${colors.blue[2]};
        }
      }
    }
  }
`;

export default CommissionCon;
