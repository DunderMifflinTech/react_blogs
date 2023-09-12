import React, { useState, useRef } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';
import FoundUsers from '../FoundUsers/FoundUsers';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';

function SearchBar() {
  const userSearchRef = useRef();
  const [searchUser, setSearchUser] = useState('');
  const [isFocused, setIsFocused] = useState(true);
  const [searchState, setSearchState] = useState({
    loading: false,
    usersList: [],
  });

  const inputChange = async (e) => {
    clearTimeout(userSearchRef.current);
    setSearchState((prev) => {
      return { ...prev, loading: true };
    });
    userSearchRef.current = setTimeout(async () => {
      let name = e.target.value.trimStart();
      await axios
        .get(import.meta.env.VITE_API_URL + `/users/search/user-name/${name}`)
        .then((res) => {
          setSearchState((p) => {
            return {
              loading: false,
              usersList: res.data.data,
            };
          });
        });
    }, 200);
  };
  return (
    <>
      <div
        className="w-[300px] h-[40px] border-[1.5px] border-[#bebebe] rounded-3xl flex items-center relative"
        onScroll={() => setIsFocused(false)}
      >
        <label htmlFor={'userName'} className="pl-[10px] cursor-pointer">
          <FaSearch size={17} color="#6246EA" />
        </label>
        <input
          className="focus:outline-none mx-[10px] py-[3px] h-[30px] w-full"
          type="text"
          id="userName"
          placeholder="Find new friends"
          value={searchUser}
          onChange={(e) => {
            setSearchUser(e.target.value.trimStart());
            inputChange(e);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        ></input>
        {isFocused &&
          searchUser.length > 0 &&
          (searchState.loading ? (
            <div className="bg-white h-[150px] w-[300px] border-b rounded-b-2xl absolute top-[40px] shadow-md z-10 flex flex-col justify-center items-center">
              <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <FoundUsers users={searchState.usersList} />
          ))}
      </div>
    </>
  );
}

export default SearchBar;
