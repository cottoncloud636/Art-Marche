import React from 'react'
import {Link} from 'react-router-dom';

export default function Register() {
  return (
    <div className='h-screen w-screen bg-gradient-to-r from-pink-200 to-purple-400 opacity-80 mx-auto '>{/* mx: margin */}

      <h1 className='text-center text-4xl font-semibold py-16'>User Login</h1> {/* my-16: apply margin only to top */}
      <form className='flex flex-col gap-4 items-center justify-center' > {/* items-center results form sit in center horizontally */}
        <input type='text' id='username' placeholder='Username' 
          className='border rounded-lg h-12 w-64 p-4' 
        />
        <input type='text' id='email' placeholder='Email' 
          className='border rounded-lg h-12 w-64 p-4'
        />
        <input type='text' id='password' placeholder='Password' 
          className='border rounded-lg h-12 w-64 p-4'
        />
        <button className='bg-purple-900 text-white p-3 rounded-lg hover:bg-blue-600 disabled: opacity-70 w-64' >Register</button>
      </form>
      
      <div className='flex justify-center gap-3 mt-5'>
        <p className='font-semibold font-'>Already a user?</p>
        <Link to={"/login"}>
          <span className='text-purple-900 font-semibold hover:tracking-wider hover:underline'>Login</span>
        </Link>
      </div>

    </div>
  )
}
