import { createSlice } from "@reduxjs/toolkit";




export interface Message {
 
        msg:string,
        type:"error"|"warning"|"info"|"success",
        open:boolean,
    

}

export interface RootState {
    loading:boolean;
    message:Message,
    errMessage:string,

}

const initialState: RootState = {

    loading:false,
    message:{
        msg:"",
        open:false,
        type:"success"
    },
    errMessage:""

}

export const SocketSlice = createSlice({
    name:"SocketSlice",
     initialState,
     reducers:{
       
        setIsLoading:(state,action)=>{
            state.loading = action.payload;
        },
        setMessage:(state,{payload}:{payload:Message})=>{
            state.message =payload;
        },
        setErrorMessage:(state,{payload}:{payload:string})=>{ 
            state.errMessage = payload;
        }

     }
})

export const {setIsLoading,setMessage,setErrorMessage} = SocketSlice.actions;
export default SocketSlice.reducer;
