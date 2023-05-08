import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Navbar } from "flowbite-react";
import logo from "../images/logoConservatoire.png";
const NavBarCalendar = () => {
  let navigator = useNavigate();
  let location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href="http://localhost:3000/class";
  };

  return (
    <Navbar fluid={true} rounded={true} className="!w-[100%] !mt-[10px] !mb-[20px]"> 
      <Navbar.Brand href="http://localhost:3001">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Conservatoire Logo" />
      </Navbar.Brand>
     
      <Navbar.Collapse className="  !text-[#000] tata !text-[20px]"></Navbar.Collapse>
      <button className="text-[#fff] mx-[8px] px-[8px] rounded py-[3px]" onClick={handleLogout}>Logout</button>
    </Navbar>
  );
};

export default NavBarCalendar;
