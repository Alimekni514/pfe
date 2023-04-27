import React, { useEffect, useState } from 'react'
import {MdOutlineMessage} from "react-icons/md";
import {IoMdLink} from "react-icons/io";
import {GiMusicalScore} from 'react-icons/gi';
import "../../Css/Class/classroom.css";
import { useParams } from 'react-router-dom';
import {timefunction} from "../../assets/Functions-Need/TimeFormat"
import {fetchStudentData,fetchStudentSubmission,getStudentSubmissionsWithUserData,getSubmissionStateCounts}from "../../assets/Functions-Need/SubmissionAdmin";
function Stream({token}) {
  //get the classid from the url
          const {classid}=useParams();
          const [assignmentList,setassignmentsList]=useState([]);

  useEffect(()=> {
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
      } catch (error) {
        console.error(error);
      }
    };
    fetchAssignments();

  }, []);
  return (
    <div>
          {assignmentList && assignmentList.map(assignment=> (
            <div key={assignment.id} className='post-card'>
                  <div className='post-card-header'>
                    <div className='post-details'>
                      <img  style={{width:"30px"}}src="https://prod.flat-cdn.com/img/avatars/default.png" alt='logocreator'/>
                      <div className='post-info'>
                          <span className='creator-name'>{assignment.creator}</span>
                          <span className='creation-date'>{timefunction(assignment.creationDate)}</span>
                      </div>
                      </div>
                    </div>
                    <a href={`class/${classid}/assignment/${assignment.id}`} className='post-attach'>
                      <div className='i'><svg inline="" width="14" height="13" viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg"><path d="M13.95 4.894c-.12-.355-.43-.608-.81-.662l-3.39-.478c-.144-.02-.27-.108-.334-.235L7.9.54C7.73.208 7.385 0 7 0s-.73.208-.9.542L4.584 3.52c-.065.126-.19.214-.334.234l-3.39.478c-.38.054-.69.307-.81.662-.12.355-.022.737.254.998L2.756 8.21c.105.097.153.24.128.38l-.58 3.27c-.05.29.028.57.22.79.3.344.82.45 1.238.237l3.032-1.545c.127-.065.286-.064.412 0l3.032 1.545c.148.075.305.113.467.113.296 0 .577-.128.77-.35.193-.22.27-.502.22-.79l-.58-3.27c-.024-.14.024-.283.128-.38l2.453-2.318c.276-.26.373-.643.254-.998z" fill="#0C0F33" fill-rule="evenodd" class="fill"></path></svg></div>
                      {assignment.title}
                    </a>
              </div>
          ))}
        </div>
  )
}

export default Stream