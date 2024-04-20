import React from 'react'
import { useToast } from './ui/use-toast'
import {CldUploadWidget} from "next-cloudinary"
import Image from 'next/image'
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
}) => {
    const {toast} = useToast();
const onUploadSuccessHandler=(result:any)=>{
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
<h3 className='text-3xl font-bold text-pink-700'>Originel</h3>
{publicId ? (<>HERE IS THE IMAGE</>) : (<div className='flex flex-col' onClick={()=>open()}>HERE IS NO IMAGE
<div className=' flex items-center mt-4 justify-center flex-col lg:w-full md:w-[70%] p-4 h-32 rounded-md border-[1px] border-yellow-600 '><Image src="/assets/icons/add.svg" alt="add image" width={24} height={24}/>
<p> click here to upload image</p>
</div>
</div> )}
  </div>
)}
</CldUploadWidget>
  )
}

export default MediaUploader