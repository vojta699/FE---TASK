export interface ConfirmModalProps {
  show: boolean;
  title: string;
  body: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}