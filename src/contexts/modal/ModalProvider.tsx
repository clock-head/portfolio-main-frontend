import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { modalRef } from 'athena-core/ref/modalRef';

type ModalState = {
  title: string;
  message: string;
  type?: 'error' | 'warning' | 'info';
} | null;

interface ModalContextType {
  modalState: ModalState;
  openModal: (props: Exclude<ModalState, null>) => void;
  closeModal: () => void;
}

const defaultContext: ModalContextType = {
  modalState: null,
  openModal: () => {},
  closeModal: () => {},
};

export const ModalContext = createContext<ModalContextType>(defaultContext);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>(null);

  const openModal = ({
    title,
    message,
    type = 'error',
  }: Exclude<ModalState, null>) => {
    setModalState({ type, title, message });
  };

  const closeModal = () => setModalState(null);

  useEffect(() => {
    modalRef.current = {
      openModal,
      closeModal,
    };
  }, []);

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
export const useModal = () => useContext(ModalContext);
