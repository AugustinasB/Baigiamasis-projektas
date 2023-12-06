import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    // Implement your search logic here using the searchTerm
    console.log(`Searching for: ${searchTerm}`);
  };

  return (
    <Routes>
      <Route
        path="*"
        element={
          <>
            <Header
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleInputChange}
            />
            <Routes>
              <Route path="/user">
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
            </Routes>
          </>
        }
      />
    </Routes>
  );
}

export default App;
