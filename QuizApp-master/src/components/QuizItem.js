import React, { useContext } from "react";
import quizContext from "../context/quizs/quizContext";
import {FcDeleteDatabase} from "react-icons/fc";
import {AiOutlineEdit} from "react-icons/ai"

const Quizitem = (props) => {
const context = useContext(quizContext);
const { deleteQuiz } = context;
  const { quiz, updateQuiz } = props;
  return (
    <div className="col-md-6 gx-1">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title"><span className=" text-[#f64f64] font-semibold	">Question:</span>{quiz.question}</h5>
          <div className="row gx-2 flex">
            <div className="flex space-x-[10px]">
              <span className="text-[16px] text-[#f64f64] font-semibold	 ">Options:</span>
              <ul><li className="font-bold">{quiz.option1}</li></ul>
              <div >
            <ul><li className="font-bold">{quiz.option2}</li></ul>
            </div>
            <div >
            <ul><li className="font-bold">{quiz.option3}</li></ul>
            </div>
            <div >
            <ul><li className="font-bold">{quiz.option4}</li></ul>
            </div>
            </div>
          </div>
          <div className="row my-1">
            <div className="col"><span className="text-[#f64f64] font-semibold	">Answer is :</span> {quiz.answer}</div>
          </div>
          <div className="row my-1">
            <div className="col"><span className="text-[#f64f64] font-semibold">Is the question type MCQ : </span>{quiz.mcq}</div>
          </div>
          <div className="row my-1">
            <div className="col"><span className="text-[#f64f64] font-semibold">Title :</span> {quiz.title}</div>
          </div>
          <div className="flex space-x-4">
          <FcDeleteDatabase  className ="text-xl"onClick={()=>{deleteQuiz(quiz._id); props.showAlert("deleted successfully","success")}} />
          <AiOutlineEdit   className ="text-xl"onClick={()=>{updateQuiz(quiz)}}/>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Quizitem;
