'use client'
import HeadText from '@/components/HeadText'
import MobileBar from '@/components/MobileBar'
import Sidebar from '@/components/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
  <main className='flex min-h-screen w-full flex-col lg:flex-row bg-[#fdd5c8]  '>
    <Sidebar/>
    <MobileBar/>
    <div className='mt-16 flex-1 overflow-auto py-8 lg:mt-0 lg:max-h-screen lg:py-10'>

  
    <div className='apply max-w-5xl mx-auto px-5 md:px-10 w-full text-dark-400  font-normal text-[16px] leading-[140%]'>
      {/* <HeadText/> */}
    {children }
    </div></div>
   <Toaster/>
  </main>)
}

export default layout