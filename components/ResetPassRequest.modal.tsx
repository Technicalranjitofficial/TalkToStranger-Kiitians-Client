

import {  SendResetPasswords, handleOnVerifyEmail } from "@/ServerActions/User";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setErrorMessage, setIsLoading, setMessage } from "@/redux/slice/AuthSlice";
import { useRef } from "react";

export function ResetPassRequestModal() {


    const loading = useAppSelector((state)=>state.AuthSlice.loading);
    const errorMessage = useAppSelector((state)=>state.AuthSlice.errMessage);

    const emailRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();

    const handleOnReset=async()=>{
        if(!emailRef.current?.value) return;
        dispatch(setErrorMessage(""));
        dispatch(setIsLoading(true))
        const res = await SendResetPasswords(emailRef.current?.value);
        console.log(res);

        if(res.statusCode==200){
            emailRef.current.value="";
        }
        dispatch(setMessage({msg:res.message,type:res.statusCode==200?"success":"error",open:true}))
        dispatch(setErrorMessage(res.message));
        dispatch(setIsLoading(false));
    }

  return (
    <Dialog >
      <DialogTrigger asChild className="pb-2">
        {/* <Button variant="outline">Share</Button> */}
        <p className="text-blue-400 cursor-pointer">Forget password?</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#101418] text-white">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Enter your email address and we will send you a link to reset your
            password.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              ref={emailRef}
            />
          </div>
          
        </div>

       {errorMessage && errorMessage.length>0 &&  <span className="pl-2 text-green-500">{errorMessage}</span>}
        <DialogFooter className="sm:justify-start">
         
            
        <button
        onClick={handleOnReset}
        disabled={loading}
        className="text-white flex items-center justify-center focus:outline-none  font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center bg-transparent border border-slate-700 hover:bg-gray-800 "
      >
         {loading?<div role="status">
<svg aria-hidden="true" className="w-8 h-8 mr-2  animate-spin text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
</svg>
<span className="sr-only">Loading...</span>
</div>:"Verify"}
      </button>
               
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
