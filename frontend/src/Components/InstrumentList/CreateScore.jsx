import React,{useState} from 'react'

function CreateScore({setfirstwindow,titleobject}) {
    const {title,settitle}=titleobject;

    const handleclick=()=> {
        setfirstwindow(false);
    }
  return (
    <div>
        <span style={{display:"block",textAlign:"left",margin:' 10px 0px 8px'}}>Score Title</span>
        <input  style={{width:"100%",margin:"8px 0px 20px"}}type="text" placeholder='Choose the title of your music score'  value={title} onChange={(e)=>settitle(e.target.value)}/>
        <button onClick={handleclick} style={{display:"block",padding:"8px 15px",color:"white",backgroundColor:"rgb(246, 79, 100)",outline:"none",border:"none",borderRadius:"5px",marginLeft:"auto"}}>Next</button>
    </div>

  )
}

export default CreateScore