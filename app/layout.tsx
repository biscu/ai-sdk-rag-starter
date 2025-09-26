import type { Metadata } from 'next';
import './globals.css';
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
      <body className={`${fontSans} bg-white text-gray-900`}>
          {children}
      </body>
    </html>
  );
}
