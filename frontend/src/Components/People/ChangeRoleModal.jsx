import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import "../../Css/PeoplePage/ChangeRoleModal.css";
import Swal from "sweetalert2";
function ChangeRoleModal({
  user,
  token,
  setusers,
  modalIsOpen,
  setModalIsOpen1,
  customStyles,
}) {
  //States
  const [selectedRole, setSeletedRole] = useState(null);
  const handleRoleChange = (e) => {
    setSeletedRole(e.target.value);
  };
  //Functions
  const handleCloseModal = () => {
    setSeletedRole("");
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
        organizationRole: selectedRole,
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
          color: "black",
          position: "center",
          html: `${user.firstname || ""} is now a ${selectedRole}`,
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
        //handle Erro Thrown by the fetch
        console.error("Error:", error.message);
        handleCloseModal();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `You can't downgrade this user to ${selectedRole}`,
        });
      });
    setSeletedRole("");
    //Updated List of Users
    setTimeout(() => {
      fetch("https://api.flat.io/v2/organizations/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setusers(data);
        });
    }, 2000);
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
        <h4>What's {user ? user.firstname : "?"} 's Role</h4>
        <IoMdClose
          size={24}
          onClick={handleCloseModal}
          style={{ cursor: "pointer", marginLeft: "7px" }}
        />
      </div>
      <div className="bodymodal">
        <label>
          <input
            type="radio"
            value="admin"
            onChange={handleRoleChange}
            checked={selectedRole === "admin"}
          />
          Admin
        </label>
        <label>
          <input
            type="radio"
            value="teacher"
            onChange={handleRoleChange}
            checked={selectedRole === "teacher"}
          />
          Teacher
        </label>
        <label>
          <input
            type="radio"
            value="student"
            onChange={handleRoleChange}
            checked={selectedRole === "student"}
          />
          Student
        </label>
      </div>
      <div className="footermodal">
        <button onClick={handleCloseModal}>Cancel</button>
        <button
          className={selectedRole ? "activated" : "disabled"}
          onClick={handleClickButton}
          id="reset"
        >
          Change Role
        </button>
      </div>
    </Modal>
  );
}

export default ChangeRoleModal;
