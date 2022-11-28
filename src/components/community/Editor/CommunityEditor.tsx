import colors from '@/src/assets/Colors';
import * as React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  CameraBlue,
  CameraDark,
  Iteric,
  StrikeLine,
  UnderLine,
} from '@/src/assets/Images';
import Button from '../../common/Button';
import { media } from '@/styles/theme';

const Editor = dynamic(() => import('@/src/components/common/boards/Editor/Editor'), { ssr: false }); // client 사이드에서만 동작되기 때문에 ssr false로 설정

const CommunityEditor = () => {
  // state
  const [htmlStr, setHtmlStr] = React.useState<string>('');

  // ref
  const viewContainerRef = React.useRef<HTMLDivElement>(null);

  // useEffect
  React.useEffect(() => {
    if (viewContainerRef.current) {
      viewContainerRef.current.innerHTML = '<h2>html 코드를 이용하여 만들어지는 View입니다.</h2>';
      viewContainerRef.current.innerHTML += htmlStr;
    }
  }, [htmlStr]);
  return (
    <CommunityEditorLayoutBlock>
      <StyledInput placeholder="제목을 입력해 주세요" />
      <EditorContainer>
        <Editor htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
      </EditorContainer>
      <div className="bottom_btn">
        <StyledButton lightBlue>등록</StyledButton>
      </div>
    </CommunityEditorLayoutBlock>
  );
};

const CommunityEditorLayoutBlock = styled.div`
  width: 100%;
  .bottom_btn {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: 62px;
  padding: 0 36px;
  border-radius: 14px;
  font-size: 16px;
  border: 1px solid ${colors.blue[2]};
  margin-bottom: 8px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 16px;
    color: ${colors.gray[3]};
  }

  ${media.tablet} {
    height: 58px;
    padding: 0 16px;
  }
`;
// style
const EditorContainer = styled.div`
  width: 100%;

  margin: 0 auto;

  .ql-toolbar {
    border: none;
    background-color: ${colors.gray[0]};
    border-radius: 8px;
    padding: 8px 36px;
    margin-bottom: 8px;
    .ql-formats {
      button {
        width: 40px;
        height: 40px;
        background-color: white;
        border: 1px solid ${colors.gray[2]};
        margin-right: 4px;
        position: relative;
        &::after {
          content: '';
          width: 20px;
          height: 20px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        &:nth-child(1) {
          &::after {
            width: 24px;
            height: 24px;
            background: url(${CameraDark.src}) no-repeat 50% / cover;
          }
          &:hover {
            &::after {
              width: 24px;
              height: 24px;
              background: url(${CameraBlue.src}) no-repeat 50% / cover;
            }
          }
        }
        &:nth-child(2) {
          &::after {
            background: url(${Bold[0].src}) no-repeat 50%;
          }
          &.ql-active {
            &::after {
              background: url(${Bold[1].src}) no-repeat 50%;
            }
          }
          &:hover {
            &::after {
              background: url(${Bold[1].src}) no-repeat 50%;
            }
          }
        }
        &:nth-child(3) {
          &::after {
            background: url(${Iteric[0].src}) no-repeat 50%;
          }
          &.ql-active {
            &::after {
              background: url(${Iteric[1].src}) no-repeat 50%;
            }
          }
          &:hover {
            &::after {
              background: url(${Iteric[1].src}) no-repeat 50%;
            }
          }
        }
        &:nth-child(4) {
          &::after {
            background: url(${UnderLine[0].src}) no-repeat 50%;
          }
          &.ql-active {
            &::after {
              background: url(${UnderLine[1].src}) no-repeat 50%;
            }
          }
          &:hover {
            &::after {
              background: url(${UnderLine[1].src}) no-repeat 50%;
            }
          }
        }
        &:nth-child(5) {
          &::after {
            background: url(${StrikeLine[0].src}) no-repeat 50%;
          }
          &.ql-active {
            &::after {
              background: url(${StrikeLine[1].src}) no-repeat 50%;
            }
          }
          &:hover {
            &::after {
              background: url(${StrikeLine[1].src}) no-repeat 50%;
            }
          }
        }
        &:nth-child(6) {
          &::after {
            background: url(${AlignLeft[0].src}) no-repeat 50%;
          }
          &.ql-active {
            &::after {
              background: url(${AlignLeft[1].src}) no-repeat 50%;
            }
          }
          &:hover {
            &::after {
              background: url(${AlignLeft[1].src}) no-repeat 50%;
            }
          }
        }
        &:nth-child(7) {
          &::after {
            background: url(${AlignCenter[0].src}) no-repeat 50%;
          }
          &.ql-active {
            &::after {
              background: url(${AlignCenter[1].src}) no-repeat 50%;
            }
          }
          &:hover {
            &::after {
              background: url(${AlignCenter[1].src}) no-repeat 50%;
            }
          }
        }
        &:nth-child(8) {
          &::after {
            background: url(${AlignRight[0].src}) no-repeat 50%;
          }
          &.ql-active {
            &::after {
              background: url(${AlignRight[1].src}) no-repeat 50%;
            }
          }
          &:hover {
            &::after {
              background: url(${AlignRight[1].src}) no-repeat 50%;
            }
          }
        }
        &:last-child {
          margin-right: 0;
        }
        svg {
          display: none;
        }
      }
    }
  }
  .ql-toolbar.ql-snow + .ql-container.ql-snow {
    border-top: 1px solid ${colors.blue[2]};
  }
  .ql-container {
    width: 100%;
    height: 561px;
    .ql-editor {
      padding: 24px 36px;
      &.ql-blank::before {
        left: 36px;
        font-style: normal;
        font-size: 16px;
        color: ${colors.gray[3]};
      }
    }
    border-radius: 14px;
    font-size: 1rem;
    border: 1px solid ${colors.blue[2]};
  }

  ${media.tablet} {
    .ql-toolbar {
      padding: 8px 16px;
      .ql-formats {
        button {
          width: 32px;
          height: 32px;
          background-color: white;
          border: 1px solid ${colors.gray[2]};
          margin-right: 4px;
          position: relative;
        }
      }
    }
    .ql-container {
      width: 100%;
      height: 561px;
      .ql-editor {
        padding: 16px;
        &.ql-blank::before {
          left: 16px;
          font-style: normal;
          font-size: 16px;
          color: ${colors.gray[3]};
        }
      }
      border-radius: 14px;
      font-size: 1rem;
      border: 1px solid ${colors.blue[2]};
    }
  }
`;

const StyledButton = styled(Button)`
  min-height: auto;
  width: 160px;
  height: 48px;

  ${media.tablet} {
    width: 100%;
  }
`;

export default CommunityEditor;
