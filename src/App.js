import React, {useState} from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home'
import VisitingPage from './components/visitingPage/VisitingPage';

function App() {
  return (
      <>
      <Routes>
        <Route path = '/' element = {<VisitingPage/>} />
        <Route path = '/home' element = {<Home/>} />
      </Routes>
      </>
  );
}

export default App;