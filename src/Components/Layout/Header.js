import React, { useContext, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Navbar, Container, Button, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { authActions } from "../../store/auth";
import {themeActions} from "../../store/themeReducer";
import { expenseActions } from "../../store/expenses";

const key = "AIzaSyCnYaoFCa20-m3PKXmlMEhGvLDqPbJ0TzA";
const Header = () => {
  const [isVerified, setIsVerified] = useState(false);
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  // const [isVerified, setIsVerified] = useState(false);

  // useEffect(() => {
  //   fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${key}`, {

  //   })
  // }, []);

  const verifyUserHandler = async () => {
    try {
      const payload = {
        requestType: "VERIFY_EMAIL",
        idToken: token,
      };
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${key}`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        const data = await res.json();
        console.log(data.error.message);
        throw new Error();
      }
      setIsVerified(true);
    } catch (err) {}
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.push('/');
    dispatch(expenseActions.deleteExpense(null));
  };

  const themeToggle = () => {
    dispatch(themeActions.themeToggle());
    // const bodyElement = document.body;
    // bodyElement.dataset.bsTheme =
    //   bodyElement.dataset.bsTheme === "light" ? "dark" : "light";
    
  };
  return (
    <header>
      <Navbar bg="black" variant="dark" expand="sm">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand as={Link} to="/home">
            Expense Tracker
          </Navbar.Brand>
          <div className="d-flex gap-1">
            {isLoggedIn && !isVerified && (
              <Button variant="outline-secondary" onClick={verifyUserHandler}>
                Verify User
              </Button>
            )}
            {isLoggedIn && (
              <Button variant="outline-info" onClick={logoutHandler}>
                Logout
              </Button>
            )}
            <div className="d-flex align-items-center">
              <Image
                src="https://static.thenounproject.com/png/2853779-200.png"
                roundedCircle
                className="p-1 bg-secondary"
                style={{ height: "30px", cursor: "pointer" }}
                onClick={themeToggle}
              />
            </div>
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
