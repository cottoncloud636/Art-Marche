import React from 'react'
import Dropdown from '../frontend-components/Dropdown'
import { useState } from 'react';
import { useEffect } from 'react';
import {app} from '../firebaseConfig';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ArtListing() {
  const navigate = useNavigate(); //initialze the navigate
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState('');
  const [checkedOption, setCheckedOption] = useState(null);
  const [files, setFiles] = useState([]);
//   console.log(files); //for test purpose: to see if files state gets kept after I chose the images
  //!!!!!!!! the following key names need to be the same as in model, they are also "id"
  const [formInfo, setFormInfo] = useState({
    paintUrls:[],//initialize the formInfo, that the formURL is empty at the beginning, because no images were uploaded yet
    listingName: '', //key varibale name came from 'id' below
    description: '',
    artist: '',
    source: '', //this is just an initial value (user initially see original checkbox is checked on the page)
    price: 0,
  });
  console.log(formInfo);//for test purpose
  const [uploadError, setUploadError] = useState(false); //use a state to track any errors occurs during uploading
  const [loading, setLoading] = useState(false);//for upload image button
  const [submitError, setSubmitError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const {currentUser} = useSelector(state=>state.user); //from userSlice.js

  useEffect(() => {
    fetch('../../src/medium.json')
        .then((response) => response.json())
        .then((data) => setMenuItems(data));
  },[]);//pass in an array (each element in json is an array)

  const handleMediumSelection = (value)=>{
    setSelectedMedium(value);
    setFormInfo({
        ...formInfo,
        artMedium: value
    });
  };

//   const handleCheckbox = (event)=>{
//     setCheckedOption(event.target.value);
//   };

  const handleChosenImage = (event)=>{
    setFiles(event.target.files);
  };

  const handleImageUpload = (event)=>{
    if (files.length>0 && (files.length + formInfo.paintUrls.length) <13) {
        setLoading(true);
        setUploadError(false);
        const promises = []; //create an empty array cuz I need to upload more than 1 pictures, each
                            //picture need to complete uploading before we can continue the next op
                            //then whenever a pic completes uploading, store this picture into this array
                            //so that we can then store this array into firebase storage
        for (let i=0; i<files.length; i++){
            promises.push(storeImages(files[i]));
        }
        Promise.all(promises).then((urls)=>{//wait for all images to complete uploading from storeImages,
                                 //then get the url from each of them.
            setFormInfo({
                ...formInfo,
                paintUrls: formInfo.paintUrls.concat(urls) //add previous urls to the current url
                
            });
            setUploadError(false);
            setLoading(false); //after uploading completes, do not show this "loading" effect anymore 
        }).catch((error)=>{
            setUploadError('Please upload image only and each can not exceed 4MB.');
            setLoading(false);
        });
    } else{
        setUploadError('You have either exceeded image upload limit(max allowed 12) or you did not upload any image.')
        setLoading(false);
    }
  };

  const storeImages = async (file)=>{ //a single file is passed in at a time, since storeImages get one file at a time from the for loop
    return new Promise((resolve, reject)=>{; //use Promise, because 1) I need to wait for each image to complete uploading one by one
         //2) some image could fail uploading, Promise can take care of this situation too.
         //resolve means op is successful, reject means op is failed
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
            // setImgUploadPer(Math.round(progress));
        },
        (error)=>{
            reject(error);
        },
    
        //retrieve img from the path stored in Storage that I set up earlier
        ()=>{
            getDownloadURL(upload.snapshot.ref).then( (downloadedURL)=>{
                resolve( downloadedURL);//for picture, use the URL we just downloaded

        });
        });
        });
  }; 

  const handleDeleteImg = (index)=>{
    setFormInfo({
        ...formInfo,
        //take passed-in index to look for each imageurl in the array (assume this array index is called i)
        //return (filter) these images whose index is not equal to the image index (which is the image that I want
        //to delete). Here "eachImageURL can also replaced by "_", because it is not used in code.
        paintUrls: formInfo.paintUrls.filter((eachImageURL, i) => i !== index),  
    });
  };
  
  const handleChange = (event)=>{
    if (event.target.type==='text' || event.target.type==='number' || event.target.type==='textarea'){
        setFormInfo({
            ...formInfo,
            [event.target.id]: event.target.value //use [] to get the variable name ,but not the value of the variable
                            //w/o [], the outcome would be "name":event.target.value, but w. [], it would be 
                            //name: event.target.value
        });
    }; 

    if (event.target.id==='original' || event.target.id==='imitation' || event.target.id==='otherwork'){
        setFormInfo({
            ...formInfo,
            source: event.target.id //each event is identified by their id, type was initially set to 'original', 
                                  //then change occurs (in this case by check one box), based on the if statement
                                  //the type can be changed to any event that their id is changed(thru check the box action)
        });
    };
  };

  const handleFormSubmit = async (event)=>{
    event.preventDefault();
    try {
        if (formInfo.paintUrls.length<1){
            return setSubmitError('You have not uploaded any images yet.');
        };
        setSubmitLoading(true);
        setSubmitError(false);
        //then send request to DB to add the form data
        const res = await fetch ('/api/listing/createlist', { //addr prefix came from index.js
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ //turn the body from JS obj. to json format and send to this 
                                            //'/api/listing/create' addr, and store the result to res
                ...formInfo,
                userRef: currentUser._id //from useSelector
            })
        });
        const data = await res.json(); //retrieve the json response from the API call and convert it to JS object
        setSubmitLoading(false);
        if (data.success===false){ //success came from index.js line 42 the response format from API call
            setSubmitError(data.message);
        }
        //else if API call is successful, navigate to that user's listing page: /list-art/user_id url page
        navigate(`/listdetail/${data._id}`); //data is the js obj that was converted from json response from server
                                           //inside, there is a property "_id". It can be found either in mongoDB
                                           //instance or inspect-->network-->inside the submission instance
    } catch (error) {
        setSubmitLoading(false);
        setSubmitError(error.message);
    }
    
  };

  return (
    <div>
        <div className='p-4 max-w-4xl mx-auto'> {/* mx-auto -- brings the content to the center of the page */}
            <h1 className='font-createheader text-6xl text-center mt-5'>Showcase art réserve</h1>
            <form onSubmit={handleFormSubmit} className='flex flex-col sm:flex-row mt-8'>
                {/* left side */}
                <div className='flex flex-col flex-1 gap-4 '>
                    <input type='text' name='artName' id='listingName' onChange={handleChange} value={formInfo.listingName}
                        placeholder='name of the art' required
                        className='border p-2 h-10'/>
                    <textarea type='text' name='artDesc' id='description' onChange={handleChange} value={formInfo.description}
                        placeholder='Description' rows="4" required
                        className='border p-2'/>                
                    <input type='text' name='artist' id='artist' onChange={handleChange} value={formInfo.artist}
                        placeholder='Artist name' required
                        className='border p-2 h-10'/>                    
                    {/* <input type='text' name='medium' id='medium' placeholder='Choose the art medium'
                        className='border'/>  */}
                    {/* 1) When the change event occurs, the anonymous function defined in onChange will be triggered. 
                    It immediately calls handleMediumSelection(value) with the value received from the event. The 
                    execution flow here doesn’t inherently depend on asynchronous behavior or waiting for the 
                    handleChange function to complete before executing handleMediumSelection(value) 
                        2) handleMediumSelection(value) is called directly within the event handler (function(value) { ... }), 
                        not as a callback function passed to another function.
                        3) An traditional way to write it: 
                        onChange={function(value) {
                            handleMediumSelection(value);
                            }}
                        */}
                    <Dropdown 
                        items={menuItems} handleSelection={handleMediumSelection}
                        onChange={(value)=>{
                            handleMediumSelection(value);
                        }} 
                         />
                         {/* check the box only when the form Info source is equal to 'original' */}
                    <div className='flex flex-wrap gap-2'>
                        <div className='flex gap-3'>
                            <input type='checkbox' id='original' value='Original work'
                                checked={formInfo.source==='original'} onChange={handleChange}
                                className='w-4'
                            />
                            <span>Original work</span>
                        </div>
                        <div className='flex gap-3'>
                            <input type='checkbox' id='imitation' value='Imitation'
                                checked={formInfo.source==='imitation'} onChange={handleChange}
                                className='w-4'
                            />
                            <span>Imitation</span>
                        </div>  
                        <div className='flex gap-3'>
                            <input type='checkbox' id='otherwork' value='Other Artist&apos;s work'
                                checked={formInfo.source==='otherwork'} onChange={handleChange}
                                className='w-4'
                            />
                            <span>Other Artist's work</span>
                        </div>  
                            
                    <div className='flex items-center mt-4'>
                        <div>  
                            <p>Enter your price</p>
                            <span className='text-sm'>(in us dollar $)</span>
                        </div>
                        
                        <input type='number' id='price' required onChange={handleChange} value={formInfo.price}
                            className= 'border border-gray-400 ml-6 h-10' >
                        </input>
                    </div>                    
                    </div>    
                </div>
                
                {/* right side */}
                <div className='flex flex-col ml-6'>
                    <span className='text-pink-600 text-sm font-style: italic text-wrap'>{uploadError && uploadError}</span>
                    <p className='font-semibold'>Upload art pictures (max accept 12 images)</p>
                    <div className='flex gap-4'>
                        <input onChange={handleChosenImage} type='file' id='images' accept='image/*' multiple
                            
                            className='p-3 border border-gray-300 w-full'>                              
                            </input>
                        {/* type set to 'button' is prevent submission of the entire form when I click 'upload' btn */}
                        <button type='button' onClick={handleImageUpload}
                            className='p-2 text-purple-600 border border-black-700 hover:shadow-lg disabled:opacity-75'
                            >
                            {loading? 'One moment...' : 'Upload'}
                        </button>
                    </div>
                    {/* if there is at least one image, use each image url and create an image tag */}
                    {
                        formInfo.paintUrls.length>0 && formInfo.paintUrls.map((eachImageURL, index)=>( 
                            <div key={eachImageURL} className='mt-10 flex justify-between p-4 border border-indigo-200 items-center'>
                                <img src={eachImageURL} alt='random painting' 
                                    className='w-20 h-20 object-fill' />
                                <button onClick={()=>handleDeleteImg(index)}
                                    className='p-2 h-16 self-center text-center text-red-600 bg-slate-300 rounded-lg border border-black-700 hover:shadow-lg disabled:opacity-75'>Delete</button>
                            </div>
                        )) 
                    }
                    {/* <button>List it now!</button> */}
                    <button disabled={submitLoading || loading}
                        className='mt-6 p-3 rounded-lg bg-blue-600 text-white uppercase hover:opacity-75 disabled:opacity-75'
                        >{submitLoading? 'One moment...' : 'List it now'}
                    </button>
                    {submitError && <p className='text-sm font-style: italic text-pink-600 mt-4'>{submitError}</p>}
                </div>
            </form>

        </div>
    </div>
  )
}
