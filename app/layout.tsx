import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/app/context/theme-context';
import { fontSans } from './fonts/fonts';

export const metadata: Metadata = {
  title: 'Carro GPT',
  description: 'AI Assistant for Carro',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans} bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100`}>
        {/* <ThemeProvider> */}
          {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
