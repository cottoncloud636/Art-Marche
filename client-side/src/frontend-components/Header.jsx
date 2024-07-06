import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa' //Fa: font awesome
import { Link, useNavigate } from 'react-router-dom'; //allows user goto different pages thru a button or a link w/o refreshing the pagee
import { useSelector } from 'react-redux';

export default function Header() {
  const svgData = `<svg xmlns="http://www.w3.org/2000/svg"><defs><pattern id="a" width="20" height="40" patternTransform="scale(2)" patternUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="hsla(54, 100%, 86%, 1)"/><path fill="none" stroke="hsla(187, 72%, 76%, 1)" d="M0 30h20L10 50zm-10-20h20L0 30zm20 0h20L20 30zM0-10h20L10 10z"/></pattern></defs><rect width="800%" height="800%" fill="url(#a)"/></svg>`;
  const encodedSVG = `url("data:image/svg+xml;utf8,${encodeURIComponent(svgData)}")`;
  const navigate = useNavigate();//define a variable so that I can use "useNavigate()"
  const {currentUser} = useSelector(state => state.user); //extract current user from userSlice, name of 
                                           //the var. all come from userSlice.js
  const [keyword, setKeyword] = useState('');  
  
  //location is an obj, it contains info about the current URL of the document. It can be used to get various
  // parts of the URL, such as the hostname, pathname, and search parameters.
  const handleSubmit = (e)=>{
    e.preventDefault();
    const urlsearchParams = new URLSearchParams(window.location.search);//catch the search criteria entered by user
    urlsearchParams.set('keyword', keyword); //set(name: xxx, value: xxx)
    const query = urlsearchParams.toString(); //convert all query to a string format
    navigate(`/search?${query}`);//whenever a query is entered, change the url to display its new params accordingly
  };

  //in order to reflect the search criteria from the url to the search bar, use "useEffect" to trigger this effect
  useEffect(()=>{
    const urlsearchParams = new URLSearchParams(window.location.search);//catch the search criteria from url
    const searchParamsInURL = urlsearchParams.get('keyword'); //set(name: string)
    if (searchParamsInURL){
      setKeyword(searchParamsInURL);
    }
  }, [location.search]); //display this effect when location obj's query string change
  /*
   *1) w-24 sm:w-52 -- start from mobile input box should be width 24, start from small all the way up to laptop size, width should be 52
   */
  return (
    <header style={{backgroundImage: encodedSVG}} className='shadow-md h-48'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-12'> {/*flex brings all items side by side. justify-between create space between each item. items-center: brings all items vertically down to center. mx: margin. p: padding */}
          <Link to='/'>
            <h1 className='font-bold text-sm sm:text-6xl font-head text-violet-800 animate-pulse pulse-slow flex 
                          flex-wrap' >Art Marché
            </h1> {/* text-sm and sm:text-6xl are for responsiveness purpose, text-sm: for mobile size, sm:text-6xl: meaning after the mobile, this is the size we need to use. Same as flex-wrap, when in mobile, this feature enables boxes to wrap to the next line. In order to use it, we first need to call flex*/}
          </Link>

          <form onSubmit={handleSubmit} className='bg-slate-100 p-1.5 rounded-xl flex items-center'>
            <input type='text' 
              placeholder='Search here' 
              className='bg-transparent focus:outline-none w-24 sm:w-52'
              value={keyword}
              onChange = {(e)=>setKeyword(e.target.value)}
              />

            <button><FaSearch className='text-slate-600'/></button>     
          </form>

          <ul className='flex gap-8 '>
          <Link to='/'>
            <li className='hover:tracking-wider hover:underline text-xl font-semibold text-indigo-900 font-nav'>Home</li>
          </Link>

          <Link to='/about'>
            <li className='hover:tracking-wider hover:underline text-xl font-semibold text-indigo-900 font-nav'>About</li>
          </Link>

          {/* if user logged in, display profile photo. else show wording "login" */}
          <Link to='/profile'>
            {currentUser? (<img src={currentUser.picture} alt='profile picture' className = 'rounded-full h-8 w-8 object-cover'/>) //name "picture" came from key name in auth.controllers.js
              :  (<li className='hover:tracking-wider hover:underline text-xl font-semibold text-indigo-900 
                font-nav'>Login</li>)
            }
          </Link>
          </ul>
        </div>

    </header>
  )
}


