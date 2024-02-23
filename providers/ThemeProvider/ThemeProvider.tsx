'use client';
import React, {FC, useLayoutEffect, useMemo, useState} from 'react';
import {Theme, ThemeContext} from './ThemeContext';
import classNames from 'classnames';
import styles from './ThemeProvider.module.scss';
import {usePathname} from 'next/navigation';

const defaultTheme = Theme.DARK;

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: React.ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const {initialTheme, children} = props;
  const pathName = usePathname();
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      <div className={classNames(theme, styles.root)}>{children}</div>
    </ThemeContext.Provider>
  );
};
