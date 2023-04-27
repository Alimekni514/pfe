import React, { useContext, useEffect, useState } from "react";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import Assignment from "../../contexts/Assignment";
import "../../Css/Assignment/SkeletonNewScore.css";
import { useParams, useNavigate } from "react-router-dom";
import { timefunction } from "../../assets/Functions-Need/TimeFormat";
import { GiMusicalScore } from "react-icons/gi";
import Swal from "sweetalert2";
import { IoIosAddCircleOutline } from "react-icons/io";
import Modal from "react-modal";
import AdminContext from "../../contexts/AdminContext";
import UserContext from "../../contexts/UserContext";
import ModalInstrument from "../InstrumentList/ModalInstrument";
import {
  fetchStudentData,
  fetchStudentSubmission,
  getStudentSubmissionsWithUserData,
} from "../../assets/Functions-Need/SubmissionAdmin";
import { FiMoreHorizontal } from "react-icons/fi";
import { Badge } from "flowbite-react";
import AddScoreModal from "../Assignments/AddScoreModal";
const token = window.localStorage.getItem("flat_token_user");
function findStudentById(studentArray, id) {
  for (let i = 0; i < studentArray.length; i++) {
    if (studentArray[i].id === id) {
      return studentArray[i];
    }
  }
  return null; // return null if no student with matching id is found
}
//filter the id of the score
function getObjectById(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return arr[i];
    }
  }
  return null; // Return null if no object with the given ID is found
}

function SkeletonScore() {
  const navigate = useNavigate();
  const { assignment, setassignment } = useContext(Assignment);
  const { attachments } = assignment;
  const { admin, setadmin } = useContext(AdminContext);
  const { user, setuser } = useContext(UserContext);
  const { classid, assignmentId } = useParams();
  const [StudentSubmission, setStudentSubmission] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [scores, setscores] = useState([]);
  const [scoreid, setscoreid] = useState("");
  //handle modal show
  const handlemodalShow = () => {
    setModalIsOpen(true);
  };
  const handlemodalShow1 = () => {
    setModalIsOpen1(true);
  };
  //Modal Setting
  const customStyles1 = {
    content: {
      top: "50%",
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
  Modal.setAppElement("#root");
  useEffect(() => {
    setuser(false);
    const fetchData = async () => {
      const idStudentfetch = await fetch(`https://api.flat.io/v2/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const idStudentObject = await idStudentfetch.json();
      const { id } = idStudentObject;
      console.log(id);
      const listStudent = await getStudentSubmissionsWithUserData(
        token,
        classid,
        assignmentId
      );
      const studentWithHisSubmission = findStudentById(listStudent, id);
      setStudentSubmission(studentWithHisSubmission.submission);
    };
    fetchData();
  }, []);
  const createscore = async () => {
    localStorage.setItem(
      "submissionInformation",
      JSON.stringify({
        assignmentId,
        classid,
      })
    );
    handlemodalShow();
  };
  //start the  assignment from an existing music score
  const startAssignment = () => {
    fetch(
      `https://api.flat.io/v2/classes/${classid}/assignments/${assignmentId}/submissions`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          attachments: [
            {
              type: "flat",
              score: scoreid[0],
              title: "title-music",
            },
          ],
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const myObject = getObjectById(scores, scoreid[0]);
        window.location.href = myObject.htmlUrl;
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AiOutlineFullscreenExit
        id="exitsvg"
        onClick={() => (window.location.href = "/class/user")}
      />
      <div className="bodyassignment">
        <div className="fbodyassignment">
          <div className="assignmentdetails">
            <h3>{assignment.title}</h3>
            <div>
              <span>Published On {timefunction(assignment.creationDate)}</span>
              <span>Due Date {timefunction(assignment.dueDate)}</span>
            </div>
          </div>
          <div className="barassignment">
            <a href="#">Details</a>
          </div>
        </div>
        {StudentSubmission == null &&
          (assignment.type == "newScore" ? (
            <div className="assignmentbox w-[300px]">
              <div className="flex items-center justify-between w-[100%]">
                <h3 className="!font-bold">Your work</h3>
                <Badge color="pink" size="sm">
                  Not started
                </Badge>
              </div>
              <p>
                Start from a blank score or by adding an existing one from your
                library
              </p>
              <h3 className="font-bold mt-[10px]">Attachments</h3>
              <div
                onClick={createscore}
                className="flex w-[100%] text-[#e04e90] items-center gap-x-[8px] mt-[11px]"
              >
                <IoIosAddCircleOutline />
                Create and add a new Score
              </div>
              <div
                onClick={handlemodalShow1}
                className="flex w-[100%] text-[#e04e90] items-center gap-x-[8px] mt-[11px]"
              >
                <IoIosAddCircleOutline /> Add an existing Score
              </div>
              <button
                onClick={startAssignment}
                className="text-[#fff] bg-[#e04e90] rounded-xl px-[5px] py-[5px] mt-[15px]"
              >
                Start assignment
              </button>
            </div>
          ) : (
            <div className="assignmentbox w-[300px]">
              <div className="flex items-center justify-between w-[100%]">
                <h3 className="!font-bold">Your work</h3>
                <Badge color="pink" size="sm">
                  Not started
                </Badge>
              </div>
            </div>
          ))}
      </div>
      <ModalInstrument
        modalIsOpen={modalIsOpen}
        customStyles={customStyles1}
        setModalIsOpen1={setModalIsOpen}
        token={token}
      />
      <AddScoreModal
        modalIsOpen={modalIsOpen1}
        customStyles={customStyles1}
        token={token}
        setModalIsOpen={setModalIsOpen1}
        scores={scores}
        setscores={setscores}
        scoreid={scoreid}
        setscoreid={setscoreid}
      />
    </>
  );
}

export default SkeletonScore;
