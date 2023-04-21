import React, { useEffect, useState } from "react";
import UserScorefolder from "./UserScorefolder";
import ModalInstrument from "./ModalInstrument";
import Modal from "react-modal";
function CollectionFolder() {
  const token =window.localStorage.getItem("flat_token_user") || import.meta.env.VITE_ADMIN_TOKEN;
  const urlParts = window.location.href.split("/");
  const idcollection=urlParts[urlParts.length - 1];
  //states
  const [userscores, setuserscores] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //handle modal show
  const handlemodalShow=()=> {
    setModalIsOpen(true);
  }
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
  //functions
  useEffect(()=> {
    //grab the information of our collections :Scores
    const urlParts = window.location.href.split("/");
    const idcollection=urlParts[urlParts.length - 1];
    const urlapi=`https://api.flat.io/v2/collections/${idcollection}/scores`;
    fetch(urlapi, {
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      }
    })
    .then(res=>res.json())
    .then(data=>setuserscores(data))
    .catch(err=>console.log(err));
  },[])
  return (
    <div className="specialcontainer">
    <div>
      <h3>Scores  </h3>
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
            {
              userscores && userscores.map((userscore)=>(
                <UserScorefolder key={userscore.id} userscore={userscore} collectionid={idcollection}  setuserscores={setuserscores} token={token}/>
              ))
            }
            
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
        </div>
      </div>
      <ModalInstrument
        modalIsOpen={modalIsOpen}
        customStyles={customStyles1}
        setModalIsOpen1={setModalIsOpen}
        token={token}
        collection={idcollection}
      />
    </div>
    </div>
  );
}

export default CollectionFolder;
