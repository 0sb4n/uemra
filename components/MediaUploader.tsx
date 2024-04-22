"use client"
import React from 'react'
import { useToast } from './ui/use-toast'
import {CldImage, CldUploadWidget} from "next-cloudinary"
import Image from 'next/image'
import { dataUrl, getImageSize } from '@/lib/utils'
// import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
type MediaUploaderProps = {
  onValueChange: (value: string) => void,
  setImage:React.Dispatch<any>
publicId:string;
image:any,
type:string
}
const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type
}:MediaUploaderProps) => {
    const {toast} = useToast();
const onUploadSuccessHandler=(result:any)=>{
  setImage((prevState:any)=>({
    ...prevState,
    publicId: result?.info?.public_id,
    width: result?.info?.width,
    height: result?.info?.height,
    secureUrl:result?.info?.secure_url

  }))
  onValueChange(result?.info?.public_Id);
  toast({
    title:"image Uploaded SuccessFully",
    description:"1 credit was deducted from your account",
    duration:5000,
    className:'bg-red-400'
  })
}
const onUploadErrorHandler=()=>{
  toast({
    title:"something went wrong",
    description:"please re-upload the image",
    duration:5000,
    className:'bg-red-400'
  })

}
  return (
<CldUploadWidget
uploadPreset='AI-uemra'
options={{
  multiple:false,
  resourceType:"image"
}}
onSuccess={onUploadSuccessHandler}
onError={onUploadErrorHandler}
>
{({open})=>(
  <div className='flex flex-col gap-4 '>
<h3 className='text-3xl font-bold text-pink-700'>Original</h3>
{publicId ? (<>
<div className='cursor-pointer overflow-hidden rounded-[10px]'>
<CldImage 
width={getImageSize(type,image,"width")}
height={getImageSize(type,image,"height")}
src={publicId}
alt='image'
sizes={"(max-width:767px),100vw, 50vw"}
placeholder={dataUrl as PlaceholderValue}
className='bg-red-400'/>

</div>

</>) : (
<div className=' h-fit min-h-72 border-dashed border-2 rounded-[16px] flex flex-col justify-center items-center' onClick={()=>open()}>
<div ><Image src="/assets/icons/add.svg" alt="add image" width={24} height={24}/>
</div>
<p> click here to upload image</p>
</div> )}
  </div>
)}

</CldUploadWidget>
  )
}

export default MediaUploader