'use client';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext} from './ThemeContext';
import {FullScreenLoading} from '../../components/FullScreenLoading';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import styles from './ThemeProvider.module.scss';
let defaultTheme: Theme;

if (typeof window !== 'undefined') {
  defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.DARK;
}

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoading(false);
    }
  }, []);

  return (
    <ThemeContext.Provider value={defaultProps}>
      <div className={classNames({[theme]: !isLoading}, styles.root)}>
        {isLoading && <FullScreenLoading />}
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// export const ThemeProvider = dynamic(() => Promise.resolve(Component), {ssr: true});
