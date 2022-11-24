import type { ResponseData, ResponseStatus } from '.';

export type LoadFileBody = FormData;

export type LoadFileResponse = {
  message: string | null;
  url: string | null;
};
