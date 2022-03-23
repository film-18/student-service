import { useState } from 'react'
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import { Home } from './pages/Home';
import { Service } from './pages/Service';
import { Notification } from './pages/Notification';



function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="service/" element={<Service />} />
        <Route path="notification/" element={<Notification />} />
      
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
