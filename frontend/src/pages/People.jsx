import { useState, useEffect } from "react";
import "../Css/PeoplePage/People.css";
import {
  FiUserCheck,
  FiMoreHorizontal,
  FiKey,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { FcSearch, FcClearFilters, FcExport } from "react-icons/fc";
import { getTimeElapsed } from "../Assets/Functions-Need/TimeConversion";
import { IoMdClose } from "react-icons/io";
import { HiUserAdd } from "react-icons/hi";
import { convertJSONtoExcel } from "../Assets/Functions-Need/ConvertJSONtoExcel";
import Modal from "react-modal";
import ChangeRoleModal from "../Components/People/ChangeRoleModal";
import ResetPassword from "../Components/People/ResetPassword";
import EditUserDetails from "../Components/People/EditUserDetails";
import DeleteUser from "../Components/People/DeleteUser";
import { useAuthUser } from "react-auth-kit";
function UserTable() {
  const auth = useAuthUser();
  const [users, setUsers] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [exportUsers, setExportUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modlaIsOpen1, setModalIsOpen1] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [modalIsOpen3, setModalIsOpen3] = useState(false);
  const [modalIsOpen4, setModalIsOpen4] = useState(false);
  const token = import.meta.env.VITE_ADMIN_TOKEN;
  const customStyles = {
    content: {
      height: "100vh",
      width: "300px",
      left: "81%",
      top: "0%",
      borderRadius: "10px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
      border: "none",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: "9999",
    },
  };
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
  //For The First Modal
  const handleOpenModal = () => {
    setModalIsOpen(true);
  };
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  //For the Second Modal
  const handleOpenModal1 = () => {
    setModalIsOpen1(true);
  };
  //for The thir Modal :Reset password
  const handleOpenModal2 = () => {
    setModalIsOpen2(true);
  };
  //for the EditUserDetails
  const handleOpenModal3 = () => {
    setModalIsOpen3(true);
  };
  //For the delete Acoount
  const handleOpenModal4 = () => {
    setModalIsOpen4(true);
  };

  useEffect(() => {
    const token = import.meta.env.VITE_ADMIN_TOKEN;
    console.log(token);
    fetch("https://api.flat.io/v2/organizations/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setExportUsers(data);
      });
  }, []);

  function handleCheckboxChange(event, user) {
    if (event.target.checked) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      setSelectedUsers(
        selectedUsers.filter((selectedUser) => selectedUser !== user)
      );
    }
  }
  const handleTerfessClick = (userId) => {
    // set the selected user id
    setSelectedUserId(userId);
    //loaded to LocalStorage
    localStorage.setItem("user", JSON.stringify(userId));

    // toggle the dropdown menu visibility
    setDropdownVisible((prevState) => !prevState);
  };
  const handleExport = () => {
    convertJSONtoExcel(exportUsers);
  };
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedLicense, setSelectedLicense] = useState("");

  const handleRoleChange = (e) => {
    const role = e.target.value;
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleClassChange = (e) => {
    const cls = e.target.value;
    if (selectedClasses.includes(cls)) {
      setSelectedClasses(selectedClasses.filter((c) => c !== cls));
    } else {
      setSelectedClasses([...selectedClasses, cls]);
    }
  };

  const handleLicenseChange = (e) => {
    setSelectedLicense(e.target.value);
  };
  const clearFilters = () => {
    setSelectedRoles([]);
    setSelectedClasses([]);
    setSelectedLicense(null);
    setUsers(exportUsers);
  };

  const applyFilters = () => {
    let filteredUsers = [...users];

    if (selectedRoles.length > 0) {
      filteredUsers = filteredUsers.filter((user) =>
        selectedRoles.includes(user.classRole)
      );
    }

    if (selectedClasses.length > 0) {
      filteredUsers = filteredUsers.filter((user) =>
        selectedClasses.includes(user.organizationRole)
      );
    }

    // if (selectedLicense !== null) {
    //   filteredUsers = filteredUsers.filter(user => user.license.active === selectedLicense);
    // }
    setUsers(filteredUsers);
    handleCloseModal();
  };
  const filtred = (event) => {
    setSearchTerm(event.target.value);
    if (searchTerm === "") {
      setUsers(exportUsers);
    }
    const filtredlist = users
      .filter((user) => user.name)
      .filter((user) => user.name.includes(searchTerm.toLowerCase()));
    setUsers(filtredlist);
  };

  return (
    <div className="specialcontainer">
      <div className="headerSection">
        <div className="filterSection">
          <div style={{ position: "relative", width: "fit-content" }}>
            <input
              type="text"
              placeholder="Search by name "
              value={searchTerm}
              onChange={filtred}
              style={{
                padding: "9px",
                border: "1px solid  #cfd8dc",
                marginRight: "10px",
                borderRadius: "3px",
              }}
            />
            <FcSearch
              style={{
                position: "absolute",
                top: "20%",
                translate: "(-50%,0%)",
                right: "13px",
              }}
            />
          </div>
          <span
            onClick={handleOpenModal}
            style={{
              display: "block",
              padding: "8px 10px 8px 12px",
              border: "1px solid #cfd8dc",
              width: "fit-content",
              backgroundColor: "#fff",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            Filters <FcClearFilters />
          </span>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            style={customStyles}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <IoMdClose
                size={24}
                onClick={handleCloseModal}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="filters-header">
              <h2>Filter People</h2>
            </div>
            <div className="filters-body">
              <div className="filter-section">
                <h3 className="filtersheader">ClassRoles</h3>
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    value="teacher"
                    onChange={handleRoleChange}
                    checked={selectedRoles.includes("teacher")}
                    class="styled-checkbox"
                  />
                  teacher
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="student"
                    onChange={handleRoleChange}
                    checked={selectedRoles.includes("student")}
                    class="styled-checkbox"
                  />
                  student
                </label>
              </div>
              <div className="filter-section">
                <h3 className="filtersheader">OrganizationRoles</h3>
                <label>
                  <input
                    type="checkbox"
                    value="admin"
                    onChange={handleClassChange}
                    checked={selectedClasses.includes("admin")}
                    class="styled-checkbox"
                  />
                  admin
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="user"
                    onChange={handleClassChange}
                    checked={selectedClasses.includes("user")}
                    class="styled-checkbox"
                  />
                  user
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="teacher"
                    onChange={handleClassChange}
                    checked={selectedClasses.includes("teacher")}
                    class="styled-checkbox"
                  />
                  teacher
                </label>
              </div>
              <div className="filter-section">
                <h3 className="filtersheader">License</h3>
                <label class="radio">
                  <input
                    type="radio"
                    value="active"
                    onChange={handleLicenseChange}
                    checked={selectedLicense === "active"}
                    name="my-radio-button"
                  />
                  <span class="radio-mark"></span>
                  Active
                </label>
                <label class="radio">
                  <input
                    type="radio"
                    value="notActive"
                    onChange={handleLicenseChange}
                    checked={selectedLicense === "notActive"}
                    name="my-radio-button"
                  />
                  <span class="radio-mark"></span>
                  Not Active
                </label>
              </div>
              <div className="filters-footer">
                <button onClick={clearFilters}>Clear</button>
                <button onClick={applyFilters}>Apply</button>
              </div>
            </div>
          </Modal>
        </div>
        <div className="buttonsHeader">
          <button
            className="export"
            onClick={handleExport}
            style={{ cursor: "pointer" }}
          >
            {" "}
            <FcExport /> Export
          </button>
          <button className="addPeople">
            {" "}
            <HiUserAdd /> Add people
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ClassRole</th>
            <th>OrganizationRole</th>
            <th>Last Activity</th>
            <th>License</th>
            <th>Terfess</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              style={{
                backgroundColor: selectedUsers.includes(user)
                  ? "violet"
                  : "white",
              }}
            >
              <td
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  onChange={(event) => handleCheckboxChange(event, user)}
                />
                <img
                  src={user.picture}
                  alt="userimage"
                  style={{ width: "45px", marginRight: "8px" }}
                />
                <div className="text">
                  {" "}
                  <h5>{user.name}</h5>
                  <h6 style={{ color: "black", fontWeight: "300" }}>
                    {" "}
                    {user.email}
                  </h6>
                </div>
              </td>
              <td>{user.classRole}</td>
              <td>{user.organizationRole}</td>
              <td>{getTimeElapsed(user.lastActivityDate)}</td>
              <td
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {user.license.toString() && (
                  <h6
                    style={{
                      width: "fit-content",
                      padding: "7px",
                      color: "white",
                      backgroundColor: "#11844b",
                      borderRadius: "5px",
                      fontWeight: 300,
                      fontSize: "15px",
                    }}
                  >
                    Active
                  </h6>
                )}
              </td>
              <td>
                <div
                  className="terfess-icon"
                  onClick={() => handleTerfessClick(user)}
                  style={{ position: "relative" }}
                >
                  <FiMoreHorizontal />
                  {dropdownVisible && selectedUserId.id === user.id && (
                    <div
                      className="dropdown-menu"
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: "-8px",
                      }}
                    >
                      <ul>
                        <li>
                          <button onClick={handleOpenModal1}>
                            <FiUserCheck /> Change Role
                          </button>
                        </li>
                        {/* Change Role Modal */}
                        <li>
                          <button onClick={handleOpenModal2}>
                            <FiKey /> Reset Password
                          </button>
                        </li>

                        <li>
                          <button onClick={handleOpenModal3}>
                            <FiEdit /> Edit Account
                          </button>
                        </li>
                        <li>
                          <button onClick={handleOpenModal4}>
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
      <ResetPassword
        modalIsOpen={modalIsOpen2}
        customStyles={customStyles1}
        user={selectedUserId}
        setModalIsOpen1={setModalIsOpen2}
        token={token}
      />

      <ChangeRoleModal
        modalIsOpen={modlaIsOpen1}
        customStyles={customStyles1}
        user={selectedUserId}
        setModalIsOpen1={setModalIsOpen1}
        setusers={setUsers}
        token={token}
      />
      {modalIsOpen3 && (
        <EditUserDetails
          modalIsOpen={modalIsOpen3}
          customStyles={customStyles1}
          user={selectedUserId}
          setModalIsOpen1={setModalIsOpen3}
          setusers={setUsers}
          token={token}
        />
      )}
      <DeleteUser
        modalIsOpen={modalIsOpen4}
        customStyles={customStyles1}
        user={selectedUserId}
        setModalIsOpen1={setModalIsOpen4}
        token={token}
        setusers={setUsers}
      />
    </div>
  );
}

export default UserTable;
