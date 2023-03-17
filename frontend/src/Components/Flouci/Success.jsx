import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import patternMusic from "../../Assets/Images/patternMusic (2).jpg";
import Swal from "sweetalert2";
import axios from "axios";
import paymentSuccessImage from "../../Assets/Images/successful.png";
import "../../Css/success/success.css";
function Success() {
  const navigate = useNavigate();
  const token =
    "1c126a1183aaaac514653cb3555fb05953ba09aba270914c8ca6dc65709fafc822dedeecbd4459d24ad7cf12a3c0eda8f2a8ec415d453a5b47d2bb68dd598dfa";
  useEffect(() => {
    // Save the user
    const payload = JSON.parse(localStorage.getItem("savedUser"));
    // axios
    //   .post("http://localhost:5000/register", payload)
    //   .then((result) => console.log(result.data))
    //   .catch((err) => console.error(err));
    fetch("http://localhost:5000/register", {
      method: "POST",
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
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);
  const handleclick = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="payment-success-container">
        <div className="payment-success-image-container">
          <img src={paymentSuccessImage} alt="Payment Success" />
        </div>
        <div className="payment-success-message-container">
          <h2>Congratulations!</h2>
          <p>Your payment has been successfully processed.</p>
          <button onClick={handleclick}>Return To Login</button>
        </div>
      </div>
    </>
  );
}

export default Success;
