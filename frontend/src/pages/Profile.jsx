import React from 'react'
import {useSelector } from 'react-redux'

export default function Profile  ()  {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-l '>
      <h1 className='text-3xl font-semibold m-7 text-center'>User Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.profile_picture} alt="" 
        className='h-24 w-24 self-center cursor-pointer
        rounded-full object-cover'/>

        <input defaultValue={currentUser.username} type="text" id='username' placeholder='
        Username' className='bg-slate-200 rounded-lg p-3'/>
        <input defaultValue={currentUser.email} type="text" id='email' placeholder='
        Email' className='bg-slate-200 rounded-lg p-3'/>
        <input type="text" id='password' placeholder='
        Password' className='bg-slate-200 rounded-lg p-3'/>
        
        <button className='bg-slate-700 text-white p-3 rounded-lg *:uppercase hover:opacity-95
        disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

