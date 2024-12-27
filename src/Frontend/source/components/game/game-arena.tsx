/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { LocalGameManager, OnlineGameManager, PixiManager } from '@/components/game/pixi';
import { useGame } from '@/context/GameContext';
import React, { useRef, useEffect } from 'react';
import socketManager from './socket-manager';
import { useUser } from '@/context/GlobalContext';

const GameTable = ({ mode, map }: { map: string; mode: string }) => {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const game = useGame();
  const user = useUser();

  const gameManagerRef = useRef<PixiManager | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (mode.indexOf('local') !== -1) {
      if (canvasContainerRef.current) {
        gameManagerRef.current = new LocalGameManager(
          canvasContainerRef.current,
          `/${map}.png`,
          game
        );
      }
    } else {
      socketRef.current = new socketManager('ws://localhost:8080/ws/game/');
      if (canvasContainerRef.current) {
        gameManagerRef.current = new OnlineGameManager(
          canvasContainerRef.current,
          `/${map}.png`,
          game,
          socketRef.current,
          user?.user
        );
      }
    }
    return () => {
      if (gameManagerRef.current?.app) {
        gameManagerRef.current.app.destroy(true);
      }
    };
  }, []);

  useEffect(() => {
    if (gameManagerRef.current) {
      window.addEventListener('keydown', (event) => gameManagerRef!.current!.handleKeyDown(event));
      window.addEventListener('keyup', (event) => gameManagerRef!.current!.handleKeyUp(event));
    }
    return () => {
      window.removeEventListener('keydown', (event) =>
        gameManagerRef!.current!.handleKeyDown(event)
      );
    };
  }, []);

  return (
    <div
      ref={canvasContainerRef}
      id="table"
      className="aspect-h-4 aspect-w-3 w-full overflow-hidden border-[10px] border-black-crd md:rounded-[20px]"
    />
  );
};

export default GameTable;
