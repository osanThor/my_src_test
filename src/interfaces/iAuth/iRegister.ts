import React from 'react';

export type IRegisterType = IRegisterState;

export interface IRegisterState {
  email: string | null;
  pw: string | null;
  nickname: string | null;
  photoUrl: string | null;
  profileImg: string | null;
  checkNicknameResult: boolean;
  handleClickOpen: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}
