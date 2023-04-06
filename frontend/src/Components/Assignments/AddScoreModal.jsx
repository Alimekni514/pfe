import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { GiMusicalScore } from "react-icons/gi";
function AddScoreModal({
  modalIsOpen,
  customStyles,
  token,
  setModalIsOpen,
  scores,
  setscores,
  scoreid,
  setscoreid,
}) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  //use Effect
  useEffect(() => {
    //fetch the user's scores
    //jib user id
    const currentuserlink = "https://api.flat.io/v2/me";
    fetch(currentuserlink, {
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        const userscores = `https://api.flat.io/v2/users/${data.id}/scores`;
        fetch(userscores, {
          headers: headers,
        })
          .then((res) => res.json())
          .then((data) => {
            setscores(data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);
  //functions
  const handleCloseModal = () => {
    setModalIsOpen(false);
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
        <h4>Select a score to use as attachement </h4>
        <IoMdClose
          size={24}
          onClick={handleCloseModal}
          style={{ cursor: "pointer", marginLeft: "7px" }}
        />
      </div>
      <div>
        {scores &&
          scores.map((score) => (
            <>
              <div
                className={
                  scoreid.includes(score.id)
                    ? `selectedscore scoreassignment`
                    : `notselectedscore scoreassignment`
                }
              >
                <GiMusicalScore />
                <h5 onClick={() => setscoreid(score.id)}>{score.title}</h5>
              </div>
  
            </>
          ))
          }
      </div>
      <button
                className="choosebtn"
                onClick={() => setModalIsOpen(false)}
              >
                Choose
              </button>
    </Modal>
  );
}

export default AddScoreModal;
