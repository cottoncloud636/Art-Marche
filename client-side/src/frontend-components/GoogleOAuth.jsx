import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {app} from '../firebaseConfig.js';
import { useSelector, useDispatch } from 'react-redux';
import {loginSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function GoogleOAuth() {
    const dispatch = useDispatch(); //initialize the dispatch, use dispatch for sending action to redux store
    const navigate = useNavigate(); //initialze the navigate

    const handleOAuthClick = async () =>{ //takes time for google to respond, hence use async
        try{
            const provider = new GoogleAuthProvider()
            const auth = new getAuth(app);//pass in the "app" import from firebaseConfig.js, so that 
                                          //firebase recognize which app it is making the request
            const result = await signInWithPopup(auth, provider);//create a popup request for login
            // console.log(result); -- for test purpose to see if google auth works
            const res = await fetch('/api/auth/googleauth', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ //I want to send the following info as a body to backend, these info can
                                       //be found in console, that is after I logged in w. google acct, console
                                       //displayed all my info associate with my google acct.
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                }),
                }
            );
        //after we get response back from server, convert it to JSON, and use dispatch to keep the state across
        //all pages if login successful
        const data = await res.json();
        dispatch(loginSuccess(data));
        navigate('/'); //if user successfully logged in with google auth, then navigate to home page.
        } catch(error){
            console.log('Google OAuth has issue', error);

        }
    };

  return (
    <button type='button' onClick={handleOAuthClick} className='bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-600 
        disabled: opacity-70 w-64'>Use Google to login</button>
  )
}
