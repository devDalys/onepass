'use client';

import {SnackbarContext} from '@/providers/SnackbarProvider/SnackbarContext';
import {Fragment, useEffect, useState} from 'react';
import styles from './Snackbar.module.scss';
import classNames from 'classnames';
import {v4} from 'uuid';
import Cancel from '@/assets/images/Cancel.svg';

const VISIBLE_TIME = 3000;
const ERROR_VISIBLE_TIME = 4500;

type Snackbar = Record<string, React.ReactNode>;
const PROGRESS_ANIMATION_NAME = 'progressAnimation';

export const SnackbarProvider = ({children}: {children: React.ReactNode}) => {
  const [Snackbars, setSnackbars] = useState<Snackbar>({});

  useEffect(() => {
    document.body.style.setProperty('--snackbar-delay', VISIBLE_TIME.toString() + 'ms');
    document.body.style.setProperty('--snackbar-error-delay', ERROR_VISIBLE_TIME.toString() + 'ms');
  }, []);

  const handleHide = (id: string) => {
    setSnackbars((state) => {
      const activeSnacks = {...state};
      delete activeSnacks[id];
      return activeSnacks;
    });
  };

  const generateSnackbar = (text: string, id: string, isError = false) => {
    return (
      <div
        onClick={() => handleHide(id)}
        className={classNames(styles.snackbar, {[styles.withError]: isError})}
        onAnimationEnd={(e) => {
          if (e.animationName.includes(PROGRESS_ANIMATION_NAME)) {
            handleHide(id);
          }
        }}
      >
        {text}
        <Cancel />
      </div>
    );
  };

  const showSnackbar = (text: string, isError?: boolean) => {
    const id = v4();
    if (Object.keys(Snackbars).length >= 5) return false;
    setSnackbars({
      ...Snackbars,
      [id]: generateSnackbar(text, id, isError),
    });
  };

  return (
    <SnackbarContext.Provider value={{showSnackbar}}>
      <div className={styles.snackbarWrapper}>
        {Object.entries(Snackbars).map(([key, element]) => (
          <Fragment key={key}>{element}</Fragment>
        ))}
      </div>
      {children}
    </SnackbarContext.Provider>
  );
};
