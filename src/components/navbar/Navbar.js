import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div>
      <nav className="navbar w-full h-20 border-y-2 flex justify-between items-center">
        <ul className="cursor-pointer flex">
          <NavLink to="/">
            <li className=" user-name font-bold list-none">Name</li>
          </NavLink>
          <li className="user-name-blog list-none co">.Blog</li>
        </ul>
        <ul className="flex justify-end pr-8">
          <li className="pr-10">
            <NavLink to="/home">Home</NavLink>
          </li>
          <li className="pr-10">
            <Link to="/article">My Articles</Link>
          </li>
          <li className="pr-10">
            <NavLink to="/search">Search</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
