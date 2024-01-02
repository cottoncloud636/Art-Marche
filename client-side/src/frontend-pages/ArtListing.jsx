import React from 'react'
import Dropdown from '../frontend-components/DropDown'
import { useState } from 'react';
import { useEffect } from 'react';

export default function ArtListing() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMedium, setSelectedMedium] = useState('');
  const [checkedOption, setCheckedOption] = useState(null);

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
                    <p className='font-semibold'>Upload art pictures</p>
                    <div className='flex gap-4'>
                        <input type='file' id='images' accept='image/*' multiple
                            className='p-3 border border-gray-300 w-full'>                              
                            </input>
                        <button className='p-2 text-purple-600 border border-black-700 hover:shadow-lg disabled:opacity-75'>Upload</button>
                    </div>
                    {/* <button>List it now!</button> */}
                    <button className=' mt-6 p-3 rounded-3xl bg-blue-600 text-white uppercase hover:opacity-75 disabled:opacity-75'>List it now</button>
                </div>

                
                
            </form>

        </div>
    </div>
  )
}
