'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from '@/lib/axios';
import { Chat, Message } from '@/constants/chat';
import { userService } from '@/services/userService';
import { Achievement } from '@/constants/achivemement';
import { onlineService } from '@/services/onlineService';

export interface User {
  id: number;
  username: string;
  xp: number;
  statistics: Statistics;
  achievements: Achievement[];
  last_login: number;
  is_online: boolean;
  display_name: string;
  bio: string;
  avatar: string;
  cover: string;
  level: number;
  total_games: number;
  games_won: number;
  games_loss: number;
  win_ratio: number;
  created_at: Date;
  is_private: boolean;
  relation: string;
  friends: Player[];
  matches_history: History[];
}

export interface Statistics {
  air_ratio: number;
  water_ratio: number;
  fire_ratio: number;
  earth_ratio: number;
  graph_data: GraphDatum[];
}

export interface GraphDatum {
  date: Date;
  wins: number;
  losses: number;
}

export interface History {
  length: number;
  id: number;
  result: string;
  map_played: string;
  player1: Player;
  player2: Player;
  player1_score: number;
  player2_score: number;
  date: string;
}

export interface Player {
  length: number;
  id: number;
  display_name: string;
  level: number;
  avatar: string;
}

export interface LeaderBoard {
  id: number;
  display_name: string;
  level: number;
  avatar: string;
  games_won: number;
  games_loss: number;
  Achievement: Achievement[]; 
}

interface UserContextType {
  isLoading: boolean;
  userId: number;
  user: User | null;
  error: Error | null;
  chats: Chat[] | null;
  messages: Message[] | null;
  lastMessages: { [key: number]: string } | null;
  PlayerLeaderBoard: LeaderBoard[] | null;
  PlayerMatches: History[] | null;
  achievements: Achievement[] | null;
  fetchCurrentUserDetails: () => Promise<void>;
  setChats: React.Dispatch<React.SetStateAction<Chat[] | null>>;
  setMessages: React.Dispatch<React.SetStateAction<Message[] | null>>;
  setPlayerMatches: React.Dispatch<React.SetStateAction<History[] | null>>;
  setLastMessages: React.Dispatch<React.SetStateAction<{ [key: number]: string } | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayerLeaderBoard: React.Dispatch<React.SetStateAction<LeaderBoard[] | null>>;
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>;
  setOnlineStatus: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  userId: 0,
  isLoading: false,
  error: null,
  chats: null,
  messages: [],
  lastMessages: null,
  PlayerLeaderBoard: [],
  PlayerMatches: [],
  achievements: [],
  setMessages: () => {},
  setChats: () => {},
  setLastMessages: () => {},
  fetchCurrentUserDetails: async () => {},
  setPlayerMatches: () => {},
  setIsLoading: () => {},
  setPlayerLeaderBoard: () => {},
  setAchievements: () => {},
  setOnlineStatus: async () => {},
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [userId, setUserId] = useState<number>(0);
  const [PlayerLeaderBoard, setPlayerLeaderBoard] = useState<LeaderBoard[] | null>(null);
  const [PlayerMatches, setPlayerMatches] = useState<History[] | null>(null);
  const [chats, setChats] = useState<Chat[] | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [lastMessages, setLastMessages] = useState<{ [key: number]: string } | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const setOnlineStatus = async () => {
    try {
      const ws = await onlineService.createWebSocketConnection();
    } catch (err) {
      console.log('err');
    }
  };

  const fetchCurrentUserDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await userService.getUserProfile();
      setUser(userData);
      setUserId(userData.id);
      console.log('userData fetched :', userData.display_name);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch current user'));
      setUser(null);
      setUserId(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        chats,
        error,
        userId,
        isLoading,
        messages,
        lastMessages,
        PlayerMatches,
        PlayerLeaderBoard,
        achievements,
        setOnlineStatus,
        setIsLoading,
        setChats,
        setMessages,
        setLastMessages,
        setPlayerMatches,
        setAchievements,
        setPlayerLeaderBoard,
        fetchCurrentUserDetails,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export { axios, userService };
