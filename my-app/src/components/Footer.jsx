import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGooglePlusG } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { FaRegEnvelope } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="bg-secondary md:rounded-t-[130px] mt-12">
        <div className="w-[80%] mx-auto py-20 text-white relative">
          <div className="flex md:flex-row flex-col justify-between gap-5 items-center border-b border-white pb-7">
            <h1 className="text-white text-[2.1em] font-bold font-source">
              Subscribe To Our Newsletter For Latest Updates
            </h1>
            <input
              type="email"
              name=""
              id=""
              placeholder="Email Address..."
              className="relative md:w-[30%] w-full rounded-full px-5 text-xs text-gray-500 h-12"
            />
            <button className="text-white bg-accent py-[10px] px-8 rounded-full absolute hover:bg-secondary md:top-[14.6%] top-[19.5%]  md:right-[0.1%] right-0 ">
              Subscribe
            </button>
          </div>
          <div className="flex md:flex-row flex-wrap  pt-16 gap-10">
            <div className="md:w-[22%]">
              <h1 className="font-bold text-4xl italic">FITNESS</h1>
              <div
                className="flex gap-2 items-center my-6
            "
              >
                <p className="bg-accent h-10 w-10 rounded-full flex justify-center items-center">
                  <IoMdTime />
                </p>
                <div className="text-sm">
                  <p>1800-121-3637</p>
                  <p>+91 555 234-8765</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <p className="bg-accent h-10 w-10 rounded-full flex justify-center items-center">
                  <FaRegEnvelope />
                </p>
                <div className="text-sm">
                  <p>info@example.com</p>
                  <p>sale@example.com</p>
                </div>
              </div>
            </div>
            <div className="md:w-[16%]">
              <h1 className="text-xl font-bold">Our Links</h1>
              <p className="w-16 h-1 bg-accent"></p>
              <div className="text-sm mt-8">
                <p>Partner</p>
                <p className="my-4">About Us</p>
                <p>Career</p>
                <p className="my-4">Review</p>
                <p>Terms & Conditions</p>
                <p className="mt-4">Help</p>
              </div>
            </div>
            <div className="md:w-[16%]">
              <h1 className="text-xl font-bold">Other Links</h1>
              <p className="w-16 h-1 bg-accent"></p>
              <div className="text-sm mt-8 list-none">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="my-4">
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  <NavLink to="/services">Services</NavLink>
                </li>
                <li className="my-4">
                  <NavLink to="/classes">Classes</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact Us</NavLink>
                </li>
              </div>
            </div>
            <div className="md:w-[35%]">
              <p className="text-sm leading-6">
                Fusce orci ligula, tincidunt ut metus vel, venenatis aliquet
                tortor. Duis et consequat enim. Curabitur pulvinar, dolor at
                pulvinar molestie, augue massa volutpat felis, at rhoncus tortor
                velit vel diam. Cras ac suscipit metus. Cras vitae quam eget
                risus efficitur malesuada. Praesent condimentum lacus nisi, eu
                venenatis purus eleifend sit amet. Vivamus ac enim vitae erat
                scelerisque ullamcorper. Ut id pretium sem. Proin ac consectetur
                orci.
              </p>
              <div className="flex gap-3 mt-8">
                <a
                  href="https://www.facebook.com"
                  className="h-10 w-10 rounded-full flex justify-center items-center bg-[#FFFFFF30] hover:bg-accent duration-300"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.twitter.com"
                  className="h-10 w-10 rounded-full flex justify-center items-center bg-[#FFFFFF30] hover:bg-accent duration-300"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.instagram.com"
                  className="h-10 w-10 rounded-full flex justify-center items-center bg-[#FFFFFF30] hover:bg-accent duration-300"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.googlepluseg.com"
                  className="h-10 w-10 rounded-full flex justify-center items-center bg-[#FFFFFF30] hover:bg-accent duration-300"
                >
                  <FaGooglePlusG />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-secondary py-2">2025 Fitness © Shalom design.</p>
    </>
  );
};

export default Footer;
