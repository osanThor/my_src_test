import type { ResponseData, ResponseStatus } from '.';

export type LoadFileBody = {
  file: string | null;
};
export type LoadFileResponse = ResponseStatus & {
  data: string;
};
