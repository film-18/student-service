import { useState } from "react";
import "./App.css";
import "./styles/service.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ConfigProvider } from "antd";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import { Service } from "./pages/Service";
import { Notification } from "./pages/Notification";
import { Profile } from "./pages/Profile";
import { RequestOne } from "./pages/RequestOne";

import Thai from "antd/lib/locale/th_TH";

import moment from 'moment'
import 'moment/locale/th'
moment.locale('th')

function App() {
  return (
    <ConfigProvider locale={Thai}>
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
    </ConfigProvider>
  );
}

export default App;
