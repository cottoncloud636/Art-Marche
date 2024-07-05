import React from 'react'
import { useSelector } from 'react-redux';
import {useRef} from 'react';
import { useState } from 'react';
import { useEffect } from 'react'; 
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {app} from '../../src/firebaseConfig.js';
import { updateUserProfileStart, updateUserProfileSuccess, updateUserProfileFail, deleteUserAcctStart, deleteUserAcctSuccess, deleteUserAcctFail, logoutUserAcctStart, logoutUserAcctSuccess, logoutUserAcctFail } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser, loading, error} = useSelector( (state)=>state.user ); //select from userSlice.js
  const [file, setFile] = useState(undefined); //use a local state to keep track of file change
  const [imgUploadPer, setImgUploadPer] = useState(0);
  // console.log(file); -- for test purpose: to see how the file changes 
  // console.log(imgUploadPer);
  const [imgUploadError, setImgUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  console.log(formData); //-- for test purpose: to see how form data changes
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();

  const [displayUploadsError, setDisplayUploadsError] = useState(false);
  const [userUploads, setUserUploads] = useState([]);
  console.log('userUplods:'+userUploads);

  const [deleteError, setDeleteError] = useState(false);
  

  //use useEffect to perform side effects of this UI: if detect file, then upload to the page
  useEffect( ()=>{
    if(file) {
      handleFileUpload(file);
      }
    }, [file] );// The [file] array is a dependency means that this effect is dependent on the file variable. 
              //If file changes between renders (for instance, due to user interaction), the code within the
              //useEffect will be executed again.

  const handleFileUpload=(file)=>{
    //1. get the storage ( a container) from 
    const storage = getStorage(app); //create a Firebase storage instance so that I can perform various ops,
                                     //here, I want to upload the image. "app" is the storage name
    const fileName = new Date().getTime()+ file.name; //"name" is a DOM attribute, S.A. <input type="text" id="myInput" name="username" />
                                              //add data is to create a unique identifier for file name
    const storageRef = ref(storage, fileName);//create a place so that we knwo where we put the file
    const upload = uploadBytesResumable(storageRef, file);//create a percentage mechanism to display 
                                                    //the perc later on the screen for uploading img and errors might occur
    upload.on('state_changed', (snapshot)=>{//use on() method which listens to events, track state changes during the upload process.
                        //'state_change' is the event being listened to. 'snapshot' represents the current state
                        // of the upload at the moment the event is triggered.
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Loading... ${progress}%`);//for test purpose: check if progress display 
      setImgUploadPer(Math.round(progress));
      },
      (error)=>{
        setImgUploadError(error);
      },
    
    //retrieve img from the path stored in Storage that I set up earlier
    ()=>{
      getDownloadURL(upload.snapshot.ref).then( (downloadedURL)=>
        setFormData({
          ...formData,
          picture: downloadedURL//for picture, use the URL we just downloaded
        })
       )
    })
 
  };

  const handleChange = (event)=>{
    setFormData({
      ...formData,
      [event.target.id]: event.target.value //returns the name of the variable, not the value, [] allows property name to be determined dynamically at runtime
    });
  };

  const handleSubmit = async (event)=>{
      event.preventDefault();
      try {
        dispatch(updateUserProfileStart());
        //this _id in currentUser._id came from the cookie info in session, currentUser came from the result of useSeletor (the redux store)
        const res = await fetch(`/api/user/update/${currentUser._id}`, 
            {                        
              method: 'POST',
              headers:{'Content-Type': 'application/json'},
              body: JSON.stringify(formData),
            }
        );
        const data = await res.json();
        //if failed to receive the data from server, then dispatch the error to redux and return directly
        if (data.success===false){  //the "success" came from index.js middleware
          dispatch(updateUserProfileFail(data.message));
          return;
        }
        //else dispatch the data to redux 
        dispatch(updateUserProfileSuccess(data));
        setUpdateSuccess(true);
      } catch (error) {
        dispatch(updateUserProfileFail(error.message)); //if login failed due to certain error, dispatch the 
        //updateUserProfileFail method with its error message to redux store.
      }
  };

  const handleDeleteUser = async ()=>{
    try {
      dispatch(deleteUserAcctStart());
      const res = await fetch (`/api/user/delete/${currentUser._id}`, 
        {
          method: 'DELETE', //in DELETE request, I don't care to pass the heeade and body, I just need 
                            //server to find the acct based on id and delete it.
        }
      );
      //then in order to let "delete" take effect accross the website, dispatch the action to redux store
      const data = await res.json();
      if (data.success===false){
        dispatch(deleteUserAcctFail(data.message));
        return;
      }
      dispatch(deleteUserAcctSuccess(data));
    } catch (error) {
      dispatch(deleteUserAcctFail(error.message));
    }
  };

  const handleLogout = async ()=>{
    try{
      dispatch(logoutUserAcctStart());
      const res = await fetch('/api/auth/logout');
      const data = await res.json();
      //then in order to let "logout" take effect accross the website, dispatch the action to redux store
      if (data.success === false){ //success came from index.js middleware
        dispatch(logoutUserAcctFail(data.message));
        return;
      }
      dispatch(logoutUserAcctSuccess(data));
    } catch(error){
      dispatch(logoutUserAcctFail(data.message));

    }
  };

  const handleDisplayUploads = async ()=>{
    try {
      setDisplayUploadsError(false);
      //fetch the upload info from API route that I set up for retriving listing that user created
      const res = await fetch(`api/user/user-art-listing/${currentUser._id}`); //currentUser came from userSlice.js
      const data = await res.json();//retrieve json response from the API call and convert it to JS object
      if (data.success===false){//success came from index.js line 42 the response format from API call
        setDisplayUploadsError(true);
        return;
      }
      console.log("data:"+data);
      setUserUploads(data); 

    } catch (error) {
      //need a state to track the error
      setDisplayUploadsError(true);
    }
  };

  const handleDeleteList = async (uploadlistId)=>{
    try {
      const res = await fetch(`/api/listing/deletelist/${uploadlistId}`, {
        method: "DELETE",
      });
      const data = res.json();
      if (data.success===false){
        setDeleteError(true);
        return;
      }
      //else if data is successfully converted to js obj, meaning server successfully send back a response 
      //then display the rest of the listing on the screen except the deleted one
      //prev is a param represent an array contains all previous and current userUploads list value, then fiter
      //takes each list from this array and filter out the value based on the condition
      setUserUploads( (prev)=>prev.filter( (list)=>list._id != uploadlistId) );
    } catch (error) {
      setDeleteError(true);
    }
  };
  /*
  Filebase storage rules: 
      allow read;
      allow write: if
      request.resource.size <2048*2048 && request.resource.contentType.matches('image/.*')
  */
  return (
    <div className='p-3'>
      <h1 className='text-center text-4xl font-semibold py-16'>User Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-lg mx-auto'>
          {/* 1) type set as "file" display a btn on screen for us to choose file from our computer
        however, I need to achieve when I click the image, a window pop up to choose file from.
        To achieve, I can use this "file" type as a ref -- Use "useRef" in React to achieve this see Note #19.
        2) files is a property from <input> HTML element
        */}
        <input type='file' ref={fileRef} onChange={ (event) => setFile(event.target.files[0])} hidden accept='image/*' />
        {/* if formData.picture exist, then display it, else keep the current profile picture */}
        <img src={formData.picture || currentUser.picture} alt='profile picture' onClick={ ()=>fileRef.current.click() } 
           className='rounded-full w-24 h-24 object-cover cursor-pointer self-center ' /> {/* name "picture" refer to model */} 
        {/* display the upload progress on screen. If upload fail, show red words. Else if upload
            is in progress, show green words. Else if upload successful, show blue words. Else (for ex. 
            no picture is chosen, or picture format is wrong, display null on screen)  */}
        <p className='text-sm self-center font-style: italic'>
          {imgUploadError ? (<span className='text-red-600'>Something wrong, profile pricture must be an image and smaller than 4MB</span>) 
                            : imgUploadPer>0 && imgUploadPer<100 ? (<span className='text-green-500'>{`Uploading... ${imgUploadPer}`}</span>)
                              : imgUploadPer===100? (<span className='text-blue-600'>Upload successful!</span>) 
                                : ''
          }
        </p>

        <input type='text' id='userName' placeholder='Your username' defaultValue={currentUser.userName} 
          onChange={handleChange}
          className='border rounded-lg p-3 '></input>
        <input type='email' id='email' placeholder='email' defaultValue={currentUser.email}
          onChange={handleChange}
          className='border rounded-lg p-3'></input>
        <input type='password' id='password' placeholder='password' 
          onChange={handleChange}
          className='border rounded-lg p-3'></input>
        <button disabled={loading} className='bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-400 disabled: opacity-70'>
          {loading ? 'One moment please...' : 'Update your profile'}</button>
        <Link to={'/list-art'}>
          <button disabled={loading} className='bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-400 disabled: opacity-70'>
            {loading ? 'One moment please...' : 'Click here to list your arts'}</button>
        </Link>
      </form>
      <div className='flex justify-center mt-5 max-w-lg mx-auto'>
        <p onClick={handleDeleteUser} className='text-blue-600 cursor-help'>Want to delete your account?</p>
        <p onClick={handleLogout} className='text-blue-600 cursor-pointer ml-10'>Logout</p>
      </div>
      <p className='text-green-700 font-style: italic text-center'>{updateSuccess ? 'Update successful!' : ''}</p>
      <p className="font-style:italic text-red-600">{error ? error : ''}</p>
      <div className=' text-red-50 max-w-lg mx-auto flex mt-5 mb-4'>
        <button onClick={handleDisplayUploads} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-auto flex items-center ' 
          >Click to preview your uploads <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
        </button>
      </div>
      <p>{displayUploadsError? 'Something went wrong' : ''}</p>
      <div className='gap-4 max-w-lg mx-auto'>
        {userUploads 
        && userUploads.length>0 
        && userUploads.map( (upload)=> (//userUploads return an array contains another arrays of 
                                        //[ [userid, name, artist, paintUrls ...], [xxx, xxx, xxx] ]
                                        //look into each element (which is also an array), then later on extract
                                        //the paintUrls from that array
            <div key={upload._id} className='flex items-center justify-between gap-5 border border-gray-400 mb-2'> {/* key is a must for using map since I need to identify each element */}
              <Link to={`/listdetail/${upload._id}`} className='mt-4'>{/* when user click the image, it redirect them to this specific upload */}
                                              {/* the /listing endpoint was created in index.js */}
                <img src={upload.paintUrls[0]} alt='some random upload' className='ml-4 w-20 h-20 object-contain '/>
              </Link>
              <Link to={`/listdetail/${upload._id}`} className=' text-red-400 flex-1 hover:underline font-salsa text-lg truncate' >
                <p>{upload.listingName}</p>
              </Link>
              <div className='flex flex-col'>
              <Link to={`/edit-art/${upload._id}`}>
                <button 
                  className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
                  >Edit this listing
                </button>
              </Link>
                {/* Since we need to know which list we need to delete, hence I need to pass in a parameter
                    but in order to prevent js call this function w/o even clicking due to the parenthesis around
                    parameters, hence I need to use a call back function */}
                <button onClick={()=>handleDeleteList(upload._id)}
                  className='bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-red-500 rounded'
                  >Delete this listing
                </button>
                <p>{deleteError? 'Something went wrong' : ''}</p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
      }
