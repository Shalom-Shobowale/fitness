import React from "react";
import Button from "./Button";
import { MdLocationOn } from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";
import { LiaDumbbellSolid } from "react-icons/lia";
import { IoPersonOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <div className={`flex justify-center items-center h-screen bg-center bg-cover bg-no-repeat md:relative bg-[url('/bg-image.png')] md:bg-[url('/background-1.jpg')]`}>
        <div className="w-[92%] flex flex-col items-end text-end">
          <h1 className="text-6xl font-extrabold text-secondary">
            BEST
            <br /> FITNESS
          </h1>
          <p className="my-5 md:text-gray-600 text-white">
            Our club encourages wellness by providing
            <br /> top-notch equipment, first-class instructors,
            <br /> innovative classes, and qualified staff.
          </p>
          <NavLink to="/about">
            <Button name="Learn More" px="px-8" py="py-[15px]" />
          </NavLink>
        </div>
      </div>
      <div className="md:absolute w-full md:-bottom-32 relative">
        <form
          action=""
          className="flex flex-col md:flex-row w-[90%] mx-auto md:py-7 md:px-0 px-7 md:pl-7 rounded-lg shadow-lg bg-white py-8 md:h-[13vh] h-[65vh]"
        >
          <div className="flex items-center gap-2 border-r-none md:border-r-2 md:mr-6">
            <label htmlFor="" className="text-xl text-secondary">
              <MdLocationOn />
            </label>
            <input
              type="text"
              placeholder="Choose your location"
              className="outline-none text-xs md:w-40 p-1 w-full"
            />
          </div>
          <div className="flex items-center gap-2 border-r-0 md:border-r-2 md:mr-6 md:my-0 my-12">
            <label htmlFor="" className="text-xl text-secondary">
              <BsCalendar3 />
            </label>
            <input
              type="text"
              placeholder="Choose your visiting date"
              className="outline-none text-xs w-full md:w-52 p-1"
            />
          </div>
          <div className="flex items-center gap-2 border-r-0 md:border-r-2 md:mr-6 md:mb-0 mb-12">
            <label htmlFor="" className="text-xl text-secondary">
              <LiaDumbbellSolid />
            </label>
            <input
              type="text"
              placeholder="Choose your gym"
              className="outline-none text-xs w-full md:w-52 p-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="" className="text-xl text-secondary">
              <IoPersonOutline />
            </label>
            <input
              type="text"
              placeholder="Choose your dream coach"
              className="outline-none text-xs w-full md:w-52 p-1"
            />
          </div>
        </form>
        <NavLink
          to="/addworkout"
          className="md:w-[20%] w-[76%] bg-accent hover:bg-secondary text-white text-center text-base
             rounded-md absolute h-[13vh] flex items-center justify-center
             md:top-0 md:right-[5.1%] md:bottom-0 top-[70%] right-11
             transition-colors duration-200 font-semibold"
        >
          Book your Appointment
        </NavLink>
      </div>
    </div>
  );
};

export default Landing;
