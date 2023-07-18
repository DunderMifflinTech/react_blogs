/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaGithub} from "react-icons/fa"
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <div className="footer-body w-full mt-[100px] pt-[100px] pb-[20px] bg-[#ffff] flex flex-col items-center border-t-[1px]">
      <div className="flex justify-evenly w-full">
        <div className="site-logo">
          <ul className="cursor-pointer flex mr-[2rem]">
            <NavLink to="/">
              <li className=" user-name text-[2rem] font-bold list-none ">
                Name
              </li>
            </NavLink>
            <li className="user-name-blog mt-[1.2rem] text-[#6246EA] font-[600] list-none">
              .Blog
            </li>
          </ul>
          <div>
              <ul className="flex flex-row w-[80%] justify-between pt-[10px]">
                    <a className="cursor-pointer hover:scale-150 hover:text-[#6246ea] transition-all delay-75"><FaFacebookF/></a>
                    <a className="cursor-pointer hover:scale-150 hover:text-[#6246ea] transition-all delay-75"><FaInstagram/></a>
                    <a className="cursor-pointer hover:scale-150 hover:text-[#6246ea] transition-all delay-75"><FaLinkedinIn/></a>
                    <a className="cursor-pointer hover:scale-150 hover:text-[#6246ea] transition-all delay-75"><FaTwitter/></a>
                    <a className="cursor-pointer hover:scale-150 hover:text-[#6246ea] transition-all delay-75"><FaGithub/></a>
              </ul>
          </div>
        </div>

        <ul className="about-us font-thin">
          <li className="font-semibold text-xl">About Us</li>
          <li>
            <a className="cursor-pointer hover:text-[#6246ea]">Lorem</a>
          </li>
          <li>
            <a className="cursor-pointer hover:text-[#6246ea]">Ipsum</a>
          </li>
          <li>
            <a className="cursor-pointer hover:text-[#6246ea]">dolor</a>
          </li>
          <li>
            <a className="cursor-pointer hover:text-[#6246ea]">amet</a>
          </li>
        </ul>

        <ul className="services font-thin">
          <li className="font-semibold text-xl">
            <a className="cursor-default">Services</a>
          </li>
          <li>
            <a className="cursor-pointer hover:text-[#6246ea]">Lorem</a>
          </li>
          <li>
            <a className="cursor-pointer hover:text-[#6246ea]">Ipsum</a>
          </li>
          <li>
            <a className="cursor-pointer hover:text-[#6246ea]">dolor</a>
          </li>
          <li>
            <a className="cursor-pointer hover:text-[#6246ea]">amet</a>
          </li>
        </ul>

        <ul className="follow-us font-thin">
          <li className="font-semibold text-xl">
            <a className="cursor-default">Follow Us</a>
          </li>
          <li>
            <a className="cursor-pointer hover:text-[#6246ea]">Lorem</a>
          </li>
          <li>
            <a className="cursor-pointer hover:text-[#6246ea]">Ipsum</a>
          </li>
          <li>
            <a className="cursor-pointer hover:text-[#6246ea]">dolor</a>
          </li>
          <li>
            <a className="cursor-pointer hover:text-[#6246ea]">amet</a>
          </li>
        </ul>
      </div>
      <span className=" mt-[70px] mb-[50px] footer-separator w-[70%] h-[1px] bg-slate-300 "></span>
      <div className="w-[60%]">
        <div className="flex justify-between font-thin">
          <div className="cursor-pointer">
            <a>Write to us</a>
          </div>
          <div className="cursor-pointer">
            <a>Privacy policy</a>
            <a className="pl-[20px]">Terms of use</a>
          </div>
        </div>
      </div>
      <div className="font-thin pt-[100px]">
      © 2023 BlogIT, Inc. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
