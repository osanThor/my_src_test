import type { ResponseData, ResponseStatus } from ".";

// 모든 게시글들 정보 로드 요청/응답 타입
export type LoadPostsBody = {
  lastId: number;
  limit: number;
};
export type LoadPostsResponse = ResponseStatus & {
  data: ResponseData & {
    limit: number;
    posts: IPostWithPhotoAndCommentAndLikerAndCount[]; // "IPostWithPhotoAndCommentAndLikerAndCount"는 게시글 타입
  };
};
