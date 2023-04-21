import React, { useState } from "react";
import "../Css/ResetPassword/ResetPassword.css";
import reset from "../Assets/Images/reset.png";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaKaaba } from "react-icons/fa";
import pattern from "../assets/Images/home/pattern.png";
import person from "../assets/Images/failed/personholding.png";
import star from "../assets/Images/failed/stars.png";
function ResetPage() {
  //states
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [error, seterror] = useState(false);
  const [sent, sesent] = useState(false);
  //functions
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "Email Sent") {
          sesent(true);
          seterror(false);
        } else {
          seterror(true);
          sesent(false);
        }
      })
      .catch((err) => console.log(err));
  };
  //Handle the input change
  const handlechange = (e) => {
    setemail(e.target.value);
    seterror(false);
    sesent(false);
  };
  const handleClick = (event) => {
    navigate("/login");
  };
  return (
    <>
    
    <div className="reset-page">
      <div className="reset-card">
        <img src={reset} alt="resetImage" className="resetimg" />
        <h3 className="forgotpassword">Forgot password ?</h3>
        <span>No worries, we will send you reset instructions</span>
        <form onSubmit={handleSubmit} className="reset-form">
          {sent && <h3 className="send">Email Sent</h3>}
          {error && <h3 className="dontexist">User dosen't exist</h3>}
          <label htmlFor="email" className="reset-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="reset-input"
            placeholder="Enter Your Email"
            value={email}
            onChange={handlechange}
          />
          <button type="submit" className="reset-button bg-[#f64f64]">
            Reset Password
          </button>
          <button onClick={handleClick} className="back">
            <BsArrowLeft className="arrow" />
            Back to Login
          </button>

        </form>
        
      </div>
      
    </div>
        </>    
  );
}

export default ResetPage;
