import './globals.scss';
import type {Metadata} from 'next';
import {Bebas_Neue} from 'next/font/google';
import {Poppins} from 'next/font/google';
import {LOCAL_STORAGE_THEME_KEY, ThemeProvider} from '@/Providers/ThemeProvider';
import styles from './page.module.scss';
import classNames from 'classnames';
import Link from 'next/link';
import {cookies} from 'next/headers';
import {Theme} from '@/Providers/ThemeProvider/ThemeContext';
import localFont from 'next/font/local';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const theme = cookies().get(LOCAL_STORAGE_THEME_KEY)?.value as Theme;

  return (
    <html lang="en">
      <body className={classNames(inter.variable)}>
        <ThemeProvider initialTheme={theme}>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
