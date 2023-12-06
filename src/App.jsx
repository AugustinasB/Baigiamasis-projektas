import React, { useState } from 'react';
import './App.css';
import Header from './components/header/Header';

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
    <div>
      <Header
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
      />
    </div>
  );
}

export default App;
