export type IModalType = IModalProps;

interface IModalProps {
  open: boolean;
  close: () => void;
  message: string;
  error: boolean;
}
