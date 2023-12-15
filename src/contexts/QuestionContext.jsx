import React, { createContext, useEffect, useReducer } from 'react';

const QuestionContext = createContext();
const QuestionActionTypes = {
  get_all: 'get all questions from db',
  add: 'add new question',
};

const reducer = (state, action) => {
  switch (action.type) {
    case QuestionActionTypes.get_all:
      return action.data;
    case QuestionActionTypes.add:
      fetch(`http://localhost:8081/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((addedQuestion) => {
          return {
            type: QuestionActionTypes.add,
            data: addedQuestion,
          };
        })
        .catch((error) => {
          console.error('Error adding question:', error);
        });
    default:
      console.log('error: action type not found', action.type);
      return state;
  }
};

const QuestionProvider = ({ children }) => {
  const [questions, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8081/questions`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        dispatch({
          type: QuestionActionTypes.get_all,
          data: data,
        });
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const addQuestion = (question) => {
    fetch(`http://localhost:8081/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((addedQuestion) => {
        dispatch({
          type: QuestionActionTypes.add,
          data: addedQuestion,
        });
      })
      .catch((error) => {
        console.error('Error adding question:', error);
      });
  };

  return (
    <QuestionContext.Provider
      value={{
        questions,
        QuestionActionTypes,
        addQuestion,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionProvider, QuestionContext };