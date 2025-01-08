/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  LocalGameManager,
  OnlineGameManager,
  PixiManager,
} from "@/components/game/pixi-manager";
import { useGame } from "@/context/GameContext";
import React, { useRef, useEffect } from "react";
import { useUser } from "@/context/GlobalContext";

const GameTable = ({ mode, map, game_id }: { map: string; mode: string, game_id: string }) => {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const game = useGame();
  const user = useUser();

  const gameManagerRef = useRef<PixiManager | null>(null);

  useEffect(() => {
    if (mode.indexOf('local') !== -1 || mode === 'tournament') {
      if (canvasContainerRef.current) {
        gameManagerRef.current = new LocalGameManager(
          canvasContainerRef.current,
          map,
          game
        );
      }
    } else {
      if (canvasContainerRef.current) {
        gameManagerRef.current = new OnlineGameManager(
          canvasContainerRef.current,
          map,
          game,
          user?.user,
          game_id,
        );
      }
    }

      return () => {
        if (mode === 'one-vsone') {
          const om = gameManagerRef.current as OnlineGameManager;
          om?.socketManager.close();
        }
        // if (gameManagerRef.current?.app) {
        //   gameManagerRef.current.app.destroy(true);
        // }
    };
  }, []);

  useEffect(() => {
    if (gameManagerRef.current) {
      window.addEventListener("keydown", (event) =>
        gameManagerRef!.current!.handleKeyDown(event),
      );
      window.addEventListener("keyup", (event) =>
        gameManagerRef!.current!.handleKeyUp(event),
      );
    }
    return () => {
      window.removeEventListener("keydown", (event) =>
        gameManagerRef!.current!.handleKeyDown(event),
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
