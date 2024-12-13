'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import UserActivityBoard from './UserActivityBoard';
import { MatchHistory } from '@/constants/MatchHistory';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import FriendServices from '@/services/friendServices';
import { Graph } from './Graph';
import { RChart, statistics } from './statistics';
import { toast } from '@/hooks/use-toast';
import MatchHistoryBoard from './MatchHistoryBoard';
const UserSummary = (): JSX.Element => {
  const [Friends, setFriends] = useState([]);
  useEffect(() => {
    const displayFriends = async () => {
      try {
        const response = await FriendServices.getFriends();
        console.log('Friends:', response.data);
        if (response.message) {
          setFriends(response.data);
        } else if (response.error) {
          console.log(response.error);
        }
      } catch (error) {
        toast({
          title: 'Authentication failed',
          description: 'Oups Somthing went wrong !',
          variant: 'destructive',
          className: 'bg-primary-dark border-none text-white',
        });
      }
    };
    displayFriends();
  }, []);
  const achievements = [
    {
      name: 'Achievement 1',
      icon: '/ach1.svg',
    },
    {
      name: 'Achievement 2',
      icon: '/ach1.svg',
    },
    {
      name: 'Achievement 3',
      icon: '/ach1.svg',
    },
    {
      name: 'Achievement 4',
      icon: '/ach1.svg',
    },
    {
      name: 'Achievement 5',
      icon: '/ach1.svg',
    },
    {
      name: 'Achievement 6',
      icon: '/ach1.svg',
    },
    {
      name: 'Achievement 7',
      icon: '/ach1.svg',
    },
    {
      name: 'Achievement 8',
      icon: '/ach1.svg',
    },
    {
      name: 'Achievement 9',
      icon: '/ach1.svg',
    },
  ];
  return (
    <div className="size-full bg-[#242627]/90 shadow-[-4px_-22px_31px_2px_rgba(36,_38,_39,_1)] pb-4 overflow-y-scroll custom-scrollbar-container xl:overflow-y-hidden flex 2xl:px-8 px-4 xl:flex-row xl:gap-0 flex-col gap-12">
      <div className="h-full w-full xl:w-[65%] flex items-start justify-start flex-col lg:gap-2">
        <div className="w-full h-[20%] flex flex-row gap-3 px-8 py-3 scroll-auto overflow-hidden">
          {achievements.map((achievement, index) => (
            <Avatar
              key={index}
              className="lg:size-[65px] transition-all duration-300 xl:size-[80px] md:size-[50px] bg-[#00A6FF]"
            >
              <AvatarImage src={achievement.icon} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div className="h-[80%] w-full flex items-center justify-between 2xl:px-12 xl:px-5">
          <div className="custom-scrollbar-container h-[calc(100%-200px)] overflow-y-scroll w-[48%] bg-[#4C4D4E] rounded-[50px] shadow-2xl">
            {MatchHistory.map((user, index) => (
              <MatchHistoryBoard
                key={index}
                name={user.player1}
                Profile={user.player1Photo}
                Player1score={user.player1Score}
                Player2score={user.player2Score}
              />
            ))}
            <div className="w-full sticky bottom-0 bg-[#4C4D4E] z-10 h-[50px] border-t-2 border-[#B8B8B8] flex items-center justify-end gap-4 px-10">
              <h1 className="2xl:text-[20px] lg:text-[15px] font-dayson text-[#B8B8B8]">
                Match History
              </h1>
              <h1 className="2xl:text-[25px] lg:text-[20px] font-dayson text-[#B8B8B8]">{'>'}</h1>
            </div>
          </div>
          <div className="custom-scrollbar-container h-[calc(100%-200px)] overflow-y-scroll w-[48%] bg-[#4C4D4E] rounded-[50px] shadow-2xl flex flex-col">
            <div className="flex-grow">
              {Friends.map((user, index) => (
                <UserActivityBoard
                  key={index}
                  name={user.name}
                  level={user.level}
                  Profile={user.ProfilePhoto}
                />
              ))}
            </div>

            <Link href="/friends">
              <div className="w-full sticky bottom-0 bg-[#4C4D4E] z-10 h-[50px] border-t-2 border-[#B8B8B8] flex items-center justify-end gap-4 px-10">
                <h1 className="2xl:text-[20px] lg:text-[15px] font-dayson text-[#B8B8B8]">
                  {Friends.length} Friends
                </h1>
                <h1 className="2xl:text-[25px] lg:text-[20px] font-dayson text-[#B8B8B8]">{'>'}</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-full w-full xl:w-[35%] flex items-center justify-center rounded-[50px] bg-[#4C4D4E] flex-row xl:flex-col">
        <div className="w-1/2 h-full xl:w-full xl:h-[45%]  flex items-start">
          <RChart />
        </div>
        <div className="xl:w-[90%] w-1/2 h-full flex items-center justify-center">
          <Graph />
        </div>
      </div>
    </div>
  );
};
export default UserSummary;
