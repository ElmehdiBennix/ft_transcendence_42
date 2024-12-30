import React, { useState, useRef } from 'react'
import { IoSend } from 'react-icons/io5'
import { FiPlus, FiMoreVertical } from 'react-icons/fi'
import { IoGameController } from 'react-icons/io5'
import { BiBlock } from 'react-icons/bi'
import { Chat, Message } from '@/constants/chat'
import { useUser } from '@/context/GlobalContext'
import { MessageBubble } from '@/components/chat/MessageBubb'
import { chatService } from '@/services/chatService'
import FriendServices from '@/services/friendServices'
import { useChatWebSocket } from '@/hooks/useChatWebSocket'
import { toast } from '@/hooks/use-toast';
interface MessagesProps {
  chatId: number
  currentChat: Chat
  receiverId: number
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
}

export const Messages: React.FC<MessagesProps> = ({
  chatId,
  currentChat,
  messages,
  setMessages,
  receiverId,
}) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [isPartnerOnline, setIsPartnerOnline] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null)
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const { chats, user, setChats } = useUser()
  const [isBlocked, setIsBlocked] = useState(false)
  
  const handleBlockUser = async () => {
    if (isBlocked) {
        console.log('Unblocking user:', currentChat?.receiver.username)
        try {
          await FriendServices.unblockFriend(currentChat?.receiver.username)
          setIsBlocked(false)
        } catch (error) {
          toast({
            title: 'User is already unblocked',
            description: 'You cannot unblock this user',
            variant: 'destructive',
            className: 'bg-primary-dark border-none text-white',
          });
        }
      } else {
        console.log('Blocking user:', currentChat?.receiver.username)
        try {
          await FriendServices.blockFriend(currentChat?.receiver.username)
          setIsBlocked(true)
        } catch (error) {
          // need to overide the alert and show it like a toast
          toast({
            title: 'User is already blocked',
            description: 'You cannot block this user',
            variant: 'destructive',
            className: 'bg-primary-dark border-none text-white',
          });
        }
      }
    }
    
  const handleGameInvite = async () => {
    try {
      console.log('Sending game invite to:', currentChat?.receiver.id)
      setShowMoreOptions(false)
    } catch (error) {
      console.log('Failed to send game invite', error)
    }
  }
  
  useChatWebSocket({
    chatId,
    currentUserId,
    receiverId,
    setMessages,
    setChats,
  })
 
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    try {
      if (currentUserId !== null) {
        await chatService.sendMessage(chatId, newMessage, currentUserId, receiverId)
      }
      setNewMessage('')
    } catch (error) {
      console.error('Failed to send message', error)
    }
  }
  
  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages])

  const [chatBar, setChatBar] = useState(true);
  React.useEffect(() => {
    if (user) setCurrentUserId(user.id);
    if (chats) {
      const currentchat = chats.find((chat: Chat) => chat.id === chatId)
      if (currentchat && (currentchat.is_blocked || currentchat.blocked_by)) {
        setChatBar(false);
      }
      if (currentchat && currentchat.is_blocked) {
          setIsBlocked(true);
      }
    }

    setIsPartnerOnline(true);
  }, [user], [chats])

  return (
    <div className="costum-little-shadow flex size-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-black-crd bg-[url('/chat-bg.png')] pb-4">
      <div className="costum-little-shadow flex h-[120px] w-full items-center justify-between bg-[rgb(0,0,0,0.7)] px-4 font-dayson text-white">
        <div className="flex items-start gap-4">
          <div className="flex size-[70px] items-center justify-center rounded-full bg-slate-400">
            <img
              src={'http://localhost:8080' + currentChat?.receiver.avatar}
              alt={`${currentChat?.receiver.username}'s profile`}
              className="rounded-full"
            />
          </div>
          <div>
            <h2>{currentChat?.receiver.username}</h2>
            <h3 className={`text-sm ${isPartnerOnline ? 'text-green-500' : 'text-gray-400'}`}>
              {isPartnerOnline ? 'online' : 'offline'}
            </h3>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMoreOptions(!showMoreOptions)}
            className="rounded-full p-2 hover:bg-[#252525]"
          >
            <FiMoreVertical className="size-6 text-white" />
          </button>
          {showMoreOptions && (
            <div className="absolute right-0 top-12 z-50 min-w-[200px] rounded-lg bg-[#252525] py-2 shadow-lg">
              <button
                onClick={handleGameInvite}
                className="flex w-full items-center gap-3 px-4 py-2 text-left text-white hover:bg-[#303030]"
              >
                <IoGameController className="size-5" />
                <span>Invite to Game</span>
              </button>
              <button
                onClick={handleBlockUser}
                className="flex w-full items-center gap-3 px-4 py-2 text-left text-white hover:bg-[#303030]"
              >
                <BiBlock className="size-5" />
                {isBlocked ? 'Unblock User' : 'Block User'}
              </button>
            </div>
          )}
        </div>
      </div>
      <div ref={messagesContainerRef} className="custom-scrollbar-container flex h-full w-[90%] flex-col gap-2 overflow-scroll py-2">
        {messages.length > 0 && messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message}
            isCurrentUser={currentChat?.receiver.username === message.receiver}
          />
        ))}
      </div>
      <form
        onSubmit={handleSendMessage}
        className="flex h-[60px] w-11/12 items-center gap-4 rounded-md bg-[rgb(0,0,0,0.7)] px-4 py-1"
      >
        <div className="flex size-full items-center gap-3 px-4">
          <FiPlus className="dark: size-[30px] text-white" />
          {chatBar && (
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Start a new conversation"
            className="size-full bg-transparent text-white focus:outline-none"
            />
          )}
        </div>
        <button
          type="submit"
          className="flex size-[40px] items-center justify-center rounded-md bg-primary dark:bg-primary-dark"
        >
          <IoSend className="size-[20px] text-white" />
        </button>
      </form>
    </div>
  )
}

