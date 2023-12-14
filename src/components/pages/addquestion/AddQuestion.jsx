import{ useState, useEffect } from 'react';
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


const AddQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    setQuestions(storedQuestions);

    fetch('http://localhost:8081/questions')
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setQuestions(data);
        } else {
          console.log('Data.json does not exist.');
        }
      })
      .catch((error) => console.error('Error fetching data.json:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
    updateDataJson(questions);
  }, [questions]);

  const updateDataJson = (questions) => {
    fetch('http://localhost:8081/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questions),
    })
      .then((response) => response.json())
      .then((data) => console.log('Data.json updated successfully:', data))
      .catch((error) => console.error('Error updating data.json:', error));
  };

  const addQuestion = () => {
    if (newTitle.trim() && newDescription.trim()) {
      const updatedQuestions = [
        ...questions,
        {
          id: Date.now(),
          title: newTitle.trim(),
          description: newDescription.trim(),
        },
      ];
      setQuestions(updatedQuestions);
      setNewTitle('');
      setNewDescription('');
      setEditingQuestionId(null);
    }
  };

  const removeQuestion = (id) => {
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
    setEditingQuestionId(null);
  };

  const editQuestion = (id) => {
    const questionToEdit = questions.find((question) => question.id === id);
    setNewTitle(questionToEdit.title);
    setNewDescription(questionToEdit.description);
    setEditingQuestionId(id);
  };

  const saveEdit = () => {
    const updatedQuestions = questions.map((question) =>
      question.id === editingQuestionId
        ? { ...question, title: newTitle.trim(), description: newDescription.trim() }
        : question
    );
    setQuestions(updatedQuestions);
    setNewTitle('');
    setNewDescription('');
    setEditingQuestionId(null);
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
      {editingQuestionId ? (
        <>
          <button onClick={saveEdit}>Save</button>
          <button onClick={() => setEditingQuestionId(null)}>Cancel</button>
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
            <button onClick={() => editQuestion(question.id)}>Edit</button>
            <button onClick={() => removeQuestion(question.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </StyledAddQuestion>
  );
};

export default AddQuestion;