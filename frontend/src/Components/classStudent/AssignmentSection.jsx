import React, { useState, useContext, useEffect } from "react";
import "../../Css/Class/classroom.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { timefunction } from "../../assets/Functions-Need/TimeFormat";
import ClassContext from "../../contexts/ClassContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import {fetchStudentData,fetchStudentSubmission,getStudentSubmissionsWithUserData,getSubmissionStateCounts,}from "../../assets/Functions-Need/SubmissionAdmin";
import "react-toastify/dist/ReactToastify.css";
import {Table } from "flowbite-react"
import {AiOutlineEdit,AiOutlineFolder,AiOutlineDelete,} from "react-icons/ai";
import Assignment from "../../contexts/Assignment";
import { useNavigate } from "react-router-dom";
function AssignmentSection({ token }) {
  const navigate = useNavigate();
  //states
  const [statusOpen, setStatusOpen] = useState(false);
  const { assignment, setassignment } = useContext(Assignment);
  const [activityOpen, setActivityOpen] = useState(false);
  const [statusAssignment, setstatusAssignment] = useState("All");
  const [activityAssignment, setactivityAssignment] =
    useState("All activities");
  const [assignmentsList, setassignmentsList] = useState([]);
  const [filtredassignments, setfiltredassignments] = useState(assignmentsList);
  const { classid } = useParams();
  const { classroom, setclassroom } = useContext(ClassContext);
  const [zeroassignment, setzeroassignment] = useState(false);
  const [typeassignment, settypeassignment] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeMenuArchived, setactiveMenuArchived] = useState(null);

  //useEffect for fetching the assignment
  useEffect(() => {
    // fetch assignments data and setAssignments state
    const fetchAssignments = async () => {
      try {
        const response = await fetch(
          `https://api.flat.io/v2/classes/${classid}/assignments`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        const assignmentsWithStates = data.map((assignment) => {
          const states = getSubmissionStateCounts(assignment.submissions);
          return {
            ...assignment,
            states,
          };
        });
        setassignmentsList(assignmentsWithStates);
        setfiltredassignments(assignmentsWithStates);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAssignments();
  }, []);

  //functions
  function toggleStatus() {
    setStatusOpen(!statusOpen);
  }

  function toggleActivity() {
    setActivityOpen(!activityOpen);
  }
  const handleStatus = (event) => {
    setStatusOpen(false);
    //update the state of the status filter
    setstatusAssignment(event.target.textContent);
  };
  const handleActivity = (event) => {
    setActivityOpen(false);
    setactivityAssignment(event.target.textContent);
  };
  //time foramtted assignment function
  const TimeFormat = (time) => {
    const date = new Date(time);
    if (date > new Date()) {
      return `Scheduled on ${timefunction(date)}`;
    } else {
      return `Published on ${timefunction(date)}`;
    }
  };
  // function to see if the progress bar should be visible or not
  const publishedOrNot = (time) => {
    const date = new Date(time);
    if (date > new Date()) {
      return false;
    } else {
      return true;
    }
  };

  //handle navigate assignment
  const handlenavigateassignment = (e, item) => {
    e.preventDefault();
    setassignment(item);
    navigate(`/class/${classid}/assignment/${item.id}/user`);
  };

  return (
    <div className="mt-[20px]">

      {filtredassignments &&
        filtredassignments.map((item) => (
          <div
            className={`assignmentdiv ${
              item.state === "archived" ? "archivedAssignmentdiv" : ""
            }`}
            key={item.id}
            //
          >
            <img
              className={`assignmentimg  ${
                item.state === "archived" ? "archivedAssignment" : ""
              }`}
              src={item.cover}
              alt={item.title}
              onClick={(e) => handlenavigateassignment(e, item)}
            />
            <div className="headerassignment">
              <h4>{item.title}</h4>
              <div className="headerassignmentinformations">
                <span id="typeofassignment">{item.type}</span>
                <div className="dateassignment">
                  <span>{TimeFormat(item.creationDate)}</span>
                  <span>Due {timefunction(item.dueDate)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      {zeroassignment && (
        <div className="zeroassignment">
          <img
            src="https://prod.flat-cdn.com/js/img/5ccc5953e82f246801b9.png"
            alt="noassignments"
          />
          <div className="textzeroassignment">
            <h4>No {typeassignment} assignments</h4>
            <p>
              You will find here the {typeassignment} assignments for this class
            </p>
            <button className="createassignmentbtn">
              <IoIosAddCircleOutline /> Add assignments
            </button>
          </div>
        </div>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default AssignmentSection;
