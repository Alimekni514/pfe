import React, { useState } from "react";
import Modal from "react-modal";
import InstrumentList from "./InstrumentList";
import { IoMdClose } from "react-icons/io";
import ScoreLibrary from "../../pages/ScoreLibrary";
import CreateScore from "./CreateScore";
function ModalInstrument({
  token,
  modalIsOpen,
  setModalIsOpen1,
  customStyles,
  collection,
  setuserscores
}) {
  //states
  const [firstwindow, setfirstwindow] = useState(true);
   collection=collection || "root";
  //states
  const [title, settitle] = useState("");
  //Functions
  const handleCloseModal = () => {
    setModalIsOpen1(false);
    setfirstwindow(true);
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
        {firstwindow ? (
          <h2>New private Score</h2>
        ) : (
          <h2>Add Instruments to My Music Score"</h2>
        )}
        <IoMdClose
          size={24}
          onClick={handleCloseModal}
          style={{ cursor: "pointer", marginLeft: "7px" }}
        />
      </div>

      {firstwindow ? (
        <CreateScore
          setfirstwindow={setfirstwindow}
          titleobject={{ title, settitle }}
        />
      ) : (
        <InstrumentList  setModalIsOpen1={setModalIsOpen1} collection={collection} titleobject={{ title, settitle }} token={token} setuserscores={setuserscores} />
      )}
    </Modal>
  );
}

export default ModalInstrument;
