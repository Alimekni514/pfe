import React, { useContext, useEffect, useState } from "react";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import Assignment from "../../contexts/Assignment";
import "../../Css/Assignment/SkeletonNewScore.css";
import { useParams, useNavigate } from "react-router-dom";
import { timefunction } from "../../assets/Functions-Need/TimeFormat";
import { GiMusicalScore } from "react-icons/gi";
import Swal from "sweetalert2";
import { BiCommentAdd } from "react-icons/bi";
import Modal from "react-modal";
import AdminContext from "../../contexts/AdminContext";
import UserContext from "../../contexts/UserContext";

import {
  MdModeEditOutline,
  MdContentCopy,
  MdArchive,
  MdDelete,
} from "react-icons/md";
import {
  fetchStudentData,
  fetchStudentSubmission,
  getStudentSubmissionsWithUserData,
} from "../../assets/Functions-Need/SubmissionAdmin";
import AddCommentModal from "./AddCommentModal";
import { FiMoreHorizontal } from "react-icons/fi";
const token = "739dfbe59fbe2b527108bcc88c8b596f019880b5a866e8001d7e9a2607a24339867cdc962807882c3a0b40c852cce06eeddabb8d28aa1b3d5c6b72ddef3d1d46";
function SkeletonNewScore() {
  const navigate = useNavigate();
  const [isEditing, setisEditing] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { assignment, setassignment } = useContext(Assignment);
  const [details, setdetails] = useState(true);
  const [studentwork, setstudentwork] = useState(false);
  const [students, setstudents] = useState([]);
  const { attachments } = assignment;
  const [grade, setGrade] = useState({});
  const [selectedUserId, setSelectedUserId] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedstudentgrade, setselectedstudentgrade] = useState("");
  const link = attachments.filter((obj) => obj.type === "link");
  const {admin,setadmin}=useContext(AdminContext);
    const {user,setuser}=useContext(UserContext);
  const objWithCopySharingMode = attachments.find(
    (obj) => obj.hasOwnProperty("sharingMode") && obj.sharingMode === "copy"
  );
  const objWithWritingSharingMode = attachments.find(
    (obj) => obj.hasOwnProperty("sharingMode") && obj.sharingMode === "write"
  );
  const { classid, assignmentId } = useParams();
  const [selectedsubmission, setselectedsubmission] = useState({});
  // UseEffect for grab
  useEffect(() => {
    
    setadmin(false);
    setuser(false);
    const fetchData = async () => {
      const listStudent = await getStudentSubmissionsWithUserData(
        token,
        classid,
        assignmentId
      );
      console.log(listStudent);
      setstudents(listStudent);
      const initialGrades = {};
      listStudent.forEach((student) => {
        if (student.submission && student.submission.grade) {
          initialGrades[student.id] = student.submission.grade;
        } else {
          initialGrades[student.id] = "notdefined";
        }
      });
      setGrade(initialGrades);
    };
    fetchData();
    return ()=> {
      setadmin(true);
    
    }
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
    setdetails(false);
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
  //handle save
  const handlesave = (e,student) => {
    setisEditing(false);
    fetch(`https://api.flat.io/v2/classes/${student.submission.classroom}/assignments/${student.submission.assignment}/submissions/${student.submission.id}`, 
    {
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      method:"PUT",
      body:JSON.stringify({
        grade:Number(grade[student.id])
      })
    })
    .then((res)=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err));
  };
  //get the status of  a submission
  function getStatus(student) {
    if (!student.submission) {
      return "Not started";
    } else if (student.submission.state === "created") {
      return "Started";
    } else if (student.submission.state === "turnedIn") {
      return "Turned in";
    } else if (student.submission.state === "returned") {
      return "Returned";
    } else if (student.submission.state === "graded") {
      return "Graded";
    }
  }
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
  //For The First Modal
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  //function to show the modal of comments and send a comment
  const modalcomment = (e, item) => {
    setModalIsOpen(true);
    setselectedsubmission(item.submission);
  };
  //
  const handleEditing = (e, student) => {
    setisEditing(true);
    setselectedstudentgrade(student.id);
  };
  const handleTerfessClick = (userId) => {
    setDropdownVisible((prev) => !prev);
    // set the selected user id
    setSelectedUserId(userId);
  };
  //handle Return
  const handlereturn=(student)=> {
    localStorage.setItem("submission",JSON.stringify(student));
  }

  return (
    <>
      <AiOutlineFullscreenExit
        id="exitsvg"
        onClick={() => (window.location.href = "/class")}
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
            <a href="#" onClick={handlechange}>
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
                  <th>Comment</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody id="tableassitest">
                {students.map((student) => (
                  <tr key={student.id}>
                    <td id="studentass">
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
                        {getStatus(student)}
                      </span>
                    </td>
                    {getStatus(student) !== "Not started" ? (
                      <td onClick={(e) => modalcomment(e, student)}>
                        <BiCommentAdd />
                        {student.submission.comments.total}
                      </td>
                    ) : (
                      <td></td>
                    )}
                    <td>
                      {isEditing && selectedstudentgrade == student.id ? (
                        <>
                          <input
                            type="text"
                            value={grade[student.id] ?? ""}
                            onChange={(e) =>
                              setGrade({
                                ...grade,
                                [student.id]: e.target.value,
                              })
                            }
                          />
                          <button onClick={(e)=>handlesave(e,student)}>Save</button>
                        </>
                      ) : (
                        <p onClick={(e) => handleEditing(e, student)}>
                          {grade[student.id]}
                        </p>
                      )}
                    </td>
                    <td>
                      <div
                        className="terfess-icon"
                        onClick={() => handleTerfessClick(student.id)}
                        style={{ position: "relative" }}
                      >
                        <FiMoreHorizontal />
                        {dropdownVisible && selectedUserId === student.id && (
                          <div
                            className="dropdown-menu"
                            style={{
                              position: "absolute",
                              top: "calc(100% + 8px)",
                              left: "-80px",
                              width: "115px",
                            }}
                          >
                            <ul>
                              <li>
                                <button onClick={()=>handlereturn(student)}>Return</button>
                              </li>
                              <li>
                                <button>Reset Student</button>
                              </li>
                              <li>
                                <button onClick={()=>navigate("/view")}>View work</button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </div>
        <div>
          {assignment.type === "newScore" && (
            <div className="assignmentbox">
              <img src={assignment.cover} alt="coverimage" />
              <h4>New Score Composition</h4>
              <p>Students will begin the assignment with a blank score</p>
            </div>
          )}
          {assignment.type === "scoreTemplate" && (
            <div className="assignmentbox">
              <img src={assignment.cover} alt="coverimage" />
              <h4>Template Composition</h4>
              <p>
                Students will use a copy of one of your score as a template.
              </p>
              <div className="scoreofassignment">
                {" "}
                <GiMusicalScore />
                {objWithCopySharingMode.title}
              </div>
            </div>
          )}
          {assignment.type === "sharedWriting" && (
            <div className="assignmentbox">
              <img src={assignment.cover} alt="coverimage" />
              <h4>Shared Writing Composition</h4>
              <p>
                All Students in your class will be able to edit one of your
                scores.
              </p>
              <div className="scoreofassignment">
                {" "}
                <GiMusicalScore />
                {objWithWritingSharingMode.title}
              </div>
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
        <AddCommentModal
          modalIsOpen={modalIsOpen}
          customStyles={customStyles1}
          setModalIsOpen1={setModalIsOpen}
          token={token}
          submission={selectedsubmission}
        />
      </div>
    </>
  );
}

export default SkeletonNewScore;
