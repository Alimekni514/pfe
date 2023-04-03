import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import patternMusic from "../../Assets/Images/patternMusic (2).jpg";
import Swal from "sweetalert2";
import axios from "axios";
import successimg from "../../assets/Images/success/success.png";
import { AiFillCheckCircle } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import StepNavigation from "../Stepper/stepNavigation";
import saxophone from "../../assets/Images/home/saxophone.png";
import "../../Css/success/success.css";
function Success() {
  //to grab the transaction id
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const myParam = queryParams.get("payment_id");
  const navigate = useNavigate();
  //for the stepper
  const labelArray = ["Step1", "Step2", "Payment"];
  const [currentStep, updateCurrentStep] = useState(3);
  function updateStep(step) {
    updateCurrentStep(step);
  }
  const token = import.meta.env.VITE_ADMIN_TOKEN;
  useEffect(() => {
    // Save the user
    const payload = JSON.parse(localStorage.getItem("savedUser"));
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((result) => result.json())
      .then((data) => console.log(data))
      .catch((err) => console.log("error", err));
    const url = "https://api.flat.io/v2/organizations/users";
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.localStorage.setItem("currentUserId", data.id);
      })
      .catch((error) => console.error(error));
    //signup for the chat
    const url1 = "http://localhost:5000/signupchat";
    fetch(url1, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const prefix = "CHAT_";
        localStorage.setItem(
          `${prefix}user`,
          JSON.stringify({ ...data.user, secret: payload.password })
        );
      })
      .catch((err) => console.log("error", err));
  }, []);
  const handleclick = () => {
    navigate("/login");
  };
  return (
    <div className="contentpay">
      <StepNavigation
        labelArray={labelArray}
        currentStep={currentStep}
        updateStep={updateStep}
        id="stepperpayment"
      ></StepNavigation>
      <div className="payment-success-container">
        <div className="contentsuccessful">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3902/3902837.png"
            alt="icon"
            className="iconmusicnote"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/3902/3902837.png"
            alt="icon"
            className="iconmusicnote1"
          />
          <div className="textsuccessful">
            <AiFillCheckCircle />
            <h1>Payment successful!</h1>
            <p>
              {" "}
              Transaction Number : <span>{myParam}</span>
            </p>
          </div>
          <div className="amountpaid">
            <h2>Amount Paid: </h2>
            <span>90DT</span>
          </div>
        </div>

        <div className="imgsuccessful">
          <img src={successimg} alt="successimg" />
        </div>
      </div>
      <div className="paymentfooter">
        <img src={saxophone} alt="iconsaxo" className="saxopayment" />
        <button onClick={handleclick} className="loginpayment">
          Return To Login
        </button>
      </div>
    </div>
  );
}

export default Success;
