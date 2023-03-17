import React from "react";
import "../../Css/FailedPayment/FailedPayment.css";
import failed from "../../Assets/Images/FAILED.jpg";
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
          src={failed}
          alt="Failed Payment"
          className="failed-payment-image"
        />
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
