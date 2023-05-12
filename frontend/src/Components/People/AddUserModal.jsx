import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { TextInput, Label, Radio, Select } from "flowbite-react";
import { HiUserAdd } from "react-icons/hi";
function AddUserModal({
  modalIsOpen,
  customStyles,
  setModalIsOpen1,
  users,
  setUsers,
  formData,
  setFormData,
}) {
  const handleCloseModal = () => {
    setModalIsOpen1(false);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newUser = { ...formData };
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setFormData({
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      locale: "",
      role: "",
    });
    setModalIsOpen1(false);
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #eaeaec",
          padding: "4px",
        }}
      >
        <h4>Add a new Account </h4>

        <IoMdClose
          size={24}
          onClick={handleCloseModal}
          style={{ cursor: "pointer", marginLeft: "7px" }}
        />
      </div>
      <div>
        <form className="flex flex-col gap-4">
          <div className="flex gap-[40px]">
            <div className="w-[50%]">
              <Label htmlFor="username" value="Username" />
              <TextInput
                type="text"
                name="username"
                value={formData.username}
                onChange={(e) => handleInputChange(e)}
                placeholder="Username"
                required={true}
                helperText={
                  <React.Fragment>Only lowercase letters,digits</React.Fragment>
                }
              />
            </div>
            <div className="w-[50%]">
              <Label htmlFor="password" value="Password" />
              <TextInput
                type="text"
                name="password"
                value={formData.password}
                onChange={(e) => handleInputChange(e)}
                placeholder="Password"
                helperText={
                  <React.Fragment>6 characters minimum</React.Fragment>
                }
                required={true}
              />
            </div>
          </div>
          {/* Radio Buttons for the Role */}
          <div className="radios flex gap-[20px]">
            <div className="flex items-center gap-2">
              <Radio
                id="teacher"
                name="role"
                value="teacher"
                checked={formData.role === "teacher"}
                onChange={handleCheckboxChange}
              />
              <Label htmlFor="teacher" className="!mb-[0px]">
                teacher
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="student"
                name="role"
                value="user"
                checked={formData.role === "user"}
                onChange={handleCheckboxChange}
              />
              <Label htmlFor="student" className="!mb-[0px]">
                Student
              </Label>
            </div>
          </div>
          <div className="flex gap-[40px]">
            <div className="w-[50%]">
              <Label htmlFor="email" value="Email address" />
              <TextInput
                type="text"
                name="email"
                value={formData.email}
                onChange={(e) => handleInputChange(e)}
                placeholder="Optional"
              />
            </div>
            <div id="select">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="Language" />
              </div>
              <Select id="countries" required={true}>
                <option>English(US)</option>
                <option>Français</option>
                <option>English(UK)</option>
                <option>Deutsch</option>
              </Select>
            </div>
          </div>
          <div className="flex gap-[40px]">
            <div className="w-[50%]">
              <Label htmlFor="firstname" value="First Name" />
              <TextInput
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={(e) => handleInputChange(e)}
                placeholder="Optional"
              />
            </div>
            <div className="w-[50%]">
              <Label htmlFor="lastname" value="Last Name" />
              <TextInput
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={(e) => handleInputChange(e)}
                placeholder="Optional"
              />
            </div>
          </div>
          <button
            type="submit"
            className="!w-[70px] flex bg-[rgb(255,40,137)] text-[#fff] pl-[6px] pr-[6px] rounded ml-[auto] mt-[10px]"
            onClick={handleFormSubmit}
          >
            <HiUserAdd className="mt-[3px] mr-[2px]" />
            Add
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AddUserModal;
