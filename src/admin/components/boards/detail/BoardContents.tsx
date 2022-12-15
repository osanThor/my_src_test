import colors from '@/src/assets/Colors';
import { Like, MoreInfoIcon, ResetIcon } from '@/src/assets/Images';
import { RootState } from '@/src/store/configureStore';
import { adminBoardsActions, boardsActions } from '@/src/store/reducers';
import { media } from '@/styles/theme';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const BoardContents = ({ handleSetBoardLike }: { handleSetBoardLike: () => void }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const ViewContentsRef = useRef<HTMLDivElement>(null);
  const { getAdminBoardDetailResult } = useSelector(({ adminBoards }: RootState) => ({
    getAdminBoardDetailResult: adminBoards.getAdminBoardDetailResult,
  }));

  useEffect(() => {
    if (getAdminBoardDetailResult?.content) {
      if (ViewContentsRef.current) {
        ViewContentsRef.current.innerHTML = getAdminBoardDetailResult?.content;
      }
    }
  }, [getAdminBoardDetailResult, getAdminBoardDetailResult?.content]);

  const [isMoCntrl, setIsMoCtrl] = useState(false);
  const MoCtrlRef = useRef<HTMLDivElement>(null);
  const MoCtrlButtonRef = useRef<HTMLDivElement>(null);
  const handleMoCtrlWin = () => {
    setIsMoCtrl(!isMoCntrl);
  };
  const handleClickOutSide = (e: any) => {
    if (isMoCntrl && !MoCtrlRef.current.contains(e.target)) {
      if (!MoCtrlButtonRef.current.contains(e.target)) {
        handleMoCtrlWin();
      }
    }
  };
  useEffect(() => {
    if (isMoCntrl) document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });
  return (
    <BoardContentsBlock>
      <span className="board_spacer" />
      <div className="content_area">
        <div className="contents" ref={ViewContentsRef} />
        <div className="contents_ctrl">
          <div className="left">
            <div className="button" onClick={handleSetBoardLike}>
              <div className="icon">
                <Image src={Like[0]} alt="like" />
              </div>
              <span className="count">{getAdminBoardDetailResult?._count.likes}</span>
            </div>
          </div>
          <div className="right">
            <div
              className="button resized"
              onClick={() => {
                dispatch(adminBoardsActions.getAdminBoardComments({ boardId: getAdminBoardDetailResult?.id }));
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
          position: relative;
          &:hover {
            background-color: ${colors.gray[2]};
          }
          &.ver_mo {
            display: none;
          }
          &.resized {
            width: 36px;
            border-radius: 50%;
            padding: 0;
          }
          &:last-child {
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
    .content_area {
      .contents {
        margin-bottom: 40px;
      }
      .contents_ctrl {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-bottom: 12px;
        border-bottom: 1px solid ${colors.gray[2]};
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
            &.ver_pc {
              display: none;
            }
            &.ver_mo {
              display: flex;
            }

            .board_mo_ctrl {
              position: absolute;
              top: 100%;
              width: 88px;
              background-color: ${({ theme }) => theme.bgColor};
              box-shadow: ${({ theme }) => theme.boxShadow};
              border-radius: 8px;
              padding: 12px 6px;
              z-index: 7;
              .button {
                width: 100%;
                padding: 0;
                background-color: ${({ theme }) => theme.bgColor};
              }
            }
          }
        }
      }
    }
  }
`;

export default BoardContents;
