"use server";

require("dotenv").config();
import { TSignUpSchema, signupSchema } from "@/utils/zod/zod";

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

    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
  });
  return{
    status:res.status,
  }
  
};
