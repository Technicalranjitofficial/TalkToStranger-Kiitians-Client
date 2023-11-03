"use client";
import ChatCard from "@/components/ChatCard";
import { useAppSelector } from "@/redux/hooks";
import { Message } from "@/redux/slice/SocketSlice";
import {
  checkSocketConnection,
  handleOnChatJoin,
  handleOnFindOtherUser,
  handleOnSendMessage,
  initSocket,
} from "@/socket/socket";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import React, { use, useEffect, useRef, useState } from "react";






const Page = () => {
  const [isConnected, setIsConnected] = useState(false);
  const session = useSession();
  const [socketCheck, setSocketCheck] = useState<boolean>(false);
  const messageRef = useRef<HTMLInputElement>(null);

  const [sockInit,setSockInit] = useState<boolean>(false);

  const remoteuser = useAppSelector((state) => state.socketSlice.remoteUsersId);
  const Message = useAppSelector((state) => state.socketSlice.messages);
  useEffect(() => {
    if(sockInit) return;
    if (session.data) {
      const res = initSocket(session.data);
      if (res) {
        setSocketCheck(res);
        setSockInit(true);
      }
    }
  }, [session]);

 
  useEffect(() => {
    //handle on enter key pressed
    const handleOnEnterKeyPressed = (e: KeyboardEvent) => {
      if (e.key == "Enter") {
        handleOnSendMessage(messageRef.current?.value);
        messageRef.current!.value = "";
        messageRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleOnEnterKeyPressed);
    return () =>
      document.removeEventListener("keydown", handleOnEnterKeyPressed);
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  // components/MessageList.tsx

  useEffect(() => {
    if (Message.length) {

      if(messagesContainerRef.current){
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }
  }, [Message.length]);

  if (!session) return <h1>Please Logged IN</h1>;

  return (
    <main className="flex  relative h-screen overflow-y-hidden  pb-5 flex-col mx-auto max-w-4xl">
     
      <div className="w-full overflow-y-hidden h-full pt-16 z-0  bg-[#0D1116]">

      {remoteuser && Message.length==0 ? 
      
      <div className="w-full h-full flex justify-center mt-5">
        <h1 className="text-white">Stranger Connected</h1>
      </div>
      :Message.length>0?  
        <div ref={messagesContainerRef} className="overflow-y-auto px-2   scrollbar-thin scrollbar-thumb-cyan-600 w-full mt-2 lg:h-[90%] h-[80%]">
          <AnimatePresence>

         
          {Message.length > 0 &&
            Message.map((message, index) => {
              return <ChatCard key={index} message={message} />;
            })}
   
   </AnimatePresence>
    
        </div>: <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-white">Waiting for user connection</h1>
        </div>
          
           }

        <div className="absolute w-full px-2 pb-5  gap-5 flex justify-evenly flex-row bottom-12 md:bottom:10 lg:bottom-5">
          <input
          disabled={remoteuser == null}
            ref={messageRef}
            className="w-full px-2 bg-transparent border border-gray-800 text-white outline-none rounded-md py-2"
            type="text"
          />
          <button
            disabled={remoteuser == null}
            onClick={() => {
              handleOnSendMessage(messageRef.current?.value);
                   
                      messageRef.current!.value = "";
                      messageRef.current?.focus();            
              
            }}
            className="w-1/4 bg-transparent text-white border border-gray-700 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
};

export default Page;
