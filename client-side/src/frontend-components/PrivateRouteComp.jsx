import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


export default function PrivateRouteComp() {
    const {currentUser} = useSelector( (state) => state.user ); //var names refer to userSlice.js
    //if it is current user then display this comp's (PrivateRouteComp) children comp (Profile comp). 
  return currentUser? <Outlet /> : <Navigate to="/login"/>;
  
}
