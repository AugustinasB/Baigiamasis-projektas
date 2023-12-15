import React, { useState, useEffect, useReducer } from 'react';
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
    flex-direction: column;
    margin-bottom: 10px;

    span {
      margin-right: 10px;
      font-weight: bold;
      font-size: 20px;
    }

    button {
      margin-top: 10px;
      background-color: #ffc67d;
      border: none;
      border-radius: 30px;
      padding: 5px 10px;
      cursor: pointer;
    }
  }

  input,
  textarea {
    width: 80%;
    padding: 5px;
    margin: 10px 0;
    border: 2px solid black;
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

const QuestionActionTypes = {
  getAll: 'get all questions from db',
  add: 'add one new question',
  remove: 'remove one specific question',
  edit: 'edit one specific question',
};

const questionReducer = (state, action) => {
  switch (action.type) {
    case QuestionActionTypes.getAll:
      return action.data;
    case QuestionActionTypes.add:
      return [...state, action.data];
    case QuestionActionTypes.remove:
      return state.filter((question) => question.id !== action.id);
    case QuestionActionTypes.edit:
      return state.map((question) =>
        question.id === action.id ? { ...question, ...action.data } : question
      );
    default:
      return state;
  }
};

const AddQuestion = () => {
  const [questions, dispatchQuestions] = useReducer(questionReducer, []);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editedQuestion, setEditedQuestion] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8081/questions');
      const data = await response.json();
      dispatchQuestions({ type: QuestionActionTypes.getAll, data: data || [] });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const updateDataJson = async (updatedQuestions) => {
    try {
      const response = await fetch('http://localhost:8081/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedQuestions),
      });
      const data = await response.json();
      console.log('Data.json updated successfully:', data);
    } catch (error) {
      console.error('Error updating data.json:', error);
    }
  };

  const addQuestion = () => {
    if (newTitle.trim() && newDescription.trim()) {
      const newQuestion = {
        id: Date.now(),
        title: newTitle.trim(),
        description: newDescription.trim(),
      };

      dispatchQuestions({ type: QuestionActionTypes.add, data: newQuestion });

      // Reset input fields
      setNewTitle('');
      setNewDescription('');

      // Make POST request after updating local state
      updateDataJson([...questions, newQuestion]);
    }
  };

  const removeQuestion = async (id) => {
    dispatchQuestions({ type: QuestionActionTypes.remove, id });

    // Make POST request after updating local state
    updateDataJson(questions.filter((question) => question.id !== id));
  };

  const saveEdit = () => {
    if (newTitle.trim() && newDescription.trim() && editedQuestion) {
      const editedQuestionData = {
        id: editedQuestion.id,
        title: newTitle.trim(),
        description: newDescription.trim(),
      };

      dispatchQuestions({
        type: QuestionActionTypes.edit,
        id: editedQuestion.id,
        data: editedQuestionData,
      });

      // Reset input fields and editing state
      setNewTitle('');
      setNewDescription('');
      setEditedQuestion(null);

      // Make POST request after updating local state
      updateDataJson(
        questions.map((question) =>
          question.id === editedQuestion.id ? editedQuestionData : question
        )
      );
    }
  };

  const editQuestion = (question) => {
    setNewTitle(question.title);
    setNewDescription(question.description);
    setEditedQuestion(question);
  };

  return (
    <StyledAddQuestion>
      <h2>Add/Edit a Question</h2>
      <input
        type="text"
        placeholder="Type your title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <textarea
        placeholder="Type your description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      {editedQuestion ? (
        <>
          <button onClick={saveEdit}>Save</button>
          <button onClick={() => setEditedQuestion(null)}>Cancel</button>
        </>
      ) : (
        <button onClick={addQuestion}>Submit</button>
      )}

      <h2>All Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <div>
              <strong>Title:</strong> {question.title}
            </div>
            <div>
              <strong>Description:</strong> {question.description}
            </div>
            <button onClick={() => editQuestion(question)}>Edit</button>
            <button onClick={() => removeQuestion(question.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </StyledAddQuestion>
  );
};

export default AddQuestion;
