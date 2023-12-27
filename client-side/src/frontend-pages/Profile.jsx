import React from 'react'
import { useSelector } from 'react-redux';

export default function Profile() {
  const {currentUser} = useSelector( (state)=>state.user );
  return (
    <div className='p-3'>
      <h1 className='text-center text-4xl font-semibold py-16'>User Profile</h1>
      <form className='flex flex-col gap-4 max-w-lg mx-auto'>
        <img src={currentUser.picture} alt='profile picture' className='rounded-full w-24 h-24
           object-cover cursor-pointer self-center ' /> {/* name "picture" refer to model */} 
        <input type='text' id='userName' placeholder='Your username' className='border rounded-lg p-3 '></input>
        <input type='email' id='email' placeholder='email' className='border rounded-lg p-3'></input>
        <input type='text' id='password' placeholder='password' className='border rounded-lg p-3'></input>
        <button className='bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-400 disabled: opacity-70'>Update your profile</button>
      </form>
      <div className='flex justify-center mt-5 max-w-lg mx-auto'>
        <p className='text-blue-600 cursor-help'>Want to delete your account?</p>
        <p className='text-blue-600 cursor-pointer ml-10'>Logout</p>
      </div>
    </div>
  )
}
