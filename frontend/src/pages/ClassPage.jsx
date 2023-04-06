import React, { useState, useEffect, useContext } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FcMusic } from "react-icons/fc";
import "../Css/Class/ClassPage.css";
import { SiApplemusic } from "react-icons/si";
const token = import.meta.env.VITE_ADMIN_TOKEN;
import Modal from "react-modal";
import CreateClassModal from "../Components/class/CreateClassModal";
import ClassContext from "../contexts/ClassContext";
import { useNavigate } from "react-router-dom";

function ClassPage() {
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
    navigate(`/class/${classe.id}`);
  };

  Modal.setAppElement("#root");
  return (
    <div className="specialcontainer">
      <h3 className="titleclasspage">My Classes</h3>
      <div className="classessection">
        <div className="createclass" onClick={setModalIsOpen}>
          <AiFillPlusCircle />
          <span>Create a new class</span>
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
                  <span> {classe.studentsGroup.usersCount} Students</span>
                  <span>.</span>
                  <span> {classe.assignmentsCount} assignments</span>
                </div>
              </div>
            </div>
          ))}
      </div>

      <CreateClassModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen1={setModalIsOpen}
        token={token}
      />
    </div>
  );
}

export default ClassPage;
