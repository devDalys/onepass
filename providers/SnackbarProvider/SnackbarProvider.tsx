'use client';

import {snackbarContext} from '@/providers/SnackbarProvider/SnackbarContext';
import {useEffect, useRef, useState} from 'react';
import styles from './Snackbar.module.scss';
import classNames from 'classnames';

const visibleTime = 3000;

export const SnackbarProvider = ({children}: {children: React.ReactNode}) => {
  const [text, setText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<any>();

  useEffect(() => {
    document.body.style.setProperty('--snackbar-delay', visibleTime.toString() + 'ms');
  }, []);

  const showSnackbar = (text: string) => {
    if (!isVisible) {
      setText(text);
      setIsVisible(true);
      ref.current = setTimeout(() => {
        setIsVisible(false);
        setText('');
        clearTimeout(ref.current);
      }, visibleTime);
    }
  };

  const handleHide = () => {
    setIsVisible(false);
    setText('');
    clearTimeout(ref.current);
  };

  return (
    <snackbarContext.Provider value={{showSnackbar}}>
      <div
        onClick={handleHide}
        className={classNames(styles.snackbar, {[styles.snackBarvisible]: isVisible})}
      >
        {text}
      </div>
      {children}
    </snackbarContext.Provider>
  );
};
