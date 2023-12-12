import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';
import QuestionForm from './components/pages/questionform/QuestionForm'; 
import QuestionList from './components/pages/questionlist/QuestionList'; 
import { UsersProvider } from './contexts/UsersContext';
import Body from './components/body/Body';

function App() {
  const [submittedQuestions, setSubmittedQuestions] = useState([]);

  const handleFormSubmit = (formData) => {
    setSubmittedQuestions([...submittedQuestions, formData]);
  };

  return (
    <UsersProvider>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Header />
              <Routes>
                <Route index element={<Body />} />

                <Route path="/user/*">
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                </Route>

                <Route path="/questions">
                  <Route index element={<QuestionList questions={submittedQuestions} />} />
                  <Route path="submit" element={<QuestionForm onSubmit={handleFormSubmit} />} />
                </Route>
              </Routes>
            </>
          }
        />
      </Routes>
    </UsersProvider>
  );
}

export default App;
