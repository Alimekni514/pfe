import React from "react";
import { Card, Button } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
function AssignmentTypes() {
  const navigate = useNavigate();
  const params = useParams();
  const { classid } = params;

  return (
    <div className="specialcontainer">
      <Card className="mb-[20px]">
        <div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-[10px]">
            Composition
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Build composition and music notation assignments that challenge your
            students to begin their first composition, develop their creativity,
            or explore particular aspects of harmony, rhythm, transposition,
            tablatures and more.
          </p>
        </div>
        <Button
          className="!bg-[#f64f64] !text-[#fff] h-[40px]"
          onClick={() => navigate(`/class/${classid}/assignment`)}
        >
          <span className="!text-[#fff]"> Create</span>
          <svg
            className="ml-2 -mr-1 h-4 w-4 text-[#fff]"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </Card>
      <Card className="cardcomposition">
        <div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-[10px]">
            Worksheet
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Highly adaptable and interactive music theory worksheets created in
            seconds: · Save time with the optional auto-grading feature and
            reuse assignments whenever you like.
          </p>
        </div>
        <Button className="!bg-[#f64f64] !text-[#fff] h-[40px]">
          <span
            className="!text-[#fff]"
            onClick={() => window.location.replace("http://localhost:3001")}
          >
            {" "}
            Create
          </span>
          <svg
            className="ml-2 -mr-1 h-4 w-4 text-[#fff]"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </Card>
    </div>
  );
}

export default AssignmentTypes;
