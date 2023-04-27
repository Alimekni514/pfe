import React, { useState, useEffect, useContext } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FcMusic } from "react-icons/fc";
import "../Css/Class/ClassPage.css";
import { SiApplemusic } from "react-icons/si";
const token = window.localStorage.getItem("flat_token_user");
import Modal from "react-modal";
import JoinClassModal from "../Components/classStudent/JoinClassModal";
import ClassContext from "../contexts/ClassContext";
import { useNavigate } from "react-router-dom";

function ClassPageUser() {
  //states
  //classes avaible for the current user
  const [classesuser, setclassesuser] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { classroom, setclassroom } = useContext(ClassContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://api.flat.io/v2/classes", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setclassesuser(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  const handleClassClick = (classe) => {
    setclassroom(classe);
    navigate(`/class/${classe.id}/user`);
  };

  Modal.setAppElement("#root");
  return (
    <div className="specialcontainer">
      <h3 className="titleclasspage">My Classes</h3>
      <div className="classessection">
        <div className="createclass" onClick={handleOpenModal}>
          <AiFillPlusCircle />
          <span>Join a new Class</span>
        </div>
        {classesuser &&
          classesuser.map((classe) => (
            <div
              className="clist-card"
              style={{
                background: `var(--gradient-${
                  Math.floor(Math.random() * 4) + 1
                })`,
              }}
              onClick={(event) => handleClassClick(classe)}
            >
              <div className="iconclass">
                <SiApplemusic />
              </div>
              <div className="contentclass">
                <div className="titleclass">{classe.name}</div>
                <div class="section_fCSj_">&nbsp;</div>
                <div className="statsclass">
                  <span className="invisible"> {classe.studentsGroup.usersCount} Students</span>
                  <span className="invisible"> {classe.assignmentsCount} assignments</span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <JoinClassModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen1={setModalIsOpen}
        token={token}
      />
    </div>
  );
}

export default ClassPageUser;
