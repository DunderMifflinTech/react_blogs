import React from 'react';
import BaseButton from '../BaseButton/BaseButton';
import { useState } from 'react';
import { userLogin } from '../../redux/auth/authActions';
import axios from 'axios';
import {connect} from 'react-redux'


function Login({auth, userLogin}) {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

    const handleLogin = async ()=>{
        let userCredentials = {
            email: email,
            password: password
        }
        userLogin(userCredentials);
        if(auth.isLoggedIn){

        } else {
            alert('wrong email or password');
        }
    }

    const handleSignUp = async ()=>{

    }

  return login ? (
    <>
      <div className="w-full flex justify-center">
        <div className="w-[420px] h-[500px] p-[30px] mt-[50px] rounded-[12px] flex flex-col justify-around bg-[#fff] transition duration-150 ease-in-out hover:shadow-lg">
          <header className="text-center text-[30px]">Log In</header>
          <form className="h-[150px] flex flex-col justify-around">
            <div>
              <h4>
                New user?{' '}
                <a className="ml-[5px] hover:text-[#6246ea] cursor-pointer"
                 onClick={()=>setLogin(false)}>
                  Create an account
                </a>
              </h4>
            </div>
            <input
              className="pb-[5px] block outline-none focus:shadow-[0px_3px_2px_-3px_rgba(98,70,234)] transition duration-300 ease-in-out"
              type="text"
              placeholder="Email"
              onChange={(e)=>setEmail(e.target.value)}
            ></input>
            <input
              className="pb-[5px] block outline-none focus:shadow-[0px_3px_2px_-3px_rgba(98,70,234)] transition duration-300 ease-in-out"
              type="password"
              placeholder="password"
              onChange={(e)=>setPassword(e.target.value)}
            ></input>
          </form>
          <div className="flex justify-center">
            <BaseButton variant={'solid'} onClick = {handleLogin}>Submit</BaseButton>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="w-full flex justify-center">
        <div className="w-[420px] h-[500px] p-[30px] mt-[50px] rounded-[12px] flex flex-col justify-around bg-[#fff] transition duration-150 ease-in-out hover:shadow-lg">
            <div><a onClick = {()=>setLogin(true)}className='hover:text-[#6246ea] cursor-pointer'>Login?</a></div>
          <header className="text-center text-[30px]">Sign Up</header>
          <form className="h-[250px] flex flex-col justify-around">
            <input
              className="pb-[10px] block outline-none focus:shadow-[0px_3px_2px_-3px_rgba(98,70,234)] transition duration-300 ease-in-out"
              type="text"
              placeholder="Name"
              onChange={(e)=>setName(e.target.value)}
            ></input>
            <input
              className="pb-[10px] block outline-none focus:shadow-[0px_3px_2px_-3px_rgba(98,70,234)] transition duration-300 ease-in-out"
              type="text"
              placeholder="Email"
              onChange={(e)=>setEmail(e.target.value)}
            ></input>
            <input
              className="pb-[10px] block outline-none focus:shadow-[0px_3px_2px_-3px_rgba(98,70,234)] transition duration-300 ease-in-out"
              type="password"
              placeholder="password"
              onChange={(e)=>setPassword(e.target.value)}
            ></input>
            <input
              className="pb-[10px] block outline-none focus:shadow-[0px_3px_2px_-3px_rgba(98,70,234)] transition duration-300 ease-in-out"
              type="password"
              placeholder="confirm password"
              onChange={(e)=>setConfirmPassword(e.target.value)}
            ></input>
          </form>
          <div className="flex justify-center">
            <BaseButton variant={'solid'}>Submit</BaseButton>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state)=>{
    return{
        auth: state.auth
    }
}

const dispatchStateToProps = (dispatch)=>{
    return{
        userLogin: (userCredentials)=>dispatch(userLogin(userCredentials))
    }
}



export default connect(mapStateToProps, dispatchStateToProps)(Login);
