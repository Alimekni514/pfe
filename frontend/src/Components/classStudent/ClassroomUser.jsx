import { SiGoogleclassroom } from "react-icons/si";
import { useParams } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import "../../Css/Class/classroom.css";
import Stream from "./Stream";
import People from "../class/People";
import ClassContext from "../../contexts/ClassContext";
import AssignmentSection from "./AssignmentSection";
function ClassroomUser() {
  const token = window.localStorage.getItem("flat_token_user");
  const { classid } = useParams();
  const [selectedMenuItem, setSelectedMenuItem] = useState("Stream");
  const { classroom, setclassroom } = useContext(ClassContext);
  useEffect(() => {
    console.log(classroom);
  }, []);

  return (
    <div className="specialcontainer">
      <div className="classroom">
        <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
          <div className="iconholder">
            <svg
              inline=""
              color="#fff"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              data-v-abd2ab96=""
            >
              <path
                d="M6 18a2 2 0 11-.001 4.001A2 2 0 016 18zm6 0a2 2 0 11-.001 4.001A2 2 0 0112 18zm6 0a2 2 0 11-.001 4.001A2 2 0 0118 18zm2-14a1 1 0 011 1v10a1 1 0 01-1 1h-8a1 1 0 110-2h7V6h-8a1 1 0 110-2zm-6 4a1 1 0 110 2H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1zM6 3a2 2 0 11-.001 4.001A2 2 0 016 3z"
                fill="#363C50"
                fill-rule="evenodd"
                class="fill"
                data-v-abd2ab96=""
              ></path>
            </svg>
          </div>
          <h4>{classroom?.name ?? ""}</h4>
        </div>
        <nav>
          <ul className="classroomul">
            <li
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedMenuItem("Stream")}
              className={selectedMenuItem === "Stream" ? "selectedli" : ""}
            >
              Stream
            </li>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedMenuItem("Assignments")}
              className={selectedMenuItem === "Assignments" ? "selectedli" : ""}
            >
              Assignments
            </li>
            <li
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedMenuItem("People")}
              className={selectedMenuItem === "People" ? "selectedli" : ""}
            >
              People
            </li>
          </ul>
        </nav>
        <div className="menu-item-selected">
          {selectedMenuItem === "" && <Stream />}
          {selectedMenuItem === "Stream" && <Stream token={token} />}
          {selectedMenuItem === "People" && <People token={token} />}
          {selectedMenuItem === "Assignments" && (
            <AssignmentSection token={token} />
          )}
        </div>
      </div>
    </div>
  );
}
export default ClassroomUser;
