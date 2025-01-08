import type { Metadata } from 'next';
import { Days_One, Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';
import { SideBarProvider } from '@/context/SideBarContext';
import { GameProvider } from '@/context/GameContext';
import { UserProvider } from '@/context/GlobalContext';

const dayson = Days_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dayson",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${dayson.variable} ${poppins.variable}`}>
        <UserProvider>
          <GameProvider>
            <SideBarProvider>
              <Providers>{children}</Providers>
              <Toaster />
            </SideBarProvider>
          </GameProvider>
        </UserProvider>
      </body>
    </html>
  );
}
