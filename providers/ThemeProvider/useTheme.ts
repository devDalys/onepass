'use client';
import {useContext} from 'react';
import {Theme, ThemeContext} from './ThemeContext';
import {setCookie} from 'cookies-next';
import {LOCAL_STORAGE_THEME_KEY} from '@/providers/ThemeProvider/index';

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

export function useTheme(): UseThemeResult {
  const {theme, setTheme} = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    setTheme?.(newTheme);
    setCookie(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return {
    theme: theme || Theme.DARK,
    toggleTheme,
  };
}
