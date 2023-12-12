import React, { createContext, useEffect, useReducer, useState } from "react";
import { v4 as uuid } from 'uuid';

const UsersContext = createContext();

const UsersActionTypes = {
  get_all: 'get all users from db',
  add_question: 'add a new question',
  edit_question: 'edit a question',
  delete_question: 'delete a question'
};

const reducer = (state, action) => {
  switch (action.type) {
    case UsersActionTypes.get_all:
      return action.data;
    case UsersActionTypes.add_question:
      return { ...state, questions: [...state.questions, action.data] };
    case UsersActionTypes.edit_question:
      return {
        ...state,
        questions: state.questions.map(question =>
          question.id === action.data.id ? { ...question, ...action.data } : question
        ),
      };
    case UsersActionTypes.delete_question:
      return {
        ...state,
        questions: state.questions.filter(question => question.id !== action.id),
      };
    default:
      console.log("error: action type not found", action.type);
      return state;
  }
};

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useReducer(reducer, { questions: [] }); 
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {

    fetch(`http://localhost:8081/users`)
      .then(res => res.json())
      .then(data =>
        setUsers({
          type: UsersActionTypes.get_all,
          data: data
        })
      );
  }, []);

  const addQuestion = (question) => {
    setUsers({
      type: UsersActionTypes.add_question,
      data: { ...question, id: uuid() }
    });
  };

  const editQuestion = (question) => {
    setUsers({
      type: UsersActionTypes.edit_question,
      data: question
    });
  };

  const deleteQuestion = (questionId) => {
    setUsers({
      type: UsersActionTypes.delete_question,
      id: questionId
    });
  };

  const saveDataToFile = async (data) => {
    try {

      const response = await fetch('http://localhost:8081/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      console.log('Data saved successfully.');
    } catch (error) {
      console.error('Error saving data:', error.message);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        UsersActionTypes,
        loggedInUser,
        setLoggedInUser,
        addQuestion,
        editQuestion,
        deleteQuestion,
        saveDataToFile
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersProvider };
export default UsersContext;
