import MobileBar from '@/components/MobileBar'
import Sidebar from '@/components/Sidebar'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
  <main className=' w-full h-screen flex lg:flex-row flex-col bg-[#fdd5c8]  '>
    <Sidebar/>
    <MobileBar/>
    <div className='wrapper flex flex-col p-4'>
    {children }
    </div>
   
  </main>
  )
}

export default layout