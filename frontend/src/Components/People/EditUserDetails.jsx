import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import "../../Css/PeoplePage/EditUserDetails.css"
import Swal from "sweetalert2";
function EditUserDetails({
  user,
  token,
  modalIsOpen,
  setModalIsOpen1,
  setusers,
}) {
  //State
  const [userData, setUserData] = useState({});
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("user")));
    setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);

  //Functions
  const handleCloseModal = () => {
    setModalIsOpen1(false);
  };
  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  }
  const handleClickButton = () => {
    const button = document.getElementById("change");
    button.classList.add("Loading");
    button.textContent = "Loading...";
    fetch(`https://api.flat.io/v2/organizations/users/${userData.id}`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstname: userData.firstname,
        lastname: userData.lastname,
        username: userData.username,
        email: userData.email,
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
        let timerInterval;
        Swal.fire({
          position: "center",
          html: `Account Details Updated`,
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
        //Lena bech nawwed nseti les users men jdid
        fetch("https://api.flat.io/v2/organizations/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setusers(data);
          });
      })
      .catch((error) => {
        //handle Error  Thrown by the fetch
        handleCloseModal();
        console.error("Error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Unable to Update User Details ",
        });
      });
  };

  //Custom Styles
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
        <h4>Edit User Details</h4>
        <IoMdClose
          size={24}
          onClick={handleCloseModal}
          style={{ cursor: "pointer", marginLeft: "7px" }}
        />
      </div>
      <div className="modalBody">
        <div className="firstsection">
          <label>
            FirstName
            <input
              type="text"
              name="firstname"
              value={userData.firstname || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Lastname
            <input
              type="text"
              name="lastname"
              value={userData.lastname || ""}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="secondsection">
          <label>
            Username
            <input
              type="text"
              name="username"
              value={userData.username || ""}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email
            <input
              type="text"
              name="email"
              value={userData.email || ""}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="footermodal">
          <button onClick={handleCloseModal}> Cancel</button>
          <button onClick={handleClickButton} id="change">
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EditUserDetails;
