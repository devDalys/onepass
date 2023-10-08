import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {ThemeProvider} from "@/Providers/ThemeProvider";
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'One Pass',
  description: 'Единственный менеджер паролей, который вам когда-либо понадобится.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
              <ThemeProvider>
                  {children}
              </ThemeProvider>
      </body>
    </html>
  )
}
