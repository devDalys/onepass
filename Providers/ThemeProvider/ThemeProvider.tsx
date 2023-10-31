'use client';
import React, {FC, useMemo, useState} from 'react';
import {Theme, ThemeContext} from './ThemeContext';
import classNames from 'classnames';
import styles from './ThemeProvider.module.scss';

const defaultTheme = Theme.DARK;

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: React.ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const {initialTheme, children} = props;

  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      <div className={classNames(theme, styles.root)}>{children}</div>
    </ThemeContext.Provider>
  );
};
