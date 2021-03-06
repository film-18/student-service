import { useState } from "react";
import "./App.css";
import "./styles/service.css";

import {  Route, Routes } from "react-router-dom";

import { ConfigProvider } from "antd";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import { Service } from "./pages/Service";
import { Notification } from "./pages/Notification";
import { Profile } from "./pages/Profile";
import { RequestOne } from "./pages/RequestOne";
import { GeneralRequest } from './pages/GeneralRequest';
import { LeaveRequest } from './pages/LeaveRequest';
import { Scholarship } from './pages/Scholarship';


import Thai from "antd/lib/locale/th_TH";

import moment from 'moment'
import 'moment/locale/th'
import { Login } from "./pages/Login";
import { News } from "./pages/News";
import { GeneralRequestText } from "./pages/GeneralRequestText";
import { Staff } from "./pages/Staff";
import { CreateNews } from "./pages/CreateNews";
import { NewsText } from "./pages/NewsText";
import { LeaveRequestText } from "./pages/LeaveRequestText";
moment.locale('th')



function App() {
  return (
    <ConfigProvider locale={Thai}>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="login/" element={<Login />} />
              <Route path="news/" element={<News />} />
              <Route path="news/create" element={<CreateNews />} />
              <Route path="news/:id" element={<NewsText />} />
              <Route path="service/" element={<Service />} />
              <Route path="notification/" element={<Notification />} />
              <Route path="profile/" element={<Profile />} />
              <Route path="service/:requestOne" element={<RequestOne />} />
              <Route path="service/general-request/create" element={<GeneralRequest />} />
              <Route path="service/general-request/:id" element={<GeneralRequestText />} />
              <Route path="service/leave-request/:type/create" element={<LeaveRequest />} />
              <Route path="service/leave-request/:type/:id" element={<LeaveRequestText />} />
              <Route path="service/scholarship/create" element={<Scholarship />} />
              <Route path="staff/" element={<Staff/>} />
            </Route>
          </Routes>
    </ConfigProvider>
  );
}

export default App;
