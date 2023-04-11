import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import "../../Css/CreateAssignment/CreateAssignment.css";
import { FiLink2 } from "react-icons/fi";
import { GiMusicalScore } from "react-icons/gi";
import AddScoreModal from "./AddScoreModal";
import { GrFormAdd } from "react-icons/gr";
import Assignment from "../../contexts/Assignment";
import { TiDeleteOutline } from "react-icons/ti";
import Modal from "react-modal";
import AddScoreModalWriting from "./AddScoreModalWriting";
const token =
  "739dfbe59fbe2b527108bcc88c8b596f019880b5a866e8001d7e9a2607a24339867cdc962807882c3a0b40c852cce06eeddabb8d28aa1b3d5c6b72ddef3d1d46";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
const classid = "6427fdbfa249111302240a9c";
function CreateAssignment() {
  const navigate = useNavigate();
  //states
  const [assignmentname, setassignmentname] = useState("");
  const [publicationdate, setpublicationdate] = useState("");
  const [duedate, setduedate] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(
    "https://flat.io/img/illustrations/activity-cover-3.jpg"
  );
  //state
  const [scores, setscores] = useState([]);
  const { assignment, setassignment } = useContext(Assignment);
  const [scoreidlist, setscoreidlist] = useState([]);
  const [scoreidwriting, setscoreidwriting] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [assignmenttype, setassignmenttype] = useState("NewScore");
  const [addlink, setaddlink] = useState(false);
  const [linkInput, setlinkInput] = useState("");
  const [links, setlinks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [grade, setgrade] = useState("");
  const [locked, setlocked] = useState(false);
  const [description, setdescription] = useState("");

  //functions
  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBackgroundImage(reader.result);
    };
  };
  //add link functions
  const addlinkfunction = (e) => {
    e.preventDefault();
    setlinks([...links, linkInput]);
    setlinkInput("");
  };
  const handledeleteLink = (index) => {
    setlinks((prevlinks) => prevlinks.filter((uri, i) => i !== index));
  };
  //Handle publish
  const handlepublish = () => {
    if (assignmenttype === "newScore") {
      const linkObjects = links.map((link) => {
        return { type: "link", url: link };
      });
      const scoreObjects = scoreidlist.map((score) => {
        return { type: "flat", score: score };
      });
      const assignment = {
        type: assignmenttype,
        title: assignmentname,
        description: description,
        maxPoints: Number(grade),
        scheduledDate: new Date(publicationdate),
        dueDate: new Date(duedate),
        cover: backgroundImage,
        attachments: [...linkObjects, ...scoreObjects],
      };
      Object.keys(assignment).forEach((key) => {
        if (!assignment[key]) {
          console.log(assignment[key]);
          delete assignment[key];
        }
      });
      assignment.attachments = assignment.attachments.filter((attachment) => {
        if (attachment.type === "link") {
          return !!attachment.url;
        } else if (attachment.type === "flat") {
          return !!attachment.score;
        }
      });

      fetch(`https://api.flat.io/v2/classes/${classid}/assignments`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(assignment),
      })
        .then((res) => res.json())
        .then(async (data) => {
          await setassignment(data);
          navigate(`/class/${classid}/assignment/${data.id}`);
        })
        .catch((err) => console.log(err));
    } else if (
      assignmenttype === "scoreTemplate" ||
      assignmenttype === "sharedWriting"
    ) {
      const linkObjects = links.map((link) => {
        return { type: "link", url: link };
      });
      const scoreObjects = scoreidlist.map((score) => {
        return { type: "flat", score: score };
      });
      const score = {
        type: "flat",
        score: scoreidwriting,
        sharingMode: "copy",
        lockScoreTemplate: true,
      };
      const assignment = {
        type: assignmenttype,
        title: assignmentname,
        description: description,
        maxPoints: Number(grade),
        scheduledDate: new Date(publicationdate),
        dueDate: new Date(duedate),
        cover: backgroundImage,
        attachments: [...linkObjects, ...scoreObjects, score],
      };
      Object.keys(assignment).forEach((key) => {
        if (!assignment[key]) {
          console.log(assignment[key]);
          delete assignment[key];
        }
      });
      assignment.attachments = assignment.attachments.filter((attachment) => {
        if (attachment.type === "link") {
          return !!attachment.url;
        } else if (attachment.type === "flat") {
          return !!attachment.score;
        }
      });

      fetch(`https://api.flat.io/v2/classes/${classid}/assignments`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(assignment),
      })
        .then((res) => res.json())
        .then((data) => {
          setassignment(data);
          navigate(`/class/${classid}/assignment/${data.id}`);
        })
        .catch((err) => console.log(err));
    }
  };
  //Add Score Modal function
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };
  const handleOpenModal1 = () => {
    setModalIsOpen1(true);
  };
  //style for the Modal
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

  return (
    <>
      <header>
        <div className="ContentHeaderAssignment">
          <div>
            <button>
              {" "}
              <AiOutlineArrowLeft />
              Back
            </button>
          </div>
          <h5>{assignmentname}</h5>
        </div>
        <button className="publishassignment" onClick={() => handlepublish()}>
          Publish <AiOutlineArrowRight />
        </button>
      </header>
      <div className="assignmentbody">
        <div className="inputgroup">
          <label>
            <h6>Editing in -</h6>Changes made here will not affect assignments
            already created within other classes{" "}
          </label>
          <input type="text" value={"esmclass"} />
        </div>
        <div className="inputgroup">
          <label>
            <h6>Name your assignment -</h6> <span>Required</span>
          </label>
          <input
            type="text"
            placeholder="Assignment name"
            value={assignmentname}
            onChange={(e) => setassignmentname(e.target.value)}
          />
        </div>
        <div className="dategroup">
          <div>
            <label>Publication date</label>
            <input
              type="datetime-local"
              value={publicationdate}
              onChange={(e) => setpublicationdate(e.target.value)}
            />
          </div>
          <div>
            <label>Due date</label>
            <input
              type="datetime-local"
              value={duedate}
              onChange={(e) => setduedate(e.target.value)}
            />
          </div>
        </div>
        <h5 className="covertitle">Cover</h5>
        <div
          className="image-container"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          onMouseEnter={() => setShowOverlay(true)}
          onMouseLeave={() => setShowOverlay(false)}
        >
          {showOverlay && (
            <div className="overlay">
              <label htmlFor="file-upload" className="upload-button">
                Upload New Image
              </label>
            </div>
          )}
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleUploadImage}
            style={{ display: "none" }}
          />
        </div>

        <div className="assignmentType">
          <div
            className="scorepart"
            onClick={() => setassignmenttype("newScore")}
          >
            <img
              src="https://prod.flat-cdn.com/js/img/fc86518498db0de9254a.png"
              alt="icon"
            />
            <h6>New Score</h6>
            <p>Students will begin the assignment with a blank score.</p>
            <input
              type="checkbox"
              checked={assignmenttype.includes("newScore")}
            />
          </div>
          <div
            className="Template"
            onClick={() => setassignmenttype("scoreTemplate")}
          >
            <img
              src="https://prod.flat-cdn.com/js/img/1a7aec0100410828f658.png"
              alt=""
            />
            <h6> Template</h6>
            <p>Students will use a copy of one of your scores as a template.</p>
            <input
              type="checkbox"
              checked={assignmenttype.includes("scoreTemplate")}
            />
          </div>
          <div
            className="sharedWriting"
            onClick={() => setassignmenttype("sharedWriting")}
          >
            <img
              src="https://prod.flat-cdn.com/js/img/3a0ce11f8d2ae2e485d7.png"
              alt=""
            />
            <h6>Shared Writing</h6>
            <p>
              All students in your class will be able to edit one of your
              scores.
            </p>
            <input
              type="checkbox"
              checked={assignmenttype.includes("sharedWriting")}
            />
          </div>
        </div>
        {/* New Score  */}
        {assignmenttype && (
          <div className="instructionsNewScore">
            <h6>Instructions</h6>

            <textarea
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              placeholder="(Optional) Here you can insert your instructions.You cn also attach files,links,or read-only scores"
            ></textarea>
            <ul className="linksul">
              {links.map((link, index) => (
                <li key={index}>
                  {link}{" "}
                  <button onClick={() => handledeleteLink(index)}>
                    <TiDeleteOutline />
                  </button>
                </li>
              ))}
            </ul>
            <div className="buttons">
              <div style={{ position: "relative" }}>
                <button
                  id="addlink"
                  onClick={(e) => setaddlink((prevstate) => !prevstate)}
                >
                  <FiLink2 /> Add link
                </button>
                <button onClick={() => setModalIsOpen(true)}>
                  {" "}
                  <GiMusicalScore />
                  Add Score
                </button>
                {addlink && (
                  <div className="addLinkNewScore">
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={linkInput}
                      onChange={(e) => setlinkInput(e.target.value)}
                    />
                    <button id="addlink1" onClick={(e) => addlinkfunction(e)}>
                      {" "}
                      Add link
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {assignmenttype === "scoreTemplate" && (
          <>
            <p className="copiedscore">
              <h5>Work scores (Required) </h5>-(The selected scores will be
              copied and stored in this assignment)
            </p>
            <div className="templatediv">
              <div className="contenttemplatediv">
                <button
                  className="choosebtn"
                  id="choosebtn"
                  onClick={() => setModalIsOpen1(true)}
                >
                  {" "}
                  <GrFormAdd /> Add Work Scores
                </button>
              </div>
            </div>
          </>
        )}
        {assignmenttype === "sharedWriting" && (
          <>
            <p className="copiedscore">
              <h5>Work scores (Required) </h5>-(The selected scores will be
              copied and stored in this assignment)
            </p>
            <div className="templatediv">
              <div className="contenttemplatediv">
                <button
                  className="choosebtn"
                  id="choosebtn"
                  onClick={() => setModalIsOpen1(true)}
                >
                  {" "}
                  <GrFormAdd /> Add Work Scores
                </button>
              </div>
            </div>
          </>
        )}
        <hr style={{ backgroundColor: "#ddd", margin: "20px 0px" }} />
        <h3 style={{ margin: "10px 0px" }}>Extra Settings</h3>
        <div className="grade">
          <h4>
            {" "}
            Grading <AiOutlineExclamationCircle />
          </h4>
          <p>
            Set the maximum number of points for this assignment to grade your
            student's work
          </p>
          <input
            type="number"
            value={grade}
            onChange={(e) => setgrade(e.target.value)}
          />
        </div>
        <div className="grade">
          <h4>
            {" "}
            Lock template <AiOutlineExclamationCircle />
          </h4>
          <p>
            Disable the ability for students to edit previously existing notes
            in the score.
          </p>
          <input
            id="lockedscore"
            type="checkbox"
            checked={locked}
            onChange={() => setlocked((prevstate) => !prevstate)}
          />
        </div>
        <AddScoreModal
          modalIsOpen={modalIsOpen}
          customStyles={customStyles1}
          token={token}
          setModalIsOpen={setModalIsOpen}
          scores={scores}
          scoreid={scoreidlist}
          setscores={setscores}
          setscoreid={setscoreidlist}
        />
        <AddScoreModalWriting
          modalIsOpen={modalIsOpen1}
          customStyles={customStyles1}
          token={token}
          setModalIsOpen={setModalIsOpen1}
          scores={scores}
          scoreid={scoreidwriting}
          setscores={setscores}
          setscoreid={setscoreidwriting}
        />
      </div>
    </>
  );
}

export default CreateAssignment;
