export type ILoginType = ILoginSate | ILoginSubmit;

export interface ILoginSate {
  email: string | null;
  pw: string | null;
}

export interface ILoginSubmit {
  email: string | null;
  pw: string | null;
  onChange: (e: any) => void;
  onSubmit: (e: any) => void;
}
