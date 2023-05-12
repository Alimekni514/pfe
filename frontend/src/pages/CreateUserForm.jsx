import React, { useContext, useEffect, useState } from "react";
import AdminContext from "../contexts/AdminContext";
import { HiUserAdd } from "react-icons/hi";
import { Button } from "flowbite-react";
import AddUserModal from "../Components/People/AddUserModal";
import Modal from "react-modal";
import OpenEditModal from "../Components/People/OpenEditModal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const CreateUserForm = () => {
  const token = import.meta.env.VITE_ADMIN_TOKEN;
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
  //context of the sidebar
  const { admin, setadmin } = useContext(AdminContext);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    setadmin(false);
    return () => {
      setadmin(true);
    };
  }, []);

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData(user);
    setIsModalOpen2(true);
  };

  const removeUser = (user) => {
    setUsers((prevUsers) => prevUsers.filter((u) => u !== user));
  };
  // Function to send API request for each user
  async function sendRequest(user) {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await axios.post(
        "https://api.flat.io/v2/organizations/users",
        user,
        { headers }
      );
      console.log(`API response for user ${user.username}:`, response.data);
      toast.success(`User ${user.username} created successfully.`, {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      console.error(`Error for user ${user.username}`, error);
      toast.error(
        `Error for user ${user.username}:${error.response.data.message}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  }

  // Loop through the array and send API requests
  async function processUsers() {
    for (const user of users) {
      await sendRequest(user);
    }
  }
  Modal.setAppElement("#root");
  return (
    <div className="containerAddPeople">
      <div className="add-people-class"></div>
      <div className="w-[100%] flex justify-center items-center flex-col	">
        <h3 className="font-bold text-[26px] ">Manually create an account </h3>
        <span className="block">New Accounts:</span>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="bg-[#28e0c29a] text-[#fff] px-[8px] py-[1px] rounded mr-[9px]"
                    onClick={() => openEditModal(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-[#e028289a] text-[#fff] px-[8px] py-[1px] rounded"
                    onClick={() => removeUser(user)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex">
          <button
            className="bg-[#fc3468] text-[#fff] flex px-[4px] py-[4px] rounded mt-[20px] mr-[10px]"
            onClick={() => setIsModalOpen1(true)}
          >
            <HiUserAdd className="mt-[3px]" />
            Add User
          </button>
          <button
            onClick={() => processUsers()}
            className="bg-[#28e0c29a] text-[#fff] flex px-[4px] py-[4px] rounded mt-[20px]"
          >
            Create Accounts
          </button>
        </div>
      </div>

      <AddUserModal
        modalIsOpen={isModalOpen1}
        customStyles={customStyles1}
        setModalIsOpen1={setIsModalOpen1}
        users={users}
        setUsers={setUsers}
        formData={formData}
        setFormData={setFormData}
      />
      <OpenEditModal
        modalIsOpen={isModalOpen2}
        customStyles={customStyles1}
        setModalIsOpen1={setIsModalOpen2}
        users={users}
        setUsers={setUsers}
        formData={formData}
        setFormData={setFormData}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <ToastContainer />
    </div>
  );
};

export default CreateUserForm;
