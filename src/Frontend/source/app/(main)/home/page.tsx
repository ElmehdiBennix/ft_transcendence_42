'use client';
import { SideBarContext } from '@/context/SideBarContext';
import { useContext } from 'react';
import { DashboardCard } from '@/components/home/DashboardCard';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { MapsCard } from '@/components/game/theme-card';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Chart } from '@/components/Profile/Chart';
import Rating from '@/components/Profile/rating';
import { useUser } from '@/context/GlobalContext';
import { RiArrowRightSLine } from 'react-icons/ri';
import HomeAchievement from '@/components/home/HomeAchievement';
import Link from 'next/link';
import { HomeLeaderboard } from '@/components/home/HomeLeaderboard';


const MapsSwiper = ({ mode }: { mode: string }) => {
  return (
    <Swiper
      effect={'coverflow'}
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
      pagination={{ el: '.swiper-pagination', clickable: true }}
      modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
      className="swiper-container flex h-[70%] w-full items-center justify-center py-4"
    >
      <SwiperSlide className="overflow-visible">
        <MapsCard
          height="100px"
          imageUrl="/earth.png"
          title="Earth"
          description="earth could shake or make or fake"
          url={``}
        />
      </SwiperSlide>
      <SwiperSlide className="overflow-visible">
        <MapsCard
          height="100px"
          imageUrl="/air.png"
          title="Air"
          description="Air: The invisible killer we can not live without"
          url={``}
        />
      </SwiperSlide>
      <SwiperSlide className="overflow-visible">
        <MapsCard
          height="100px"
          imageUrl="/fire.png"
          title="Fire"
          description="Because sometimes, you just need to watch the world burn."
          url={``}
        />
      </SwiperSlide>
      <SwiperSlide className="overflow-visible">
        <MapsCard
          height="100px"
          imageUrl="/water.png"
          title="Water"
          description="The slippery element that makes sure your Pong ball never stays on course."
          url={``}
        />
      </SwiperSlide>
    </Swiper>
  );
};

const Home = () => {
  const { setIsActivated } = useContext(SideBarContext);
  const { user } = useUser();
  if (!user) return <div>Loading...</div>;
  const achievements = user.achievements;
  return (
    <div className="size-full overflow-y-scroll xl:gap-8 gap-28 xl:flex-row flex-col flex custom-scrollbar-container lg:overflow-hidden">
      <div className='xl:w-[60%] w-full xl:h-full h-[500px]'>
      <div className="z-10 mb-[-100px] flex h-[200px] items-center justify-center relative">
        <img src="/games-logo.svg" alt="" className="size-[300px]" />
      </div>
      <div className=" custom-inner-shadow costum-little-shadow relative flex h-full items-center overflow-hidden rounded-[30px] bg-black-crd">
          <div className="flex size-full items-center">
            <MapsSwiper mode="" />
          </div>
        </div>
      </div>
      <div className="xl:w-[40%] w-full xl:h-full h-full justify-between flex-col flex">
        <div className="w-full h-[100px]">
          <DashboardCard />
        </div>
        <div className="w-full h-[100px] flex items-center justify-between px-7 bg-black-crd rounded-[30px] bg-black">
          {/* <HomeAchievement 
          title={user?.achievements[0].achievement.name}
          description={user?.achievements[0].achievement.description}
          points={user?.achievements[0].achievement.points}
          progress={user?.achievements[0].progress}
          xpReward={user?.achievements[0].achievement.xp_gain}
          ratio={user?.achievements[0].achievement.ratio}
          iconUrl={"http://localhost:8080" + user?.achievements[0].image}
          /> */}
          <Link href={'/achievement'} className='size-[80px]'>
            <RiArrowRightSLine className='text-white text-[80px] font-dayson font-bold' />
          </Link>
        </div>
        <div className="bg-black w-full h-[30%]">
          <HomeLeaderboard />
        </div>
        <div className=" w-full h-[30%] bg-black-crd rounded-[30px] shadow-2xl">
        <div className="w-full h-full flex items-center justify-center bg-black-crd rounded-[30px]">
          <div className="w-1/2  h-full">
            <Chart total_games={user?.total_games} stats={user?.statistics} />
          </div>
          <Rating statistics={user?.statistics} />
        </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
