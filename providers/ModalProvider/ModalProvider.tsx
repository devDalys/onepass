'use client';
import {CreateModalProps, ModalContext} from '@/providers/ModalProvider/ModalContext';
import {useCallback, useRef, useState} from 'react';
import styles from './ModalProvider.module.scss';
import Cancel from '@/assets/images/Cancel.svg';

const ANIMATION_NAMES = ['closeModalAnimation', 'closeMobileModalAnimation'];

export const ModalProvider = ({children}: {children: React.ReactNode}) => {
  const [modal, setModal] = useState<CreateModalProps | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);

  const handleDelete = () => {
    setModal(null);
    document.body.classList.remove(styles.hideScroll);
  };

  const createModal = (props: CreateModalProps) => {
    setModal(props);
    document.body.classList.add(styles.hideScroll);
  };

  const hideWithAnimation = () => {
    ref?.current?.classList.add(styles.closeAnimation);
  };

  const onTouch = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (
        closeRef.current === event.target &&
        ref.current &&
        event.touches[0].clientY - touchStart > 0
      ) {
        ref.current.style.transform = `translate3d(0,${Math.round(event.touches[0].clientY - touchStart)}px,0)`;
      }
    },
    [touchStart],
  );

  const onTouchEnd = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (ref.current && closeRef.current === event.target) {
        if (event.changedTouches[0].clientY * 0.75 >= touchStart) {
          hideWithAnimation();
        } else {
          ref.current.style.transform = `translate3d(0,0,0)`;
        }
      }
    },
    [touchStart],
  );

  const onTouchStart = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(event.touches[0].clientY);
  }, []);

  const onAnimationEnd = useCallback((event: React.AnimationEvent) => {
    return ANIMATION_NAMES.some((name) => event.animationName.includes(name)) && handleDelete();
  }, []);

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
            onTouchMove={onTouch}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className={styles.modal}
            ref={ref}
            onAnimationEnd={onAnimationEnd}
          >
            <div className={styles.mobileCloseLine} />
            <div className={styles.closeIcon} onClick={hideWithAnimation}>
              <Cancel />
            </div>
            <div className={styles.title} ref={closeRef}>
              {modal.title}
            </div>
            <div className={styles.childrenWrapper}>{modal.children()}</div>
          </div>
        </div>
      )}
      {children}
    </ModalContext.Provider>
  );
};
