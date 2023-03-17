import React, { useState } from "react";
import Modal from "react-modal";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "../../Css/PeoplePage/ResetPassword.css";
import Swal from "sweetalert2";
function ResetPassword({ user, token, modalIsOpen, setModalIsOpen1 }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //Functions
  const handleCloseModal = () => {
    setModalIsOpen1(false);
  };
  const handleClickButton = () => {
    const button = document.getElementById("reset");
    button.classList.add("Loading");
    button.textContent = "Loading...";
    fetch(`https://api.flat.io/v2/organizations/users/${user.id}`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        password: password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          //handle success response
          return response.json();
        } else {
          //handle server Error
          throw new Error(`Error Fetching The Api`);
        }
      })
      .then((data) => {
        handleCloseModal();
        setPassword("");
        let timerInterval;
        Swal.fire({
          position: "center",
          html: `Password Updated`,
          timer: 2000,
          width: "300px",
          timerProgressBar: true,
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      })
      .catch((error) => {
        //handle Error  Thrown by the fetch
        handleCloseModal();
        setPassword("");
        console.error("Error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "the supplied password length is too short!",
        });
      });
  };
  //custom styles
  const customStyles = {
    content: {
      top: "50%",
      width: "500px",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      padding: "1rem",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
      border: "none",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: "9999",
    },
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #eaeaec",
          padding: "4px",
        }}
      >
        <h4>Reset password for {user ? user.username : "?"}</h4>
        <IoMdClose
          size={24}
          onClick={handleCloseModal}
          style={{ cursor: "pointer", marginLeft: "7px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          padding: "15px 8px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="passwordinput"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="visible"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <span
        style={{
          color: "rgb(23 21 21)",
          display: "block",
          fontSize: "14px",
          marginLeft: "15px",
        }}
      >
        Minimum 6 characters
      </span>

      <div className="footermodal">
        <button onClick={handleCloseModal}>Cancel</button>
        <button
          className={password ? "activated" : "disabled"}
          onClick={handleClickButton}
          id="reset"
        >
          Reset Password
        </button>
      </div>
    </Modal>
  );
}

export default ResetPassword;
