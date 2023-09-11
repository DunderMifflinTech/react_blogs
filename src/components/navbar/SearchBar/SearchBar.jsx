import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import FoundUsers from '../FoundUsers/FoundUsers';
import Skeleton from 'react-loading-skeleton'
import axios from 'axios';

function SearchBar() {
  const [searchUser, setSearchUser] = useState('');
  const [isFocused, setIsFocused] = useState(true);
  const [searchState, setSearchState] = useState({
    loading: false,
    usersList: [],
  });

  const inputChange = async (e) => {
    let name = e.target.value.trimStart();
    setSearchState((prev) => {
      return {...prev, loading: true };
    });
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
            <FoundUsers users={searchState.usersList} />
        }
      </div>
    </>
  );
}

export default SearchBar;
