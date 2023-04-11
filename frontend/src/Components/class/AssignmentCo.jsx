import React, { useState, useContext, useEffect } from "react";
import "../../Css/Class/classroom.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { timefunction } from "../../assets/Functions-Need/TimeFormat";
import ClassContext from "../../contexts/ClassContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiOutlineEdit,
  AiOutlineFolder,
  AiOutlineDelete,
} from "react-icons/ai";
import Assignment from "../../contexts/Assignment";
import { useNavigate } from "react-router-dom";
function AssignmentCo({ token }) {
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
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleClick = () => setActiveMenu(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  //useEffect for fetching the assignment
  useEffect(() => {
    //get all the assignments
    fetch(`https://api.flat.io/v2/classes/${classid}/assignments`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setassignmentsList(data);
        setfiltredassignments(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  //useEffect for applying the filtres on the assignments
  useEffect(() => {
    setzeroassignment(false);
    let newAssignments = assignmentsList;
    if (statusAssignment) {
      if (statusAssignment === "On going") {
        const now = new Date();
        newAssignments = newAssignments.filter(
          (assignment) => new Date(assignment.dueDate) > now
        );
        newAssignments.length == 0
          ? setzeroassignment(true)
          : setzeroassignment(false);
        settypeassignment("On going");
      } else if (statusAssignment === "Upcoming") {
        const now = new Date();
        newAssignments = newAssignments.filter(
          (assignment) => new Date(assignment.creationDate) > now
        );
        newAssignments.length == 0
          ? setzeroassignment(true)
          : setzeroassignment(false);
        settypeassignment("Upcoming");
      } else if (statusAssignment === "Draft") {
        newAssignments = newAssignments.filter(
          (assignment) => assignment.state === "draft"
        );
        newAssignments.length == 0
          ? setzeroassignment(true)
          : setzeroassignment(false);
        settypeassignment("Draft");
      } else if (statusAssignment === "Archived") {
        newAssignments = newAssignments.filter(
          (assignment) => assignment.state === "archived"
        );
        newAssignments.length == 0
          ? setzeroassignment(true)
          : setzeroassignment(false);
        settypeassignment("Archived");
      } else if (statusAssignment === "All") {
        console.log("hello");
      }
    }
    if (activityAssignment) {
      if (activityAssignment === "Composition assignment") {
        newAssignments = newAssignments.filter(
          (assignment) =>
            assignment.type === "scoreTemplate" ||
            assignment.type === "newScore" ||
            assignment.type === "sharedWriting"
        );
        newAssignments.length == 0
          ? setzeroassignment(true)
          : setzeroassignment(false);
        settypeassignment("Composition assignment");
      } else if (activityAssignment === "Worksheet assignment") {
        newAssignments = newAssignments.filter(
          (assignment) => assignment.type === "worksheet"
        );
        newAssignments.length == 0
          ? setzeroassignment(true)
          : setzeroassignment(false);
        settypeassignment("Worksheet assignment");
      } else if (activityAssignment === "Performance assignment") {
        newAssignments = newAssignments.filter(
          (assignment) => assignment.type === "performance"
        );

        newAssignments.length == 0
          ? setzeroassignment(true)
          : setzeroassignment(false);
        settypeassignment("Performance assignment");
      }
    }
    setfiltredassignments(newAssignments);
  }, [statusAssignment, activityAssignment]);

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
  function countStates(assignment) {
    let startedCount = assignment.submissionsCount;
    let turnedCount = assignment.submissionsSentCount;
    let returnedCount = assignment.submissionsReturnedCount;
    const totalCount = classroom.studentsGroup.usersCount;
    let notstartedCount = totalCount - (startedCount + turnedCount);
    //calculate the pourcentage
    const startedPercentage = (startedCount / totalCount) * 100;
    const turnedPercentage = (turnedCount / totalCount) * 100;
    const returnedPercentage = (returnedCount / totalCount) * 100;
    const notstartedPercentage = (notstartedCount / totalCount) * 100;
    return [
      {
        startedCount,
        startedPercentage,
      },
      {
        turnedCount,
        turnedPercentage,
      },
      {
        returnedCount,
        returnedPercentage,
      },
      {
        notstartedCount,
        notstartedPercentage,
      },
    ];
  }
  //functions for the assignment
  const handleMenuToggle = (e, item) => {
    e.stopPropagation();
    setActiveMenu(item.title);
  };
  const handleEdit = (e, item) => {
    e.preventDefault();
    setassignment(item);
    // Handle edit logic
    navigate(`/class/${classid}/assignment/${item.id}/edit`);
  };
  const handleArchive = async (event, item) => {
    event.preventDefault();
    const { id } = item;
    await fetch(
      `https://api.flat.io/v2/classes/${classroom.id}/assignments/${id}/archive`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        //get all the assignments
        await fetch(`https://api.flat.io/v2/classes/${classid}/assignments`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setassignmentsList(data);
            setfiltredassignments(data);
            toast.success("🦄Archived  Successfully", {
              position: "bottom-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (e, item) => {
    e.preventDefault();
    const { id } = item;
    e.target.parentNode.parentNode.parentNode.parentNode.remove();
    // Handle delete logic
    fetch(`https://api.flat.io/v2/classes/${classroom.id}/assignments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        toast.success("🦄assignment deleted successfully", {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="filterassignment">
        <div className="filter-button-container">
          <div className="filter-button-parent">
            <div className="filter-button" onClick={toggleStatus}>
              <span>
                Status:{" "}
                <label
                  style={{
                    display: "inline",
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  {statusAssignment}
                </label>
              </span>
              {statusOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {statusOpen && (
              <div className="filter-dropdown">
                <ul>
                  <li onClick={(event) => handleStatus(event)}>All</li>
                  <li onClick={(event) => handleStatus(event)}>On going</li>
                  <li onClick={(event) => handleStatus(event)}>Upcoming</li>
                  <li onClick={(event) => handleStatus(event)}>Draft</li>
                  <li onClick={(event) => handleStatus(event)}>Archived</li>
                </ul>
              </div>
            )}
          </div>

          <div className="filter-button-parent">
            <div className="filter-button" onClick={toggleActivity}>
              <span>
                Activity Type:{" "}
                <label
                  style={{
                    display: "inline",
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  {activityAssignment}
                </label>
              </span>
              {activityOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {activityOpen && (
              <div className="filter-dropdown">
                <ul>
                  <li onClick={(event) => handleActivity(event)}>
                    All activities
                  </li>
                  <li onClick={(event) => handleActivity(event)}>
                    Composition assignment
                  </li>
                  <li onClick={(event) => handleActivity(event)}>
                    Worksheet assignment
                  </li>
                  <li onClick={(event) => handleActivity(event)}>
                    Performance assignment
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <button className="createassignmentbtn">
          <IoIosAddCircleOutline /> Create Assignment
        </button>
      </div>

      {filtredassignments &&
        filtredassignments.map((item) => (
          <div
            className="assignmentdiv"
            key={item.id}
            onClick={() => countStates(item)}
          >
            <img className="assignmentimg" src={item.cover} alt={item.title} />
            <div className="headerassignment">
              <h4>{item.title}</h4>
              <div className="headerassignmentinformations">
                <span id="typeofassignment">{item.type}</span>
                <div className="dateassignment">
                  <span>{TimeFormat(item.creationDate)}</span>
                  <span>Due {timefunction(item.dueDate)}</span>
                </div>
              </div>
              <div class="progress-bar">
                <div
                  class="returned"
                  style={{
                    width: `${countStates(item)[2].returnedPercentage}%`,
                  }}
                ></div>
                <div
                  class="started"
                  style={{ width: `${countStates(item)[0].startedCount}%` }}
                ></div>
                <div
                  class="turnedin"
                  style={{ width: `${countStates(item)[1].turnedPercentage}%` }}
                ></div>
                <div
                  class="not-started"
                  style={{
                    width: `${countStates(item)[3].notstartedPercentage}%`,
                  }}
                ></div>
              </div>
              <div className="statsassignment">
                {publishedOrNot(item.creationDate) && (
                  <>
                    <div className="boxstats returnedbx">
                      <div>{countStates(item)[2].returnedCount}</div>
                      <div>Returned</div>
                    </div>
                    <div className="boxstats startedbx">
                      <div>{countStates(item)[0].startedCount}</div>
                      <div> Started</div>
                    </div>
                    <div className="boxstats turnedbx">
                      <div>{countStates(item)[1].turnedCount}</div>
                      <div>Turned in</div>
                    </div>
                    <div className="boxstats notstartedbx">
                      <div>{countStates(item)[3].notstartedCount}</div>
                      <div>Not started</div>
                    </div>
                  </>
                )}
              </div>
              <div className="filter-button threedots">
                <BsThreeDotsVertical
                  className="menu-icon"
                  onClick={(e) => handleMenuToggle(e, item)}
                />
                {activeMenu === item.title && (
                  <div
                    className={`filter-dropdown-assignment ${
                      activeMenu === item.title ? "active" : ""
                    }`}
                  >
                    <li onClick={(e) => handleEdit(e, item)}>
                      <AiOutlineEdit className="menu-icon" /> Edit
                    </li>
                    <li onClick={(e) => handleArchive(e, item)}>
                      <AiOutlineFolder className="menu-icon" /> Archive
                    </li>
                    <li onClick={(e) => handleDelete(e, item)}>
                      <AiOutlineDelete className="menu-icon" /> Delete
                    </li>
                  </div>
                )}
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

export default AssignmentCo;
