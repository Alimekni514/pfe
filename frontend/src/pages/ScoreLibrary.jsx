import React, { useState, useEffect } from "react";
import Collection from "../Components/ScoreLibrary/Collection";
import UserScore from "../Components/ScoreLibrary/UserScore";
import Modal from "react-modal";
import ModalInstrument from "../Components/InstrumentList/ModalInstrument";
import ModalAddCollection from "../Components/ScoreLibrary/ModalAddCollection";
import { toast, ToastContainer } from "react-toastify";

import { BiCollection } from "react-icons/bi";
function ScoreLibrary() {
  const token = window.localStorage.getItem("flat_token_user");
  if (token === "" || token === null || token === undefined) {
    // handle missing token error
    console.error("Missing token");
  }
  console.log(localStorage.getItem("flat_token_user"));
  //states
  const [collections, setcollections] = useState([]);
  const [userscores, setuserscores] = useState([]);
  const [userid, setuserid] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  //handle modal show
  const handlemodalShow = () => {
    setModalIsOpen(true);
  };
  //handle modal show 1
  const handlemodalShow1 = () => {
    setModalIsOpen1(true);
  };

  //UseEffect+SideEffect:Fetch the collections and the Scores
  useEffect(() => {
    //fetch the collections
    const urlcollections = "https://api.flat.io/v2/collections";
    fetch(urlcollections, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //Filtred Collections //except the trash and shared with me
        const filteredCollections = data.filter(
          (obj) => obj.title !== "Trash" && obj.title !== "Shared with me"
        );
        console.log(filteredCollections);
        localStorage.setItem(
          "collections",
          JSON.stringify(filteredCollections)
        );
        setcollections(filteredCollections);
      })
      .catch((error) => console.log(error));
    //fetch the user's scores
    //jib user id
    const currentuserlink = "https://api.flat.io/v2/me";
    fetch(currentuserlink, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setuserid(data.id);
        const userscores = `https://api.flat.io/v2/users/${data.id}/scores`;
        fetch(userscores, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setuserscores(data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);
  //Modal Setting
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

  return (
    <div className="specialcontainer">
      <h3>Scores</h3>
      <div
        className="bodyScore"
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <table style={{ width: "75%" }}>
          <thead>
            <tr>
              <td>Name</td>
              <td>Creation Date</td>
              <td>Sharing</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {collections &&
              collections.map((collection) => (
                <Collection
                  key={collection.id}
                  collection={collection}
                  token={token}
                  setcollections={setcollections}
                />
              ))}
            {userscores &&
              userscores.map((userscore) => (
                <UserScore
                  key={userscore.id}
                  collections={collections}
                  userscore={userscore}
                  token={token}
                  setuserscores={setuserscores}
                  id={userid}
                />
              ))}
          </tbody>
        </table>
        <div>
          <button
            onClick={handlemodalShow}
            style={{
              display: "block",
              color: "white",
              padding: "8px 15px",
              outline: "none",
              border: "none",
              backgroundColor: "#f64f64",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            New Score Or Tab
          </button>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              outline: "none",
              border: "none",
              color: "#777",
              margin: "15px 5px",
              backgroundColor: "transparent",
            }}
            onClick={() => handlemodalShow1()}
          >
            <BiCollection />
            Add a new Collection
          </button>
        </div>
      </div>

      <ModalInstrument
        modalIsOpen={modalIsOpen}
        customStyles={customStyles1}
        setModalIsOpen1={setModalIsOpen}
        setuserscores={setuserscores}
        token={token}
      />
      <ModalAddCollection
        modalIsOpen={modalIsOpen1}
        customStyles={customStyles1}
        setModalIsOpen1={setModalIsOpen1}
        token={token}
        setcollections={setcollections}
      />
      <ToastContainer />
    </div>
  );
}

export default ScoreLibrary;
