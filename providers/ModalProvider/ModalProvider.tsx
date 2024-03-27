'use client';
import {CreateModalProps, ModalContext} from '@/providers/ModalProvider/ModalContext';
import {useCallback, useRef, useState} from 'react';
import styles from './ModalProvider.module.scss';
import Cancel from '@/assets/images/Cancel.svg';

const ANIMATION_NAMES = ['closeModalAnimation', 'closeMobileModalAnimation'];
const TRANSFORM_POSITIONS = {
  fullTop: 'translate3d(0,0,0)',
  middle: 'translate3d(0,50%,0)',
};

export const ModalProvider = ({children}: {children: React.ReactNode}) => {
  const [modal, setModal] = useState<CreateModalProps | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [currentTop, setCurrentTop] = useState(0);
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
      const translateTop = currentTop + Math.round(event.touches[0].clientY - touchStart);
      if (closeRef.current === event.target && ref.current && translateTop > 0) {
        ref.current.style.transform = `translate3d(0,${translateTop}px,0)`;

        if (childrenRef.current) {
          const height = window.innerHeight - childrenRef.current.getBoundingClientRect().top;
          console.log(height);
          childrenRef.current.style.maxHeight = `${height}px`;
        }
      }
    },
    [currentTop, touchStart],
  );

  const onTouchEnd = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (ref.current && closeRef.current === event.target) {
        const currentTop =
          ((event.changedTouches[0].clientY - touchStart) / window.innerHeight) * 100;
        //Высчитывает сколько процентов экрана пролистано от НАЖАТИЯ до ОТПУСКАНИЯ
        ref?.current?.classList.remove(styles.stopTransition);

        if (currentTop <= -15) {
          //Кейс когда потянули вверх больше чем на 15% viewport и раскрыть на фулл экран
          childrenRef.current ? (childrenRef.current.style.maxHeight = '100%') : null;
          return (ref.current.style.transform = TRANSFORM_POSITIONS.fullTop);
        }
        if (currentTop >= 15) {
          //Кейс когда потянули вниз больше чем на 15% viewport и нужно скрыть
          return hideWithAnimation();
        }
        //Если недоскроллили сверху - вернуть вверх, иначе означает что скроллят по центру и вернуть в центр
        const isTopScrolling = (touchStart / window.innerHeight) * 100 < 15;
        if (isTopScrolling) {
          return (ref.current.style.transform = TRANSFORM_POSITIONS.fullTop);
        } else {
          childrenRef.current ? (childrenRef.current.style.maxHeight = '35%') : null;
          return (ref.current.style.transform = TRANSFORM_POSITIONS.middle);
        }
      }
    },
    [touchStart],
  );

  const onTouchStart = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    ref.current && setCurrentTop(ref.current.getBoundingClientRect().top);
    setTouchStart(event.touches[0].clientY);
    ref?.current?.classList.add(styles.stopTransition);
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
            <div ref={childrenRef} className={styles.childrenWrapper}>
              {modal.children()}
            </div>
          </div>
        </div>
      )}
      {children}
    </ModalContext.Provider>
  );
};
