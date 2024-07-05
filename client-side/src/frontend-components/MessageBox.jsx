import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

export default function Messagebox({ listdetail, currentUserId, onClose }) {
    const [message, setMessage] = useState('');
    const [artist, setArtist] = useState(null);

    useEffect(() => {
        const fetchArtistInfo = async()=>{
            try{
                const response = await fetch(`/api/user/${listdetail.userRef}`);
                const data = await response.json();
                setArtist(data);
            }catch(error){
                console.log(error);
            }
        };
        fetchArtistInfo();
    }, [listdetail.userRef]); //second argument is a dependency, which is optional
    
    /* z-50: to ensure message box float above all other content */
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"> 
            <div className="bg-white rounded-lg p-6 w-11/12 md:w-3/4 lg:w-1/2 h-3/4 flex flex-col justify-between">
            {/* <form onSubmit={handleSubmit} className = "flex flex-col h-full"> */}
                <textarea
                    // name='message'
                    // id='message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message"
                    required
                    className="flex-grow p-3 border rounded mb-4"
                />
                {artist && (
                <a href={`mailto:${artist.email}?subject=Inquiry about this painting: ${listdetail.listingName}&body=${message}`}>
                    <button type="button" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4 w-full">Send</button>
                </a>
                )}
            <button onClick={onClose} className="bg-pink-400 text-white py-2 px-4 rounded hover:bg-red-600">Close</button>
        </div>
        </div>
    );
}
