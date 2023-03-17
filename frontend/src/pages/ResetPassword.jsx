import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import reset from "../Assets/Images/reset.png";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function ResetPassword() {
  //states
  const [show, setshow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [same, setsame] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });
  //Use Effect

  useEffect(() => {
    const urlParts = window.location.href.split("/");
    const id = urlParts[urlParts.length - 2];
    const token = urlParts[urlParts.length - 1];
    fetch(`http://localhost:5000/reset-password/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data === "verified") {
          setshow(true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong Url!",
          });
        }
      });
  }, []);
  //Functions
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const onsubmit = (data, event) => {
    event.preventDefault();
    const urlParts = window.location.href.split("/");
    const id = urlParts[urlParts.length - 2];
    const token = urlParts[urlParts.length - 1];
    const { password, repeatpassword } = data;
    if (same) {
      setsame(false);
    }
    if (password != repeatpassword) {
      setsame(true);
    } else {
      fetch(`http://localhost:5000/reset-password/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: password }),
      })
        .then((res) => res.json())
        .then((data) => {
          setTimeout(() => {
            window.location.href = "/";
          }, 2500);
          Swal.fire({
            position: "center",
            icon: "success",
            title: data.status,
            showConfirmButton: false,
            timer: 2500,
          });
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div>
      {show && (
        <div className="reset-page">
          <div className="reset-card" style={{ width: "350px" }}>
            <img src={reset} alt="resetImage" className="resetimg" />
            <h3 className="forgotpassword">Reset password </h3>
            <form className="reset-form" onSubmit={handleSubmit(onsubmit)}>
              <div className="form-group">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className="password-input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Create new password"
                    name="password"
                    aria-invalid={errors.password ? "true" : "false"}
                    {...register("password", {
                      minLength: {
                        value: 6,
                        message: "This input must exceed 6 characters",
                      },
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ messages }) => {
                      console.log("messages", messages);
                      return messages
                        ? Object.entries(messages).map(([type, message]) => (
                            <p className="error" key={type}>
                              {message}
                            </p>
                          ))
                        : null;
                    }}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password" className="label">
                  Repeat Password
                </label>
                <div className="password-input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="confirm your new  password"
                    name="repeatpassword"
                    aria-invalid={errors.password ? "true" : "false"}
                    {...register("repeatpassword", {
                      minLength: {
                        value: 6,
                        message: "This input must exceed 6 characters",
                      },
                    })}
                  />
                  {same && <p className="error">password do not match</p>}
                  <ErrorMessage
                    errors={errors}
                    name="repeatpassword"
                    render={({ messages }) => {
                      console.log("messages", messages);
                      return messages
                        ? Object.entries(messages).map(([type, message]) => (
                            <p className="error" key={type}>
                              {message}
                            </p>
                          ))
                        : null;
                    }}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={handleShowPassword1}
                  >
                    {showPassword1 ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <button type="submit" className="reset-button">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
