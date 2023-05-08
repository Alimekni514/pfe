import React, { useContext, useEffect, useRef, useState } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import { Toast } from "flowbite-react";
import {FcLink} from "react-icons/fc";
import {
  fetchStudentData,
  fetchStudentSubmission,
  getStudentSubmissionsWithUserData,
} from "../../assets/Functions-Need/SubmissionAdmin";
import { FiMoreHorizontal } from "react-icons/fi";
import { Badge } from "flowbite-react";
import AddScoreModal from "../Assignments/AddScoreModal";

function findStudentById(studentArray, id) {
  for (let i = 0; i < studentArray.length; i++) {
    if (studentArray[i].id === id) {
      return studentArray[i];
    }
  }
  return null; // return null if no student with matching id is found
}
function hasTitle(arr, title) {
  for (let obj of arr) {
    if (obj.title.includes(title)) {
      return true;
    }
  }
  return false;
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
  const token = window.localStorage.getItem("flat_token_user");
  const navigate = useNavigate();
  const congratsref = useRef();
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
  const [scoreattachement, setscoreattachemnt] = useState([]);
  const [scoreattachementTemplate, setscoreAttachemntTemplate] = useState([]);
  const [showscoreattachemnt, setshowscoreattachement] = useState(true);
  const [congrats, setcongrats] = useState(false);
  const [showturnedin, setshowturnedin] = useState(true);
  const [forkedcore, setforkedscore] = useState({});
  const [timeoutId, setTimeoutId] = useState(null);
  const [links,setlinks]=useState([]);
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
      console.log(studentWithHisSubmission);
      setStudentSubmission(studentWithHisSubmission.submission);
      if (studentWithHisSubmission.submission) {
        const { attachments } = studentWithHisSubmission.submission;
        const filtredarray = attachments.map((attach) => {
          if (attach.type == "flat") {
            return attach;
          }
        });
        setscoreattachemnt(filtredarray);
      }
      if (assignment.type === "scoreTemplate") {
        const { attachments } = assignment;
        const filtredarrayTemplate = attachments.map((attach) => {
          if (attach?.type == "flat" && attach.sharingMode == "copy") {
            return attach;
          }
        });
        setscoreAttachemntTemplate(filtredarrayTemplate);
        //check if we have recently forked the teacher score or not
        // Define the timeout function
        const timeoutId = setTimeout(async () => {
          const forkedOrNot = hasTitle(
            scores,
           `${scoreattachementTemplate[0]?.title} - ${studentWithHisSubmission.printableName}`
          );
          if (!forkedOrNot) {
            const forkfetch = await fetch(
              `https://api.flat.io/v2/scores/${filtredarrayTemplate[0].score}/fork`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const forkedscoreobject = await forkfetch.json();
            setforkedscore(forkedscoreobject);
          } else {
            console.log("manouba");
          }
        }, 1000);

      }
      const { attachments } = assignment;
      const linksTeacher = attachments.filter((attach) => {
        if (attach?.type == "link") {
          return attach;
        }
      });
      setlinks(linksTeacher);
        // Store the timeout ID in state
  setTimeoutId(id);
    };
    fetchData();
   

    // Clear the timeout function when the component unmounts
  return () => {
    clearTimeout(timeoutId);
  };
  }, []);
  //turnedIn
  const turnedIn = () => {
    if (scoreid) {
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
            submit: true,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          toast.success("Submission Turned In !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setStudentSubmission(data);
          setshowturnedin(false);
          setcongrats(true);
        })
        .catch((err) => console.log(err));
    } else {
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
                score: scoreattachement[0].score,
                title: "title-music",
              },
            ],
            submit: true,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          toast.success("Submission Turned In !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setStudentSubmission(data);
          setshowturnedin(false);
          setcongrats(true);
        })
        .catch((err) => console.log(err));
    }
  };
  //handle Turn in 1 for template
  const turnedIn1 = () => {
    if (scoreid) {
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
            submit: true,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          toast.success("Submission Turned In !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setStudentSubmission(data);
          setshowturnedin(false);
          setcongrats(true);
        })
        .catch((err) => console.log(err));
    } else {
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
                score: forkedcore.id,
                title: "title-music",
              },
            ],
            submit: true,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          toast.success("Submission Turned In !", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setStudentSubmission(data);
          setshowturnedin(false);
          setcongrats(true);
        })
        .catch((err) => console.log(err));
    }
  };
  //handle back button
  const handlebackbutton = () => {
    setcongrats(false);
    setshowturnedin(true);
    const { attachments } = StudentSubmission;
    const filtredarray = attachments.map((attach) => {
      if (attach.type == "flat") {
        return attach;
      }
    });
    setTimeout(() => {
      congratsref.current.textContent = filtredarray[0].title;
    }, 1000);
  };

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
  //handle Edit
  const handleEdit = async () => {
    const editfetch = await fetch(
      `https://api.flat.io/v2/scores/${scoreattachement[0].score}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const scoreobject = await editfetch.json();
    window.location.href = scoreobject.htmlUrl;
  };
  //handle Edit
  const handleEdit1 = async () => {
    if (StudentSubmission) {
      const editfetch = await fetch(
        `https://api.flat.io/v2/scores/${StudentSubmission.attachments[0].score}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const scoreobject = await editfetch.json();
      window.location.href = scoreobject.htmlUrl;
    }
  };

  //handle remove attachemnt
  const handleRemove = async () => {
    setshowscoreattachement(false);
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
  //start the assignment of a score template
  const startAssignment1 = () => {
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
              score: forkedcore.id,
              title: "title-music",
            },
          ],
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        window.location.href = forkedcore.htmlUrl;
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
          {
              links &&links.map((link)=> (
                <div className="space-x-4 divide-x divide-gray-200 dark:divide-gray-700">
  <Toast>
    <FcLink/>
    <div className="pl-4 text-sm font-normal mt-[10px]" onClick={()=>window.location.href=link.url}>
      {link?.title}
    </div>
  </Toast>
</div>
              ))
            }
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
              <p>Start from a score template created By your Teacher</p>
              <div className="flex justify-between items-center !w-[100%] border border-[#ddd] mt-[20px]">
                <GiMusicalScore className="text-[20px]" />
                <span className="!font-semibold text-[16px]">
                  {scoreattachementTemplate[0]?.title}
                </span>
              </div>
              <button
                onClick={startAssignment1}
                className="text-[#fff] bg-[#e04e90] rounded-xl px-[5px] py-[5px] mt-[15px]"
              >
                Start assignment
              </button>
            </div>
          ))}

        {StudentSubmission?.state == "created" &&
          (assignment.type == "newScore" ? (
            <div className="assignmentbox w-[300px]">
              <div className="flex items-center justify-between w-[100%]">
                <h3 className="!font-bold">Your work</h3>
                <Badge color="info">Started</Badge>
              </div>
              {showscoreattachemnt && (
                <div>
                  <div className="flex justify-between items-center !w-[100%]">
                    <GiMusicalScore className="text-[20px]" />
                    <span className="!font-semibold text-[16px]">
                      {scoreattachement[0].title}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      className="text-[#fff] bg-[#e04e90] px-[15px] rounded-md"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                    <button
                      className="text-[#fff] bg-[#e32b2b] px-[15px] rounded-md"
                      onClick={handleRemove}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
              <div>
                <h3 className="font-bold mt-[10px]">Attachments</h3>
                <div
                  onClick={handlemodalShow1}
                  className="flex w-[100%] text-[#e04e90] items-center justify-between gap-x-[8px] mt-[11px]"
                >
                  <IoIosAddCircleOutline /> Add an existing Score
                </div>
                <div>
                  <button
                    className="text-[#fff] bg-[#f64f64] px-[10px] rounded-md ml-[50px] mt-[15px]"
                    onClick={turnedIn}
                  >
                    Turn In
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="assignmentbox w-[300px]">
              <div className="flex items-center justify-between w-[100%]">
                <h3 className="!font-bold">Your work</h3>
                <Badge color="info">Started</Badge>
              </div>
              {showscoreattachemnt && (
                <div>
                  <div className="flex justify-between items-center !w-[100%]">
                    <GiMusicalScore className="text-[20px]" />
                    <span className="!font-semibold text-[16px]">
                      {forkedcore.title}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      className="text-[#fff] bg-[#e04e90] px-[15px] rounded-md"
                      onClick={handleEdit1}
                    >
                      Edit
                    </button>
                    <button
                      className="text-[#fff] bg-[#e32b2b] px-[15px] rounded-md"
                      onClick={handleRemove}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
              <div>
                <h3 className="font-bold mt-[10px]">Attachments</h3>
                <div
                  onClick={handlemodalShow1}
                  className="flex w-[100%] text-[#e04e90] items-center justify-between gap-x-[8px] mt-[11px]"
                >
                  <IoIosAddCircleOutline /> Add an existing Score
                </div>
                <div>
                  <button
                    className="text-[#fff] bg-[#f64f64] px-[10px] rounded-md ml-[50px] mt-[15px]"
                    onClick={turnedIn1}
                  >
                    Turn In
                  </button>
                </div>
              </div>
            </div>
          ))}
        {showturnedin &&
          StudentSubmission?.state == "turnedIn" &&
          (assignment.type == "newScore" ? (
            <div className="assignmentbox w-[300px]">
              <div className="flex items-center justify-between w-[100%]">
                <h3 className="!font-bold">Your work</h3>
                <Badge color="success" size="sm">
                  Turned In
                </Badge>
              </div>
              {showscoreattachemnt && (
                <div>
                  <div className="flex justify-between items-center !w-[100%]">
                    <GiMusicalScore className="text-[20px]" />
                    <span
                      className="!font-semibold text-[16px]"
                      ref={congratsref}
                    >
                      {scoreattachement[0].title}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      className="text-[#fff] bg-[#e04e90] px-[15px] rounded-md"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                    <button
                      className="text-[#fff] bg-[#e32b2b] px-[15px] rounded-md"
                      onClick={handleRemove}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
              <div>
                <h3 className="font-bold mt-[10px]">Attachments</h3>
                <div
                  onClick={handlemodalShow1}
                  className="flex w-[100%] text-[#e04e90] items-center justify-between gap-x-[8px] mt-[11px]"
                >
                  <IoIosAddCircleOutline /> Add an existing Score
                </div>
                <div>
                  <button
                    className="text-[#fff] bg-[#f64f64] px-[10px] rounded-md ml-[50px] mt-[15px]"
                    onClick={turnedIn}
                  >
                    Turn In
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="assignmentbox w-[300px]">
              <div className="flex items-center justify-between w-[100%]">
                <h3 className="!font-bold">Your work</h3>
                <Badge color="success" size="sm">
                  Turned In
                </Badge>
              </div>
              {showscoreattachemnt && (
                <div>
                  <div className="flex justify-between items-center !w-[100%]">
                    <GiMusicalScore className="text-[20px]" />
                    <span
                      className="!font-semibold text-[16px]"
                      ref={congratsref}
                    >
                      {!forkedcore.title
                        ? forkedcore.title
                        : StudentSubmission.attachments[0].title}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      className="text-[#fff] bg-[#e04e90] px-[15px] rounded-md"
                      onClick={handleEdit1}
                    >
                      Edit
                    </button>
                    <button
                      className="text-[#fff] bg-[#e32b2b] px-[15px] rounded-md"
                      onClick={handleRemove}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
              <div>
                <h3 className="font-bold mt-[10px]">Attachments</h3>
                <div
                  onClick={handlemodalShow1}
                  className="flex w-[100%] text-[#e04e90] items-center justify-between gap-x-[8px] mt-[11px]"
                >
                  <IoIosAddCircleOutline /> Add an existing Score
                </div>
                <div>
                  <button
                    className="text-[#fff] bg-[#f64f64] px-[10px] rounded-md ml-[50px] mt-[15px]"
                    onClick={turnedIn1}
                  >
                    Turn In
                  </button>
                </div>
              </div>
            </div>
          ))}
        {congrats && (
          <div className=" assignmentbox w-[300px] flex-col	gap-y-[15px]">
            Congrats ,you're awesome ! you just turned in your work ,Your
            teachers has now access to your score and can give you some
            feedback.
            <img
              className="!w-[160px] !h-[160px]"
              src="https://prod.flat-cdn.com/js/img/8173206c605f23f079cf.png"
              alt="congratImg"
            />
            <button
              className="text-[#fff] bg-[#f64f64] px-[10px] rounded-md ml-[20px] mt-[15px]"
              onClick={handlebackbutton}
            >
              Back
            </button>
          </div>
        )}
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
      <ToastContainer />
    </>
  );
}

export default SkeletonScore;
