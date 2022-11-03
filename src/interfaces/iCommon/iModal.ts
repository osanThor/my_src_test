export type IModalType = IModalProps;
export type IFuncModalType = IFuncModalProps;

interface IModalProps {
  open: boolean;
  close: () => void;
  message: string;
  error: boolean;
}

interface IFuncModalProps {
  open: boolean;
  onClose: () => void;
  message: { title: string; btnTxt: string };
  dubBtn: boolean;
  onClick: () => void;
}
