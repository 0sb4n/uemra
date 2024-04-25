import MobileBar from '@/components/MobileBar'
import Sidebar from '@/components/Sidebar'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
  <main className=' w-full h-fit min-h-screen flex lg:flex-row flex-col bg-[#fdd5c8]  '>
    <Sidebar/>
    <MobileBar/>
    <div className='wrapper flex flex-col px-8 gap-1  justify-center'>
    {children }
    </div>
   <Toaster/>
  </main>)
}

export default layout