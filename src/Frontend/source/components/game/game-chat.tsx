'use client';

import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useUser, User } from '@/context/GlobalContext';
import { useGame } from '@/context/GameContext';
import { useEffect } from 'react';
import { RoundsProps } from '@/context/GameContext';

const PlayerScore = ({ player, score, isme }: { player: User; score: number; isme: boolean }) => {
  return (
    <div className={`flex h-4/5 w-auto items-start ${isme ? '' : 'items-end'} flex-col gap-1`}>
      <Avatar className={`size-full bg-black-crd max-w-[35px] max-h-[35px] md:max-w-[50px] md:max-h-[50px]`}>
        <AvatarImage src="/Avatar.svg" alt="avatar" />
        <AvatarFallback className="bg-black-crd">CN</AvatarFallback>
      </Avatar>
      <div
        className={`flex font-poppin text-[10px] dark:text-white xl:text-[15px] w-[100px] lg:w-[150px] text-center'}`}
      >
        <div className={`${isme ? '' : 'order-3'}`}>{player.username}</div>
        <div className={` w-full text-white-crd text-center`}>{score}</div>
      </div>
    </div>
  );
};

const ScoreTable = () => {
  const { user } = useUser();
  const game = useGame();

  useEffect(() => {
    if (game.GameScore[0] > 6 || game.GameScore[1] > 6) {
      const newRound = {
        round: game.Rounds.length + 1,
        winner: game.GameScore[0] > game.GameScore[1] ? 'Player 1' : 'Player 2',
        score: game.GameScore
      };

      game.setRounds((prevRounds: RoundsProps[]) => {
        const updatedRounds = [...prevRounds, newRound];
        return updatedRounds as RoundsProps[];
      });

      game.setGameScore([0, 0]);
    }
  }, [game]);

  return (
    <div className="flex items-center justify-around gap-1 xl:flex-col xl:gap-8 size-full px-8 relative">
      <Link
        href={'#'}
        className="flex h-[60px] w-auto items-center justify-start font-dayson text-[48px] dark:text-white xl:w-full absolute left-2 top-2"
      >
        <IoIosArrowBack className="size-[20px] md:size-[60px]" />{' '}
        <span className="hidden lg:block">Game Arena</span>
      </Link>

      <div className='size-full flex flex-col items-center justify-center gap-2'>
        <div className="flex w-full items-center justify-around p-2 xl:gap-12 font-dayson text-[20px] dark:text-white md:text-[35px]">
          <PlayerScore player={user || ({} as User)} score={game.GameScore[0]} isme={true} />
          <div className="flex h-[40px] lg:h-auto text-[10px]  items-center justify-center rounded-[10px] border-2 border-white-crd text-center text-white-crd p-2">
            {game.GameState === 'start' ? (
              <div className="flex lg:flex-col">
                <h1>Round</h1>
                <h3>{game.Rounds.length + 1}</h3>
              </div>
            ) : (
              // <div className="flex size-full flex-col items-center justify-center border-white border-2 rounded-[10px]">
              <div>game over</div>
            )}
          </div>
          <PlayerScore player={user || ({} as User)} score={game.GameScore[1]} isme={false} />
        </div>

        <div className="hidden h-fit w-full items-end justify-between rounded-[10px] bg-black-crd lg:flex">
          {/* rounds  */}
          <div className="flex size-full flex-col items-center justify-start overflow-auto h-[200px]">
            <div
                className="flex h-[50px] w-full items-center justify-around border-b border-white-crd text-[18px] text-white-crd"
              >
                <div className='w-1/3 h-full flex justify-center items-center'>{"Round"}</div>
                <div className='w-1/3 h-full border-l border-white-crd flex justify-center items-center'>{"Winner"}</div>
                <div className='w-1/3 h-full border-l border-white-crd flex justify-center items-center'>{"score"}</div>
              </div>
            {game.Rounds.map((round, index) => (
              <div
                key={index}
                className={`flex h-[50px] w-full items-center justify-around ${index==2? "" :"border-b border-white-crd"} text-[18px] text-white-crd`}
              >
                <div className='w-1/3 h-full flex justify-center items-center'>{`${round.round}`}</div>
                <div className='w-1/3 h-full border-l border-white-crd flex justify-center items-center'>{`${round.winner}`}</div>
                <div className='w-1/3 h-full border-l border-white-crd flex justify-center items-center'>{`${round.score[0]}/${round.score[1]}`}</div>
              </div>
            ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreTable;
