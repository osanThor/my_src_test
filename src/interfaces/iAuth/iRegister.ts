export type IRegisterType = IRegisterState;

export interface IRegisterState {
  email: string | null;
  pw: string | null;
  nickname: string | null;
  photoUrl: string | null;
  profileImg: string | null;
  handleClickOpen: () => void;
  onChange: (e: any) => void;
  onSubmit: (e: any) => void;
}
