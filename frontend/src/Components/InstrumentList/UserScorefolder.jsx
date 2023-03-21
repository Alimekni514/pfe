import React, { useState } from "react";
import { GiMusicalScore } from "react-icons/gi";
import { getTimeElapsed } from "../../Assets/Functions-Need/TimeConversion";
import { GrFormView } from "react-icons/gr";
import { FcFolder } from "react-icons/fc";
import Swal from "sweetalert2";
import {
  MdDriveFileRenameOutline,
  MdDriveFileMove,
  MdContentCopy,
} from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  AiFillDelete,
  AiFillFolderAdd,
  AiOutlineFullscreenExit,
} from "react-icons/ai";
import { RiUserShared2Fill } from "react-icons/ri";
function UserScorefolder({ userscore,collectionid,setuserscores,token }) {
        //states
        const [text,setext]=useState(userscore.title);
        const [isEditing, setIsEditing] = useState(false);
        const [dropdownVisible2, setDropdownVisible2] = useState(false);
        const [dropdownVisible3, setDropdownVisible3] = useState(false);
        const [dropdownVisible1, setDropdownVisible1] = useState(false);
        const collections=JSON.parse(localStorage.getItem("collections"));
           //Selected added collection
  const [existing, setexisting] = useState("");
  const [existing1, setexisting1] = useState("");

    //functions
 
    //handle dropdown 
    const handleshow = () => {
        // toggle the dropdown menu visibility
        setDropdownVisible1((prevState) => !prevState);
      };
    const handleInputChange = (event) => {
            setext(event.target.value);
        };
        const handlesave = () => {
            setIsEditing(false);
            const urlapi = `https://api.flat.io/v2/scores/${userscore.id}`;
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
          //handle rename 
          const handlerename=()=> {
            setIsEditing(true);
          }
          //handleview
            const handleview = () => {
                window.location.href = userscore.htmlUrl;
              };
        //handle delete 
        const handledelete=async()=> {
            const urlapi=`https://api.flat.io/v2/collections/${collectionid}/scores/${userscore.id}`;
           await  fetch(urlapi, {
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            })
            .then(async (res)=> {
                    const urlapi=`https://api.flat.io/v2/collections/${collectionid}/scores`;
                    await fetch(urlapi, {
                      headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${token}`
                      }
                    })
                    .then(res=>res.json())
                    .then(data=>setuserscores(data))
                    .catch(err=>console.log(err));
                })
            .catch(err=>console.log(err));
        }
        //make copy
            const makeCopy = async () => {
                await fetch(`https://api.flat.io/v2/scores/${userscore.id}/fork`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    collection: collectionid,
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    const urlapi1=`https://api.flat.io/v2/collections/${collectionid}/scores`;
                    fetch(urlapi1, {
                      headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${token}`
                      }
                    })
                    .then(res=>res.json())
                    .then(data=>setuserscores(data))
                    .catch(err=>console.log(err));

                  })
                  .catch((err) => console.log(err));
        }
       //handle add collection
  const handleaddcollection = () => {
    setDropdownVisible2(true);
    setDropdownVisible1(false);
  };
    //handle move to collection
    const handlemovetocollection = () => {
        setDropdownVisible3(true);
        setDropdownVisible1(false);
      };
      //handle add userscore to an existing collection
  const addexisting = (event) => {
    setDropdownVisible1(false);
    const data = event.target.innerText;
    setexisting(data);
  };
   //handle move score to a collection
   const addexisting1 = (event) => {
    setDropdownVisible1(false);
    const data = event.target.innerText;
    console.log(data);
    setexisting1(data);
  };
     //handle add userscore to a collection
  const handleaddscore = async (event) => {
    event.target.textContent = "Loading ...";
    const filteredCollections = collections.filter(
      (obj) => obj.title === existing
    );
    await fetch(
      `https://api.flat.io/v2/collections/${filteredCollections[0].id}/scores/${userscore.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (res.status == 200) {
          setDropdownVisible2(false);
          setDropdownVisible1(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Music Score Added Successfully to ${existing} `,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        setDropdownVisible1(false);
        setDropdownVisible2(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
   //handle move userscore to a collection
   const handleaddscore1 = async (event) => {
    event.target.textContent = "Loading ...";
    const filteredCollections = collections.filter(
      (obj) => obj.title === existing1
    );
    await fetch(
      `https://api.flat.io/v2/collections/${filteredCollections[0].id}/scores/${userscore.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(async (res) => {
        if (res.status == 200) {
          setDropdownVisible3(false);
          setDropdownVisible1(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Music Score Moved Successfully to ${existing1} `,
            showConfirmButton: false,
            timer: 1500,
          });
          const urlapi = `https://api.flat.io/v2/collections/${collectionid}/scores/${userscore.id}`;
          //delete score
          await fetch(urlapi, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
            const urlapi1=`https://api.flat.io/v2/collections/${collectionid}/scores`;
            fetch(urlapi, {
              headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
              }
            })
            .then(res=>res.json())
            .then(data=>setuserscores(data))
            .catch(err=>console.log(err));
        }
      })
      .catch((err) => {
        setDropdownVisible1(false);
        setDropdownVisible3(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
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
        <GiMusicalScore style={{ fontSize: "23px", marginRight: "10px" }} />
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
                backgroundColor: "#f64f64",
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
      <td> {getTimeElapsed(userscore.creationDate)}</td>
      <td>{userscore.privacy === "private" ? "Only Me" : ""}</td>
      <td>
        <div style={{ position: "relative" }} onClick={handleshow}>
          <BsThreeDotsVertical />
          {dropdownVisible1 && (
            <div
              className="dropdown-menu"
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: "-8px",
                borderRadius: "5px",
              }}
            >
              <ul style={{ listStyle: "none" }}>
                <li>
                  <button onClick={handleview}>
                    <GrFormView />
                    View
                  </button>
                </li>
                <li>
                  <button onClick={() => handlerename()}>
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
                <li>
                  <button>
                    <RiUserShared2Fill />
                    Share
                  </button>
                </li>
                <li>
                  <button onClick={handleaddcollection}>
                    <AiFillFolderAdd style={{ fontSize: "25px" }} />
                    Add To a Collection
                  </button>
                </li>
                <li>
                  <button onClick={handlemovetocollection}>
                    <MdDriveFileMove style={{ fontSize: "25px" }} />
                    Move To a collection
                  </button>
                </li>
                <li>
                  <button onClick={makeCopy}>
                    <MdContentCopy />
                    Make a copy
                  </button>
                </li>
              </ul>
            </div>
          )}
          {dropdownVisible2 && (
            <div
              className="dropdown-menu"
              style={{
                position: "absolute",
                top: "calc(100% + 21px)",
                left: "-184px",
                borderRadius: "5px",
                width: "200px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#ececec",
                  padding: "15px 9px",
                  borderRadius: "4px",
                }}
              >
                <h6 style={{ fontSize: "13px" }}>
                  Add to an existing collection
                </h6>
                <AiOutlineFullscreenExit
                  onClick={() => {
                    setDropdownVisible2(false);
                  }}
                />
              </div>
              {collections &&
                collections.map((collection) => (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "8px 4px",
                      }}
                    >
                      <FcFolder style={{ marginRight: "6px" }} />
                      <p
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            collection.title === existing ? "#ffce3a" : "#fff",
                          padding: "5px",
                          borderRadius: "4px",
                          width: "100%",
                        }}
                        onClick={addexisting}
                      >
                        {collection.title}
                      </p>
                    </div>
                  </div>
                ))}
              <button
                style={{
                  display: "block",
                  backgroundColor: "#f64f64",
                  color: "white",
                  borderRadius: "4px",
                  padding: "5px 4px",
                  textAlign: "center",
                  marginTop: "5px",
                }}
                onClick={handleaddscore}
              >
                Add
              </button>
            </div>
          )}
          {dropdownVisible3 && (
            <div
              className="dropdown-menu"
              style={{
                position: "absolute",
                top: "calc(100% + 21px)",
                left: "-184px",
                borderRadius: "5px",
                width: "200px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#ececec",
                  padding: "15px 9px",
                  borderRadius: "4px",
                }}
              >
                <h6 style={{ fontSize: "13px" }}>Add to a collection</h6>
                <AiOutlineFullscreenExit
                  onClick={() => {
                    setDropdownVisible3(false);
                  }}
                />
              </div>
              {collections &&
                collections.map((collection) => (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "8px 4px",
                      }}
                    >
                      <FcFolder style={{ marginRight: "6px" }} />
                      <p
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            collection.title === existing1 ? "#ffce3a" : "#fff",
                          padding: "5px",
                          borderRadius: "4px",
                          width: "100%",
                        }}
                        onClick={addexisting1}
                      >
                        {collection.title}
                      </p>
                    </div>
                  </div>
                ))}
              <button
                style={{
                  display: "block",
                  backgroundColor: "#f64f64",
                  color: "white",
                  borderRadius: "4px",
                  padding: "5px 4px",
                  textAlign: "center",
                  marginTop: "5px",
                }}
                onClick={handleaddscore1}
              >
                Add
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

export default UserScorefolder;
