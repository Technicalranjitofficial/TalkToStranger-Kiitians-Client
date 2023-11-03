"use client";
import ChatCard from "@/components/ChatCard";
import WelcomeMessage from "@/components/WelcomeMessage";
import { useAppSelector } from "@/redux/hooks";
import { Message } from "@/redux/slice/SocketSlice";
import {
  checkSocketConnection,
  handleOnChatJoin,
  handleOnDisconnect,
  handleOnFindOtherUser,
  handleOnSendMessage,
  handleOnStop,
  initSocket,
} from "@/socket/socket";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import React, { use, useEffect, useRef, useState } from "react";
// import useSound from 'use-sound';

const Page = () => {
  const [isConnected, setIsConnected] = useState(false);
  const session = useSession();
  const [socketCheck, setSocketCheck] = useState<boolean>(false);
  const messageRef = useRef<HTMLInputElement>(null);
const isSearching = useAppSelector((state)=>state.socketSlice.isSearching);
const isDisconnecting = useAppSelector((state)=>state.socketSlice.isDisconnecting);
  const [sockInit, setSockInit] = useState<boolean>(false);

  const remoteuser = useAppSelector((state) => state.socketSlice.remoteUsersId);
  const Message = useAppSelector((state) => state.socketSlice.messages);
  useEffect(() => {
    if (sockInit) return;
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
  }, [Message]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  // components/MessageList.tsx

  useEffect(() => {
    if (Message.length) {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    }
  }, [Message.length]);

  if (!session) return <h1>Please Logged IN</h1>;

  return (
    <div className="flex overflow-y-hidden  relative h-full z-50  flex-col mx-auto max-w-4xl">
<div className="w-full h-full">



<div className="absolute bottom-2 md:bottom-6 px-2 w-full z-50  gap-4 flex justify-evenly flex-row md:h-[8%] lg:h-[7%] h-[10%] ">
        <input
          disabled={remoteuser == null||isSearching||isDisconnecting}
          ref={messageRef}
          className="w-full px-2 bg-transparent border border-gray-800 text-white outline-none rounded-md py-2"
          type="text"
        />
        <button
          disabled={!sockInit||isDisconnecting}
          onClick={() => {

            if(isSearching){
              handleOnStop();
            }else if(!remoteuser){
              handleOnFindOtherUser();
             }else{
              handleOnDisconnect();
             }

         

           
          }}
          className={`w-1/4  text-white border border-gray-700 rounded-md ${isSearching?"bg-blue-700":(isDisconnecting || remoteuser)?"bg-red-700":"bg-green-700" }`}
        >
          {remoteuser?"Close": isSearching ? "Finding" :isDisconnecting?"Closing":"New" }
        </button>
      </div>

      <div className="w-full  overflow-y-hidden h-[88%] z-0  bg-[#0D1116]">
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
                  return message.isWelcomeMessage?(
                    <WelcomeMessage message={message} />
                  ):
                  <ChatCard key={index} message={message} />;
                })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-white">Waiting for user connection</h1>
          </div>
        )}
      </div>

      <div className="h-[12%] z-0 w-full"></div>

      </div>
    </div>
  );
};

export default Page;
