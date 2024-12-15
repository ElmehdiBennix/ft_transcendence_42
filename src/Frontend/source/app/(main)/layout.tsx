'use client';

import '@/app/globals.css';
import { RightBar } from '@/components/RightBar';
import { SideBar } from '@/components/SideBar';
import { Header } from '@/components/header';
import { useAuth } from '@/context/AuthContext';
import { SideBarContext } from '@/context/SideBarContext';
import withAuth from '@/context/requireAhuth';
import { usePathname } from 'next/navigation';
import { ComponentType, useContext } from 'react';
import { SidebarLeft } from '@/components/ui/sidebar-left';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, updateUser } = useAuth();
  const { isActivated, setIsActivated } = useContext(SideBarContext);
  const handleRightClick = (id: number) => {
    setIsActivated(id);
  };
  // const usename = localStorage.getItem('user');
  // const otp_enabled = localStorage.getItem('otp-enabled');
  // const otp_validated = localStorage.getItem('otp-validated');

  // updateUser({
  //   username: usename && usename !== '' ? usename : '',
  //   is2FAEnabled: otp_enabled === 'True',
  //   is2FAvalidated: otp_validated === 'True',
  // });

  return (
    <div className="grid h-screen w-screen grid-cols-[repeat(11,_1fr)] grid-rows-[repeat(9,_1fr)] gap-[8px] overflow-hidden bg-linear-gradient lg:p-8 dark:bg-linear-gradient-dark pt-4">
      <div className="row-[span_9_/_span_9] grow items-start justify-center hidden lg:flex">
        <SideBar pathname={pathname} handleRightClick={handleRightClick} />
      </div>
      <div className="col-span-10 col-start-2 row-start-1 flex items-start justify-start pt-2 transition-all duration-300">
        <Header />
      </div>
      <div
        className={`${
          isActivated === 7 ||
          isActivated === 8 ||
          isActivated === 4 ||
          isActivated === 6 ||
          isActivated === 9 ||
          pathname === '/friends' ||
          pathname === '/LeaderBoard' ||
          pathname === '/Profile' ||
          pathname === '/MatchHistory' ||
          pathname === '/messages' ||
          pathname === '/settings'
            ? 'hidden'
            : 'flex'
        } col-start-12 row-[span_9_/_span_9] row-start-1 items-start justify-center transition-all duration-300 md:hidden lg:flex`}
      >
        <RightBar handleRightClick={handleRightClick} />
      </div>
      <SidebarProvider className="md:hidden flex overflow-hidden absolute">
        <SidebarLeft className=" bg-transparent" />
        <SidebarInset className=" bg-transparent">
          <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger className='size-[50px]'/>
            </div>
          </header>
        </SidebarInset>
      </SidebarProvider>
      {children}
    </div>
  );
}

export default withAuth(RootLayout as ComponentType<{}>, true);
