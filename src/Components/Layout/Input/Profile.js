import React, { useState, useContext, useEffect } from "react";

import { Container, Form, Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const key = "AIzaSyCnYaoFCa20-m3PKXmlMEhGvLDqPbJ0TzA";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
  });
  const history = useHistory();

  const formInputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = { idToken: localStorage.getItem('token') };
      fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${key}`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error();
          }
        })
        .then((data) => {
          setFormData({
            name: data.users[0].displayName,
            url: data.users[0].photoUrl
          });
        })
        .catch(() => {});
    }
  }, []);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const inputData = { ...formData };
      const payload = {
        idToken: localStorage.getItem('token'),
        displayName: inputData.name,
        photoUrl: inputData.url,
        deleteAttribute: [],
        returnSecureToken: true,
      };

      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${key}`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
      } else {
        throw new Error("Something went wrong. Try again!", res.error);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const cancelHandler = () => {
    history.replace("/home");
  };
  return (
    <Container
      className=" mx-auto"
      style={{ maxWidth: "500px", marginTop: "5rem" }}
    >
      <Card className="bg-secondary  p-3 px-4">
        <h2 className="my-2">Contact Details</h2>
        <Form className="fw-bold" onSubmit={submitHandler}>
          <Form.Label>Full Name: </Form.Label>
          <Form.Control
            id="name"
            type="text"
            name="name"
            onChange={formInputHandler}
            value={formData.name}
            required
          />
          <Form.Label className="mt-2">Profile Picture URL: </Form.Label>
          <Form.Control
            id="url"
            type="text"
            name="url"
            onChange={formInputHandler}
            value={formData.url}
            required
          />
          <div className="p-3 text-center">
            <Button variant="info" type="submit">
              Update
            </Button>
            <Button
              variant="outline-info"
              className="mx-2"
              onClick={cancelHandler}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Profile;
