import { createSlice } from "@reduxjs/toolkit";




export interface Message {
    message:string,
    isSender?:boolean,
    createdAt:string;
    isWelcomeMessage?:boolean;
    isConnectionSuccessMessage?:boolean;
    isConnectionClosedMessage?:boolean;
    isConnectionError?:boolean;
    connectionErrorMessage?:string


}

export interface RootState {

    remoteUsersId:string|null; 
    messages:Message[],
    isSearching:boolean,
    isDisconnecting:boolean,
    

 
}

const initialState: RootState = {

    remoteUsersId:null,
    messages:[],
    isSearching:false,
    isDisconnecting:false
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
        }


     }
})

export const {setRemoteUsersId,setMessages,clearMessages,setIsDisconnecting,setIsSearching} = SocketSlice.actions;
export default SocketSlice.reducer;
