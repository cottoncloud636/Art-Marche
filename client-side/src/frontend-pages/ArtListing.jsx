import React from 'react'
import Dropdown from '../frontend-components/DropDown'
import { useState } from 'react';
import { useEffect } from 'react';
import {app} from '../firebaseConfig';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

export default function ArtListing() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState('');
  const [checkedOption, setCheckedOption] = useState(null);
  const [files, setFiles] = useState([]);
//   console.log(files); //for test purpose: to see if files state gets kept after I chose the images
  const [formInfo, setFormInfo] = useState({
    imageURLs:[],//initialize the formInfo, that the formURL is empty at the beginning, because no images were uploaded yet
  });
  console.log(formInfo);//for test purpose
  const [uploadError, setUploadError] = useState(false); //use a state to track any errors occurs during uploading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('../../src/medium.json')
        .then((response) => response.json())
        .then((data) => setMenuItems(data));
  },[]);//pass in an array (each element in json is an array)

  const handleMediumSelection = (value)=>{
    setSelectedMedium(value);
  };

  const handleCheckbox = (event)=>{
    setCheckedOption(event.target.value);
  };

  const handleChosenImage = (event)=>{
    setFiles(event.target.files);
  };

  const handleImageUpload = (event)=>{
    if (files.length>0 && (files.length + formInfo.imageURLs.length) <13) {
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
                imageURLs: formInfo.imageURLs.concat(urls) //add previous urls to the current url
                
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
        imageURLs: formInfo.imageURLs.filter((eachImageURL, i) => i !== index),  
    });
  };
  

  return (
    <div>
        <div className='p-4 max-w-4xl mx-auto'> {/* mx-auto -- brings the content to the center of the page */}
            <h1 className='font-createheader text-6xl text-center mt-5'>Showcase art réserve</h1>
            <form className='flex flex-col sm:flex-row mt-8'>
                {/* left side */}
                <div className='flex flex-col flex-1 gap-4 '>
                    <input type='text' name='artName' id='artname' placeholder='name of the art' minLength='10' maxLength='62' required
                        className='border p-2 h-10'/>
                    <textarea type='text' name='artDesc' id='artdesc' placeholder='Description' rows="4" required
                        className='border p-2'/>                
                    <input type='text' name='artist' id='artist' placeholder='Artist name' required
                        className='border p-2 h-10'/>                    
                    {/* <input type='text' name='medium' id='medium' placeholder='Choose the art medium'
                        className='border'/>  */}
                    <Dropdown items={menuItems} handleSelection={handleMediumSelection} />
                    <div className='flex flex-wrap gap-2'>
                        <div className='flex gap-3'>
                            <input type='checkbox' id='original' value='original'
                                checked={checkedOption==='original'} onChange={handleCheckbox}
                                className='w-4'
                            />
                            <span>Original work</span>
                        </div>
                        <div className='flex gap-3'>
                            <input type='checkbox' id='imitation' value='imitation'
                                checked={checkedOption==='imitation'} onChange={handleCheckbox}
                                className='w-4'
                            />
                            <span>Imitation</span>
                        </div>  
                        <div className='flex gap-3'>
                            <input type='checkbox' id='otherwork' value='otherwork'
                                checked={checkedOption==='otherwork'} onChange={handleCheckbox}
                                className='w-4'
                            />
                            <span>Other Artist's work</span>
                        </div>  
                            
                        
                        
                    
                    <div className='flex items-center mt-4'>
                        <div>  
                            <p>Enter your price</p>
                            <span className='text-sm'>(in us dollar $)</span>
                        </div>
                        
                        <input className= 'border border-gray-400 ml-6 h-10'   type='number' id='price' required></input>
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
                        formInfo.imageURLs.length>0 && formInfo.imageURLs.map((eachImageURL, index)=>( 
                            <div key={eachImageURL} className='mt-10 flex justify-between p-4 border border-indigo-200 items-center'>
                                <img src={eachImageURL} alt='random painting' 
                                    className='w-20 h-20 object-fill' />
                                <button onClick={()=>handleDeleteImg(index)}
                                    className='p-2 h-16 self-center text-center text-red-600 bg-slate-300 rounded-lg border border-black-700 hover:shadow-lg disabled:opacity-75'>Delete</button>
                            </div>
                        )) 
                    }
                    {/* <button>List it now!</button> */}
                    <button className=' mt-6 p-3 rounded-lg bg-blue-600 text-white uppercase hover:opacity-75 disabled:opacity-75'>List it now</button>
                </div>

                
                
            </form>

        </div>
    </div>
  )
}
