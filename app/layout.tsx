import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MenuAppBar from '@/components/MenuAppBar'
import Providers from './Provider'
import Message from '@/components/SnackBar'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Matcher | Chat with strangers',
  description: 'Matcher is a chat app where you can chat with strangers, make new friends and have fun',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body  className={` absolute inset-0  bg-[#101418] overflow-y-hidden
        scrollbar-thin scrollbar-thumb-cyan-600
      
      `}>
<Providers>
  <Message/>
   
     <div className='w-full  h-full  flex flex-col '>

     <div className='h-[8%] items-center '>
  <MenuAppBar/>
 
     </div>

<div className='h-[92%]'>

{children}
</div>

     </div>
      
</Providers>
        </body>
    </html>
  )
}
