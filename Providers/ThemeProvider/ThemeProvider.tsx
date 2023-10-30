'use client';
import React, {FC, useMemo, useState} from 'react';
import {LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext} from './ThemeContext';
import {FullScreenLoading} from '@/components/FullScreenLoading';
import classNames from 'classnames';
import styles from './ThemeProvider.module.scss';
import {getCookie} from 'cookies-next';

const defaultTheme = (getCookie(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.DARK;
interface ThemeProviderProps {
  initialTheme?: Theme;
  children: React.ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const {initialTheme, children} = props;

  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);
  const [isLoading, setIsLoading] = useState(true);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      <div className={classNames({[theme]: !isLoading}, styles.root)}>{children}</div>
    </ThemeContext.Provider>
  );
};
