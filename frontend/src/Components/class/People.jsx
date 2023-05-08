import React, { useState, useContext, useEffect } from "react";
import Assignment from "../../contexts/Assignment";
import { useParams, useNavigate } from "react-router-dom";
import { getTimeElapsed } from "../../Assets/Functions-Need/TimeConversion";
import "../../Css/Class/classroom.css";
import "../../Css/PeoplePage/People.css";
import { FiTrash2, FiMoreHorizontal } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
function People({ token }) {
  //states
  const { assignment, setassignment } = useContext(Assignment);
  const navigate = useNavigate();
  const { classid } = useParams();
  const [students, setstudents] = useState([]);
  const [teachers, setteachers] = useState([]);
  const [filtredstudents, setfiltredstudents] = useState([]);
  const [filtredteachers, setfiltredteachers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [search, setsearch] = useState("");

  //useeffect for the filter
  useEffect(() => {
    if (search.length === 0) {
      setfiltredteachers(teachers);
      setfiltredstudents(students);
    } else {
      let filtreddatateachers = teachers;
      filtreddatateachers = filtreddatateachers.filter((item) => {
        return item.printableName.toLowerCase().includes(search.toLowerCase());
      });

      let filtreddatastudents = students;
      filtreddatastudents = filtreddatastudents.filter((item) => {
        return item.printableName.toLowerCase().includes(search.toLowerCase());
      });
      setfiltredteachers(filtreddatateachers);
      setfiltredstudents(filtreddatastudents);
    }
  }, [search]);
  const handleTerfessClick = (userId) => {
    setDropdownVisible((prev) => !prev);
    // set the selected user id
    setSelectedUserId(userId);
  };
  useEffect(() => {
    //Bech njibou les teachers
    fetch(`https://api.flat.io/v2/classes/${classid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //bech nekhdhou teacher group w nfetchiw teachers
        const teachergroupid = data.teachersGroup.id;
        fetch(`https://api.flat.io/v2/groups/${teachergroupid}/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            window.localStorage.setItem(
              "class_teacher-list",
              JSON.stringify(data)
            );
            setteachers(data);
            setfiltredteachers(data);
          });
      })
      .catch((err) => console.log(err));

    //Bech njibou les students
    fetch(`https://api.flat.io/v2/classes/${classid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //bech nekhdhou teacher group w nfetchiw students
        const studentgroupid = data.studentsGroup.id;
        fetch(`https://api.flat.io/v2/groups/${studentgroupid}/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setstudents(data);
            window.localStorage.setItem(
              "class_student-list",
              JSON.stringify(data)
            );
            setfiltredstudents(data);
          });
      })
      .catch((err) => console.log(err));
    //bech njibou list users kol bech nest7a9oulhom fil addpeople for filtering
    fetch(`https://api.flat.io/v2/organizations/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        window.localStorage.setItem(
          "Oragnization_users_List",
          JSON.stringify(data)
        );
      })
      .catch((err) => console.log(err));
  }, []);
  //handle delete
  const handleDelete = (e, item) => {
    e.preventDefault();
    const { id } = item;
    //to Delete the row of the user
    e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove();

    // Handle delete logic
    fetch(`https://api.flat.io/v2/classes/${classid}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        toast.success("🦄User deleted successfully", {
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
  //add people
  const addpeople = () => {
    navigate(`/class/${classid}/add`);
  };
  return (
    <div>
      <div className="headerPeopleClass">
        <input
          type="text"
          placeholder="Search people by name or email"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        <button onClick={() => addpeople()}>Add People</button>
      </div>
      <div className="teachersClass">
        <h5>Teachers</h5>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {filtredteachers.map((teacher) => (
              <tr key={teacher.id}>
                <td className="userlogoplusname">
                  <img src={teacher.picture} alt="userpicture" />
                  {teacher.printableName}
                </td>
                <td>{teacher.email}</td>
                <td>{getTimeElapsed(teacher.lastActivityDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="StudentClass">
        <h5>Students</h5>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th>Last Activity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtredstudents.map((student) => (
              <tr>
                <td className="userlogoplusname">
                  <img src={student.picture} alt="userpicture" />
                  {student.printableName}
                </td>
                <td style={{ textAlign: "center" }}>{student.email}</td>
                <td>{getTimeElapsed(student.lastActivityDate)}</td>

                <td>
                  <div
                    className="terfess-icon"
                    onClick={() => handleTerfessClick(student.id)}
                    style={{ position: "relative" }}
                  >
                    <FiMoreHorizontal />
                    {dropdownVisible && selectedUserId === student.id && (
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
                            <button
                              onClick={(e) => handleDelete(e, student)}
                              style={{ fontSize: "14px" }}
                            >
                              <FiTrash2 /> Delete Account
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default People;
