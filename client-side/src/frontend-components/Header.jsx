import React from 'react'
import {FaSearch} from 'react-icons/fa' //Fa: font awesome
import { Link } from 'react-router-dom'; //allows user goto different pages thru a button or a link w/o refreshing the pagee

export default function Header() {
  const svgData = `<svg xmlns="http://www.w3.org/2000/svg"><defs><pattern id="a" width="20" height="40" patternTransform="scale(2)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="hsla(54, 100%, 86%, 1)"/><path fill="none" stroke="hsla(187, 72%, 76%, 1)" d="M0 30h20L10 50zm-10-20h20L0 30zm20 0h20L20 30zM0-10h20L10 10z"/></pattern></defs><rect width="800%" height="800%" fill="url(#a)"/></svg>`;
  const encodedSVG = `url("data:image/svg+xml;utf8,${encodeURIComponent(svgData)}")`;


  return (
    <header style={{backgroundImage: encodedSVG}} className='shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-5'> {/*flex brings all items side by side. justify-between create space between each item. items-center: brings all items vertically down to center. mx: margin. p: padding */}
          <Link to='/'>
            <h1 className='font-bold text-sm sm:text-6xl font-head text-violet-800 animate-pulse pulse-slow flex 
                          flex-wrap' >Art Marché
            </h1> {/* text-sm and sm:text-6xl are for responsiveness purpose, text-sm: for mobile size, sm:text-6xl: meaning after the mobile, this is the size we need to use. Same as flex-wrap, when in mobile, this feature enables boxes to wrap to the next line. In order to use it, we first need to call flex*/}
          </Link>
          <form className='bg-slate-100 p-1.5 rounded-xl flex items-center'>
            <input type='text' placeholder='Search here' className='bg-transparent focus:outline-none w-24 sm:w-52'/>{/*w-24 sm:w-52 -- start from mobile input box should be width 24, start from small all the way up to laptop size, width should be 52 */}
            <FaSearch className='text-slate-600'/>
          </form>

          <ul className='flex gap-8'>
          <Link to='/'>
            <li className='hover:underline text-xl font-semibold text-indigo-900 font-nav'>Home</li>
          </Link>

          <Link to='/about'>
            <li className='hover:underline text-xl font-semibold text-indigo-900 font-nav'>About</li>
          </Link>

          <Link to='/login'>
            <li className='hover:underline text-xl font-semibold text-indigo-900 font-nav'>Login</li>
          </Link>
          </ul>
        </div>

    </header>
  )
}
