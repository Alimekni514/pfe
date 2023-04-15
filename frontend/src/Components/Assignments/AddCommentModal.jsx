import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import "../../Css/Assignment/SkeletonNewScore.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddCommentModal({
  token,
  modalIsOpen,
  setModalIsOpen1,
  customStyles,
  submission,
}) {
  //states
  const { id, classroom, assignment } = submission;
  const [comment, setcomment] = useState("");
  const handleCloseModal = () => {
    setModalIsOpen1(false);
  };
  //send comment
  const sendMessage = () => {
    fetch(
      `https://api.flat.io/v2/classes/${classroom}/assignments/${assignment}/submissions/${id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment: comment,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        handleCloseModal();
        setcomment("");

        toast.success("🦄 Assignment Updated Successfully!", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        toast.error("🦄 an error has occured!", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
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
        <h4>Add a comment to this submission</h4>
        <IoMdClose
          size={24}
          onClick={handleCloseModal}
          style={{ cursor: "pointer", marginLeft: "7px" }}
        />
      </div>
      <div className="commenttext">
        <textarea
          value={comment}
          onChange={(e) => setcomment(e.target.value)}
        ></textarea>
      </div>
      <div className="commentsbuttons">
        <button onClick={handleCloseModal}>Cancel</button>
        <button onClick={sendMessage}>Confirm</button>
      </div>
    </Modal>
  );
}

export default AddCommentModal;
