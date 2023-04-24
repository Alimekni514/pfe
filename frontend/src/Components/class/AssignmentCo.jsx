import React, { useState, useContext, useEffect } from "react";
import "../../Css/Class/classroom.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { timefunction } from "../../assets/Functions-Need/TimeFormat";
import ClassContext from "../../contexts/ClassContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import {
  fetchStudentData,
  fetchStudentSubmission,
  getStudentSubmissionsWithUserData,
  getSubmissionStateCounts,
} from "../../assets/Functions-Need/SubmissionAdmin";
import "react-toastify/dist/ReactToastify.css";
import {Table } from "flowbite-react"
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
  const [activeMenuArchived, setactiveMenuArchived] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [resultQuiz, setresultQuiz] = useState([]);

  useEffect(() => {
    const handleClick = () => setActiveMenu(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  useEffect(() => {
    const handleClick = () => setactiveMenuArchived(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  });
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
  //useEffect for applying the filtres on the assignments
  useEffect(() => {
    setzeroassignment(false);
    setresultQuiz(null);
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
        newAssignments = [];
        fetch(`http://localhost:1000/api/result/results`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setresultQuiz(data);
          })
          .catch((err) => console.log(err));
        // newAssignments.length == 0
        //   ? setzeroassignment(true)
        //   : setzeroassignment(false);
        settypeassignment("Worksheet assignment");
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

  //functions for the assignment
  const handleMenuToggle = (e, item) => {
    e.stopPropagation();
    setActiveMenu(item.title);
  };
  const handleMenuToggleArchived = (e, item) => {
    e.stopPropagation();
    setactiveMenuArchived(item.title);
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
    console.log(id);
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
  //handle navigate assignment
  const handlenavigateassignment = (e, item) => {
    e.preventDefault();
    setassignment(item);
    navigate(`/class/${classid}/assignment/${item.id}`);
  };
  //handle unarchive
  const handleunarchive = async (e, item) => {
    await fetch(
      `https://api.flat.io/v2/classes/${classid}/assignments/${item.id}/archive`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
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
        toast.success("Unarchive  Successfully", {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchAssignments();
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
        <button
          className="createassignmentbtn"
          onClick={() => navigate(`/class/${classid}/assignment/types`)}
        >
          <IoIosAddCircleOutline /> Create Assignment
        </button>
      </div>

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
              <div class="progress-bar">
                <div
                  class="returned"
                  style={{
                    width: `${item.states[2].startedPercentage}%`,
                  }}
                ></div>
                <div
                  class="started"
                  style={{ width: `${item.states[0].startedPercentage}%` }}
                ></div>
                <div
                  class="turnedin"
                  style={{ width: `${item.states[1].turnedPercentage}%` }}
                ></div>
                <div
                  class="not-started"
                  style={{
                    width: `${item.states[3].notstartedPercentage}%`,
                  }}
                ></div>
              </div>
              <div className="statsassignment">
                {publishedOrNot(item.creationDate) && (
                  <>
                    <div className="boxstats returnedbx">
                      <div>{item.states[2].returned}</div>
                      <div>Returned</div>
                    </div>
                    <div className="boxstats startedbx">
                      <div>{item.states[0].created}</div>
                      <div> Started</div>
                    </div>
                    <div className="boxstats turnedbx">
                      <div>{item.states[1].turnedIn}</div>
                      <div>Turned in</div>
                    </div>
                    <div className="boxstats notstartedbx">
                      <div>{item.states[3].notStarted}</div>
                      <div>Not started</div>
                    </div>
                  </>
                )}
              </div>
              {item.state !== "archived" && (
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
              )}
              {item.state == "archived" && (
                <div className="filter-button threedots">
                  <BsThreeDotsVertical
                    className="menu-icon"
                    onClick={(e) => handleMenuToggleArchived(e, item)}
                  />
                  {activeMenuArchived === item.title && (
                    <div
                      className={`filter-dropdown-assignment ${
                        activeMenuArchived === item.title ? "active" : ""
                      }`}
                    >
                      <li onClick={(e) => handleunarchive(e, item)}>
                        <AiOutlineFolder className="menu-icon" /> Unarchive
                      </li>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
   {resultQuiz && (<Table>
  <Table.Head>
    <Table.HeadCell>
      Quizz Code
    </Table.HeadCell>
    <Table.HeadCell>
      User
    </Table.HeadCell>
    <Table.HeadCell>
      Score
    </Table.HeadCell>
    <Table.HeadCell>
      Date
    </Table.HeadCell>
    <Table.HeadCell>
      <span className="sr-only">
        Delete
      </span>
    </Table.HeadCell>
  </Table.Head>
  <Table.Body className="divide-y">
    {resultQuiz.map((result) => ( <Table.Row  key={result.user}className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
       {result.quizCode}
      </Table.Cell>
      <Table.Cell>
        {result.name}
      </Table.Cell>
      <Table.Cell>
       {result.score}
      </Table.Cell>
      <Table.Cell>
       {result.date}
      </Table.Cell>
      <Table.Cell>
          <a href="/tables" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Edit</a>
      </Table.Cell>
      </Table.Row>))}
  </Table.Body>
</Table>)}
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
