"use client";
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import React   from 'react'

const Page = () => {
  const session = useSession();
  return (

    <div className="bg-transparent h-full p-3 flex items-center justify-center">
    <div className="bg-transparent border border-gray-700 rounded-lg shadow-lg p-8 w-96">
      <h1 className="text-3xl font-extrabold text-gray-300 mb-4">Welcome to ChatApp</h1>
      <p className="text-gray-400 mb-8">Connect with friends and chat in real-time!</p>
      <div className="flex items-center justify-between mb-6">
        {!session.data?.user?<Link href="/signup" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full mr-4">
          Sign Up Now
        </Link>
        :<Link  href="/chat" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full mr-4">
        Join Chat
      </Link>
      }
      </div>
      {!session.data?.user && <div className="text-gray-300">
        <p>Already a member? <Link href="/signin" className="text-blue-500 hover:underline">Log In</Link></p>
      </div>}
    </div>
  </div>
  )
}

export default Page