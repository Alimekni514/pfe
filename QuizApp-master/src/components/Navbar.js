import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Navbar } from "flowbite-react";
import logo from "../images/logoConservatoire.png";
const Navbarx = () => {
  let navigator = useNavigate();
  let location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigator("/login");
  };

  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="http://localhost:30001">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Conservatoire Logo" />
      </Navbar.Brand>
      <div className="flex md:order-2">
        {!localStorage.getItem("token") ? (
          <form className="d-flex" role="search">
            <Link
              className="bg-[#f64f64] text-[#fff] rounded px-[10px] py-[3px] mr-[3px]"
              to="/login"
              role="button"
            >
              Login
            </Link>
            <Link
              className="bg-[#f64f64] text-[#fff] rounded px-[10px] py-[3px]"
              to="/signup"
              role="button"
            >
              Signup
            </Link>
          </form>
        ) : (
          <button onClick={handleLogout} className="btn btn-dark">
            Logout
          </button>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="  !text-[#000] tata">
        <Navbar.Link
          href="/"
          active={true}
          className=" !mt-0 font-bold !text-[#666]"
        >
          Create Quizz
        </Navbar.Link>
        <Navbar.Link
          href="/playquiz"
          className="!mt-0 font-bold text-[#666]	 hover:text-[#f64f64] "
        >
          Play Quizz
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbarx;
