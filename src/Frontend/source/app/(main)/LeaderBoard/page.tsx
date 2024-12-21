'use client';
import FriendsComponent from '@/components/friends/FriendsComponent';
import { LeaderBoard } from '@/constants/LeaderBoard';
import { SideBarContext } from '@/context/SideBarContext';
import { useContext, useEffect } from 'react';
export default function Page() {
  const { setIsActivated } = useContext(SideBarContext);
  useEffect(() => {
    setIsActivated(4);
  }, []);
  return (
    <div className="size-full md:py-4 md:pl-6 overflow-auto">
      <div className="costum-little-shadow size-full md:rounded-[50px] md:w-full overflow-hidden">
        <div className="flex size-full w-full flex-col items-start justify-start">
          <div className="h-[100%] w-full ">
            <div className="custom-scrollbar-container h-[calc(100%-200px)] overflow-y-scroll">
              <div className="bg-black-crd dark:bg-transparent w-full h-fit">
                <FriendsComponent
                  name={LeaderBoard[0].name}
                  ProfilePhoto={LeaderBoard[0].profilePhoto}
                  level={LeaderBoard[0].level}
                  wins={LeaderBoard[0].wins}
                  messagesLink={
                    <div className="flex lg:h-[150px] sm:h-[70px] h-[70px] lg:w-[90%] sm:w-[100%] w-[90%] items-center justify-center bg-[#FFFF00] bg-opacity-[40%] rounded-l-full">
                      <span className="text-[#FFFF00] font-dayson 2xl:text-[50px] xl:text-[42px] md:text-[30px] sm:text-[22px] text-[15px]">
                        1st
                      </span>
                    </div>
                  }
                  customStyles={{ backgroundColor: 'rgba(255, 255, 0, 0.3)' }}
                />
                <FriendsComponent
                  name={LeaderBoard[1].name}
                  ProfilePhoto={LeaderBoard[1].profilePhoto}
                  level={LeaderBoard[1].level}
                  wins={LeaderBoard[1].wins}
                  messagesLink={
                    <div className="flex lg:h-[150px] sm:h-[70px] h-[70px] sm:w-[75%] w-[65%] items-center justify-center bg-[#C0C0C0] bg-opacity-[50%] rounded-l-full">
                      <span className="text-[#C0C0C0] font-dayson 2xl:text-[50px] xl:text-[42px] md:text-[30px] sm:text-[22px] text-[15px]">
                        2nd
                      </span>
                    </div>
                  }
                  customStyles={{ backgroundColor: 'rgba(192, 192, 192, 0.3)' }}
                />
                <FriendsComponent
                  name={LeaderBoard[2].name}
                  ProfilePhoto={LeaderBoard[2].profilePhoto}
                  level={LeaderBoard[2].level}
                  wins={LeaderBoard[2].wins}
                  messagesLink={
                    <div className="flex lg:h-[150px] sm:h-[70px] h-[70px] lg:w-[60%] sm:w-[60%] w-[60%] items-center justify-center bg-[#CD7F32] bg-opacity-[50%] rounded-l-full">
                      <span className="text-[#CD7F32] font-dayson 2xl:text-[50px] xl:text-[42px] md:text-[30px] sm:text-[22px] text-[15px]">
                        3rd
                      </span>
                    </div>
                  }
                  customStyles={{ backgroundColor: 'rgba(205, 127, 50, 0.3)' }}
                />
              </div>
              {LeaderBoard.map((friend, index) => (
                <FriendsComponent
                  key={index + 4}
                  name={friend.name}
                  ProfilePhoto={friend.profilePhoto}
                  level={friend.level}
                  wins={friend.wins}
                  messagesLink={
                    <div className="flex lg:h-[150px] sm:h-[70px] h-[70px] lg:w-[200px] w-[100px] items-center justify-center rounded-full">
                      <span className="text-white font-dayson 2xl:text-[40px] xl:text-[42px] md:text-[30px] sm:text-[22px] text-[15px]">
                        {index + 4}
                      </span>
                    </div>
                  }
                  customStyles={{ backgroundColor: '' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
