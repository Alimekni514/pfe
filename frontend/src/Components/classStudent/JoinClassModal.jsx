import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ClassContext from "../../contexts/ClassContext";
import { ToastContainer, toast } from "react-toastify";
function JoinClassModal({ modalIsOpen, setModalIsOpen1, token }) {
  const handleCloseModal = () => {
    setModalIsOpen1(false);
  };
  //states
  const [enrollmentCode, setenrollmentCode] = useState("");
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const { classroom, setclassroom } = useContext(ClassContext);
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
  //functions
  //create class
  const handleclick = async (e) => {
    setloading(true);
    e.target.innerHtml = "Loading ...";
    try {
      const fetchJoinClass = await fetch(
        `https://api.flat.io/v2/classes/enroll/${enrollmentCode}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const joinedClass = await fetchJoinClass.json();
      if (joinedClass.message === "Class not found") {
        toast.error("Class Not Found  !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        handleCloseModal();
        setclassroom(joinedClass);
        toast.success("Class Joined Successfully !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate(`/class/${joinedClass.id}/user`);
        }, 2000);
      }
    } catch (err) {
      toast.error("Wrong Code !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <>
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
          <h3 className="titlecreateclass">Join a New Class</h3>
          <IoMdClose
            size={24}
            onClick={handleCloseModal}
            style={{ cursor: "pointer", marginLeft: "7px" }}
          />
        </div>
        <div className="formclass">
          <label for="classcreationname">Manually Join your class</label>
          <input
            type="text"
            id="classcreationname"
            value={enrollmentCode}
            onChange={(e) => setenrollmentCode(e.target.value)}
            placeholder="Type your Class Code ..."
          />
          <button
            onClick={(e) => handleclick(e)}
            className={loading ? "loadingcreationclass" : ""}
          >
            Join{" "}
          </button>
        </div>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default JoinClassModal;
