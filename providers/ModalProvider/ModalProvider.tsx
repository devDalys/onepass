'use client';
import {CreateModalProps, ModalContext} from '@/providers/ModalProvider/ModalContext';
import {useRef, useState} from 'react';
import styles from './ModalProvider.module.scss';
import Cancel from '@/assets/images/Cancel.svg';

const ANIMATION_NAMES = ['closeModalAnimation', 'closeMobileModalAnimation'];

export const ModalProvider = ({children}: {children: React.ReactNode}) => {
  const [modal, setModal] = useState<CreateModalProps | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const createModal = (props: CreateModalProps) => {
    setModal(props);
  };

  const hideWithAnimation = () => {
    ref?.current?.classList.add(styles.closeAnimation);
  };

  const handleDelete = () => {
    setModal(null);
    ref.current?.classList.remove(styles.closeAnimation);
  };

  return (
    <ModalContext.Provider value={{createModal, hideModal: hideWithAnimation}}>
      {modal?.title && (
        <div
          className={styles.wrapper}
          onClick={(event) => {
            if (event.target === event.currentTarget) hideWithAnimation();
          }}
        >
          <div
            className={styles.modal}
            ref={ref}
            onAnimationEnd={(event) => {
              return (
                ANIMATION_NAMES.some((name) => event.animationName.includes(name)) && handleDelete()
              );
            }}
          >
            <div className={styles.closeIcon} onClick={hideWithAnimation}>
              <Cancel />
            </div>
            <div className={styles.title}>{modal.title}</div>
            <div className={styles.childrenWrapper}>{modal.children()}</div>
          </div>
        </div>
      )}
      {children}
    </ModalContext.Provider>
  );
};
