import { useState } from 'react'
import './App.css'
import './styles/service.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import { Home } from './pages/Home';
import { Service } from './pages/Service';
import { Notification } from './pages/Notification';
import { Profile } from './pages/Profile';
import { RequestOne } from './pages/RequestOne';



function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="service/" element={<Service />} />
        <Route path="notification/" element={<Notification />} />
        <Route path="profile/" element={<Profile />} />
        <Route path="service/:requestOne" element={<RequestOne />} />
      
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
