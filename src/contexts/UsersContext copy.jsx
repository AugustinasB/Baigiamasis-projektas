import React, { createContext, useEffect, useReducer, useState } from "react";
import { v4 as uuid } from 'uuid';

const UsersContext = createContext();

const UsersActionTypes = {
  get_all: 'get all users from db',
  add_user: 'add a new user',
  edit_user: 'edit a user',
  delete_user: 'delete a user'
};

const reducer = (state, action) => {
  switch (action.type) {
    case UsersActionTypes.get_all:
      return action.data;
    case UsersActionTypes.add_user:
      return { ...state, users: [...state.users, action.data] };
    case UsersActionTypes.edit_user:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.data.id ? { ...user, ...action.data } : user
        ),
      };
    case UsersActionTypes.delete_user:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id),
      };
    default:
      console.log("error: action type not found", action.type);
      return state;
  }
};

const UsersProvider = ({ children }) => {
  const [users, setUsers] = useReducer(reducer, { users: [] }); 
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

  const adduser = (user) => {
    setUsers({
      type: UsersActionTypes.add_user,
      data: { ...user, id: uuid() }
    });
  };

  const edituser = (user) => {
    setUsers({
      type: UsersActionTypes.edit_user,
      data: user
    });
  };

  const deleteuser = (userId) => {
    setUsers({
      type: UsersActionTypes.delete_user,
      id: userId
    });
  };

  const saveDataToFile = async (data) => {
    try {

      const response = await fetch('http://localhost:8081/users', {
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
        adduser,
        edituser,
        deleteuser,
        saveDataToFile
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export { UsersProvider };
export default UsersContext;
