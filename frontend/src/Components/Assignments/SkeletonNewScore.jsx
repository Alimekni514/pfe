import React, { useContext, useEffect, useState } from "react";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import Assignment from "../../contexts/Assignment";
import "../../Css/Assignment/SkeletonNewScore.css";
import { useParams, useNavigate } from "react-router-dom";
import { timefunction } from "../../assets/Functions-Need/TimeFormat";
import {GiMusicalScore} from "react-icons/gi";
import Swal from "sweetalert2";
import {
  MdModeEditOutline,
  MdContentCopy,
  MdArchive,
  MdDelete,
} from "react-icons/md";
const token = import.meta.env.VITE_ADMIN_TOKEN;
function SkeletonNewScore() {
  const navigate = useNavigate();
  const { assignment, setassignment } = useContext(Assignment);
  const [details, setdetails] = useState(true);
  const [studentwork, setstudentwork] = useState(false);
  const [students, setstudents] = useState([]);
  const { attachments } = assignment;
  const link = attachments.filter((obj) => obj.type === "link");
  const objWithCopySharingMode = attachments.find(obj => obj.hasOwnProperty('sharingMode') && obj.sharingMode === "copy");
  const objWithWritingSharingMode=attachments.find(obj=>obj.hasOwnProperty('sharingMode') && obj.sharingMode === "write");
  const { classid, assignmentId } = useParams();
  // UseEffect for grab
  useEffect(() => {
    //grab the id of teh students group
    fetch(`https://api.flat.io/v2/classes/${classid}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        await fetch(
          `https://api.flat.io/v2/groups/${data.studentsGroup.id}/users`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => setstudents(data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);
  //handle Change
  const handlechange = (e) => {
    setdetails((prev) => !prev);
    setstudentwork(false);
    e.target.classList.toggle("activedetail");
  };
  //handle Change1
  const handlechange1 = (e) => {
    setstudentwork((prev) => !prev);
    setdetails(false)
    e.target.classList.toggle("activedetail");
  };
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
      <AiOutlineFullscreenExit id="exitsvg" onClick={()=>window.location.href="/class"} />
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
            <a href="#"   onClick={handlechange}>
              Details
            </a>
            <a href="#" onClick={handlechange1}>
              Student's work
            </a>
          </div>
          {details && (
            <div>
              <p>{assignment.description}</p>
              <div>
                {/* <a href={link[0].url} id="urlo" target="_blank">
                  {link[0].title} */}
                {/* </a> */}
              </div>
            </div>
          )}
          {studentwork && (
            <>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="tableassitest">
                {students.map((student) => (
                  <tr>
                    <td id="studentass">
                      {" "}
                      <img
                        src={student.picture}
                        alt="logo"
                        style={{ width: "25px" }}
                      />
                      {student.printableName}
                    </td>
                    <td id="statestudent">
                      <span
                        style={{
                          display: "block",
                          padding: "4px 8px",
                          backgoundColor: "#eaeaec",
                          color: "#646f8d",
                        }}
                      >
                        Not started
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </div>
        <div>
           {assignment.type==="newScore" && (
           <div className="assignmentbox">
            <img src={assignment.cover} alt="coverimage" />
            <h4>New Score Composition</h4>
            <p>Students will begin the assignment with a blank score</p>
          </div>)}
          {assignment.type==="scoreTemplate" && (
            <div className="assignmentbox">
            <img src={assignment.cover} alt="coverimage" />
            <h4>Template Composition</h4>
            <p>Students will use a copy of one of your score as a template.</p>
            <div className="scoreofassignment"> <GiMusicalScore/>{objWithCopySharingMode.title}</div>
          </div>
          )}
          {assignment.type==="sharedWriting" && (
              <div className="assignmentbox">
              <img src={assignment.cover} alt="coverimage" />
              <h4>Shared Writing  Composition</h4>
              <p>All Students in your class will be able to edit one of your scores.</p>
              <div className="scoreofassignment"> <GiMusicalScore/>{objWithWritingSharingMode.title}</div>
            </div>
          )}
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
