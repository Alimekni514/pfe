import React, { useEffect, useState, useContext } from "react";
import "../../Css/Class/classroom.css";
import { FcBrokenLink } from "react-icons/fc";
import { BsPersonFillAdd } from "react-icons/bs";
import { MdArrowBack } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { Clipboard } from "react-feather";
import "react-toastify/dist/ReactToastify.css";
import ClassContext from "../../contexts/ClassContext";

const token =
  "739dfbe59fbe2b527108bcc88c8b596f019880b5a866e8001d7e9a2607a24339867cdc962807882c3a0b40c852cce06eeddabb8d28aa1b3d5c6b72ddef3d1d46";
function AddPeople() {
  //localStorage
  const classStudentList = JSON.parse(
    localStorage.getItem("class_student-list")
  );
  const organizationUsersList = JSON.parse(
    localStorage.getItem("Oragnization_users_List")
  );
  const classTeacherList = JSON.parse(
    localStorage.getItem("class_teacher-list")
  );
  const combinedArray = classStudentList.concat(classTeacherList);
  //context
  const { classroom, setclassroom } = useContext(ClassContext);
  //states
  const [showContainerPepole, setShowContainerPeople] = useState(true);
  const [organizationUsers, setorganizationUsers] = useState([]);
  const [filtredOrganizationUser, setfiltredOrganizationUser] = useState([]);
  const [existingStudents, setexistingStudents] = useState(false);
  const [shareCode, setshareCode] = useState(false);
  const [search, setsearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showcode, setshowcode] = useState(false);
  const [inputValue, setInputValue] = useState(classroom.enrollmentCode);
  //useEffect for the filter Search
  //useeffect for the filter
  useEffect(() => {
    if (search.length === 0) {
      setfiltredOrganizationUser(organizationUsers);
    } else {
      let filtreddata = organizationUsers;
      filtreddata = filtreddata.filter((item) => {
        return item.printableName.toLowerCase().includes(search.toLowerCase());
      });
      setfiltredOrganizationUser(filtreddata);
    }
  }, [search]);
  //checbox handle
  const handleCheckboxChange = (event, user) => {
    if (event.target.checked) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      setSelectedUsers(
        selectedUsers.filter((selecteduser) => selecteduser !== user)
      );
    }
  };
  //useEffect -Grabbing the list of Users
  useEffect(() => {
    //function to add status field for the people in the class
    updateOrganizationUsersWithSubscriptionStatus(
      organizationUsersList,
      combinedArray
    );
    const differentFromAdmin = organizationUsersList.filter(
      (obj) => obj.organizationRole !== "admin"
    );
    setfiltredOrganizationUser(differentFromAdmin);
    setorganizationUsers(differentFromAdmin);
    console.log(filtredOrganizationUser);
    console.log(organizationUsers);
  }, []);
  //functions
  const handleShowExisting = () => {
    //hide the people Container
    setShowContainerPeople(false);
    setexistingStudents(true);
  };
  //handle Copy Click
  const handleCopyClick = () => {
    navigator.clipboard.writeText(inputValue);
    toast.success("Value copied to clipboard!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const handleShowCode = () => {
    //hide the people Container
    setShowContainerPeople(false);
    setshowcode(true);
  };
  //return to the first page
  const returnPage = () => {
    setexistingStudents(false);
    setShowContainerPeople(true);
  };
  //return to the first page
  const returnPage1 = () => {
    setshowcode(false);
    setShowContainerPeople(true);
  };
  function updateOrganizationUsersWithSubscriptionStatus(
    organizationUsers,
    classSubscribedPeople
  ) {
    for (let i = 0; i < organizationUsers.length; i++) {
      const organizationUser = organizationUsers[i];
      const matchingSubscribedPerson = classSubscribedPeople.find(
        (subscribedPerson) => subscribedPerson.id === organizationUser.id
      );
      if (matchingSubscribedPerson) {
        organizationUser.joined = true;
      } else {
        organizationUser.joined = false;
      }
    }
  }
  //Add people
  async function AddPeople() {
    const className = classroom.id; // default class name
    const apiEndpoint = "https://api.flat.io/v2/classes";
    for (const user of selectedUsers) {
      const userId = user.id;
      const url = `${apiEndpoint}/${className}/users/${userId}`;
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Added successfully to the Class");
        // do something with the data here
      } catch (error) {
        toast.error(`Error Adding  user ${userId}: ${error}`);
      }
    }
  }

  return (
    <div className="containerAddPeople">
      <div className="add-people-class"></div>
      {showContainerPepole && (
        <div className="addPeopleSectiona">
          <h3 className="addpeopletitle">
            How do you want to add students to your class?
          </h3>
          <div className="fcards-horizontal-list">
            <div className="fcard-horizontal">
              <FcBrokenLink />
              <div className="info-card" onClick={() => handleShowCode()}>
                <h5>Share an invitation link or code </h5>
                <p>Your students will be able to set up their own accounts</p>
              </div>
            </div>
            <div
              className="fcard-horizontal"
              onClick={() => handleShowExisting()}
            >
              <BsPersonFillAdd />
              <div className="info-card">
                <h5>Add existing students from your school to your class</h5>
                <p>
                  If students already have an account associated with your
                  school,select and invite them to your class{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {existingStudents && (
        <div className="addExistingStudentsContainer">
          <h3>Add existing Students from your school to your class</h3>
          <input
            className="searchUsersinputa"
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
          <div className="edulist">
            {filtredOrganizationUser &&
              filtredOrganizationUser.map((user) => (
                <div key={user.id} className="userDiv">
                  <div className="infoUserOr">
                    <input
                      type="checkbox"
                      disabled={user.joined}
                      onChange={(e) => handleCheckboxChange(e, user)}
                    />
                    <img src={user.picture} alt="userlogo" />
                    <span className="userNamee" style={{ fontWeight: 600 }}>
                      {user.printableName}
                    </span>
                    <span className="typeofuser"> {user.classRole}</span>
                    <div>
                      {user.joined ? (
                        <span className="joined">Already in Class</span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <span>{user.email}</span>
                </div>
              ))}
          </div>
          <div className="footerExisting">
            <button id="backstudent" onClick={() => returnPage()}>
              {" "}
              <MdArrowBack />
              Back
            </button>
            <button id="addpeopple" onClick={() => AddPeople()}>
              Add {selectedUsers.length} People
            </button>
          </div>
          <ToastContainer />
        </div>
      )}
      {showcode && (
        <div className="showcodeContainer">
          <h1>Share an invitation code </h1>
          <p id="titleshowcode">
            They can open <span>join.ariana.conservatory</span> in their web
            browser and type the following code once they signed up:
          </p>
          <div className="copytoClipboard">
            <input id="copyinput" type="text" readOnly value={inputValue} />
            <button onClick={handleCopyClick}>
              <Clipboard size={16} />
            </button>
            <ToastContainer />
          </div>
          <button id="backstudent" onClick={() => returnPage1()}>
            <MdArrowBack />
            Back
          </button>
        </div>
      )}
    </div>
  );
}

export default AddPeople;
