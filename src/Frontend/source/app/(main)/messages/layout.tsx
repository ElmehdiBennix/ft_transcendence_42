/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import { Chat } from '@/constants/chat';
import { useUser } from '@/context/GlobalContext';
import { useRouter } from 'next/navigation';
import { ChatCard } from '@/components/chat/ChatCard';
import { TiArrowBack } from "react-icons/ti";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { chats, messages, user, setMessages } = useUser();
  const [listChat, setListChat] = useState<Chat[] | null>(chats);
  const [showChat, setShowChat] = useState(false);
  const [lastMessages, setLastMessages] = useState<{[key: number]: string}>({});

  useEffect(() => {
    if (messages.length > 0) {
      setShowChat(true);
      console.log('called', user?.id);
    }
  }, [messages]);

  useEffect(() => {
    if (chats) {
      const messagesMap = chats.reduce((acc, chat) => ({
        ...acc,
        [chat.id]: chat.last_message?.content
      }), {});
      setLastMessages(messagesMap);
      setListChat(chats);
    }
  }, [chats]);

  // The user should be able to block other users. This way, they will see no more
  //   messages from the account they blocked.

  // The user should be able to invite other users to play a Pong game through the 
  //   chat interface.
  
  // The tournament system should be able to warn users expected for the next
  //   game.
  
  // The user should be able to access other players profiles through the chat interface.

  return (
    <div className="col-span-10 col-start-2 row-span-8 row-start-2 flex w-full">
      <div className="relative flex size-full gap-8">
        <div className="hidden h-full items-center justify-center lg:flex lg:w-3/5 lg:flex-row">
          <div className="costum-little-shadow hidden size-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-black-crd lg:flex">
            {children}
          </div>
        </div>
        {showChat && (
       <button
       onClick={() => {
         setShowChat(false);
         setMessages([]);
         router.push('/messages');
       }}
       className="absolute right-8 top-8 z-[99] size-[50px] rounded-md lg:hidden"
     >
       <TiArrowBack  className="w-full h-full" />
     </button>
        )}
        {showChat && (
          <div className="absolute z-[80] flex size-full items-center justify-center bg-black lg:hidden">
            {children}
          </div>
        )}
        <div className="size-full lg:w-2/5">
          <div
            className={`costum-little-shadow size-full overflow-hidden rounded-[15px] bg-black-crd lg:block ${!showChat ? 'block' : 'hidden'}`}
          >
            <div className="costum-little-shadow flex h-[120px] w-full items-center justify-between bg-black-crd px-4 font-dayson text-white">
              <h2>Listed Conversations</h2>
            </div>
            <div className="custom-scrollbar-container flex size-full flex-col items-center justify-start gap-5">
              {listChat &&
                listChat.map((chat, index) => <ChatCard key={index} chatContent={chat} lastMessage={lastMessages[chat.id]} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
