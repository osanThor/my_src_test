import colors from '@/src/assets/Colors';
import { RootState } from '@/src/store/configureStore';
import { media } from '@/styles/theme';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CustomSelect from './item/CustomSelect';

const MyBoardTab = () => {
  const router = useRouter();
  const { _count } = useSelector(({ user }: RootState) => ({
    _count: user._count,
  }));

  const { myWritenBoards, myComments, myLikes, myCollections, myInquiries } = useSelector(({ local }: RootState) => ({
    myWritenBoards: local.myWritenBoards,
    myComments: local.myComments,
    myLikes: local.myLikes,
    myCollections: local.myCollections,
    myInquiries: local.myInquiries,
  }));

  const { boards, comments } = _count;
  return (
    <MyBoardTabBlock>
      <div className="tabs">
        <div className={myWritenBoards ? 'button on' : 'button'} onClick={() => router.push('/mypage?state=boards')}>
          작성글 <span>{boards}</span>
        </div>
        <div
          className={myComments ? 'button on' : 'button'}
          onClick={() => router.push('/mypage?state=boards&board=comments')}
        >
          작성댓글 <span>{comments}</span>
        </div>
        <div
          className={myLikes ? 'button on' : 'button'}
          onClick={() => router.push('/mypage?state=boards&board=likes')}
        >
          좋아요한 글
        </div>
        <div
          className={myCollections ? 'button on' : 'button'}
          onClick={() => router.push('/mypage?state=boards&board=collections')}
        >
          컬렉션한 글
        </div>
        <div
          className={myInquiries ? 'button on' : 'button'}
          onClick={() => router.push('/mypage?state=boards&board=inquiries')}
        >
          1:1 문의
        </div>
      </div>
      {myInquiries || (
        <div className="selectCon">
          <CustomSelect place={'전체'} />
        </div>
      )}
    </MyBoardTabBlock>
  );
};
const MyBoardTabBlock = styled.div`
  width: 100%;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  .tabs {
    display: flex;
    overflow-x: auto;
  }

  .button {
    cursor: pointer;
    padding: 10px 12px;
    font-size: 14px;
    display: flex;
    color: ${colors.gray[4]};
    white-space: nowrap;
    span {
      margin-left: 8px;
    }
    &.on {
      color: ${colors.blue[2]};
    }
  }

  ${media.tablet} {
    margin-bottom: 20px;
    flex-wrap: wrap;
    & > div + div {
      margin-top: 8px;
    }
    .selectCon {
      width: 100%;
      display: flex;
      justify-content: end;
    }
  }
`;

export default MyBoardTab;
