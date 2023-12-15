import{ useState, useEffect, useReducer } from 'react';
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
      background-color: #FFC67D;
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
      return state.filter(el => el.id.toString() !== action.id.toString());
    case QuestionActionTypes.edit:
      fetch(`http://localhost:8081/questions/${action.id}`, {
        method: "PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.data)
      });
      return state.map(el => {
        if(el.id.toString() === action.id.toString()){
          return { id:action.id, ...action.data };
        } else {
          return el;
        }
      });
    default:
      console.log("error: action type not found", action.type);
      return state;
  }
}



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
    const storedQuestions = JSON.parse(localStorage.getItem('questions'));
    dispatchQuestions({ type: QuestionActionTypes.getAll, data: storedQuestions || [] });
  }, []);

  const updateLocalStorage = (updatedQuestions) => {
    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
  };

  const addQuestion = () => {
    if (newTitle.trim() && newDescription.trim()) {
      const newQuestion = {
        id: Date.now(),
        title: newTitle.trim(),
        description: newDescription.trim(),
      };

      dispatchQuestions({ type: QuestionActionTypes.add, data: newQuestion });
      setNewTitle('');
      setNewDescription('');
      updateLocalStorage([...questions, newQuestion]);
    }
  };

  const removeQuestion = async (id) => {
    dispatchQuestions({ type: QuestionActionTypes.remove, id });
    updateLocalStorage(questions.filter((question) => question.id !== id));
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

      setNewTitle('');
      setNewDescription('');
      setEditedQuestion(null);

      updateLocalStorage(
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