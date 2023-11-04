import { Message } from "@/redux/slice/SocketSlice";
import { handleOnFindOtherUser } from "@/socket/socket";
import React from "react";

const WelcomeMessage = ({ message }: { message: Message }) => {
  return (
    <div className="w-full flex-col gap-3 flex items-center my-2  justify-center h-auto min-h-[100px] bg-transparent border border-gray-700 rounded-md text-white">
      <div
        className={`${
          message.isConnectionSuccessMessage
            ? "text-green-400"
            : message.isConnectionError || message.isConnectionClosedMessage
            ? "text-red-400"
            : "text-white"
        }`}
      >
        <h1>{message.message}</h1>
      </div>

      {message.isServerConnected && (
        <div>
          <p>
            Please start matching by clicking{" "}
            <button onClick={() => handleOnFindOtherUser()}>here</button>
          </p>
        </div>
      )}

      {message.isConnectionSuccessMessage && (
        <div>
          <p>Start a conversation by sending a Hello Message!</p>
        </div>
      )}

      {message.isConnectionClosedMessage && (
        <div>
          <p>Find new User</p>
        </div>
      )}

      {message.isConnectionError && (
        <div>
          <p>Server Error</p>
        </div>
      )}
    </div>
  );
};

export default WelcomeMessage;
