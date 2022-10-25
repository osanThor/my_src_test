import { axiosInstance } from ".";

import type { LoadPostsBody, LoadPostsResponse } from "../types";

// 모든 게시글들 요청
export const apiLoadPosts = ({ lastId, limit }: LoadPostsBody) =>
  axiosInstance.get<LoadPostsResponse>(
    `/posts?lastId=${lastId}&limit=${limit}`
  );
