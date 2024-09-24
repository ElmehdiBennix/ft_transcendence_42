/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { Inter, Coustard } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  // variable: '--font-Inter',
  weight: ['400', '700'],
});

const coustard = Coustard({
  subsets: ['latin'],
  weight: ['400', '900'],
  // variable: '--font-coustard',
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
    <div className="flex h-screen w-full items-end justify-center overflow-auto bg-[#13191D] md:items-center">
      <div className="z-0 flex h-[95%] w-full flex-col">
        <div className="z-10 mb-[-75px] flex h-[150px] w-full items-center justify-center md:mb-[-80px] lg:hidden">
          <img src="/landing-page-logo.svg" alt="logo" className="size-[150px] md:size-[200px]" />
        </div>
        <div className="flex size-full grow items-start justify-center lg:items-center">
          {/* the max/min with/height of the div under must be defined in the input and text bars of the form so this dive resizes itself based on the children  */}
          <div className="flex size-full min-w-[390px] md:size-[85%] md:h-auto md:max-h-[850px] md:min-h-[500px] md:max-w-[1100px]">
            {children}
            <div className="z-[1] order-2 hidden w-[500px] lg:flex lg:items-center">
              <img src="/logo.svg" alt="logo-shadow.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
