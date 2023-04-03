import React, { useContext, useState } from "react";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import Assignment from "../../contexts/Assignment";
import "../../Css/Assignment/SkeletonNewScore.css";
import { useParams, useNavigate } from "react-router-dom";
import { timefunction } from "../../assets/Functions-Need/TimeFormat";
import Swal from "sweetalert2";
import {
  MdModeEditOutline,
  MdContentCopy,
  MdArchive,
  MdDelete,
} from "react-icons/md";
const token =
  "739dfbe59fbe2b527108bcc88c8b596f019880b5a866e8001d7e9a2607a24339867cdc962807882c3a0b40c852cce06eeddabb8d28aa1b3d5c6b72ddef3d1d46";
function SkeletonNewScore() {
  const navigate = useNavigate();
  const { assignment, setassignment } = useContext(Assignment);
  const [details, setdetails] = useState(true);
  const { attachments } = assignment;
  const link = attachments.filter((obj) => obj.type === "link");
  const { classid, assignmentId } = useParams();
  //handle Change
  const handlechange = (e) => {
    e.target.classList.toggle("activedetail");
  };
  //handle Change1

  //archive Class
  const archiveclass = () => {
    fetch(
      `https://api.flat.io/v2/classes/${classid}/assignments/${assignmentId}/archive`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "the class has been archived",
          showConfirmButton: false,
          timer: 2500,
        });
      })
      .catch((err) => console.log(err));
  };
  const copyassignment = () => {
    fetch(
      `https://api.flat.io/v2/classes/${classid}/assignments/${assignmentId}/copy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  //Edit Assignment
  const editassignment = () => {
    navigate(`/class/${classid}/assignment/${assignmentId}/edit`);
  };

  return (
    <>
      <AiOutlineFullscreenExit />
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
            <a href="#" onClick={handlechange}>
              Details
            </a>
            <a href="#">Student's work</a>
          </div>
          {details && (
            <div>
              <p>{assignment.description}</p>
              <div>
                <a href={link[0].url} id="urlo" target="_blank">
                  {link[0].title}
                </a>
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="assignmentbox">
            <img src={assignment.cover} alt="coverimage" />
            <h4>New Score Composition</h4>
            <p>Students will begin the assignment with a blank score</p>
          </div>
          <div className="toolsassignment">
            <button onClick={() => editassignment()}>
              {" "}
              <MdModeEditOutline />
              Edit
            </button>
            <button onClick={() => copyassignment()}>
              {" "}
              <MdContentCopy />
              Copy
            </button>
            <button onClick={() => archiveclass()}>
              <MdArchive />
              Archive
            </button>
            <button onClick={() => deleteclass()}>
              <MdDelete />
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SkeletonNewScore;
