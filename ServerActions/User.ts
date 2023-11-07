"use server";

require("dotenv").config();
import { TLoginSchema, TSetNewPasswordSchema, TSignUpSchema, setNewPasswordSchema, signupSchema } from "@/utils/zod/zod";

export const signup = async (data: TSignUpSchema) => {
  console.log(data);

  const safeParseData = signupSchema.safeParse(data);
  let zodErrors = {};
  if (!safeParseData.success) {
    safeParseData.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return {
      errors: zodErrors,
    };
  }
  const res = await fetch(`${process.env.SOCKETURL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache:"no-cache",

    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
  });
  const getRes = await res.json();
  console.log(getRes);
  return getRes;
};

export const login = async (data: TLoginSchema) => {
  console.log(data);

  const safeParseData = signupSchema.safeParse(data);
  let zodErrors = {};
  if (!safeParseData.success) {
    safeParseData.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return {
      errors: zodErrors,
    };
  }

  try {
    const res = await fetch(`${process.env.SOCKETURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache:"no-cache",

      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const getRes = await res.json();
    if (res.status == 200) {
      return {
        data: getRes,
        statusCode: 200,
        message: "Logged In Successfully",
      };
    }
    return {
      statusCode: res.status,
      message: "Invalid Credientials!",
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "Internal Server Error",
    };
  }
};

export const handleOnVerifyEmail = async (token: string, otp: string) => {
  try {
    const res = await fetch(`${process.env.SOCKETURL}/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache:"no-cache",

      body: JSON.stringify({
        token,
        otp: parseInt(otp),
      }),
    });

    const getRes = await res.json();
    console.log(getRes);
    return getRes;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};


export const hadleOnVerifyToken = async (token: string) => {
  try {
    const res = await fetch(`${process.env.SOCKETURL}/auth/reset-validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache:"no-cache",

      body: JSON.stringify({
        token,
      }),
    });

    const getRes = await res.json();
    return getRes;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
}

export const SendResetPasswords =async(email:string)=>{
  try {
    console.log(process.env.SOCKETURL);
    const res = await fetch(`${process.env.SOCKETURL}/auth/reset-request`,{
      method:"POST",
      cache:"no-cache",
      headers:{
        "Content-Type":"application/json"
      },
      
      body:JSON.stringify({
        email:email
      })
    
    });

    console.log(res);

    if(res.status==400){
      return {
        statusCode:res.status,
        message:"Internal Server Error"
      }
    }
  
    if(res.status===200){
      return await res.json();
    }else{
      return {
        statusCode:res.status,
        message:"Invalid Email"
      }
    }
    
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error");
  }
}



export const setNewPassword = async (token: string) => {
  try {

    
    const res = await fetch(`${process.env.SOCKETURL}/auth/setpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache:"no-cache",

      body: JSON.stringify({
        token,
      }),
    });

    const getRes = await res.json();
    console.log(getRes);
    return getRes;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};



export const handleOnSetNewPassword = async (data: TSetNewPasswordSchema,token:string) => {
  console.log(data);

  const safeParseData = setNewPasswordSchema.safeParse(data);
  let zodErrors = {};
  if (!safeParseData.success) {
    safeParseData.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return {
      errors: zodErrors,
    };
  }
  const res = await fetch(`${process.env.SOCKETURL}/auth/set-new-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache:"no-cache",

    body: JSON.stringify({
      password: data.password,
      token:token
    }),
  });
  const getRes = await res.json();
  console.log(getRes);
  return getRes;
};