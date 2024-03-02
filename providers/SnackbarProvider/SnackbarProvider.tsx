'use client';

import {SnackbarContext} from '@/providers/SnackbarProvider/SnackbarContext';
import {Fragment, useEffect, useState} from 'react';
import styles from './Snackbar.module.scss';
import classNames from 'classnames';

const visibleTime = 3000;

type Snackbar = Record<number, {element: React.ReactNode; timer: ReturnType<typeof setTimeout>}>;

export const SnackbarProvider = ({children}: {children: React.ReactNode}) => {
  const [Snackbars, setSnackbars] = useState<Snackbar>({});

  useEffect(() => {
    document.body.style.setProperty('--snackbar-delay', visibleTime.toString() + 'ms');
  }, []);

  const handleHide = (id: number) => {
    setSnackbars((state) => {
      const activeSnacks = {...state};
      clearTimeout(activeSnacks[id].timer);
      delete activeSnacks[id];
      return activeSnacks;
    });
  };

  const generateSnackbar = (text: string, id: number) => {
    return (
      <div onClick={() => handleHide(id)} className={classNames(styles.snackbar)}>
        {text}
      </div>
    );
  };

  const showSnackbar = (text: string) => {
    const id = Date.now();
    if (Object.keys(Snackbars).length >= 5) return false;
    setSnackbars({
      ...Snackbars,
      [id]: {
        element: generateSnackbar(text, id),
        timer: setTimeout(() => {
          handleHide(id);
        }, visibleTime),
      },
    });
  };

  return (
    <SnackbarContext.Provider value={{showSnackbar}}>
      <div className={styles.snackbarWrapper}>
        {Object.entries(Snackbars).map(([key, item]) => (
          <Fragment key={key}>{item.element}</Fragment>
        ))}
      </div>
      {children}
    </SnackbarContext.Provider>
  );
};
