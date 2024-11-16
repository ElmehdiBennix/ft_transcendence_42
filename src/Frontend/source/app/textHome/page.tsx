'use client';
import { useState } from 'react';

import { Header } from '@/components/header';
import { RightBar } from '@/components/RightBar';
import { SideBar } from '@/components/SideBar';
export default function Home_TFA() {
  const [isActivated, setIsActivated] = useState(0);
  const [ShowRightBar, setShowRightBar] = useState(true);
  const [ShowsideBarIcons, setShowsideBarIcons] = useState(false);
  function handleRightClick(id: number) {
    console.log('id', id);
    if (id === 6 || id === 7) {
      setShowRightBar(false);
      setShowsideBarIcons(true);
    } else {
      setShowRightBar(true);
      setShowsideBarIcons(false);
    }
  }
  return (
    <div
      className={`tfa-card-bg grid h-screen w-screen overflow-auto p-8 ${
        ShowRightBar ? 'grid-cols-[repeat(12,_1fr)]' : 'grid-cols-[repeat(11,_1fr)]'
      } grid-rows-[repeat(9,_1fr)] gap-[8px]`}
    >
      <div className="row-[span_9_/_span_9] flex items-center justify-center bg-[1C1C1C]">
        <SideBar
          isActivated={isActivated}
          setIsActivated={setIsActivated}
          ShowSideBarIcon={ShowsideBarIcons}
          handleRightClick={handleRightClick}
        />
      </div>
      {ShowRightBar && (
        <div
          className={`${isActivated == 7 ? 'hidden' : 'flex'} col-start-12 row-[span_9_/_span_9] row-start-1 items-center justify-center bg-[1C1C1C] transition-all duration-300`}
        >
          <RightBar handleRightClick={handleRightClick} setIsActivated={setIsActivated} />
        </div>
      )}
      <div
        className={`${ShowRightBar ? 'col-span-10' : 'col-span-11'} col-start-2 row-start-1 flex items-center justify-start transition-all duration-300`}
      >
        <Header />
      </div>
      <div className="col-span-5 col-start-2 row-[span_8_/_span_8] row-start-2 bg-white">4</div>
      <div className="col-span-5 col-start-7 row-start-2 bg-white">5</div>
      <div className="col-span-5 col-start-7 row-start-3 bg-white">6</div>
      <div className="col-span-5 col-start-7 row-span-3 row-start-4 bg-white">7</div>
      <div className="col-span-5 col-start-7 row-span-3 row-start-7 bg-white">8</div>
    </div>
  );
}
