import React from 'react';
import BaseButton from '../BaseButton/BaseButton';
import { useState, useEffect } from 'react';
import { userLogin, userSignUp } from '../../redux/auth/authActions';
import axios from 'axios';
import { connect } from 'react-redux';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login({ isLoggedIn, userLogin, userSignUp }) {
  const [login, setLogin] = useState(true); //to see if the user wants to login or sign up
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [timer, setTimer] = useState([]);

  useEffect(() => {
    return () => {
      timer.forEach((el) => {
        clearTimeout(el);
      });
    };
  }, []);
  const navigate = useNavigate();
  const handleLogin = async () => {
    let userCredentials = {
      email: email,
      password: password,
    };

    const authSuccess = await userLogin(userCredentials);

    if (authSuccess) {
      navigate('/user-wall');
    } else {
      setIsInvalid(true);
      setTimer((prevState) => [
        ...prevState,
        setTimeout(() => {
          setIsInvalid(false);
        }, 10000),
      ]);
    }
  };

  const handleSignUp = async () => {
    navigate('/user-wall');
    let userCredentials = {
      name: name,
      email: email,
      password: password,
    };

    const authSuccess = await userSignUp(userCredentials);
    if (authSuccess) {
    } else {
      setIsInvalid(true);
      setTimer((prevState) => [
        ...prevState,
        setTimeout(() => {
          setIsInvalid(false);
        }, 10000),
      ]);
    }
  };

  return login ? (
    <>
      <div className="w-full flex justify-center">
        <div className="w-[430px] h-[500px] p-[30px] mt-[50px] rounded-[12px] flex flex-col justify-around bg-[#fff] transition duration-150 ease-in-out hover:shadow-lg">
          <header className="text-center text-[30px]">Log In</header>
          <form className="h-[200px] flex flex-col justify-around">
            <div className="mb-[10px]">
              <h4>
                New user?{' '}
                <a
                  className="ml-[5px] hover:text-[#6246ea] cursor-pointer"
                  onClick={() => setLogin(false)}
                >
                  Create an account
                </a>
              </h4>
            </div>
            <input
              className="pb-[5px] block outline-none focus:shadow-[0px_3px_2px_-3px_rgba(98,70,234)] transition duration-300 ease-in-out"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              className="pb-[5px] block outline-none focus:shadow-[0px_3px_2px_-3px_rgba(98,70,234)] transition duration-300 ease-in-out"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <div
              className={
                (isInvalid ? 'fadeIn' : 'fadeOut') +
                ' invalid-credentials  flex flex-row items-center bg-rose-200 rounded-sm'
              }
            >
              <div className="w-[4px] h-3/4 rounded-lg bg-[#f52222]"></div>
              <p className="ml-[2px] text-rose-500">
                Invalid email or password
              </p>
            </div>
          </form>
            <div className="flex justify-center">
              <BaseButton
                variant={'solid'}
                type = {'submit'}
                onSubmit = {handleLogin}
                onClick={handleLogin}
                className="w-[120px]"
              >
                Submit
              </BaseButton>
            </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="w-full flex justify-center">
        <div className="w-[430px] h-[500px] p-[30px] mt-[50px] rounded-[12px] flex flex-col justify-between bg-[#fff] transition duration-150 ease-in-out hover:shadow-lg">
          <div>
            <a
              onClick={() => setLogin(true)}
              className="hover:text-[#6246ea] cursor-pointer"
            >
              Login?
            </a>
          </div>
          <header className="text-center text-[30px]">Sign Up</header>
          <form className="h-[250px] flex flex-col justify-around">
            <input
              className="pb-[10px] block outline-none focus:shadow-[0px_3px_2px_-3px_rgba(98,70,234)] transition duration-300 ease-in-out"
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              className="pb-[10px] block outline-none focus:shadow-[0px_3px_2px_-3px_rgba(98,70,234)] transition duration-300 ease-in-out"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              className="pb-[10px] block outline-none focus:shadow-[0px_3px_2px_-3px_rgba(98,70,234)] transition duration-300 ease-in-out"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <input
              className="pb-[10px] block outline-none focus:shadow-[0px_3px_2px_-3px_rgba(98,70,234)] transition duration-300 ease-in-out"
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
            <div
              className={
                (isInvalid ? 'fadeIn' : 'fadeOut') +
                ' invalid-credentials flex flex-row items-center bg-rose-200 rounded-sm'
              }
            >
              <div className="w-[4px] h-3/4 rounded-lg bg-[#f52222]"></div>
              <p className="ml-[2px] text-rose-500">Invalid credentials</p>
            </div>
          </form>
          <div className="flex justify-center">
            <BaseButton
              variant={'solid'}
              type={'submit'}
              onSubmit={handleSignUp}
              onClick={handleSignUp}
              className="w-[120px]"
            >
              Submit
            </BaseButton>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const dispatchStateToProps = (dispatch) => {
  return {
    userLogin: (userCredentials) => dispatch(userLogin(userCredentials)),
    userSignUp: (userCredentials) => dispatch(userSignUp(userCredentials)),
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(Login);
