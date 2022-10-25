import type { ResponseData, ResponseStatus } from ".";

// 모든 게시글들 정보 로드 요청/응답 타입
export type LoadTestBody = {
  lastId: number;
  limit: number;
};
export type LoadTestResponse = ResponseStatus & {
  data: ResponseData & {
    limit: number;
  };
};
