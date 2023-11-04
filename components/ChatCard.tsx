import { Message } from '@/redux/slice/SocketSlice'
import { Merriweather, Montserrat, Roboto } from 'next/font/google'
import React from 'react'

import {motion} from "framer-motion"

const roboto = Merriweather({
    weight: '900',
    subsets:['cyrillic']
  })
  const montSerrat = Montserrat({
    weight: '500',
    subsets:['cyrillic']
  })

const ChatCard = ({message}:{message:Message}) => {
  return (
    <motion.div initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{opacity:{duration:0.2}}} style={{
      originX:message.isSender?1:0,
    }} className={` ${message.isSender?"justify-end":""} my-2 h-auto flex `}>
       <div className={`w-auto min-w-[100px] flex ${message.isSender?" items-end":""} flex-col py-3 pl-2 pr-5 ${message.isSender?"rounded-tl-3xl ":"rounded-tr-3xl"}  border border-gray-800 flex flex-col ${message.isSender?"bg-blue-800":"bg-gray-800"}`}>
       <div>
            <h1 style={roboto.style} className='text-white'>{message.isSender?"You":"Stranger"}</h1>

        </div>
        <div>
            <h1 style={montSerrat.style} className='text-white mt-1 text-sm'>
                {message.message}
                </h1>
            </div>

       </div>
    </motion.div>
  )
}

export default ChatCard