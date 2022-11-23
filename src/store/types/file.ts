import type { ResponseData, ResponseStatus } from '.';

export type LoadFileBody = {
  file: string | null;
};

export type LoadFileResponse = {
  message: string | null;
  urls: string | null;
};
