import React from "react";
import Button from "./Button";
import { NavLink } from "react-router-dom";

const Perfect = () => {
  return (
    <div className="relative">
      <div className="md:mt-28 mb-14 w-[90%] md:w-[80%] mx-auto mt-[120%]">
        <img
          src="about-img.png"
          alt=""
          className="md:absolute md:-left-16 mb-10"
        />
        <div className="w-[100%] flex md:justify-end">
          <div className="md:w-[48%]">
            <h1 className="text-4xl font-extrabold leading-tight mb-3">
              Let Us Find The Perfect
              <br className="hidden lg:block" /> Workout For You !
            </h1>
            <img src="circle-line.png" alt="" className="md:mb-10 mb-5" />
            <p className="text-[14px] text-gray-500 text-pretty leading-[27px]">
              Fusce orci ligula, tincidunt ut metus vel, venenatis aliquet
              tortor. Duis et consequat enim. Curabitur pulvinar, dolor at pulvinar molestie, augue
              massa volutpat felis, at rhoncus tortor velit vel diam. Cras ac suscipit metus.
            </p>
            <p className="my-4 text-[14px] text-gray-500 text-pretty leading-[27px]">
              Etiam fermentum ex orci, a ullamcorper erat tempor in. Nulla est
              ante, ullamcorper vitae dui vel, molestie feugiat sapien.
            </p>
            <p className="text-[14px] text-gray-500 mb-7 text-pretty leading-[27px]">
              Integer auctor est nec semper hendrerit. Etiam sollicitudin enim
              in urna commodo, in dapibus velit elementum. Ut congue nisl
              sapien, vel ultricies nulla tincidunt vitae. Maecenas non ligula
              quis massa consequat commodo eleifend ut velit. Vestibulum
              molestie nunc non libero posuere, quis pellentesque massa tempus.
            </p>
            <NavLink to="/about">
              <Button name="Read More" px="px-7" py="py-3" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfect;
