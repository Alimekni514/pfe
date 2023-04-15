import React, { useEffect, useState } from 'react'
import {RiDeleteBin2Line} from "react-icons/ri"
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Setting({token}) {
  //states
  const [className,setclassName]=useState();
  const [classsection,setclasssection]=useState("");
  const {classid}=useParams();
  //useEffect 
  useEffect(()=> {
    fetch(`https://api.flat.io/v2/classes/${classid}`,{
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      }
    })
    .then((res)=>res.json())
    .then((data)=>  {
      setclassName(data.name)
      setclasssection(data.section)
    })

  },[]);
  //handle Delete
  const handleDelete=()=> {

  }
  //handle update class
  const handleUpdate=()=> {
    fetch(`https://api.flat.io/v2/classes/${classid}`, {
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        name:className,
        section:classsection
      })
    })
    .then(res=>res.json())
    .then(data=>toast.success(" Class Updated successfully", {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }))
  }
  return (
    <div>
      <h4>Class details</h4>
      <div className='classdetails'>
        <div>
            <label >Class name</label>
            <input type='text' value={className} onChange={(e)=>setclassName(e.target.value)}/>
        </div>
        <div>
          <label>Class section</label>
          <input type='text' placeholder='Class section' value={classsection} onChange={(e)=>setclasssection(e.target.value)}/>
        </div>
      </div>
      <div className='buttonsSettingClass'>
        <button>Archive class</button>
        <button className='deletebtnclass' onClick={()=>handleDelete()}> <RiDeleteBin2Line/>Delete class</button>
      </div>
      <button className='savechangeclass' onClick={()=>handleUpdate()}>
        Save Changes
      </button>
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
  )
}

export default Setting