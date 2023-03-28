import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../Css/SignUpPage/SignUpPage.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import Swal from "sweetalert2";
function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onsubmit = (data, event) => {
    if (userType == "Teacher" && secretKey != "salim") {
      event.preventDefault();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Teacher!",
      });
    } else {
      event.preventDefault();

      Swal.fire({
        text: "You will be redirected to the payment page !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Okay!",
      }).then((result) => {
        if (result.isConfirmed) {
          const payload = {
            amount: 20000,
          };
          const headers = {
            "Content-Type": "application/json",
          };
          axios
            .post("http://localhost:5000/api/payment", payload, { headers })
            .then((result) => {
              window.location.href = result.data.result.link;
              window.localStorage.setItem("savedUser", JSON.stringify({...data,role:userType}));
            })
            .catch((err) => console.log(err.message));
        }
      });
    }
  };

  return (
    <div className="signup-container">
      {/* <div className="background"></div> */}
      <div className="backgroundundraw">
      </div>
      
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="radiogroup">
          Register As:
          <div className="radiobuttons">
            <label class="radio">
              <input
                type="radio"
                name="UserType"
                value="user"
                onChange={(e) => setUserType(e.target.value)}
              />
              <span class="radio-mark"></span>
              <h5>User</h5>
            </label>
            <label class="radio">
              <input
                type="radio"
                name="UserType"
                id="admin-radio"
                value="teacher"
                onChange={(e) => setUserType(e.target.value)}
              />
              <span class="radio-mark"></span>
              <h5>Teacher</h5>
            </label>
          </div>
        </div>
        {userType == "teacher" ? (
          <div className="form-group">
            <label className="label">Secret Key</label>
            <input
              type="text"
              className="form-control"
              placeholder="Secret Key"
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </div>
        ) : null}
        {/* UserName  */}
        <div className="form-group">
          <label htmlFor="username" className="label">
            username
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your FirstName"
            aria-invalid={errors.firstname ? "true" : "false"}
            name="username"
            {...register("username", {
              maxLength: {
                value: 15,
                message: "Max Length 15 characters",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="username"
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
        </div>

        {/* FirstName  */}
        <div className="form-group">
          <label htmlFor="email" className="label">
            Firstname
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your FirstName"
            aria-invalid={errors.firstname ? "true" : "false"}
            name="firstname"
            {...register("firstname", {
              maxLength: {
                value: 15,
                message: "Max Length 15 characters",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="firstname"
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
        </div>
        {/* LastName */}
        <div className="form-group">
          <label htmlFor="email" className="label">
            LastName
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your LastName"
            name="lastname"
            aria-invalid={errors.lastname ? "true" : "false"}
            {...register("lastname", {
              maxLength: {
                value: 15,
                message: "Max length 15 characters",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="lastname"
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
        </div>
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email" className="label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
            {...register("email", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email?.type === "required" && (
            <p className="error">Email is required</p>
          )}
        </div>
        {/* Password */}
        <div className="form-group">
          <label htmlFor="password" className="label">
            Password
          </label>
          <div className="password-input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="Enter password"
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
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        <h5 className="dont">
          Do you already have an account? <a href="/login">Login here</a>
        </h5>
      </form>
    </div>
  );
}

export default SignUpPage;
