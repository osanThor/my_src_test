import colors from '@/src/assets/Colors';
import { GuidGoIcon, Like, ResetIcon } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { boardsActions } from '@/src/store/reducers';
import { media } from '@/styles/theme';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const BoardContents = ({
  identity,
  handleOpenDeleteBoard,
}: {
  identity: boolean;
  handleOpenDeleteBoard: () => void;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const ViewContentsRef = useRef<HTMLDivElement>(null);
  const { getBoardDone } = useSelector(({ boards }: RootState) => ({
    getBoardDone: boards.getBoardDone,
  }));
  const { id, title, content, user, hits, createdAt, _count } = getBoardDone;

  useEffect(() => {
    if (ViewContentsRef.current) {
      ViewContentsRef.current.innerHTML = content;
    }
  }, [content]);

  return (
    <BoardContentsBlock>
      <span className="board_spacer" />
      <div className="content_area">
        <div className="contents" ref={ViewContentsRef} />
        <div className="contents_ctrl">
          <div className="left">
            <div className="button">
              <div className="icon">
                <Image src={Like[0]} alt="like" />
              </div>
              <span className="count">{_count.likes}</span>
            </div>
          </div>
          <div className="right">
            {identity && (
              <>
                <div className="button" onClick={() => router.push('/community/modify')}>
                  수정하기
                </div>
                <div className="button" onClick={handleOpenDeleteBoard}>
                  삭제하기
                </div>
              </>
            )}
            <div
              className="button"
              onClick={() => {
                dispatch(boardsActions.getBoard({ boardId: id }));
              }}
            >
              <Image src={ResetIcon[1]} alt="reset" />
            </div>
          </div>
        </div>
      </div>
    </BoardContentsBlock>
  );
};

const BoardContentsBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  .board_spacer {
    min-width: 84px;
  }
  .content_area {
    flex: 1;
    max-width: 1420px;

    img {
      max-width: 100%;
    }
    .contents {
      margin-bottom: 80px;
      .ql-align-center {
        text-align: center;
      }
      .ql-align-right {
        text-align: right;
      }

      .ql-syntax {
        background-color: #23241f;
        color: #f8f8f2;
        border-radius: 3px;
        padding: 5px;
        margin: 0 10px;
      }
    }
    .contents_ctrl {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding-bottom: 12px;
      border-bottom: 1px solid ${colors.gray[2]};
      .left {
        .button {
          cursor: pointer;
          transition: all 0.2s;
          height: 36px;
          padding: 6px 8px;
          display: flex;
          align-items: center;
          border-radius: 18px;
          border: 1px solid ${colors.gray[1]};
          .icon {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            margin-right: 7px;
          }
          .count {
            min-width: 24px;
            display: flex;
            align-items: center;
            font-size: 12px;
            color: ${colors.gray[5]};
          }
          &:hover {
            background-color: ${colors.gray[2]};
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        .button {
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 16px;
          border-radius: 8px;
          height: 36px;
          margin-right: 16px;
          background-color: ${colors.gray[0]};
          &:hover {
            background-color: ${colors.gray[2]};
          }
          &:last-child {
            width: 36px;
            border-radius: 50%;
            padding: 0;
            margin-right: 0;
          }
        }
      }
    }
  }
  ${media.tablet} {
    .board_spacer {
      display: none;
    }
  }
`;

export default BoardContents;
