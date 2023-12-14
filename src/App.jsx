import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UsersProvider } from './contexts/UsersContext';
import Header from './components/pages/header/Header';
import Body from './components/body/Body';
import AllQuestions from './components/pages/allQuestions/AllQuestions';
import AddQuestion from './components/pages/addquestion/AddQuestion';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';
import { QuestionProvider } from './contexts/QuestionContext';

function App() {
  return (
    <UsersProvider>
      <QuestionProvider>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Body />} />
                <Route path="/AllQuestions" element={<AllQuestions />} />
                <Route path="/AddQuestion" element={<AddQuestion />} />
                <Route path="/user">
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                </Route>
              </Routes>
            </>
          }
        />
        </Routes>
      </QuestionProvider>
    </UsersProvider>
  );
}

export default App;