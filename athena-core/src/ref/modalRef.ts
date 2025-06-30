export type ModalType = 'success' | 'error' | 'info' | 'warning';

export interface ModalRefType {
  title: string;
  message: string;
  type?: ModalType;
}

interface ModalController {
  openModal: (params: ModalRefType) => void;
  closeModal: () => void;
}

export const modalRef: { current: ModalController | null } = {
  current: null,
};
