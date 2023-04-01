import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import "../Css/NavBar/Navigation.css";
import conservatoire from "../assets/Images/logoconservatoire.png"
import { FaRegUser} from "react-icons/fa";
const Navigation = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="nav">
       <img src={conservatoire} alt="logo" style={{width:"120px"}}/>
      <ul className={`nav-menu ${isNavOpen ? "nav-menu-open" : ""}`}>
        <li className="nav-item">
          <a href="/" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/about" className="nav-link">
            About
          </a>
        </li>
        <li className="nav-item">
          <a href="/services" className="nav-link">
            Services
          </a>
        </li>
        <li className="nav-item">
          <a href="/contact" className="nav-link">
            Contact
          </a>
        </li>
      </ul>
      <div>
       
        <button className="signupbtn" onClick={()=>window.location.href="/signup"}>
          Sign Up
        </button>
        <FaRegUser/>

      </div>
    </nav>
  );
};

export default Navigation;
