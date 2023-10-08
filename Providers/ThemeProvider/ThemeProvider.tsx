'use client'
import React, {FC, useEffect, useMemo, useState} from 'react';
import {LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext} from './ThemeContext';
import {FullScreenLoading} from "@/Providers/FullScreenLoading";

let defaultTheme: Theme;

if (typeof window !== 'undefined') {
    defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.DARK;
}

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: React.ReactNode
}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
    const {
        initialTheme,
        children,
    } = props;

    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);
    const [isLoading, setIsLoading] = useState(true)

    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsLoading(false)
        }
    }, [])

    return (
        <ThemeContext.Provider value={defaultProps}>
            {isLoading && <FullScreenLoading />}
            <div className={isLoading ? '' : theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

