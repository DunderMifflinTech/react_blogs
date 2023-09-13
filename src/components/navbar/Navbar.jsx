import React from 'react';
import './Navbar.css';
import SearchBar from './SearchBar/SearchBar';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset as userCacheReset } from '../../rtk/features/userCache/useCacheSlice';
import { reset as authReset, userLogout } from '../../rtk/features/userAuthentication/userAuthenticationSlice';
import { reset as postsReset } from '../../rtk/features/Post/postsSlice';

function Navbar({isLoggedIn, userLogOut}) {
  const dispatch = useDispatch();
  const auth = useSelector(state=> state.auth);
  const handleClick = () => {
    const navbarMenu = document.getElementsByClassName('navbar-menu')[0];
    const hamburgerMenu = document.getElementsByClassName('hamburgerMenu')[0];
    navbarMenu.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
  };

  const navigate = useNavigate();
  const handleLogout = async() => {
    try{
      dispatch(authReset());
      dispatch(postsReset());
      dispatch(userCacheReset());
      dispatch(userLogout()).unwrap();
      navigate('/login');
    } catch(err){
      alert('some Error occured, please try again is some time\n' + err.message);
    }
  };
  
  return (
      <div>
      <nav className="navbar font-nunito bg-[#FFFF] h-20 w-full border-y-2 flex justify-between items-center relative">
        <ul className="cursor-pointer flex">
          <NavLink to="/user-wall">
            <li className=" user-name text-[2rem] font-extrabold ml-[2rem] list-none ">
              Name
            </li>
          </NavLink>
          <li className="user-name-blog mt-[1.2rem] font-extrabold text-[#6246EA] list-none">
            .Blog
          </li>
        </ul>
        <button
          onClick={handleClick}
          className="hamburgerMenu absolute top-[15px] hidden flex-col justify-between items-center right-[10px] h-[20px] w-[30px]"
        >
          <span className="bar h-[3px] w-full bg-[#6246EA] rounded-[10px]"></span>
          <span className="bar h-[3px] w-full bg-[#6246EA] rounded-[10px]"></span>
          <span className="bar h-[3px] w-full bg-[#6246EA] rounded-[10px]"></span>
        </button>
        {auth?.isLoggedIn && <SearchBar/>}
        <ul onClick={handleClick} className="navbar-menu flex justify-end pr-8">
          <li className="pr-10">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="pr-10">
            <Link to="/articles">My Articles</Link>
          </li>
          <li className="pr-10">
            <NavLink onClick={handleLogout} to="/login">
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
</div>
  );
}

export default Navbar;
