import React from 'react';

export type IRegisterType = IRegisterState;

export interface IRegisterState {
  profileImg: string | null;
  verify: boolean;
  handleCheckNickname: () => void;
  handleReqVerify: () => void;
  handleClickOpen: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}
