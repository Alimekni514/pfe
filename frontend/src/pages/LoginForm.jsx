import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../Css/LoginPage/LoginPage.css";
import { useNavigate } from "react-router-dom";
import AdminContext from "../contexts/AdminContext";
import UserContext from "../contexts/UserContext";
import { useSignIn } from "react-auth-kit";
import Swal from "sweetalert2";
import axios from "axios";
function LoginForm() {
  //States
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });
  const [showPassword, setShowPassword] = useState(false);
  const signIn = useSignIn();
  const { admin, setadmin } = useContext(AdminContext);
  const { user, setuser } = useContext(UserContext);
  //Functions
  const navigate = useNavigate();
  const onsubmit = (data, event) => {
    event.preventDefault();
    axios.post("http://localhost:5000/login", data).then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        if (
          signIn({
            token: res.data.token,
            expiresIn: res.data.expiresIn,
            tokenType: "Bearer",
            authState: res.data.datauser,
          })
        ) {
          if (res.data.datauser.role === "admin") {
            setadmin(true);
            navigate("/about");
          } else {
            setuser(true);
            navigate("/about");
          }
        }
      } else if (res.status === 201) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: ` ${res.data.error} !`,
        });
      }
    });
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="signin-container">
      <div className="background-image"></div>
      <form onSubmit={handleSubmit(onsubmit)}>
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
          {errors.email?.type === "required" && <p>Email is required</p>}
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
          Sign In
        </button>
        <span className="dont">
          <a href="/reset">Forgot Password ?</a>
        </span>
        <input
          type="button"
          value="Create Account"
          className="create"
          onClick={() => (window.location.href = "/SignUp")}
        />
      </form>
    </div>
  );
}

export default LoginForm;
