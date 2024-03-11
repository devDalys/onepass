'use client';
import {CreateModalProps, ModalContext} from '@/providers/ModalProvider/ModalContext';
import {useState} from 'react';
import styles from './ModalProvider.module.scss';
import Cancel from '@/assets/images/Cancel.svg';

export const ModalProvider = ({children}: {children: React.ReactNode}) => {
  const [modal, setModal] = useState<CreateModalProps | null>(null);
  const createModal = (props: CreateModalProps) => {
    setModal(props);
  };
  const handleDelete = () => {
    setModal(null);
  };

  return (
    <ModalContext.Provider value={{createModal, hideModal: handleDelete}}>
      {modal?.title && (
        <div
          className={styles.wrapper}
          onClick={(event) => {
            if (event.target === event.currentTarget) handleDelete();
          }}
        >
          <div className={styles.modal}>
            <div className={styles.closeIcon} onClick={handleDelete}>
              <Cancel />
            </div>
            <span className={styles.title}>{modal.title}</span>
            {modal.children()}
          </div>
        </div>
      )}
      {children}
    </ModalContext.Provider>
  );
};
