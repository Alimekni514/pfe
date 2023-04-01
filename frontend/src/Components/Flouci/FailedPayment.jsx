import React from "react";
import "../../Css/FailedPayment/FailedPayment.css";
import personholdin from "../../assets/Images/failed/personholding.png";
import errorpayment from "../../assets/Images/failed/errorpayment.png"
import axios from "axios"
const FailedPayment = () => {
    const payload = {
        amount: 20000,
      };
      const headers = {
        "Content-Type": "application/json",
      };
    const retry=()=> {
        axios
        .post("http://localhost:5000/api/payment", payload, { headers })
        .then((result) => {
          window.location.href = result.data.result.link;
        })
        .catch((err) => console.log(err.message));
    }
  return (
    <div className="failed-payment-container">
      <div className="failed-payment">
        <img
          src={"https://cdn-icons-png.flaticon.com/512/1304/1304038.png"}
          alt="Failed Payment"
          className="failed-payment-image"
        />
        <img src={personholdin} alt="failed" className="personholding"/>
        <img src={errorpayment} alt="error" className="erroriconmusic"/>
        <h2 className="failed-payment-title">Payment Failed</h2>
        <p className="failed-payment-message">
          Sorry, your payment was not successful.
        </p>
        <p className="failed-payment-message">
          Please check your payment details and try again.
        </p>
        <button className="failed-payment-button" onClick={retry}>Try Again</button>
      </div>
    </div>
  );
};

export default FailedPayment;
