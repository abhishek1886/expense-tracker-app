import React from "react";

import { Container, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const clickHandler = () => {
    history.push("/expenses");
  };
  return (
    <Container fluid className="m-5">
      <h1>Welcome to Expense Tracker</h1>
      <p>
        Your profile is incomplete. <Link to="/profile">Complete</Link>
      </p>
      <Button
        variant="info"
        className="rounded-4 fw-bold px-4"
        onClick={clickHandler}
      >
        Let's Start!
      </Button>
    </Container>
  );
};

export default Home;
