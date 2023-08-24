import React, { useState, useRef } from "react";

import { Button, Form, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ForgotPassword = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  const clickHandler = async (e) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCnYaoFCa20-m3PKXmlMEhGvLDqPbJ0TzA`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: inputRef.current.value
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      setIsLoading(false);
      if(!res.ok){
        const data = await res.json();
        throw new Error(data.error.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container
      className="my-5 mx-auto"
      style={{ maxWidth: "450px", marginTop: "100px" }}
    >
      <Card className="bg-secondary p-3 pt-5 text-center">
        <p>Enter the email with which you have registered.</p>
        <Form.Floating>
          <Form.Control
            id="email"
            type="email"
            ref={inputRef}
            placeholder="email"
            required
          />
          <label htmlFor="email">Email</label>
        </Form.Floating>
        <div className="text-center my-2 mt-3">
          {isLoading && <p>Loading...</p>}
          {!isLoading && (
            <Button variant="info" onClick={clickHandler}>
              Send Link
            </Button>
          )}
        </div>
        <p>
          Already a user?{" "}
          <Link to="/login" onClick={props.onClick}>
            LogIn
          </Link>
        </p>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
