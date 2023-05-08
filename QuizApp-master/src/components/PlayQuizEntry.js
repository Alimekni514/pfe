import React, { useState } from "react";
import { json } from "react-router-dom";
import Game from "./Game";

const PlayQuizEntry = () => {
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const [seq, setSeq] = useState("");
  const quizsInitial = [];
  const [quizs, setQuizs] = useState(quizsInitial);

  var [val, setVal] = useState("");

  // var TEST = localStorage.getItem("val");

  // var windowsvariable = sessionStorage.getItem(window.val);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    // 👇 "message" stores input field value
    // setUpdated(message);
  };

  const fetchallquiz = async () => {
    const response = await fetch(
      `http://localhost:1000/api/quiz/fetchallquiznoauthentication/${message}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    console.log(json, "FETCH");
    setSeq("1");
    setQuizs(json);
    // localStorage.setItem("val", 0);
    const disableBtn = () => {
      document.getElementById("btn2").disabled = true;
    };
    disableBtn();
  };

  console.log(seq);

  const myFunction = async () => {
    console.log(sessionStorage.getItem("val"));
    setVal(sessionStorage.getItem("val"));
    const disableBtn = () => {
      document.getElementById("btn").disabled = true;
    };
    disableBtn();
    const gettheuser = await fetch(`http://localhost:1000/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const gettheuserdata = await gettheuser.json();
    console.log(gettheuserdata);
    const addScoreFetch = await fetch(`http://localhost:1000/api/result/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: gettheuserdata._id,
        quizCode: message,
        score: Number(sessionStorage.getItem("val")),
        name: gettheuserdata.email,
      }),
    });
    const resultadd = await addScoreFetch.json();
    console.log(resultadd);
  };

  return (
    <div>
      <div className="flex items-center  justify-center	">
        <input
          type="text"
          id="message"
          name="message"
          onChange={handleChange}
          value={message}
        />

        {/* <h2>Updated: {updated}</h2> */}

        <button
          className="btn btn-primary py-[9px] rounded-none	"
          id="btn2"
          onClick={fetchallquiz}
        >
          Play
        </button>
      </div>

      {quizs.map((quiz) => {
        return <Game quiz={quiz} key={quiz._id} />;
      })}

      <button
        className={seq == "1" ? "btn btn-primary mx-2" : "d-none mx-2"}
        id="btn"
        onClick={myFunction}
      >
        {" "}
        GENERATE SCORE{" "}
      </button>

      <div className={seq == "1" ? "d-flex" : "d-none"}>
        {" "}
        Your Score is : {val}{" "}
      </div>

      {/* <button >GENERATE SCORE</button>  */}
      <div>
        <a
          href="http://localhost:3000/playquiz"
          class="btn btn-danger my-2"
          tabIndex="-1"
          role="button"
        >
          RESET
        </a>
      </div>
    </div>
  );
};

export default PlayQuizEntry;
