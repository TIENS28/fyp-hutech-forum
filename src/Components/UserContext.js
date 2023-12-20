// UserContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setUserData = (userData) => {
    setUser(userData);

    localStorage.setItem('user', JSON.stringify(userData));
  };

  useEffect(() => {
    return () => localStorage.removeItem('user');
  }, []);

  const contextValue = { user, setUserData }; // Include setUserData in the context value

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
