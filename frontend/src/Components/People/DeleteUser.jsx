import React from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";
function DeleteUser({ user, token, modalIsOpen, setModalIsOpen1 ,setusers}) {
  // state

  //functions
  const handleCloseModal = () => {
    setModalIsOpen1(false);
  };
  const handleClickButton = () => {
    const button = document.getElementById("reset");
    button.classList.add("Loading");
    button.textContent = "Loading...";
    fetch(`https://api.flat.io/v2/organizations/users/${user.id}`, {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          //handle success response
          handleCloseModal();
          let timerInterval;
          Swal.fire({
            position: "center",
            html: `User Deleted`,
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
          //Lena bech naawed nupdati men jdid
          
          fetch("https://api.flat.io/v2/organizations/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setusers(data);
            });
        } else {
          //handle server Error
          throw new Error(`Error Fetching The Api`);
        }
      })
      .catch((error) => {
        //handle Error  Thrown by the fetch
        handleCloseModal();
        console.error("Error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Cannot delete User!",
        });
      });
  };

  //style
  const customStyles1 = {
    content: {
      top: "50%",
      left: "50%",
      width: "500px",
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
      style={customStyles1}
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
        <h4>
          Delete {} from your
          School?
        </h4>
        <IoMdClose
          size={24}
          onClick={handleCloseModal}
          style={{ cursor: "pointer", marginLeft: "7px" }}
        />
      </div>
      <p style={{ padding: "10px", lineHeight: "1.8" }}>
        These users will be entirely removed from your organization, making
        their licenses available immediately. All assignment data (submissions,
        grades, and comments), music score files and posts created by these
        users will be lost.
      </p>
      <div className="footermodal">
        <button onClick={handleCloseModal}>Cancel</button>
        <button onClick={handleClickButton} id="reset">
          Delete User
        </button>
      </div>
    </Modal>
  );
}

export default DeleteUser;
