import { useAppSelector } from '@/redux/hooks';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import WelcomeMessage from './WelcomeMessage';
import ChatCard from './ChatCard';
import { handleOnUserTyping } from '@/socket/socket';

const ChatBody = ({}) => {

    const remoteuser = useAppSelector((state) => state.socketSlice.remoteUsersId);
    const Message = useAppSelector((state) => state.socketSlice.messages);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const isTypingUser = useAppSelector(
      (state) => state.socketSlice.isUserTyping
    );
    


  // components/MessageList.tsx

  useEffect(() => {
    if (Message.length) {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    }
  }, [Message.length]);




  return (
    
    <div className="w-full  overflow-y-hidden h-[90%] z-0  bg-[#13171c]">
    {remoteuser && Message.length == 0 ? (
      <div className="w-full h-full flex justify-center mt-5">
        <h1 className="text-white">Stranger Connected</h1>
      </div>
    ) : Message.length > 0 ? (
      <div
        ref={messagesContainerRef}
        className="overflow-y-auto px-2   scrollbar-thin scrollbar-thumb-cyan-600 w-full h-full "
      >
        <AnimatePresence>
          {Message.length > 0 &&
            Message.map((message, index) => {
              return message.isWelcomeMessage ? (
                <WelcomeMessage key={index} message={message} />
              ) : (
                <ChatCard key={index} message={message} />
              );
            })}

          <div className="text-white items-center flex flex-row  h-[50px]">
            {isTypingUser && (
              <>
                <img src="/typing.gif" alt="" />
                <h1 className="font-bold">Stranger is typing</h1>
              </>
            )}
          </div>
        </AnimatePresence>
      </div>
    ) : (
      <div className="w-full h-full flex justify-center items-center">
        <h1 className="text-white">Connecting to Server!</h1>
      </div>
    )}
  </div>
  )
}

export default ChatBody