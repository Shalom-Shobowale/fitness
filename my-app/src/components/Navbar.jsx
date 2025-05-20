import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { CreateContext } from "../Context/CreateContext";
import { IoIosMenu } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";
import { IoPersonCircle } from "react-icons/io5";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { setShowForm } = useContext(CreateContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    window.location.href = "/userLogin";
  };
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const isLoggedIn = localStorage.getItem("token");

  const throttle = (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };
  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollPosition = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      const quarterPageHeight = pageHeight / 4;
      if (scrollPosition > quarterPageHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`flex justify-between items-center px-5 md:px-20 py-4 bg-white z-10 transition-all duration-300 ${
        isSticky ? "fixed top-0 left-0 right-0 shadow-md" : ""
      }`}
    >
      <NavLink
        to="/"
        className="text-2xl md:text-4xl text-secondary font-extrabold"
      >
        FITBODY
      </NavLink>

      <ul
        className={`md:flex p-10 md:p-0 md:space-x-8 font-semibold absolute w-full md:justify-center text-center left-0 md:top-7 bg-white text-gray-600 z-10 md:bg-transparent ${
          menuOpen ? "top-[64px]" : "top-[-490px]"
        }`}
      >
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          {({ isActive }) => (
            <li
              className={`md:bg-transparent md:text-gray-600 md:py-0 md:rounded-none ${
                isActive ? "bg-secondary text-white rounded-md py-2" : ""
              }`}
            >
              <span
                className={`md:bg-transparent md:py-0 md:rounded-none ${
                  isActive ? "md:text-secondary" : "hover:text-gray-600"
                }`}
              >
                Home
              </span>
            </li>
          )}
        </NavLink>

        <NavLink to="/about" onClick={() => setMenuOpen(false)}>
          {({ isActive }) => (
            <li
              className={`md:bg-transparent md:text-gray-600 md:py-0 md:rounded-none md:my-0 my-4 ${
                isActive ? "bg-secondary text-white rounded-md py-2" : ""
              }`}
            >
              <span
                className={`md:bg-transparent md:py-0 md:rounded-none ${
                  isActive ? "md:text-secondary" : "hover:text-gray-600"
                }`}
              >
                About
              </span>
            </li>
          )}
        </NavLink>

        <NavLink to="/services" onClick={() => setMenuOpen(false)}>
          {({ isActive }) => (
            <li
              className={`md:bg-transparent md:text-gray-600 md:py-0 md:rounded-none ${
                isActive ? "bg-secondary text-white rounded-md py-2" : ""
              }`}
            >
              <span
                className={`md:bg-transparent md:py-0 md:rounded-none ${
                  isActive ? "md:text-secondary" : "hover:text-gray-600"
                }`}
              >
                Services
              </span>
            </li>
          )}
        </NavLink>

        <NavLink to="/classes" onClick={() => setMenuOpen(false)}>
          {({ isActive }) => (
            <li
              className={`md:bg-transparent md:text-gray-600 md:py-0 md:rounded-none md:my-0 my-4 ${
                isActive ? "bg-secondary text-white rounded-md py-2" : ""
              }`}
            >
              <span
                className={`md:bg-transparent md:py-0 md:rounded-none ${
                  isActive ? "md:text-secondary" : "hover:text-gray-600"
                }`}
              >
                Classes
              </span>
            </li>
          )}
        </NavLink>

        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
          {({ isActive }) => (
            <li
              className={`md:bg-transparent md:text-gray-600 md:py-0 md:rounded-none ${
                isActive ? "bg-secondary text-white rounded-md py-2" : ""
              }`}
            >
              <span
                className={`md:bg-transparent md:py-0 md:rounded-none ${
                  isActive ? "md:text-secondary" : "hover:text-gray-600"
                }`}
              >
                Contact Us
              </span>
            </li>
          )}
        </NavLink>

        {/* Show only if admin */}
        {isAdmin && (
          <li className="md:my-0 my-4">
            <NavLink
              to="/adminDashboard"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "text-secondary" : "hover:text-gray-600"
              }
            >
              Admin Dashboard
            </NavLink>
          </li>
        )}

        <li className="absolute right-[10%] md:right-[25%] text-2xl">
          <NavLink
            to="/userProfile"
            className={({ isActive }) =>
              isActive ? "text-secondary" : "hover:text-gray-600"
            }
          >
            <IoPersonCircle />
          </NavLink>
        </li>

        {isLoggedIn && (
          <li className="text-red-500 cursor-pointer my-4 md:my-0" onClick={handleLogout}>
            Logout
          </li>
        )}

        <div
          onClick={() => setShowForm(true)}
          className="md:absolute md:right-[5%] md:-top-[16.5px] w-full md:w-auto"
        >
          <Button name="Book Now" px="w-full md:px-8" py="py-[15px]" />
        </div>
      </ul>

      <p
        className="md:hidden text-2xl text-secondary"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <ImCancelCircle /> : <IoIosMenu />}
      </p>
    </nav>
  );
};

export default Navbar;
