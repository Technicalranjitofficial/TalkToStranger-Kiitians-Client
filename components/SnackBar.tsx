"use client";

import { Alert, AlertColor, Button, IconButton, Snackbar } from "@mui/material";
import React, { use, useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setMessage } from "@/redux/slice/AuthSlice";



// const [close,setClose] = useState(false);


const Message = () => {
    const message = useAppSelector((state)=>state.AuthSlice.message);
const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(setMessage({msg:"",type:"success",open:false}))
  };

  useEffect(() => {
    if(message.open){
        setTimeout(() => {
            dispatch(setMessage({msg:"",type:"success",open:false}))
        }, 3000);
    }
  }
    , [message.open])
  
  return (
    <div>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar open={message.open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity={message.type as AlertColor} sx={{ width: '100%' }}>
    {message.msg}
  </Alert>
</Snackbar>
    </div>
  );
};

export default Message;