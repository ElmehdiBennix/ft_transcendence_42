/* eslint-disable @next/next/no-img-element */
/* eslint-disable tailwindcss/no-custom-classname */

"use client";
import { SideBarContext } from "@/context/SideBarContext";
import { useContext, useEffect, Suspense } from "react";
import { MapsCard, ModesCard } from "@/components/game/theme-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter, useSearchParams } from "next/navigation";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  EffectCoverflow,
  Autoplay,
  Pagination,
  Navigation,
} from "swiper/modules";
import React from "react";

const LoadingComponent = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div>Loading game arena...</div>
    </div>
  );
};

const MapsSwiper = ({ mode }: { mode: string }) => {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={2}
      spaceBetween={60}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      }}
      autoplay={true}
      pagination={{ el: ".swiper-pagination", clickable: true }}
      modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
      className="swiper-container flex h-[70%] w-full items-center justify-center py-4"
    >
      <SwiperSlide className="h-full w-1/3 overflow-visible">
        <MapsCard
          height="100px"
          imageUrl="/earth.png"
          title="Earth"
          description="earth could shake or make or fake"
          url={
            mode == "tournament"
              ? `/tournament?mode=${mode}&map=earth`
              : `/Game-Arena?mode=${mode}&map=earth`
          }
        />
      </SwiperSlide>
      <SwiperSlide className="h-full w-1/3 overflow-visible">
        <MapsCard
          height="100px"
          imageUrl="/air.png"
          title="Air"
          description="Air: The invisible killer we can not live without"
          url={
            mode == "tournament"
              ? `/tournament?mode=${mode}&map=air`
              : `/Game-Arena?mode=${mode}&map=air`
          }
        />
      </SwiperSlide>
      <SwiperSlide className="h-full w-1/3 overflow-visible">
        <MapsCard
          height="100px"
          imageUrl="/fire.png"
          title="Fire"
          description="Because sometimes, you just need to watch the world burn."
          url={
            mode == "tournament"
              ? `/tournament?mode=${mode}&map=fire`
              : `/Game-Arena?mode=${mode}&map=fire`
          }
        />
      </SwiperSlide>
      <SwiperSlide className="h-full w-1/3 overflow-visible">
        <MapsCard
          height="100px"
          imageUrl="/water.png"
          title="Water"
          description="The slippery element that makes sure your Pong ball never stays on course."
          url={
            mode == "tournament"
              ? `/tournament?mode=${mode}&map=water`
              : `/Game-Arena?mode=${mode}&map=water`
          }
        />
      </SwiperSlide>
    </Swiper>
  );
};

const GameModeSwiper = () => {
  return (
    <Swiper
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={2}
      spaceBetween={60}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      }}
      autoplay={true}
      pagination={{ el: ".swiper-pagination", clickable: true }}
      modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
      className="swiper-container flex max-h-full w-full items-center justify-center overflow-auto py-4 md:h-[70%]"
    >
      <SwiperSlide className="h-full w-1/3 overflow-visible">
        <ModesCard
          height="100px"
          title="Local One vs One"
          description="Challenge a friend in a local one-on-one game mode."
          url={`/games?mode=one-vs-one-local`}
          image={"/gameModes6.jpeg"}
        />
      </SwiperSlide>
      <SwiperSlide className="h-full w-1/3 overflow-visible">
        <ModesCard
          height="100px"
          title="Tournament"
          description="Compete against other players in a tournament-style game mode."
          url={`/games?mode=tournament`}
          image={"/gameModes7.jpeg"}
        />
      </SwiperSlide>
      <SwiperSlide className="h-full w-1/3 overflow-visible">
        <ModesCard
          height="100px"
          title="One Vs One"
          description="Enter the thrilling world of one-on-one competition against another player."
          url={`/games?mode=one-vs-one`}
          image={"/gameModes2.jpeg"}
        />
      </SwiperSlide>
      <SwiperSlide className="h-full w-1/3 overflow-visible">
        <ModesCard
          height="100px"
          title="Local One vs One"
          description="Challenge a friend in a local one-on-one game mode."
          url={`/games?mode=one-vs-one-local`}
          image={"/gameModes6.jpeg"}
        />
      </SwiperSlide>
      <SwiperSlide className="h-full w-1/3 overflow-visible">
        <ModesCard
          height="100px"
          title="Tournament"
          description="Compete against other players in a tournament-style game mode."
          url={`/games?mode=tournament`}
          image={"/gameModes7.jpeg"}
        />
      </SwiperSlide>
      <SwiperSlide className="h-full w-1/3 overflow-visible">
        <ModesCard
          height="100px"
          title="One Vs One"
          description="Enter the thrilling world of one-on-one competition against another player."
          url={`/games?mode=one-vs-one`}
          image={"/gameModes2.jpeg"}
        />
      </SwiperSlide>
    </Swiper>
  );
};

const Game_modesContent = () => {
  const { setIsActivated } = useContext(SideBarContext);
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const game_id = searchParams.get("game_id");
  const router = useRouter();
  useEffect(() => {
    if (game_id) {
      router.push(`/Game-Arena?mode=one-vs-one&map=earth&game_id=${game_id}`);
    }
  }, [game_id]);

  useEffect(() => {
    setIsActivated(2);
  }, []);

  if (game_id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex size-full flex-col px-3 py-2">
      <div className="z-10 mb-[-100px] flex h-[200px] items-center justify-center">
        <img src="/games-logo.svg" alt="" className="h-[200px] lg:h-[260px]" />
      </div>
      <div className="custom-inner-shadow costum-little-shadow relative flex h-full items-center overflow-hidden bg-black-crd md:rounded-[30px]">
        <div className="flex size-full items-center">
          {mode ? <MapsSwiper mode={mode} /> : <GameModeSwiper />}
        </div>
      </div>
    </div>
  );
};

const Game_modes = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <Game_modesContent />
    </Suspense>
  );
};

export default Game_modes;
