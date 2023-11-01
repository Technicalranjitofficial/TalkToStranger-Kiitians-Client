"use client";
import ChatCard from "@/components/ChatCard";
import { useAppSelector } from "@/redux/hooks";
import { checkSocketConnection, handleOnChatJoin, handleOnFindOtherUser, handleOnSendMessage, initSocket } from "@/socket/socket";
import { useSession } from "next-auth/react";
import React, { use, useEffect, useRef, useState } from "react";

const Page = () => {
  const [isConnected, setIsConnected] = useState(false);
  const session = useSession();
  const [socketCheck, setSocketCheck] = useState<boolean>(false);
  const messageRef = useRef<HTMLInputElement>(null);

  const remoteuser = useAppSelector((state)=>state.socketSlice.remoteUsersId);

  const Message = useAppSelector((state)=>state.socketSlice.messages);

 

  useEffect(() => {
    if (session.data) {
      const res = initSocket(session.data);
      if (res) {
        setSocketCheck(res);
      }
    }
  }, [session]);

  useEffect(()=>{
    //handle on enter key pressed
    const handleOnEnterKeyPressed = (e:KeyboardEvent)=>{
      if(e.key=="Enter"){
        handleOnSendMessage(messageRef.current?.value);
        messageRef.current!.value="";
      }
    }
    document.addEventListener("keydown",handleOnEnterKeyPressed);
    return ()=>document.removeEventListener("keydown",handleOnEnterKeyPressed);
  },[])



  const scrollRef= useRef<HTMLDivElement>(null)
  // components/MessageList.tsx


useEffect(() => {
  if (Message.length) {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }
}, [Message.length]);


if(!session) return <h1>Please Logged IN</h1>;

  

  return(
    <main className="flex min-h-screen overflow-y-hidden h-screen pb-5 flex-col  pt-16 mx-auto max-w-4xl">

      <div className="w-full h-full z-0 relative bg-[#0D1116]">

        {(remoteuser && Message.length==0)? <div className="flex text-white flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Stranger Connected</h1>
        
        </div>: Message.length>0? null:  <div>

        <h1 className="text-white">Waiting for Other User to Join
        <button onClick={()=>handleOnFindOtherUser()}>Find Other</button>
        </h1>
        </div>
          }

       <div className="overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-cyan-600 w-full mt-2 h-[90%]">
       {
        Message.length>0 &&  Message.map((message,index)=>{
            return(
              <ChatCard key={index} message={message}/>
            )
          })

       }

        <div ref={scrollRef}></div>
       </div>

        <div className="absolute w-full px-2  gap-5 flex justify-evenly flex-row bottom-0">
          <input disabled={remoteuser==null} ref={messageRef} className="w-full px-2 bg-transparent border border-gray-800 text-white outline-none rounded-md py-2" type="text" />
          <button disabled={remoteuser==null} onClick={()=>{
            handleOnSendMessage(messageRef.current?.value);
            messageRef.current!.value="";
          }} className="w-1/4 bg-transparent text-white border border-gray-700 rounded-md">Send</button>
        </div>
      </div>
   
    </main>
  )
};

export default Page;

