import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
// Import Swiper styles
import 'swiper/css/bundle';
import { PiPaintBrushFill } from "react-icons/pi";

export default function ListDetail() {
  const params = useParams();
  SwiperCore.use([Navigation]);
  const [listdetail, setListdetail] = useState(null);
  const [loadPage, setLoadPage] = useState(false);//add loading effect when page is loading
  const [error, setError] = useState(false);
  
  //fetch this list's detailed info using useEffect. Use useEffect() because although displaying the list detail
  //is a visual UI for user, but it is not directly related to the UI. this "UI" was a result of fetching info
  //from another page
  useEffect(()=>{
    const fetchListDetail = async()=>{
      try {
        setLoadPage(true);
      //fetch the info from this API route, but the API need to know which list I want to fetch, and this id
      //came from the client side endpoint in URL when using click the "update it now" btn, thru 
      //"navigate(`/listdetail/${data._id}`)" to capture this id in URL
      const res = await fetch(`/api/listing/getlist/${params.listIddetail}`);
      const data = await res.json();
        if (data.success===false) {
          setError(true);
          setLoadPage(false);
          return;
        }
        setListdetail(data);
        setLoadPage(false);
        setError(false); //think about this scenario: user refresh page-->something went wrong (error becomes true
                         //-->server back on-->user refresh page-->display the content, if I don't set error back
                         //to false, the previous error msg will still shows up on the screen
      } catch (error) {
        setError(true);
        setLoadPage(false);
      }
    };
  fetchListDetail();
  }, [params.listIddetail]);//useEffect need dependency. Run useEffect one time or whenever params.id changes

  return (
    <div>
      {loadPage && <p className='text-lg ml-4 mt-4'>One moment please...</p>}
      {error && <p className='text-red-600 text-lg ml-4 mt-4'>Unable to fullfil your request at this moment, try again later</p>}    
      {/*if loading is complete and no error, then display thus list info */}
      {/* listing info can be accessed through setListdetail(data) which came from the data we got from API */}
      {listdetail && !loadPage && !error && (
        <div>
          <Swiper navigation>
            {listdetail.paintUrls.map((paintUrl) => ( //listdetail get info from data from res, in each listdetaik
                                     //there is an array of paint, use map to extract each paint from array
              <SwiperSlide key={paintUrl}>  
                {/* to use CSS style, put them inside the style={...} block */}
                <div className='h-[550px]' style={ 
                  { 
                    background: `url(${paintUrl}) center no-repeat`,
                    backgroundSize: '50%'
                  }}>
                  
                </div>
              </SwiperSlide>

            ))}
          </Swiper>

          {/* ******** begin: a bottom div to contain the entire word detail of the listing */}        
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>

            {/* ******** begin: a subtop div to contain name, source, artist */}          
            <div className='flex flex-col gap-3 text-lg'>
              <p> <span className='font-fatface mr-3'>Name: </span> <span className='font-montserrat'>{listdetail.listingName}</span> </p>
              <p> <span className='font-fatface mr-3'>Source: </span> <span className='font-montserrat'>{listdetail.source}</span> </p>
              <p> <span className='font-fatface mr-3'>Artist: </span> <span className='font-montserrat'>{listdetail.artist}</span> </p>
            </div>
            {/* ******** end: a subtop div to contain name, source, artist */}  

            <p>$ {listdetail.price}</p>
            <p className='flex items-center mt-6 gap-2 text-slate-600 text-sm'>
              <PiPaintBrushFill className='text-purple-700'/>
                  {listdetail.artMedium}
            </p>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listdetail.description}
            </p>
            <p>Uploaded by: {listdetail.userRef.userName}</p>

          </div>
          {/* ******** end: a bottom div to contain the entire word detail of the listing */}    
        
        </div>

        )} 
    </div>

  )
}
