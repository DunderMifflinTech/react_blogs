import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Playground from './pages/Playground/Playground';
import Article from './components/Article/Article';
import { BlogData } from './constants/dummyData';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/articles' element={<Article info = {BlogData[0]}/>} />
        <Route path="/p" element={<Playground />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
