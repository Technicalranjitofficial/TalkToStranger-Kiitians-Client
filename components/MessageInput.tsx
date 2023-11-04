import { useAppSelector } from '@/redux/hooks';
import { handleOnDisconnect, handleOnFindOtherUser, handleOnSendMessage, handleOnStop, handleOnUserTyping } from '@/socket/socket';
import React, { useEffect, useRef, useState } from 'react'

const MessageInput = ({sockInit,


}:{

    sockInit:boolean;


    
}) => {


    const messageRef = useRef<HTMLInputElement>(null);

    const isSearching = useAppSelector((state) => state.socketSlice.isSearching);
    const isDisconnecting = useAppSelector(
      (state) => state.socketSlice.isDisconnecting
    );
    const Message = useAppSelector((state) => state.socketSlice.messages);

    const remoteuser = useAppSelector((state) => state.socketSlice.remoteUsersId);


    const [isTyping, setIsTyping] = useState(false);
    // const typingTimeout= useRef<TimerHandler>(null);
  
    let typingTimeout:any=null;
    useEffect(() => {
      if (isTyping) {
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
          setIsTyping(false);
          handleOnUserTyping(false);
        }, 1000); // Adjust the timeout duration as needed
      }
  
      return () => {
        clearTimeout(typingTimeout);
      };
    }, [isTyping]);
  

    useEffect(() => {
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
    
        // Event handler for input field
  const handleInput = () => {
    if (!isTyping) {
      setIsTyping(true);
      handleOnUserTyping(true);
    }

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      setIsTyping(false);
      handleOnUserTyping(false);
    }, 1000); // Adjust the timeout duration as needed
  };


  return (
    <div className="absolute bottom-2  md:bottom-6 px-2 w-full z-50  gap-4 flex justify-evenly flex-row  h-[7%] ">
    <button
      disabled={!sockInit || isDisconnecting}
      onClick={() => {
        if (isSearching) {
          handleOnStop();
        } else if (!remoteuser) {
          handleOnFindOtherUser();
        } else {
          handleOnDisconnect();
        }
      }}
      className={`w-1/4  text-white border border-gray-700 rounded-md ${
        isSearching
          ? "bg-blue-700"
          : isDisconnecting || remoteuser
          ? "bg-red-700"
          : "bg-green-700"
      }`}
    >
      {remoteuser
        ? "Stop"
        : isSearching
        ? "Finding"
        : isDisconnecting
        ? "Closing"
        : "New"}
    </button>
    <div className="w-full pr-1 flex pl-2 bg-transparent border border-gray-800 text-white outline-none rounded-md py-1 ">
      <input
        disabled={remoteuser == null || isSearching || isDisconnecting}
        ref={messageRef}
        className="w-full  bg-transparent outline-none"
        type="text"
        onInput={handleInput}
      />

      <div
        onClick={() => {
          // handleOnUserTyping(true);
          handleOnSendMessage(messageRef.current?.value);
          messageRef.current!.value = "";

          messageRef.current?.focus();
        }}
        className="w-[60px] md:w-[80px]  flex items-center  justify-center rounded-md  h-full bg-fuchsia-900"
      >
        <img src="/send1.png" className="w-7 h-7 p-1" />
      </div>
    </div>
  </div>

  )
}

export default MessageInput