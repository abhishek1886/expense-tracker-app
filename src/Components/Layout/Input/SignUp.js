import React, { useState } from "react";

import { Card, Form, Container, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const key = "AIzaSyCnYaoFCa20-m3PKXmlMEhGvLDqPbJ0TzA";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
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
      if (inputData.password !== inputData.confirmPassword) {
        alert("please set correct password");
      } else {
        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`,
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
          history.replace('/login');
          setFormData({
            email: "",
            password: "",
            confirmPassword: "",
          });
        } else {
          const data = await res.json();
          let errorMessage = "Something went wrong! Try again."
          if(data && data.error && data.error.message){
            errorMessage = data.error.message;
            
          }
          throw new Error(errorMessage);
        }
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <Container className="mx-5 mx-auto" style={{ maxWidth: "450px", marginTop: "150px" }}>
      <Card className="bg-secondary shadow p-3 px-4">
        <h2 className="py-3 text-center">Sign Up</h2>
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
          <Form.Floating className="mb-2">
            <Form.Control
              id="confirmPassword"
              type="password"
              placeholder="confirmPassword"
              name="confirmPassword"
              onChange={formInputHandler}
              value={formData.confirmPassword}
              required
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </Form.Floating>
          <div className="d-flex flex-column align-items-center justify-content-center gap-2  mt-2">
            <Button type="submit" variant="info">Sign Up</Button>
            <Link to='/login' >
              <Button variant="boder-info">
                Already have an account? Login
              </Button>
            </Link>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default SignUp;
