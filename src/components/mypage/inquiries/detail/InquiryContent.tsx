import colors from '@/src/assets/Colors';
import Button from '@/src/components/common/Button';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const InquiryContent = () => {
  const router = useRouter();
  const { getInquiryResult } = useSelector(({ boards }: RootState) => ({
    getInquiryResult: boards.getInquiryResult,
  }));
  const { qId } = router.query;
  return (
    <InquiryContentBlock>
      <StyledTextarea value={getInquiryResult?.content} readOnly />
      <div className="download_area">
        <div className="file_con">
          <div className="file_title">첨부파일 1</div>
          <label>
            <a
              href={getInquiryResult?.files[0] && getInquiryResult?.files[0].url}
              download
              className={getInquiryResult?.files[0] ? 'file_button' : 'file_button disabled'}
            >
              파일 선택
            </a>
          </label>
          <span className="fileName">
            {getInquiryResult?.files[0] ? getInquiryResult?.files[0].url : '선택된 파일 없음'}
          </span>
        </div>
        <div className="file_con">
          <div className="file_title">첨부파일 2</div>
          <label>
            <a
              href={getInquiryResult?.files[1] && getInquiryResult?.files[1].url}
              download
              className={getInquiryResult?.files[1] ? 'file_button' : 'file_button disabled'}
            >
              파일 선택
            </a>
          </label>
          <span className="fileName">
            {getInquiryResult?.files[1] ? getInquiryResult?.files[1].url : '선택된 파일 없음'}
          </span>
        </div>
        <div className="file_con">
          <div className="file_title">첨부파일 3</div>
          <label>
            <a
              href={getInquiryResult?.files[2] && getInquiryResult?.files[2].url}
              download
              className={getInquiryResult?.files[2] ? 'file_button' : 'file_button disabled'}
            >
              파일 선택
            </a>
          </label>
          <span className="fileName">
            {getInquiryResult?.files[2] ? getInquiryResult?.files[2].url : '선택된 파일 없음'}
          </span>
        </div>
      </div>
      <div className="edit">
        {!getInquiryResult?.answer && (
          <Button onClick={() => router.push(`/mypage/inquiries/modify?id=${qId}`)}>수정하기</Button>
        )}
      </div>
    </InquiryContentBlock>
  );
};

const InquiryContentBlock = styled.div`
  width: 100%;
  border-bottom: 1px solid ${colors.gray[2]};
  padding-bottom: 48px;
  .download_area {
    font-size: 14px;
    .file_con {
      width: 100%;
      min-width: 542px;
      display: flex;
      align-items: center;
      padding: 12px 0;
      .file_title {
        width: 70px;
        color: ${colors.gray[5]};
        margin-right: 1rem;
      }
      label {
        margin-right: 1rem;
        input {
          display: none;
        }

        .file_button {
          cursor: pointer;
          display: inline-block;
          padding: 6px 16px;
          color: ${colors.dark[1]};
          border: 1px solid ${colors.gray[5]};
          border-radius: 8px;
          transition: all 0.2s;
          &:hover {
            background-color: ${colors.gray[1]};
          }

          &.disabled {
            background-color: ${colors.gray[1]};
            pointer-events: none;
            cursor: not-allowed;
          }
        }
      }
      .fileName {
        overflow: hidden;
        width: 20%;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: ${colors.gray[2]};
      }
    }
  }
  .edit {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    button {
      width: 96px;
      min-height: auto;
      height: 36px;
      padding: 0.25rem;
      border-radius: 8px;
    }
  }
  ${media.tablet} {
    padding-bottom: 20px;
    .download_area {
      margin-bottom: 0;
      .file_con {
        min-width: auto;
        flex-wrap: wrap;
        label {
          .file_button {
            height: 32px;
          }
        }
        .fileName {
          flex: auto;
          width: 100%;
          max-width: 300px;
          margin-top: 4px;
        }
      }
    }
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  border: none;
  background-color: ${colors.gray[1]};
  resize: none;
  padding: 36px;
  font-size: 1rem;
  margin-bottom: 30px;
  &:focus {
    outline: none;
  }
`;

export default InquiryContent;
