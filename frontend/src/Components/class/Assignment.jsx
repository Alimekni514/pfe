import React, { useState, useContext, useEffect } from "react";
import "../../Css/Class/classroom.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { timefunction } from "../../assets/Functions-Need/TimeFormat";
function Assignment({ token }) {
  //states
  const [statusOpen, setStatusOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const [statusAssignment, setstatusAssignment] = useState("All");
  const [activityAssignment, setactivityAssignment] =
    useState("All activities");
  const [assignmentsList, setassignmentsList] = useState([]);
  const { classid } = useParams();
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
        console.log(data);
      })
      .catch((err) => console.log(err));
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
        <button className="createassignmentbtn">Create Assignment</button>
      </div>

      {assignmentsList.map((item) => (
        <div className="assignmentdiv" key={item.id}>
          <img className="assignmentimg" src={item.cover} alt={item.title} />
          <div>
            <h4>{item.title}</h4>
            <div>
              <span>{item.type}</span>
              <div>
                <span>Published on {timefunction(item.creationDate)}</span>
                <span>Due {timefunction(item.dueDate)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Assignment;
