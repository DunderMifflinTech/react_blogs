import React from 'react';
import { Routes, Route, Link, useMatch } from 'react-router-dom';

function App() {
  return (
    <div className="App min-h-[100vh] w-full bg-slate-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;

function About() {
  return <div>abouut</div>;
}
function Home() {
  return <div>HOME</div>;
}
function Dashboard() {
  return <div>dashboard</div>;
}

function Navbar() {
  return (
    <div className="w-full flex px-4 items-center h-[60px] bg-gray-500 text-white">
      <NavLink to="/">Home</NavLink>
      <NavLink to="about">About</NavLink>
      <NavLink to="dashboard">Dashboard</NavLink>
    </div>
  );
}

function NavLink({ to = '/', className = '', children }) {
  const isSelected = useMatch(to);
  return (
    <Link
      to={to}
      className={`${
        isSelected ? `font-bold` : `font-semibold`
      } text-[20px] hover:bg-gray-300 focus:outline-2 focus:outline-cyan-500 hover:text-black rounded-lg transition-all px-2 py-1 ${className}`}
    >
      {children}
    </Link>
  );
}
