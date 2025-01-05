import type { Metadata } from 'next';
import { Days_One, Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';
import { SideBarProvider } from '@/context/SideBarContext';

const dayson = Days_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dayson',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true} className={`${dayson.variable} ${poppins.variable}`}>
        <SideBarProvider>
          <Providers>{children}</Providers>
          <Toaster />
        </SideBarProvider>
      </body>
    </html>
  );
}
