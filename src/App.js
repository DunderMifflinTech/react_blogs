import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

function App() {
  
  return (
      <>
      <Routes>
        <Route path = '/' element = {<Navbar/>} />
      </Routes>
      </>
  );
}

export default App;