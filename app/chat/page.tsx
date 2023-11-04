"use client";
import ChatBody from "@/components/ChatBody";
import ChatCard from "@/components/ChatCard";
import MessageInput from "@/components/MessageInput";
import WelcomeMessage from "@/components/WelcomeMessage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Message, setMessages } from "@/redux/slice/SocketSlice";
import {
  handleOnDisconnect,
  handleOnFindOtherUser,
  handleOnSendMessage,
  handleOnStop,
  handleOnUserTyping,
  initSocket,
} from "@/socket/socket";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import React, { use, useEffect, useRef, useState } from "react";

const Page = () => {
  const session = useSession();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
 
  const [sockInit, setSockInit] = useState<boolean>(false);
  const isTypingUser = useAppSelector(
    (state) => state.socketSlice.isUserTyping
  );
  const Message = useAppSelector((state) => state.socketSlice.messages);
  const sendMessage = useAppDispatch();
  useEffect(() => {
    if (sockInit) return;

    if (session.data) {
      const res = initSocket(session.data, messagesContainerRef);
      if (res) {
        setSockInit(true);
        sendMessage(
          setMessages({
            createdAt: new Date().toISOString(),
            isWelcomeMessage: true,
            message: "Welcome to Chat!",
            isServerConnected: true,
          })
        );
      }
    }
  }, [session]);

  if (!session) return <h1>Please Logged IN</h1>;

  return (
    <div className="flex overflow-y-hidden  relative h-full z-50  flex-col mx-auto max-w-4xl">
      <div className="w-full h-full">
        
        <MessageInput sockInit={sockInit} />
        <ChatBody/>

        <div className="h-[9%]  bg-[#13171c] z-0 w-full"></div>
      </div>
    </div>
  );
};

export default Page;
