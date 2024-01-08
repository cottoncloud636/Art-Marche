import React from 'react'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import Home from './frontend-pages/Home';
import Register from './frontend-pages/Register';
import Login from './frontend-pages/Login';
import About from './frontend-pages/About';
import Profile from './frontend-pages/Profile';
import Header from './frontend-components/Header';
import PrivateRouteComp from './frontend-components/PrivateRouteComp';
import ArtListing from './frontend-pages/ArtListing';
import Listing from './frontend-pages/Listing';
import EditArtList from './frontend-pages/EditArtList';

export default function App() {
  return (<BrowserRouter>
    <Header />

    {/* within Routes is for putting pages */}
    {/* these are the endpoints that user can actually nagivate to, later on there will be end points for
        form submission, which are set up in index.js. And in route.js, each form are sent to specific endpoints */}
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/register' element={<Register />} /> {/* explain: the component Regsiter resides in endpoint /register */}
      <Route path='/login' element={<Login />} />
      <Route path='/about' element={<About />} />
      <Route path='/listing' element={<Listing />} />

      <Route element = {<PrivateRouteComp />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/list-art' element={<ArtListing />} />
        <Route path='/edit-art/:listId' element={<EditArtList/>} />
      </Route>

    </Routes>
    </BrowserRouter>
    
  );
}
