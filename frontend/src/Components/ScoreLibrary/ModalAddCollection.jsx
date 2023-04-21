import React, { useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ModalAddCollection({
  token,
  modalIsOpen,
  setModalIsOpen1,
  customStyles,
  setcollections,
}) {
  //states
  const [collectionname, setcollectionname] = useState("");
  //functions
  const handleCloseModal = () => {
    setModalIsOpen1(false);
  };
  const createcollection = async () => {
    handleCloseModal();
    try {
      const collectionfetch = await fetch(
        `https://api.flat.io/v2/collections`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: collectionname,
            privacy: "private",
          }),
        }
      );
      const data = await collectionfetch.json();
      toast.success("collection has been created");
      //fetch the collections
      const urlcollections = "https://api.flat.io/v2/collections";
      const AllcollectionFetch = await fetch(urlcollections, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data1 = await AllcollectionFetch.json();
      const filteredCollections = data1.filter(
        (obj) => obj.title !== "Trash" && obj.title !== "Shared with me"
      );
      setcollections(filteredCollections);
    } catch (err) {
      toast.error(`An erro has occured!!`);
    }
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
        <h3>Create a new Collection</h3>
        <IoMdClose
          size={24}
          onClick={handleCloseModal}
          style={{ cursor: "pointer", marginLeft: "7px" }}
        />
      </div>
      <div className="flex space-x-2 px-1 py-4">
        <input
          type="text"
          value={collectionname}
          onChange={(e) => setcollectionname(e.target.value)}
        />
        <button
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
          onClick={() => createcollection()}
        >
          Create
        </button>
      </div>
    </Modal>
  );
}

export default ModalAddCollection;
