import React, { useContext, useEffect } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SignUp from "./Components/Layout/Input/SignUp";
import Login from "./Components/Layout/Input/LogIn";
import Header from "./Components/Layout/Header";
import Home from "./Components/Layout/Home";
import Profile from "./Components/Layout/Input/Profile";
import Expenses from "./Components/Expenses/Expenses";
import { authActions } from "./store/auth";

const App = () => {
  // const authCtx = useContext(AuthContext);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const dispatch = useDispatch();
  
  useEffect(() => {
    const key = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (key && email) {
      dispatch(authActions.login({ token: key, email: email }));
    }
  }, []);

  return (
    <React.Fragment>
      <Header />

      <main>
        <Switch>
          <Route path="/" exact>
            {!isLoggedIn && <SignUp />}
            {isLoggedIn && <Redirect to="/home" />}
          </Route>
          <Route path="/login">{!isLoggedIn && <Login />}</Route>
          <Route path="/home">
            {isLoggedIn && <Home />}
            {!isLoggedIn && <Redirect to="/" />}
          </Route>
          {isLoggedIn && (
            <Route path="/profile">
              <Profile />
            </Route>
          )}
          {isLoggedIn && (
            <Route path="/expenses">
              <Expenses />
            </Route>
          )}
          <Route path="*">
            <Redirect to='/'/>
          </Route>
        </Switch>
      </main>
    </React.Fragment>
  );
};

export default App;
