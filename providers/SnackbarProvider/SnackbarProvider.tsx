'use client';

import {snackbarContext} from '@/providers/SnackbarProvider/SnackbarContext';
import {useRef, useState} from 'react';
import styles from './Snackbar.module.scss';
import classNames from 'classnames';

const visibleTime = 3000;

export const SnackbarProvider = ({children}: {children: React.ReactNode}) => {
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<any>();

  const showSnackbar = (text: string) => {
    if (!isVisible) {
      setText(text);
      setIsVisible(true);
      ref.current = setTimeout(() => {
        setIsVisible(false);
        clearTimeout(ref.current);
      }, visibleTime);
    }
  };

  return (
    <snackbarContext.Provider value={{showSnackbar}}>
      <div className={classNames(styles.snackbar, {[styles.snackBarvisible]: isVisible})}>
        {text}
      </div>
      {children}
    </snackbarContext.Provider>
  );
};
