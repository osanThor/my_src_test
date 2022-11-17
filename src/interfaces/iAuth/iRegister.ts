import React from 'react';

export type IRegisterType = IRegisterState;

export interface IRegisterState {
  profileImg: string | null;
  verify: boolean;
  existEmail: boolean;
  readOnlyEmail: boolean;
  setExistEmial: React.Dispatch<React.SetStateAction<boolean>>;
  handleCheckNickname: () => void;
  handleReqVerify: () => void;
  handleClickOpen: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  veriAble: boolean;
  ReadOnltVerify: boolean;
  timerErr: boolean;
  min: number | undefined;
  setTimerErr: React.Dispatch<React.SetStateAction<boolean>>;
  timerVisible: boolean;
  handleCheckVerify: () => void;
  pwError: boolean;
  pwErrMessage: string;
  handlePwBlur: () => void;
}
