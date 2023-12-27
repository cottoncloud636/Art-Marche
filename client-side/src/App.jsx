import React from 'react'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import Home from './frontend-pages/Home';
import Register from './frontend-pages/Register';
import Login from './frontend-pages/Login';
import About from './frontend-pages/About';
import Profile from './frontend-pages/Profile';
import Header from './frontend-components/Header';
import PrivateRouteComp from './frontend-components/PrivateRouteComp';


export default function App() {
  return (<BrowserRouter>
    <Header />

    {/* within Routes is for putting pages */}
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/register' element={<Register />} /> {/* explain: the component Regsiter resides in endpoint /register */}
      <Route path='/login' element={<Login />} />
      <Route path='/about' element={<About />} />
      <Route element = {<PrivateRouteComp />}>
        <Route path='/profile' element={<Profile />} />
      </Route>

    </Routes>
    </BrowserRouter>
    
  );
}
