export const metadata = {
  title: 'Quizzer',
  description: 'Quiz app migrated to Next.js 15 + React 19 + TypeScript',
};

import './globals.css';
import Providers from './providers';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
