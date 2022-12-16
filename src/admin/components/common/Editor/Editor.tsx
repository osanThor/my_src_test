import * as React from 'react';
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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { RangeStatic } from 'quill';
import { axiosInstance } from '@/src/store/api';
import colors from '@/src/assets/Colors';
import { media } from '@/styles/theme';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/configureStore';
import { useRouter } from 'next/router';

interface IEditor {
  onChange: (val: string) => void;
}

const Editor: React.FC<IEditor> = ({ onChange }) => {
  const router = useRouter();
  const quillRef = React.useRef(null);
  const { strateContent } = useSelector(({ adminStrategies }: RootState) => ({
    strateContent: adminStrategies.content,
  }));
  const { baordContent } = useSelector(({ adminBoards }: RootState) => ({
    baordContent: adminBoards.createAdminNotice?.content,
  }));
  const { guideContent } = useSelector(({ adminCustomers }: RootState) => ({
    guideContent: adminCustomers.createGuide?.content,
  }));
  const [isStrategy, setIsStrategy] = React.useState(false);
  const [isBoard, setIsBoard] = React.useState(false);
  const [isGuide, setIsGuide] = React.useState(false);

  React.useEffect(() => {
    if (router.pathname === '/admin/strategies/write' || router.pathname === '/admin/strategies/strategy') {
      setIsStrategy(true);
    } else {
      setIsStrategy(false);
    }

    if (router.pathname === '/admin/boards/write_notice' || router.pathname === '/admin/boards/notice') {
      setIsBoard(true);
    } else {
      setIsBoard(false);
    }

    if (router.pathname === '/admin/customers/write_guide') {
      setIsGuide(true);
    } else {
      setIsGuide(false);
    }
  }, [router]);

  // 이미지 업로드 핸들러, modules 설정보다 위에 있어야 정상 적용
  const imageHandler = () => {
    // file input 임의 생성
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.gif, .jpg, .png');
    input.click();

    input.onchange = async () => {
      const file = input.files;
      const formData = new FormData();

      if (file) {
        formData.append('files', file[0]);
      }

      // file 데이터 담아서 서버에 전달하여 이미지 업로드
      const res = await axiosInstance.post(`/admin/uploads/files?zone=BOARD`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (quillRef.current) {
        // 현재 Editor 커서 위치에 서버로부터 전달받은 이미지 불러오는 url을 이용하여 이미지 태그 추가
        const index = (quillRef.current.getEditor().getSelection() as RangeStatic).index;

        const quillEditor = quillRef.current.getEditor();
        quillEditor.setSelection(index, 1);

        quillEditor.clipboard.dangerouslyPasteHTML(index, `<img src=${res.data.urls[0]} alt=${'alt text'} />`);
      }
    };
  };

  // useMemo를 사용하지 않고 handler를 등록할 경우 타이핑 할때마다 focus가 벗어남
  const modules = React.useMemo(
    () => ({
      toolbar: {
        // container에 등록되는 순서대로 tool 배치
        container: [
          ['image', 'bold', 'italic', 'underline', 'strike', { align: '' }, { align: 'center' }, { align: 'right' }], // 링크, 이미지, 비디오 업로드 설정
        ],

        // custom 핸들러 설정
        handlers: {
          image: imageHandler, // 이미지 tool 사용에 대한 핸들러 설정
          contenteditable: 'true',
        },
      },
    }),
    [],
  );

  // toolbar에 사용되는 tool format
  const formats = [
    'image',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'formula',
    'list',
    'bullet',
    'indent',
    'align',
    'color',
    'background',
  ];

  return (
    <EditorContainer>
      {isStrategy && (
        <CustomReactQuill
          ref={quillRef}
          theme="snow"
          modules={modules}
          formats={formats}
          value={strateContent}
          placeholder="내용을 입력하세요."
          onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
        />
      )}
      {isBoard && (
        <CustomReactQuill
          ref={quillRef}
          theme="snow"
          modules={modules}
          formats={formats}
          value={baordContent}
          placeholder="내용을 입력하세요."
          onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
        />
      )}
      {isGuide && (
        <CustomReactQuill
          ref={quillRef}
          theme="snow"
          modules={modules}
          formats={formats}
          value={guideContent}
          placeholder="내용을 입력하세요."
          onChange={(content, delta, source, editor) => onChange(editor.getHTML())}
        />
      )}
    </EditorContainer>
  );
};

export default Editor;

// style
const CustomReactQuill = styled(ReactQuill)`
  height: auto;
  margin-bottom: 20px;
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
    border-top: 1px solid ${colors.blue[2]} !important;
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
    font-size: 16px;
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
      font-size: 16px;
      border: 1px solid ${colors.blue[2]};
    }
  }
`;
