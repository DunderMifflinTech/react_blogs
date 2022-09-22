import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Playground from './pages/Playground/Playground';
import Article from './components/Article/Article';
import { BlogData } from './constants/dummyData';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Article info={BlogData[0]} />} />
        <Route path="/p" element={<Playground />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
