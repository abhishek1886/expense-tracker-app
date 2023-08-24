import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

const AuthContext = React.createContext({
  token: null,
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {}
});

export const AuthContextProvider = (props) => {
  const [data, setData] = useState(null);
  const history = useHistory();

  const userLoggedIn = !!data;

  const loginHandler = (tokenData) => {
    setData({
      email: tokenData.email,
      token: tokenData.token
    });
    localStorage.setItem('token', tokenData.token);
    localStorage.setItem('email', tokenData.email);
  }

  const logoutHandler = () => {
    setData(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    history.push('/login');
  }

  const contextValue = {
    token: data === null ? null : data.token,
    email: data === null ? null : data.email,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;