import React, { useState, useEffect, useContext, useRef } from "react";
import Embed from "flat-embed";
import {
  MidiDownload,
  PngDownload,
} from "../../assets/Functions-Need/MidiFile";
import "../../Css/Class/classroom.css";
import { timefunction } from "../../assets/Functions-Need/TimeFormat";
import { GiMusicalScore } from "react-icons/gi";
import {FiTrash2} from "react-icons/fi";
import {FiMoreHorizontal,FiEdit3} from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Await } from "react-router-dom";

function ViewPageTeacher() {
  //target div
  const target = useRef();
  let student = JSON.parse(window.localStorage.getItem("submission"));
  const [comments, setcomments] = useState([]);
  const [commentsObject,setcommentsObject]=useState({});
  const [comment,sentcomment]=useState("");
  const [selectedid,setselectedid]=useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isEditing,setisEditing]=useState(false);
  const [sharingKey,setsharingkey]=useState("");
  const token ="739dfbe59fbe2b527108bcc88c8b596f019880b5a866e8001d7e9a2607a24339867cdc962807882c3a0b40c852cce06eeddabb8d28aa1b3d5c6b72ddef3d1d46";

  useEffect(() => {
    async function fetchfunction() {
      if (target.current == null) return;
      try {
        const changePrivacyScore = await fetch(`https://api.flat.io/v2/scores/${student.submission.attachments[0].score}`, {
          method: `PUT`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            privacy: "privateLink"
          })
        });
        const data = await changePrivacyScore.json();
        setsharingkey(data.sharingKey);
        const scoreComments = fetch(`https://api.flat.io/v2/classes/${student.submission.classroom}/assignments/${student.submission.assignment}/submissions/${student.submission.id}/comments`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        scoreComments.then((res) => res.json())
          .then((data) => {
            setcomments(data);
            let commentsObject = {};
            data.forEach(comment => {
              commentsObject[comment.id] = comment.comment;
            });
            setcommentsObject(commentsObject);
          });
      } catch (err) {
        console.log(err);
      }
    }
    fetchfunction();
  }, []);
  
  useEffect(() => {
    if (sharingKey === null) return;
    const embed = new Embed(target.current, {
      embedParams: {
        mode: "edit",
        controlsPosition: "top",
        appId: "59e7684b476cba39490801c2",
      },
    });
    embed.loadFlatScore({
      score: `${student.submission.attachments[0].score}`,
      sharingKey: `${sharingKey}`,
    })
      .then(function () {
        console.log("cbon loaded");
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [sharingKey]);
  
  
  
  const handleTerfessClick = (commentId) => {
    setDropdownVisible((prev) => !prev);
    // set the selected user id
    setselectedid(commentId);
  };
  //handle Editing 
  const handleDelete=(e,comment)=> {
   fetch(`https://api.flat.io/v2/classes/${comment.classroom}/assignments/${comment.assignment}/submissions/${comment.submission}/comments/${comment.id}`,{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    }
   })
   .then(res=>{
    fetch(
      `https://api.flat.io/v2/classes/${student.submission.classroom}/assignments/${student.submission.assignment}/submissions/${student.submission.id}/comments`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setcomments(data);
        let commentsObject={};
        data.forEach(comment => {
          commentsObject[comment.id] = comment.comment;
        });
        setcommentsObject(commentsObject);
      });
   } )
   .catch(err=>console.log(err))

  }
  //handle save 
  const handlesave=(e,comment,newmsg)=> {
          setisEditing(false);
          fetch(`https://api.flat.io/v2/classes/${comment.classroom}/assignments/${comment.assignment}/submissions/${comment.submission}/comments/${comment.id}`, {
            headers:{
              "Content-Type":"application/json",
              Authorization:`Bearer ${token}`
            },
            method:"PUT",
            body:JSON.stringify( {
              comment:newmsg
            })
          })
          .then((res)=>res.json())
          .then((data)=>console.log(data))
          .catch((err)=>console.log(err))
  }
  //post comment
  const postcomment=()=> {
    fetch(`https://api.flat.io/v2/classes/${student.submission.classroom}/assignments/${student.submission.assignment}/submissions/${student.submission.id}/comments`, 
   { method:"POST", 
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
  body:JSON.stringify({
    comment
  })}).then(res=>res.json())
  .then(data=>console.log(data))
  .catch(err=>console.log(err))
  }
  return (
    <>
      <div id="terfess" ref={target}></div>
      <div className="buttonsExportSubmission">
        <button id="mididownload" onClick={() => MidiDownload(target)}>
          Midi File
        </button>
        <button id="pngdownload" onClick={() => {}}>
          Png
        </button>
      </div>
      <div className="contentSubmissionReview">
        <div className="informationsUserSubmission">
          <div id="userSubmitted">
            <img src={student.picture} alt="logostudent" />
            <span>{student.printableName}</span>
          </div>

          <div className="submissionState">
            <p>
              Submission{" "}
              <h4
                style={{
                  backgroundColor: "#F64F64",
                  color: "#fff",
                  borderRadius: "3px",
                  fontSize: "12px",
                  fontWeight: "500",
                  padding: "3px 12px",
                }}
              >
                {student.submission.state}
              </h4>{" "}
              On{" "}
              <h6 id="submissiondate">
                {timefunction(
                  student.submission.submissionDate ||
                    student.submission.creationDate
                )}
              </h6>
            </p>
          </div>
          <h5 className="titleattachemnt">Attachments:</h5>
          <div className="attachemntsSubmission">
            <GiMusicalScore />
            {student.submission.attachments[0].title}
          </div>
        </div>
        <div className="comments">
          {comments.map((comment) => (
            
            <div>
              <img src={student.picture} alt="logo" />
              <div className="headercomment">
                <p>
                  {comment.user === student.id
                    ? `${student.printableName}`
                    : `${comment.user}`}
                </p>
                <span>{timefunction(comment.creationDate)}</span>
                {isEditing && selectedid == comment.id ? (
                        <>
                          <input
                            type="text"
                            value={commentsObject[comment.id] ?? ""}
                            onChange={(e) =>
                              setcommentsObject({
                                ...commentsObject,
                                [comment.id]: e.target.value,
                              })
                            }
                          />
                          <button id="savechaangecomment"onClick={(e)=>handlesave(e,comment,commentsObject[comment.id])}>Save</button>
                        </>
                      ) : (
                        <p onClick={(e) => handleEditing(e, comment)}>
                          {commentsObject[comment.id]}
                        </p>
                      )}
              </div>
             
              {comment.user!==student.id &&<>
                <div
                  className="terfess-icon"
                  onClick={() => handleTerfessClick(comment.id)}
                  style={{ position: "relative" }}
                >
                  <FiMoreHorizontal />
                  {dropdownVisible && selectedid === comment.id && (
                    <div
                      className="dropdown-menu"
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: "-80px",
                      }}
                    >
                      <ul>
                        <li>
                          <button onClick={()=>setisEditing(true)}>
                            <FiEdit3/>Edit
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={(e) => handleDelete(e, comment)}
                            style={{ fontSize: "14px" }}
                          >
                            <FiTrash2 /> Delete 
                          </button>
                          <ToastContainer />
                        </li>
                      
                      </ul>
                    </div>
                  )}
                    
                </div>
              </>}
              
            </div>
          ))}
        </div>
        <div className="postcommentsection">
          <textarea id="postCommentSubmission" value={comment} onChange={(e)=>sentcomment(e.target.value)}></textarea>
          <button onClick={()=>postcomment()}>Post</button>
        </div>
      </div>
    </>
  );
}

export default ViewPageTeacher;
