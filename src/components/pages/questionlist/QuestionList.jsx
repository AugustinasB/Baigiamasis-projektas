import React from 'react';
import Question from '../question/Question';

const QuestionList = ({ questions }) => {
  return (
    <div>
      <h2>All Questions</h2>
      {questions.map((question, index) => (
        <Question key={index} {...question} />
      ))}
    </div>
  );
};

export default QuestionList;
