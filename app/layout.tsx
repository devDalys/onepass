import './globals.css';
import type {Metadata} from 'next';
import {Bebas_Neue} from 'next/font/google';
import {Poppins} from 'next/font/google';
import {ThemeProvider} from '@/Providers/ThemeProvider';
import styles from './page.module.scss';
import classNames from 'classnames';
import Link from 'next/link';

const inter = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--bebas-neue',
  display: 'swap',
});
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--poppins',
});

export const metadata: Metadata = {
  title: 'One Pass',
  description: 'Единственный менеджер паролей, который вам когда-либо понадобится.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={classNames(inter.variable, poppins.variable)}>
        <ThemeProvider>
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
