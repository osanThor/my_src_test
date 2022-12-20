export type IModalType = IModalProps;
export type IFuncModalType = IFuncModalProps;
export type INotUserModalType = INotUserModalProps;
export type SelectExchangeModalType = SelectExchangeModalProps;
export type IThreeModalType = IThreeModalProps;

interface IModalProps {
  open: boolean;
  close: () => void;
  message: string;
  error: boolean;
}

interface IFuncModalProps {
  open: boolean;
  onClose: () => void;
  message: { title: string; description: string; btnTxt: string };
  dubBtn: boolean;
  onClick: () => void;
  onClick2: () => void;
}
interface IThreeModalProps {
  open: boolean;
  onClose: () => void;
  onClick: () => void;
}
interface INotUserModalProps {
  open: boolean;
  onClose: () => void;
}
interface SelectExchangeModalProps {
  open: boolean;
  onClose: () => void;
}
