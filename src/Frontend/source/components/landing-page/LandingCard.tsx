/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable @next/next/no-img-element */
'use client';
import { MdLanguage } from 'react-icons/md';
import { MyButton } from '@/components/generalUi/Button';
import Card from '@/components/generalUi/Card';
const LandingCard = () => {
  return (
    <div className="z-[2] flex  size-full flex-col items-start justify-start overflow-auto md:items-center md:justify-start">
      <div className="z-[3] mb-[-100px] flex h-[280px] w-full min-w-[400px] items-end justify-center md:mb-[-120px]">
        <img
          src="/landing-page-dark-logo.svg"
          alt="logo"
          className="hidden size-[200px] md:size-[235px] lg:size-[250px] dark:block"
        />
        <img
          src="/landing-page-logo.svg"
          alt="logo"
          className="size-[200px] md:size-[235px] lg:size-[250px] dark:hidden"
        />
      </div>
      <Card
        className="size-full h-[90%] min-h-[500px] min-w-[400px]
        md:h-auto md:w-[90%] md:max-w-[1200px] md:rounded-b-[30px]"
      >
        <div className="flex h-[95%] w-full items-center justify-center">
          {/* left side */}
          <div className="flex size-full flex-col items-center justify-center gap-10 px-10 py-20 md:gap-4 lg:w-3/4 lg:pr-0 ">
            <div className="absolute left-0 top-0 h-1/6 w-full p-2 md:relative">
              <MdLanguage className="bg-secondary costum-little-shadow size-[50px] rounded-md p-2 text-white md:size-[65px]" />
            </div>
            <h1 className="font- text-[40px] font-black leading-tight text-[rgb(0,0,0,0.7)] md:text-[50px] dark:text-white">
              Start your own hallucinating ping pong journey
            </h1>
            <p className="font-poppins text-[20px] font-semibold text-[rgb(0,0,0,0.5)] md:text-[26px] dark:text-[rgb(255,255,255,0.5)]">
              welcome to PiPo lorem ipsum ipsum lorem hehe makayn maytgal
            </p>
            <div className="flex w-full items-center justify-start md:h-1/6">
              {/* to replace with button */}
              <MyButton route="/auth/login">Explore</MyButton>
            </div>
          </div>
          {/* right side */}
          <div className="hidden w-2/4 items-center justify-center lg:flex">
            <img src="/racket.svg" alt="racket" className="h-fit w-[90%]" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LandingCard;
