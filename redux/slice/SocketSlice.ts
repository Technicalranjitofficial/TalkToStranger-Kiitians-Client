import { createSlice } from "@reduxjs/toolkit";



export interface Message {
    message:string,
    isSender:boolean,
    createdAt:string
}

export interface RootState {

    remoteUsersId:string|null; 
    messages:Message[] 
}

const initialState: RootState = {

    remoteUsersId:null,
    messages:[]
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
        }

     }
})

export const {setRemoteUsersId,setMessages,clearMessages} = SocketSlice.actions;
export default SocketSlice.reducer;
