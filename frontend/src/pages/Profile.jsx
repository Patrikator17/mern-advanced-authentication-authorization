import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import {useSelector } from 'react-redux'
import {getDownloadURL, ref, getStorage, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { v4 as uuidv4 } from 'uuid';

export default function Profile  ()  {
  const fileRef = useRef(null)
  const {currentUser} = useSelector((state) => state.user)
  const [image, setImage] = useState(undefined)
  const [imagePercent, setImagePercent] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({})
  console.log(formData);



  useEffect(()=>{
    if(image){
      handleFileUpload(image)
    }
  }, [image])
  const handleFileUpload = async(image)=>{
    const storage = getStorage(app)
    const fileName = uuidv4();
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
        setImagePercent(Math.round(progress))
      },
    
    (error) => {
        setImageError(true)
    },

    () =>{
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL) => {
        setFormData({...formData, profile_picture: downloadURL})
      })
    }
    )
  }
  return (
    <div className='p-3 max-w-l '>
      <h1 className='text-3xl font-semibold m-7 text-center'>User Profile</h1>

      <form className='flex flex-col gap-4'>

        <input 
        type="file" 
        ref={fileRef} 
        hidden accept='image/*'
        onChange={(e) => setImage(e.target.files[0])}/>

        <img 
        src={formData.profile_picture || currentUser.profile_picture} 
        alt="" 
        className='h-24 w-24 self-center cursor-pointer rounded-full object-cover'
        onClick={() => fileRef.current.click()}/>

        <p className='text-sm self-center'>
          {imageError ? (
              <span className='text-red-700'>
                Error uploading image (file size must be less than 2 MB)
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span className='text-green-700'>Image uploaded successfully</span>
            ) : (
              ''
            )}
        </p>

        <input 
        defaultValue={currentUser.username} 
        type="text" 
        id='username' 
        placeholder='Username' 
        className='bg-slate-200 rounded-lg p-3'/>

        <input 
        defaultValue={currentUser.email} 
        type="text" 
        id='email' 
        placeholder='Email' 
        className='bg-slate-200 rounded-lg p-3'/>

        <input 
        type="text" 
        id='password' 
        placeholder='Password' 
        className='bg-slate-200 rounded-lg p-3'/>
        
        <button 
        className='bg-slate-700 text-white p-3 rounded-lg *:uppercase hover:opacity-95 :opacity-80'>Update</button>
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

