"use client"
import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className=' w-[280px] h-auto overflow-auto lg:flex items-center flex-col gap-2 border-pink-400 border-x-[#ff6198]  p-2 hidden bg-yellow-100 shadow-xl py-4 '>
  <Link href='/' className='w-full h-auto flex items-center justify-center'>
    <Image src="/assets/images/logo-1.png" alt='logo' className='object-contain ' width={125} height={10} />
  </Link>
  <SignedIn>
 <ul className='flex flex-col  gap-4 w-full h-full  ' >
  {navLinks.slice(0,6).map((link)=>{
    
    const  isActive = link.route === pathname;
    return(
      <li key={link.label} className={`  text-center text-white font-md rounded-full overflow-hidden  hover:bg-[#e67aa0]`}>
        <Link href={link.route} className={` p-[10px] flex items-center gap-2 ${isActive ? 'bg-pink-600 text-slate-200' : 'bg-[#fdd5c8] text-slate-600' } font-semibold `} >
          <Image src={link.icon} alt="icon" height={30} width={30} className='brightness-120' />
          {link.label}
        </Link>
      </li>
      )
    
  })}

 
  
    


   
 </ul>
  <ul className='flex flex-col  gap-4 w-full ' >
  {navLinks.slice(6,9).map((link)=>{
    
    const  isActive = link.route === pathname;
    return(
      <li key={link.label} className={` overflow-hidden text-center text-white font-md rounded-full   hover:bg-[#e67aa0] `}>
      <Link href={link.route} className={` p-2 flex items-center justify-center gap-2 ${isActive ? 'bg-pink-600 text-slate-200' : 'bg-[#fdd5c8] text-slate-600' }  font-semibold`} >
        <Image src={link.icon} alt="icon" height={30} width={30} className='brightness-120' />
        {link.label}
      </Link>
    </li>
    )
  })}
   <li className='flex justify-center items-center bg-[#fdd5c8] rounded-full cursor-pointer gap-2 p-4 '>
<UserButton afterSignOutUrl='/' showName  />
  </li>
  </ul>
  </SignedIn>
   <SignedOut>
   <button className='w-full p-[0.8rem] bg-black text-white rounded-full font-semibold hover:bg-slate-800'>
    <Link href='/sign-in'>
Login    
    </Link>
   </button>
    
   </SignedOut>

    </aside>
  )
}

export default Sidebar