import './globals.scss';
import type {Metadata} from 'next';
import {LOCAL_STORAGE_THEME_KEY, ThemeProvider} from '@/providers/ThemeProvider';
import styles from './page.module.scss';
import classNames from 'classnames';
import Link from 'next/link';
import {cookies} from 'next/headers';
import {Theme} from '@/providers/ThemeProvider/ThemeContext';
import localFont from 'next/font/local';
import favicon from './favicon.png';
import {SnackbarProvider} from '@/providers/SnackbarProvider/SnackbarProvider';
import Script from 'next/script';
import React from 'react';
import {ContextProvider} from '@/providers/ContextProvider/ContextProvider';
export const dynamic = 'force-dynamic';
export const revalidate = 1;

const inter = localFont({
  variable: '--play',
  display: 'swap',
  preload: true,
  src: [
    {
      path: '../assets/fonts/Play-Bold.ttf',
      weight: '700',
    },
    {
      path: '../assets/fonts/Play-Regular.ttf',
      weight: '400',
    },
  ],
});

export const metadata: Metadata = {
  title: 'One Pass',
  description: 'Единственный менеджер паролей, который вам когда-либо понадобится.',
  icons: {
    icon: favicon.src,
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const theme = cookies().get(LOCAL_STORAGE_THEME_KEY)?.value as Theme;
  return (
    <html lang="en">
      <Script src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js"></Script>
      <body className={classNames(inter.variable)}>
        <ThemeProvider initialTheme={theme}>
          <SnackbarProvider>
            <ContextProvider>
              <div className={'root'}>
                <Link href="/">
                  <div className={styles.logo}>
                    <span className={styles.stars}>
                      <p className={styles.stars__star}>*</p>
                      <p className={styles.stars__star}>*</p>
                      <p className={styles.stars__star}>*</p>
                    </span>
                    <span className={styles.line} />
                  </div>
                </Link>
                {children}
              </div>
            </ContextProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
