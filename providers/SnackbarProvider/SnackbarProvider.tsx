'use client';

import {SnackbarContext} from '@/providers/SnackbarProvider/SnackbarContext';
import {Fragment, useEffect, useState} from 'react';
import styles from './Snackbar.module.scss';
import classNames from 'classnames';
import {v4} from 'uuid';
import Cancel from '@/assets/images/Cancel.svg';

const visibleTime = 3000;

type Snackbar = Record<string, {element: React.ReactNode; timer: ReturnType<typeof setTimeout>}>;

export const SnackbarProvider = ({children}: {children: React.ReactNode}) => {
  const [Snackbars, setSnackbars] = useState<Snackbar>({});

  useEffect(() => {
    document.body.style.setProperty('--snackbar-delay', visibleTime.toString() + 'ms');
  }, []);

  const handleHide = (id: string) => {
    setSnackbars((state) => {
      const activeSnacks = {...state};
      clearTimeout(activeSnacks[id]?.timer);
      delete activeSnacks[id];
      return activeSnacks;
    });
  };

  const generateSnackbar = (text: string, id: string) => {
    return (
      <div onClick={() => handleHide(id)} className={classNames(styles.snackbar)}>
        {text}
        <Cancel />
      </div>
    );
  };

  const showSnackbar = (text: string) => {
    const id = v4();
    console.log(Snackbars);
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
