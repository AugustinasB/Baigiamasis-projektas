import React, { useContext } from 'react';
import UsersContext from '../../../contexts/UsersContext';

const QuestionsPage = () => {
  const { questions, deleteQuestion, editQuestion } = useContext(UsersContext);

  const handleDelete = (questionId) => {
    deleteQuestion(questionId);
  };

  const handleEdit = (question) => {

  };

  return (
    <div>
      <h2>Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <div>
              <h3>{question.title}</h3>
              <p>{question.description}</p>
              <button onClick={() => handleEdit(question)}>Edit</button>
              <button onClick={() => handleDelete(question.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsPage;