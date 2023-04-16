async function fetchStudentData(classid,token) {
    const response = await fetch(`https://api.flat.io/v2/classes/${classid}/`, 
        {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
    });
    const data = await response.json();
    const studentGroupId=data.studentsGroup.id;
    const response1=await fetch(`https://api.flat.io/v2/groups/${studentGroupId}/users`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
    });
    const studentlist= await response1.json();    
    return studentlist;
  }
  async function fetchStudentSubmission(token,classId, assignmentId) {
    const response = await fetch(`https://api.flat.io/v2/classes/${classId}/assignments/${assignmentId}/submissions`,{
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    });
    const data = await response.json();
    return data;
  }
  
  async function getStudentSubmissionsWithUserData(token, classId, assignmentId) {
    const students = await fetchStudentData(classId,token);
    const submissions = await fetchStudentSubmission(token,classId, assignmentId);
    const studentSubmissions = [];
    students.forEach((student) => {
      const studentSubmission = submissions.find((submission) => submission.creator === student.id);
  
      if (studentSubmission) {
        studentSubmissions.push({
          id: student.id,
          printableName: student.printableName,
          picture: student.picture,
          submission: studentSubmission,
        });
      } else {
        studentSubmissions.push({
            id: student.id,
            printableName: student.printableName,
            picture: student.picture,
          submission: null,
        });
      }
    });
  
    return studentSubmissions;
  }
 function getSubmissionStateCounts(submissions) {
    let created = 0;
    let turnedIn = 0;
    let returned = 0;
    let notStarted = 0;
  
    for (const submission of submissions) {
      if (submission === []) {
        notStarted=5;
      } else {
        switch (submission.state) {
          case "created":
            created++;
            break;
          case "turnedIn":
            turnedIn++;
            break;
          case "returned":
            returned++;
            break;
          default:
            notStarted++;
        }
      }
    }
      notStarted=5 - (created + turnedIn + returned);
       //calculate the pourcentage
       const startedPercentage = (created / 5) * 100;
       const turnedPercentage = (turnedIn / 5) * 100;
       const returnedPercentage = (returned / 5) * 100;
       const notstartedPercentage = (notStarted / 5) * 100;

    return  [
      {
        created,
        startedPercentage,
      },
      {
        turnedIn,
        turnedPercentage,
      },
      {
        returned,
        returnedPercentage,
      },
      {
        notStarted,
        notstartedPercentage,
      },
    ];
  }
  
  export {fetchStudentData,fetchStudentSubmission,getStudentSubmissionsWithUserData,getSubmissionStateCounts}
  