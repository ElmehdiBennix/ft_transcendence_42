/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/no-custom-classname */
// eslint-disable-next-line react-hooks/exhaustive-deps

'use client';
import React, { useState, useEffect } from 'react';
import { Messages } from '@/components/chat/Messages';
import { chatService } from '@/services/chatService';
import { Chat } from '@/constants/chat';
import { useUser } from '@/context/GlobalContext';
import { useParams } from 'next/navigation';

export default function Page() {
  const [chatSelected, setChatSelected] = useState<Chat | null>(null);
  const { chats, messages, setMessages } = useUser(); 
  const param = useParams();
  const chat_id = parseInt(param.user) ;

  const findChatById = (id: number): Chat | null => {
    if (chats === null) {
      return null;
    }
    const temp = chats.find((chat) => chat.id === id);
    console.log('DEBUG 2: --> temp', temp);
    return temp;
  };
  
  
  console.log('DEUBG 1: --> chat_id', chat_id);
  const fetchMessages = async () => {
    try {
      const fetchedMessages = await chatService.getChatMessages(chat_id);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };
  
  useEffect(() => {
    if (chat_id > 0) {
      setChatSelected(findChatById(chat_id) as Chat);
      fetchMessages();
    }
  }, [chat_id]);


  return (
    <div className="flex size-full flex-row items-center justify-center">
      <Messages
        chatId={chat_id}
        chatPartner={chatSelected}
        messages={messages}
        setMessages={setMessages}
        receiverId={chatSelected?.receiver.id}
      />
    </div>
  );
}
