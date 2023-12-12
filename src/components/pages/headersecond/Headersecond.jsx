import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import UsersContext from '../../../contexts/UsersContext';

const HeaderSecond = ({ element, ...props }) => {
  const { loggedInUser } = useContext(UsersContext);

  return loggedInUser ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/user/login" replace />
  );
};

export default HeaderSecond;
