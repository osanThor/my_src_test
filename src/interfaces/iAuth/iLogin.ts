export type ILoginType = ILoginSate | ILoginSubmit;

export interface ILoginSate {
  email: string | null;
  pw: string | null;
}

export interface ILoginSubmit {
  email: string | null;
  pw: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoLogin: boolean;
  handleAutoLogin: () => void;
  onSubmit: (e: React.FormEvent) => void;
}
