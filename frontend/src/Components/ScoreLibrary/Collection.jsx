import React, { useState } from "react";
import { FcFolder } from "react-icons/fc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getTimeElapsed } from "../../Assets/Functions-Need/TimeConversion";
import { GrFormView } from "react-icons/gr";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
function Collection({ collection, token, setcollections }) {
  //states
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [text, setText] = useState(collection.title);
  const [isEditing, setIsEditing] = useState(false);

  //functions
  const handleshow = () => {
    // toggle the dropdown menu visibility
    setDropdownVisible((prevState) => !prevState);
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
  };
  //handle rename
  const handlerename = () => {
    setIsEditing(true);
  };
  //handle save
  const handlesave = () => {
    setIsEditing(false);
    const urlapi = `https://api.flat.io/v2/collections/${collection.id}`;
    fetch(urlapi, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: text,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  //handle delete
  const handledelete = () => {
    const urlapi = `https://api.flat.io/v2/collections/${collection.id}`;
    fetch(urlapi, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    fetch("https://api.flat.io/v2/collections", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const filteredCollections = data.filter(
          (obj) => obj.title !== "Trash" && obj.title !== "Shared with me"
        );
        setcollections(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <tr>
      <td
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <input type="checkbox" />
        <FcFolder style={{ fontSize: "23px", marginRight: "10px" }} />
        {isEditing ? (
          <div>
            <input
              type="text"
              value={text}
              onChange={handleInputChange}
              style={{
                borderRadius: "5px",
                padding: "8px 15px",
                marginLeft: "10px",
              }}
            />
            <button
              onClick={handlesave}
              style={{
                padding: "8px 12px",
                color: "#fff",
                backgroundColor: "red",
                outline: "none",
                border: "none",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <p>{text}</p>
          </div>
        )}
      </td>
      <td> {getTimeElapsed(collection.creationDate)}</td>
      <td>{collection.privacy === "private" ? "Only Me" : ""}</td>
      <td>
        <div style={{ position: "relative" }} onClick={handleshow}>
          <BsThreeDotsVertical />
          {dropdownVisible && (
            <div
              className="dropdown-menu"
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: "-8px",
              }}
            >
              <ul style={{ listStyle: "none" }}>
                <li>
                  <button>
                    <GrFormView />
                    View
                  </button>
                </li>
                <li>
                  <button onClick={handlerename}>
                    <MdDriveFileRenameOutline />
                    Rename
                  </button>
                </li>
                <li>
                  <button onClick={handledelete}>
                    <AiFillDelete />
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
export default Collection;
