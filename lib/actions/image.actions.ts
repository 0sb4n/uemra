'use server'

import { revalidatePath } from "next/cache";
import { connectToDb } from "../database/mongoose"
import { handleError } from "../utils"
import User from "../database/models/user.model";
import Image from "../database/models/image.model"

import {redirect } from "next/navigation";
const populateUser = (query:any)=>query.populate({
path:'author',
model:User,
select:'_id firstName lastName'
})
export async function addImage({image,userId,path}:AddImageParams){
    try {
        await connectToDb();
        const author = await User.findById(userId);
        if (!author) throw new Error("User not found");
        const newImage = await Image.create({
            ...image,author:author._id
        })
        revalidatePath(path);
        return JSON.parse(JSON.stringify(newImage));
    } catch (error) {
        handleError(error)
    }
}export async function updateImage({image,userId,path}:UpdateImageParams){
    try {
        await connectToDb();
        const imageToUpdate = await Image.findById(image._id);
        if(!imageToUpdate || imageToUpdate.author.toHexString() !== userId){
            throw new Error("Unauthorized or Image not found")
        }
        const updatedImage = await Image.findByIdAndUpdate(
            imageToUpdate._id,
            image,
            {new:true}
        )
        revalidatePath(path);
        return JSON.parse(JSON.stringify(image));
    } catch (error) {
        handleError(error)
    }
}
export async function deleteImage(imageId:string){
    try {
        await connectToDb();
        await Image.findByIdAndDelete(imageId)
       
    } catch (error) {
        handleError(error)
    }finally{
    redirect('/')
    }
    
}
export async function getImageById(imageId:string){
    try {
        await connectToDb();
    const image = await populateUser(Image.findById(imageId));
    if(!image)throw new Error('Image not found')
    } catch (error) {
        handleError(error)
    }
}