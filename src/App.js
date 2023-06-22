import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Playground from './pages/Playground/Playground';
import Article from './components/Article/Article';
import { BlogData } from './constants/dummyData';
import Footer from './components/footer/Footer';
import Playaround from './components/playaround/Playaround';
import Login from './components/login/Login';
import UserWall from './components/userWall/UserWall';
import ProtectedRoutes from './components/ProtectedRoutes';

export const URL = "http://localhost:3001";

function App() {
    return (
    <>
      <Navbar />
      <Routes>
        <Route path ='/login' element = {<Login/>}/>
        {/* <Route element = {<ProtectedRoutes/>}> */}
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Article info={BlogData[0]} />} />
          <Route path = "/user-wall" element = {<UserWall/>}/>
        {/* </Route> */}
        <Route path="/p" element={<Playground />} />
        <Route path ='/play' element={<Playaround/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
