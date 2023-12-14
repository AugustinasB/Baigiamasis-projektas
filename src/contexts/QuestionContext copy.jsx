import { createContext, useEffect, useReducer } from "react";


const QuestionContext = createContext();
const QuestionActionTypes = {
  get_all: 'get all questions from db',
  add: 'add new question',
  remove: 'remove question',
  edit: 'edit question'
};

const reducer = (state, action) => {
  switch(action.type){
    case QuestionActionTypes.get_all:
      return action.data;
    case QuestionActionTypes.add:
      fetch(`http://localhost:8081/questions`, {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.data)
      });
      return [...state, action.data];
    case QuestionActionTypes.remove:
      fetch(`http://localhost:8081/questions/${action.id}`,{
        method: "DELETE"
      });
      return state.filter(question => question.id !== action.id);
    case QuestionActionTypes.edit:
      return state.map(question =>
        question.id === action.id ? { ...question, ...action.data } : question
      );
    default:
      console.log("error: action type not found", action.type);
      return state;
  }
};

const QuestionProvider = ({children}) => {
  const [questions, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8081/questions`)
      .then(res => res.json())
      .then(data =>
        dispatch({
          type: QuestionActionTypes.get_all,
          data: data
        })
      );
  }, []);

  const addQuestion = (question) => {
 fetch('http://localhost:8081/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    })
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: QuestionActionTypes.add,
          data: data,
        });
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const removeQuestion = (questionId) => {
    dispatch({
      type: QuestionActionTypes.remove,
      id: questionId
    });
  };

  const editQuestion = (questionId, updatedData) => {
    dispatch({
      type: QuestionActionTypes.edit,
      id: questionId,
      data: updatedData
    });
  };

  return (
    <QuestionContext.Provider
      value={{
        questions,
        QuestionActionTypes,
        addQuestion,
        removeQuestion,
        editQuestion
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionProvider, QuestionContext }; 
