// AllQuestions.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { QuestionContext } from "../../../contexts/QuestionContext";

const AllQuestions = () => {
  const { questions } = useContext(QuestionContext);

  return (
    <div>
      <h2>All Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <Link to={`/questions/${question.id}`}>{question.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllQuestions;