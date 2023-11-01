import { clearMessages, setMessages, setRemoteUsersId } from "@/redux/slice/SocketSlice";
import { store } from "@/redux/store";
import { Session, SessionOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { UseSessionOptions } from "next-auth/react";
import { config } from "process";
import { Socket, io } from "socket.io-client";


let socket:Socket;


export const initSocket=(session:Session)=>{

    console.log("run",session);
    if(!session) return;

    // `${process.env.SOCKETURL}/auth/login`

    socket = io(`https://kiitomegle.onrender.com`,{
        query:{
            accessToken:session.backendToken.accessToken,
        }
    });

    
    socket.on("connect",()=>{
        console.log("Socket Connected");
    })

  
    socket.on("exception",(err)=>{
        console.log(err);
    })

    socket.on("joinSuccess",(data)=>{
       
        socket.emit("findUserToJoin",{message:"Find user to join"});
    })

    socket.on("noUser",data=>{
      console.log("No User Found");
    })
    socket.on("userFound",(data)=>{
        console.log(data);
        store.dispatch(setRemoteUsersId(data.remoteId))
    })

    socket.on("userLeft",handleOnChatLeave)


    socket.on("OnMessage",(data)=>{

        const {message,sender} = data;
        if(sender===socket.id) return;
        store.dispatch(setMessages({
            message:message,
            isSender:false,
            createdAt:new Date().toISOString(),
          
        }))
        console.log("New Message",data);
    })




    if(socket){
        return true;
    }




   
}

export const handleOnSendMessage=(message?:string)=>{
    if(!message) return;
    store.dispatch(setMessages({
        message:message,
        isSender:true,
        createdAt:new Date().toISOString()
    }))
    socket.emit("sendMessage",{
        remoteId:store.getState().socketSlice.remoteUsersId,
        message:message,
        
    });
}



export const handleOnChatJoin = ()=>{
    if(socket){
       socket.emit("userIsOnline",{
        message:"User is online",
       })
    }
}

export const checkSocketConnection=()=>{
    console.log(socket);
    if(socket){
        return true;
    }
    return false;
}



export const handleOnChatLeave=(data:any)=>{

    console.log("here");
    store.dispatch(clearMessages())
    console.log("User Left",data);
    store.dispatch(setRemoteUsersId(null))
    socket.emit("findUserToJoin",{message:"Find user to join"});
}

export const handleOnNextButtonClicked=(session:Session)=>{
    // socket.emit("nextButtonClicked",{message:"Find user to join"});
    socket.disconnect();
    store.dispatch(clearMessages());
    store.dispatch(setRemoteUsersId(null))

    initSocket(session)
}

export const handleOnFindOtherUser=()=>{
    socket.emit("findUserToJoin",{message:"Find user to join"});
}