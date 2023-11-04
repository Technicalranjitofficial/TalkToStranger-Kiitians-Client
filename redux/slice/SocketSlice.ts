import { createSlice } from "@reduxjs/toolkit";




export interface Message {
    message:string,
    isSender?:boolean,
    createdAt:string;
    isWelcomeMessage?:boolean;
    isConnectionSuccessMessage?:boolean;
    isConnectionClosedMessage?:boolean;
    isConnectionError?:boolean;
    connectionErrorMessage?:string,
    isServerConnected?:boolean,
    isSearching?:boolean,


}

export interface RootState {

    remoteUsersId:string|null; 
    messages:Message[],
    isSearching:boolean,
    isDisconnecting:boolean,
    isUserTyping:boolean,
 
}

const initialState: RootState = {

    remoteUsersId:null,
    messages:[],
    isSearching:false,
    isDisconnecting:false,
    isUserTyping:false,
}

export const SocketSlice = createSlice({
    name:"SocketSlice",
     initialState,
     reducers:{
        setRemoteUsersId:(state,action)=>{
            state.remoteUsersId = action.payload;
        },

        setMessages:(state,{payload}:{payload:Message})=>{
         //push message to messages array
            state.messages.push(payload);
        },

        clearMessages:(state)=>{
            state.messages = [];
        },

        setIsSearching:(state,{payload}:{payload:boolean})=>{
            state.isSearching = payload;
        },

        setIsDisconnecting:(state,{payload}:{payload:boolean})=>{
            state.isDisconnecting = payload;
        },

        setisUserTyping:(state,{payload}:{payload:boolean})=>{
            state.isUserTyping = payload;
        }


     }
})

export const {setRemoteUsersId,setMessages,clearMessages,setIsDisconnecting,setIsSearching,setisUserTyping} = SocketSlice.actions;
export default SocketSlice.reducer;
