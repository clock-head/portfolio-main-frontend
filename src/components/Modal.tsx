import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
} from 'react';
import './Modal.css';
import { modalRef, ModalRefType } from 'athena-core/ref/modalRef';

// export interface ModalRefType {
//   title: string;
//   message: string;
//   type?: 'success' | 'error' | 'info' | 'warning';
// }

export interface ModalController {
  openModal: (params: ModalRefType) => void;
  closeModal: () => void;
}

const Modal = forwardRef<ModalController>((_, ref) => {
  // Determine the modal styling based on type

  const [visible, setVisible] = useState(false);
  const [modalProps, setModalProps] = useState<ModalRefType>({
    title: '',
    message: '',
    type: 'info',
  });

  const openModal = useCallback((params: ModalRefType) => {
    setModalProps(params);
    setVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  if (!visible) return null;

  // const modalTitle =
  //   modalProps.type === 'success'
  //     ? 'Success'
  //     : modalProps.type === 'error'
  //     ? 'Error'
  //     : modalProps.type === 'warning'
  //     ? 'Warning'
  //     : modalProps.type === 'info'
  //     ? 'Info'
  //     : '';
  const color =
    modalProps.type === 'error'
      ? '#ff4d4f'
      : modalProps.type === 'warning'
      ? '#ffa940'
      : '#2edffa';

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 style={{ color: color }}>{modalProps.title}</h3>
        <p>{modalProps.message}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
});

export default Modal;
