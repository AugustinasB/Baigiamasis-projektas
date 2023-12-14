import React, { createContext, useEffect, useReducer, useState } from "react";

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