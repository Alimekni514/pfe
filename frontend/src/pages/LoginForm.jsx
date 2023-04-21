import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../Css/LoginPage/LoginPage.css";
import { useNavigate } from "react-router-dom";
import AdminContext from "../contexts/AdminContext";
import Navigation from "./Navigation";
import UserContext from "../contexts/UserContext";
import Badge from "../contexts/BadgeContext";
import { useSignIn } from "react-auth-kit";
import Swal from "sweetalert2";
import axios from "axios";
import womanviolon from "../assets/Images/SignIn/womanviolon.png";
import musicsolam from "../assets/Images/SignIn/musicsolem.png";
import saxophone from "../assets/Images/home/saxophone.png";
import {useAuthUser} from 'react-auth-kit'
function clickAndClose(url) {
  // Open URL in new tab with target="_blank"
  const newTab = window.open(url, '_blank');

  // Wait for 1 second (1000 milliseconds)
  setTimeout(() => {
    // Close the new tab
    newTab.close();
  }, 2000);
}

function LoginForm() {
  const token = import.meta.env.VITE_ADMIN_TOKEN;
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
  const {badge,setbadge}=useContext(Badge);
  const auth = useAuthUser()
  //Functions
  const navigate = useNavigate();
  function filterById(array, email) {
    return array.filter(obj => obj.email === email)[0];
  }
  
  const onsubmit = (data, event) => {
    event.preventDefault();
    axios.post("http://localhost:5000/login", data).then(async (res) => {
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
            setbadge(true);
          } else {
            setuser(true);
            setbadge(true);
         
            const fetchUsers=await fetch(`https://api.flat.io/v2/organizations/users`, {
              headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
              }
            });
            const usersList= await fetchUsers.json();
            const filteredObj = filterById(usersList, data.email);
            const filtredid=filteredObj.id;
            const tokenurl = `https://api.flat.io/v2/organizations/users/${filtredid}/accessToken`;
            fetch(tokenurl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                scopes: [
                  "account.public_profile",
                  "account.education_profile",
                  "scores.readonly",
                  "scores.social",
                  "scores",
                  "collections.readonly",
                  "collections.add_scores",
                  "collections",
                  "edu.classes",
                  "edu.classes.readonly",
                  "edu.assignments",
                  "edu.assignments.readonly",
                  "tasks.readonly",
                  "edu.admin",
                  "edu.admin.lti",
                  "edu.admin.lti.readonly",
                  "edu.admin.users",
                  "edu.admin.users.readonly",
                ],
              }),
            })
              .then((res) => res.json())
              .then(async(data) => {
                localStorage.setItem("flat_token_user", data.token);
                 navigate("/my-library");
                 const fetchlinksignin=await fetch(`https://api.flat.io/v2/organizations/users/${filtredid}/signinLink`, {
                  method:"POST",
                  headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                  },
                  body:JSON.stringify({
                    destinationPath: "/"
                  })
                });
                const urlobject=await fetchlinksignin.json();
                const urlLiJena=urlobject.url;
                  clickAndClose(urlLiJena);
              })
              .catch((err) => console.log(err));
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
    <div className="signinkol">
      <Navigation />
      <div className="bodysignin">
        <img src={womanviolon} alt="violon" className="violonwoman" />
        <img src={musicsolam} alt="solam" className="solam" />
        <div className="formsignin">
          <div className="signin-container">
            <form onSubmit={handleSubmit(onsubmit)}>
              <div className="form-groupsignin">
                <h1 className="signintitle">
                  Sign In
                  <img src={saxophone} alt="" />
                </h1>
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
              <button id="signinbtn" type="submit" className="btn btn-primary">
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
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
