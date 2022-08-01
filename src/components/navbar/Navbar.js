import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <div>
            <nav className='navbar w-full h-20 border-y-2 flex justify-between items-center'>
                <ul className = 'cursor-pointer flex'>
                    <li className=' user-name font-bold list-none'>Name</li>
                    <li className='user-name-blog list-none co'>.Blog</li>
                </ul>
                <ul className='flex justify-end pr-8'>
                    <li className = 'pr-10'><NavLink to='/'>Home</NavLink></li>
                    <li className = 'pr-10'><NavLink to='/'>My Articles</NavLink></li>
                    <li className = 'pr-10'><NavLink to='/'>Search</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
