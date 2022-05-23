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
import { GeneralRequest } from './pages/GeneralRequest';
import { LeaveRequest } from './pages/LeaveRequest';
import { Scholarship } from './pages/Scholarship';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import Thai from "antd/lib/locale/th_TH";

import moment from 'moment'
import 'moment/locale/th'
import { Login } from "./pages/Login";
import { News } from "./pages/News";
import { GeneralRequestText } from "./pages/GeneralRequestText";
moment.locale('th')


const client = new ApolloClient({
  uri: "http://localhost:3001/grapql",
  cache: new InMemoryCache(),
  credentials: 'include',
})

function App() {
  return (
    <ConfigProvider locale={Thai}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="login/" element={<Login />} />
              <Route path="news/" element={<News />} />
              <Route path="service/" element={<Service />} />
              <Route path="notification/" element={<Notification />} />
              <Route path="profile/" element={<Profile />} />
              <Route path="service/:requestOne" element={<RequestOne />} />
              <Route path="service/general-request/create" element={<GeneralRequest />} />
              <Route path="service/general-request/:id" element={<GeneralRequestText />} />
              <Route path="service/leave-request/:type/create" element={<LeaveRequest />} />
              <Route path="service/leave-request/:type/:id" element={<LeaveRequest />} />
              <Route path="service/scholarship/create" element={<Scholarship />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </ConfigProvider>
  );
}

export default App;
