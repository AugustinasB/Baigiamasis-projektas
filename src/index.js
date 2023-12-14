import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { UsersProvider } from './contexts/UsersContext';
import { QuestionProvider } from './contexts/QuestionContext';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UsersProvider>
        <QuestionProvider>
          <App />
        </QuestionProvider>
      </UsersProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
