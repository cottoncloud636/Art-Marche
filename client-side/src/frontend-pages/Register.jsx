import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import GoogleOAuth from '../frontend-components/GoogleOAuth';

export default function Register() {
  const [formInfo, setFormInfo] = useState({});//a formInfo object which holds all the form data(username, email,
                                           // psw), and a setFormInfo func to update formInfo. Initially,
                                           //formInfo obj is empty
  const [err, setErr] = useState(null); //keep track of potential errors
  const [loading, setLoading] = useState(false);//add a loading effect to register button area, S.A. during 
                                                //submitting, display the wording "loading", "wait for a moment"
                                                //etc. Initially nothing is loading, hence set to false

  const navigate = useNavigate();

  const handleChange = (event)=>{
    //goal: "hook"(keep) the previous form info, and update to the current form info
    setFormInfo(
      {
        ...formInfo, //spread operator
        [event.target.id]: event.target.value, //identify which form info changes(either username data, email 
                                  //data or psw data) by using their id, then update the formInfo obj with their
                                  //current value that user inputted.
                                  //"" used for static property name, [] used for dynamic property name.
    }
    );
  };

  const handleSubmit = async (event)=>{
    event.preventDefault();//to prevent the entire page being refreshed when hit submit
    //once submit, let me fetch the endpoint that I want to submit the form info to. 
    //use fetch API to make an HTTP POST request to server
    try{
      setLoading(true);//once submit, it starts to load, hence set to true
      const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},//in HTTP request, Content-Type is a standardized header
                                      // used to indicate the media type of the resource in req or res body
                                      //application/json is not an address, it's a standardized way of specifying
                                      //here, it specific media type or MIME type indicating that the content in
                                      // the body of the request is in JSON format the format of the data being 
                                      //sent in an HTTP request.
          body: JSON.stringify(formInfo),//Send formInfo as the request body after converting JSON string
      }    
      );
      const data = await res.json();//Retrieve response from server (res) and parses it as JSON, storing the 
                            //result in the data variable. This assumes that the server responds with JSON data.
      console.log(data);//for test purpose, to see what data do we get back after submitting forminfo to server
      if (data.success===false){
        setLoading(false); //then set loading to false, telling js do not load
        setErr(data.message);//in index.js, we use middleware to handle errors, in here, we call retrieve the res,
        // then convert to json then save to "data" var, then if there is any type of error, let's retrieve the 
        //the error message
        return; 
      }
      setLoading(false);//else setLoading to false, because user is by then successfully created, we don't
                             //need to load anymore
      setErr(null);  
      navigate('/login'); //navigate change the current route or location w/i the application w/o causing a full page reload
     }catch(error){
      setLoading(false);
      setErr(data.message);
    }
  };

  console.log(formInfo); //for test purpose: to see if JS "hook" the formInfo as it changes value

  return (
    <div className='h-screen w-screen bg-gradient-to-r from-pink-200 to-purple-400 opacity-80 mx-auto '>{/* mx: margin */}

      <h1 className='text-center text-4xl font-semibold py-16'>User Login</h1> {/* my-16: apply margin only to top and bottom */}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 items-center justify-center' > {/* items-center results form sit in center horizontally */}
        {/* id should have the same name as we defined in User model. Previously I used "id=username", but in model is: userName, then error occurs, it kept saying userName is required */}
        <input type='text' id='userName' placeholder='Username' onChange={handleChange} 
          className='border rounded-lg h-12 w-64 p-4' 
        />
        <input type='text' id='email' placeholder='Email' onChange={handleChange}
          className='border rounded-lg h-12 w-64 p-4'
        />
        <input type='password' id='password' placeholder='Password' onChange={handleChange} 
          className='border rounded-lg h-12 w-64 p-4'
        />
        <button disabled={loading} className='bg-purple-900 text-white p-3 rounded-lg hover:bg-blue-600 disabled: opacity-70 w-64' >
          {loading? "One moment please..." : 'Register'}
        </button>
        <GoogleOAuth />
      </form>
      
      <div className='flex justify-center gap-3 mt-5'>
        <p className='font-semibold font-'>Already a user?</p>
        <Link to={"/login"}>
          <span className='text-purple-900 font-semibold hover:tracking-wider hover:underline'>Login</span>
        </Link>
      </div>
      {err && <p>{err}</p>}

    </div>
  )
}
