import '@/app/styles/global.css';
import Navbar from './components/Navbar';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Capifynext',
  description: 'Track your budget and balance with ease!',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
