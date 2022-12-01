import colors from '@/src/assets/Colors';
import Button from '@/src/components/common/Button';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const InquiriesWriteCon = ({
  hadnleChangeInquiriesField,
  handleChangeFileUrls,
  file1name,
  file2name,
  file3name,
  handleSubmitInquiry,
}: {
  hadnleChangeInquiriesField: (e: React.ChangeEvent<any>) => void;
  handleChangeFileUrls: (e: React.ChangeEvent<any>) => void;
  file1name: string | null;
  file2name: string | null;
  file3name: string | null;
  handleSubmitInquiry: () => void;
}) => {
  const { title, content } = useSelector(({ boards }: RootState) => ({
    title: boards.title,
    content: boards.content,
  }));
  const [textCount, setTextCount] = useState(0);
  const handleChangeContentsLength = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    hadnleChangeInquiriesField(e);
    setTextCount(value.length);
  };
  return (
    <InquiriesWriteBlock>
      <div className="top_text">
        받는사람 <span>퀀트로</span>
      </div>
      <StyledInput
        name="title"
        placeholder="제목을 입력해 주세요"
        value={title}
        onChange={hadnleChangeInquiriesField}
      />
      <div className="contents_box">
        <StyledTextArea
          name="content"
          value={content}
          placeholder="문의 내용을 작성 후 보내기를 눌러주세요"
          onChange={handleChangeContentsLength}
        />
        <div className="count_area">
          <div className="count">{textCount} / 1000자</div>
        </div>
      </div>
      <div className="write_bottom">
        <div className="download_area">
          <div className="file_con">
            <div className="file_title">첨부파일 1</div>
            <label>
              <input name="file1" type="file" accept=".gif, .jpg, .png" onChange={handleChangeFileUrls} />
              <span className="file_button">파일 선택</span>
            </label>
            <span className="fileName">{file1name ? file1name : '선택된 파일 없음'}</span>
          </div>
          <div className="file_con">
            <div className="file_title">첨부파일 2</div>
            <label>
              <input name="file2" type="file" accept=".gif, .jpg, .png" onChange={handleChangeFileUrls} />
              <span className="file_button">파일 선택</span>
            </label>
            <span className="fileName">{file2name ? file2name : '선택된 파일 없음'}</span>
          </div>
          <div className="file_con">
            <div className="file_title">첨부파일 3</div>
            <label>
              <input name="file3" type="file" accept=".gif, .jpg, .png" onChange={handleChangeFileUrls} />
              <span className="file_button">파일 선택</span>
            </label>
            <span className="fileName">{file3name ? file3name : '선택된 파일 없음'}</span>
          </div>
        </div>
        <Button lightBlue onClick={handleSubmitInquiry}>
          보내기
        </Button>
      </div>
    </InquiriesWriteBlock>
  );
};

const InquiriesWriteBlock = styled.div`
  .top_text {
    font-size: 18px;
    color: ${colors.dark[1]};
    margin-bottom: 20px;

    span {
      font-family: 'GmarketSansBold';
      color: ${colors.blue[2]};
    }
  }

  .contents_box {
    width: 100%;
    margin-bottom: 20px;
    .count_area {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      .count {
        font-size: 14px;
        color: ${colors.gray[3]};
      }
    }
  }
  .write_bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .download_area {
      font-size: 14px;
      .file_con {
        width: 100%;
        min-width: 542px;
        display: flex;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid ${colors.gray[2]};
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

          span.file_button {
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
          }
        }
        .fileName {
          color: ${colors.gray[2]};
          flex: 1;
        }
      }
    }
    button {
      border-radius: 8px;
      min-height: auto;
      padding: 0;
      width: 160px;
      height: 48px;
    }
  }

  ${media.tablet} {
    .write_bottom {
      flex-direction: column;
      .download_area {
        margin-bottom: 40px;
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
            margin-top: 4px;
          }
        }
      }
      button {
        width: 100%;
      }
    }
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 62px;
  padding: 0 36px;
  border-radius: 14px;
  font-size: 1rem;
  border: 1px solid ${colors.blue[2]};
  margin-bottom: 8px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 1rem;
    color: ${colors.gray[3]};
  }

  ${media.tablet} {
    height: 58px;
    padding: 0 16px;
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 308px;
  padding: 24px 36px;
  border-radius: 14px;
  font-size: 1rem;
  border: 1px solid ${colors.blue[2]};
  resize: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 1rem;
    color: ${colors.gray[3]};
  }

  ${media.tablet} {
    padding: 16px;
  }
`;

export default InquiriesWriteCon;
