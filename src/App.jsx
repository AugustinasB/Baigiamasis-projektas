import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UsersProvider } from './contexts/UsersContext'; 
import Header from './components/header/Header';
import Body from './components/body/Body';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';
import AddQuestion from './components/pages/addquestion/AddQuestion';
import QuestionsPage from './components/pages/questionspage/QuestionsPage';

function App() {
  return (
    <UsersProvider>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/user">
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                </Route>
              </Routes>
              <Body />
              <Routes>
                {/* Render AddQuestion only when not on /user/login or /user/register */}
                <Route path="/" element={<AddQuestion />} />
                <Route path="/questions" element={<QuestionsPage />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </UsersProvider>
  );
}

export default App;
