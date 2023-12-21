import React from 'react'
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import Home from './frontend-pages/Home';
import Register from './frontend-pages/Register';
import Login from './frontend-pages/Login';
import About from './frontend-pages/About';
import Detail from './frontend-pages/Detail';
import Header from './frontend-components/Header';


export default function App() {
  return (<BrowserRouter>
    <Header />

    {/* within Routes is for putting pages */}
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/about' element={<About />} />
      <Route path='/detail' element={<Detail />} />


    </Routes>
    </BrowserRouter>
    
  );
}
