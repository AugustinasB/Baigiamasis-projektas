import React, { useState } from 'react';
import styled from 'styled-components';


const StyledAddQuestion = styled.div`
  font-family: system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;
  margin: 10px;
  font-size: 20px;
  font-weight: 500;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    span {
      margin-right: 10px;
      font-weight: bold;
      font-size: 20px;
    }

    button {
      margin-left: 10px;
      background-color: #FFC67D;
      border: none;
      border-radius: 30px;
      padding: 5px 10px;
      cursor: pointer;
    }
  }

  input {
    width: 80%;
    padding: 5px;
    margin: 10px 0;
    border: 2px solid black;
  }

  textarea {
    width: 80%;
    margin: 10px 0;
    border: 2px solid black;
    resize: none; 
  }

  button {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #45a049;
  }
`;

const AddQuestion = () => {
  const [questions, setQuestions] = useState([
  ]);

  const [newQuestion, setNewQuestion] = useState('');
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  const addQuestion = () => {
    if (newQuestion.trim()) {
      const updatedQuestions = [...questions, { id: Date.now(), text: newQuestion.trim() }];
      setQuestions(updatedQuestions);
      setNewQuestion('');
    }
  };

  const removeQuestion = (id) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
    setEditingQuestionId(null);
  };

  const editQuestion = (id) => {
    setEditingQuestionId(id);
    const questionToEdit = questions.find((question) => question.id === id);
    setNewQuestion(questionToEdit.text);
    setEditedQuestion(questionToEdit.text);
  };

  const saveEdit = () => {
    const updatedQuestions = questions.map((question) =>
      question.id === editingQuestionId ? { ...question, text: editedQuestion.trim() } : question
    );
    setQuestions(updatedQuestions);
    setEditedQuestion('');
    setEditingQuestionId(null);
  };

  return (
    <StyledAddQuestion>
      <h2>Add/Edit a Question</h2>
      <input
        type="text"
        placeholder="Type your question"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
      />
      {editingQuestionId ? (
        <>
          <button onClick={saveEdit}>Save Edit</button>
          <button onClick={() => setEditingQuestionId(null)}>Cancel Edit</button>
        </>
      ) : (
        <button onClick={addQuestion}>Submit</button>
      )}

      <h2>All Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            {editingQuestionId === question.id ? (
              <input
                type="text"
                value={editedQuestion}
                onChange={(e) => setEditedQuestion(e.target.value)}
              />
            ) : (
              <span>{question.text}</span>
            )}

            {editingQuestionId === question.id ? (
              <>
                <button onClick={saveEdit}>Save</button>
                <button onClick={() => setEditingQuestionId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => editQuestion(question.id)}>Edit</button>
                <button onClick={() => removeQuestion(question.id)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </StyledAddQuestion>
  );
};

export default AddQuestion;