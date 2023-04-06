import React, { useState ,useContext} from 'react'
import Modal from "react-modal"
import {IoMdClose} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import ClassContext from '../../contexts/ClassContext';
import Swal from 'sweetalert2'
function CreateClassModal({modalIsOpen,setModalIsOpen1,token}) {
        const handleCloseModal=()=> {
            setModalIsOpen1(false);
        }
        //states
        const [name,setname]=useState("");
        const navigate=useNavigate();
        const [loading,setloading]=useState(false);
        const {classroom,setclassroom}=useContext(ClassContext);
    //style
  const customStyles1 = {
    content: {
      top: "50%",
      left: "50%",
      width: "500px",
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
  //functions 
  //create class
  const handleclick=(e)=> {

     setloading(true);
      e.target.innerHtml="Loading ...";

    fetch("https://api.flat.io/v2/classes", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        name
      })
    })
    .then((res)=>res.json())
    .then(data=> {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Class has been Created',
        showConfirmButton: false,
        timer: 1500
      })

      //navigate to the class stream page
      setclassroom(data);
      navigate(`/class/${data.id}`);
    })
  }
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      style={customStyles1}
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
        <h3  className='titlecreateclass'>Create New Class</h3>
        <IoMdClose
          size={24}
          onClick={handleCloseModal}
          style={{ cursor: "pointer", marginLeft: "7px" }}
        />
      </div>
            <div className='formclass'>
                <label for="classcreationname">Manually create your class</label>
                <input type='text'id="classcreationname"  value={name} onChange={(e)=>setname(e.target.value)} placeholder='Type your new class name...'/>
                <button onClick={(e)=>handleclick(e)} className={loading?"loadingcreationclass":""}>Create</button>
            </div>
        </Modal>
  )
}

export default CreateClassModal