import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../Css/SignUpPage/SignUpPage.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import Swal from "sweetalert2";
import Navigation from "./Navigation";
import womansaxo from "../assets/Images/SignUp/womansaxo.png";
import StepNavigation from "../Components/Stepper/stepNavigation";
import guitare from "../assets/Images/SignUp/guitare.png";
import violin from "../assets/Images/SignUp/violin.png";
import electricguitar from "../assets/Images/SignUp/electricguitar.png";
import piano from "../assets/Images/SignUp/piano.png";
import drum from "../assets/Images/SignUp/drum.png";
import clarinet from "../assets/Images/SignUp/clarinet.png";

function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [fsection, setfsection] = useState(true);
  const [ssection, setssection] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  //for the stepper
  const labelArray = ["Step 1", "Step 2", "Step 3"];
  const [currentStep, updateCurrentStep] = useState(1);
  function updateStep(step) {
    updateCurrentStep(step);
  }
  //previous
  const previous = () => {
    updateStep(currentStep - 1);
    setssection(false);
    setfsection(true);
  };
  //forward
  const forward = () => {
    updateStep(currentStep + 1);
    setfsection(false);
    setssection(true);
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
              window.localStorage.setItem(
                "savedUser",
                JSON.stringify({ ...data, role: userType })
              );
            })
            .catch((err) => console.log(err.message));
        }
      });
    }
  };

  return (
    <>
      <Navigation />
      <div className="contentsignup">
        <img src={womansaxo} alt="womanmusic" className="womanmusic" />
        <div className="signup-container">
          <form onSubmit={handleSubmit(onsubmit)}>
            <StepNavigation
              labelArray={labelArray}
              currentStep={currentStep}
              updateStep={updateStep}
            ></StepNavigation>
            {fsection && (
              <div>
                <h3>Registred As</h3>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    id="userspan"
                    className={
                      userType.includes("User")
                        ? "activatedrole"
                        : "notactivatedrole"
                    }
                    onClick={(e) => {
                      setUserType(e.target.textContent);
                    }}
                  >
                    User
                  </span>
                  <span
                    id="teacherspan"
                    className={
                      userType.includes("Teacher")
                        ? "activatedrole"
                        : "notactivatedrole"
                    }
                    onClick={(e) => {
                      setUserType(e.target.textContent);
                    }}
                  >
                    Teacher
                  </span>
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
                <div className="form-groups">
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
                  {/* UserName  */}
                  <div className="form-group">
                    <label htmlFor="username" className="label">
                      Adress
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your FirstName"
                      aria-invalid={errors.firstname ? "true" : "false"}
                      name="adress"
                      {...register("adress")}
                    />
                  </div>
                  {/* UserName  */}
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
                            ? Object.entries(messages).map(
                                ([type, message]) => (
                                  <p className="error" key={type}>
                                    {message}
                                  </p>
                                )
                              )
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
                </div>
                <span
                  className="btnsignup"
                  onClick={forward}
                  style={{ display: "block", margin: "10px auto" }}
                >
                  Next
                </span>
                <h5 className="dont">
                  Do you already have an account?{" "}
                  <a href="/login">Login here</a>
                </h5>
              </div>
            )}
            {ssection && (
              <div>
                <div className="birthday">
                  <label for="custom-date-input" className="label">
                    Date Of Birth:
                  </label>
                  <input
                    type="date"
                    id="custom-date-input"
                    name="custom-date-input"
                    class="custom-date-input"
                  />
                </div>
                <div style={{ marginTop: "20px" }}>
                  <label className="label">Choose your Instrument:</label>
                  <div className="instrumentssignup">
                    <div className="instrumentdiv">
                      <img src={guitare} alt="" />
                      <h6>Guitar</h6>
                      <input type="checkbox" />
                    </div>
                    <div className="instrumentdiv">
                      <img src={violin} alt="" />
                      <h6>violin</h6>
                      <input type="checkbox" />
                    </div>
                    <div className="instrumentdiv">
                      <img src={electricguitar} alt="" />
                      <h6>electric guitar</h6>
                      <input type="checkbox" />
                    </div>
                    <div className="instrumentdiv">
                      <img src={piano} alt="" />
                      <h6>Piano</h6>
                      <input type="checkbox" />
                    </div>
                    <div className="instrumentdiv">
                      <img src={drum} alt="" />
                      <h6>Drum</h6>
                      <input type="checkbox" />
                    </div>
                    <div className="instrumentdiv">
                      <img src={clarinet} alt="" />
                      <h6>clarinet</h6>
                      <input type="checkbox" />
                    </div>
                  </div>
                </div>
                <div className="buttonssignup">
                  <button className="btnsignup" onClick={() => previous()}>
                    Previous Step
                  </button>
                  <button className="btnsubmit" type="submit">
                    Sign Up
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
