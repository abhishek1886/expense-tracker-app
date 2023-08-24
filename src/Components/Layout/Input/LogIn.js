import React, { useState, useContext } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Card, Form, Container, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import { authActions } from "../../../store/auth";

const key = "AIzaSyCnYaoFCa20-m3PKXmlMEhGvLDqPbJ0TzA";

const Login = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { isAuthenticated, token, email } = useSelector(state => state.auth);
  const history = useHistory();

  const formInputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const inputData = { ...formData, returnSecureToken: true };

      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
        {
          method: "POST",
          body: JSON.stringify(inputData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        dispatch(authActions.login({ token: data.idToken, email: data.email }));
        history.push("/home");
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        const data = await res.json();
        let errorMessage = "Something went wrong! Try again.";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const forgotPasswordHandler = () => {setIsLoginPage(prevState => !prevState)};
  return (
    <React.Fragment>
      {isLoginPage &&
        <Container
          className="mx-5 mx-auto"
          style={{ maxWidth: "450px", marginTop: "150px" }}
        >
          <Card className="bg-secondary shadow p-3 px-4">
            <h2 className="py-3 text-center">Login</h2>
            <Form onSubmit={submitHandler}>
              <Form.Floating className="mb-2">
                <Form.Control
                  id="email"
                  type="email"
                  placeholder="email"
                  name="email"
                  onChange={formInputHandler}
                  value={formData.email}
                  required
                />
                <label htmlFor="email">Email</label>
              </Form.Floating>
              <Form.Floating className="mb-2">
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={formInputHandler}
                  value={formData.password}
                  required
                />
                <label htmlFor="password">Password</label>
              </Form.Floating>
              <div className="d-flex flex-column align-items-center justify-content-center gap-2  mt-2">
                <Button type="submit">Login</Button>
                <Button variant="border-info" onClick={forgotPasswordHandler}>Forgot Password?</Button>
                <Link to="/">
                  <Button variant="boder-info">
                    Don't have an account? Signup
                  </Button>
                </Link>
              </div>
            </Form>
          </Card>
        </Container>
      }
      {!isLoginPage && <ForgotPassword onClick={forgotPasswordHandler} />}
    </React.Fragment>
  );
};

export default Login;
