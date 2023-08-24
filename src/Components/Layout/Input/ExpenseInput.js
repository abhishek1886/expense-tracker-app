import React, { useState, useEffect } from "react";

import { Form, Col, Row, Button } from "react-bootstrap";

const ExpenseInput = (props) => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "type",
    date: "",
  });

  const { value } = props;

  useEffect(() => {
    if (value) {
      setFormData({
        amount: value.amount,
        description: value.description,
        category: value.category,
        date: value.date,
      });
    }
  }, [value]);

  const formInputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!props.isEdit) {
      const inputData = {
        ...formData,
        id: Math.random().toString(),
      };
      props.onSubmit(inputData);
    } else {
      const inputData = {
        ...formData,
        id: props.value.id,
        _id: props.value._id,
      };
      props.onSubmit(inputData);
      console.log(inputData, "edit");
    }
    setFormData({
      amount: "",
      description: "",
      category: "type",
      date: "",
    });
  };
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group as={Row}>
        <Form.Label
          htmlFor="amount"
          column
          sm="3"
          className="fw-bold text-black"
        >
          Amount:
        </Form.Label>
        <Col sm="4">
          <Form.Control
            type="number"
            id="amount"
            className="rounded-1"
            name="amount"
            value={formData.amount}
            onChange={formInputHandler}
            required
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="my-2">
        <Form.Label
          htmlFor="description"
          column
          sm="3"
          className="fw-bold text-black"
        >
          Description:
        </Form.Label>
        <Col sm="9">
          <Form.Control
            type="text"
            id="description"
            className="rounded-1"
            name="description"
            value={formData.description}
            onChange={formInputHandler}
            required
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label
          htmlFor="category"
          column
          sm="3"
          className="fw-bold text-black"
        >
          Category:
        </Form.Label>
        <Col sm="3">
          <Form.Select
            className="rounded-1"
            name="category"
            value={formData.category}
            onChange={formInputHandler}
            required
          >
            <option value="type">Expense Type</option>
            <option value="Food">Food</option>
            <option value="Skincare">Skincare</option>
            <option value="Movies">Movies</option>
            <option value="Clothes">Clothes</option>
            <option value="Groceries">Groceries</option>
            <option value="Misc">Miscellaneous</option>
          </Form.Select>
        </Col>
        <Form.Label column sm="2" htmlFor="date" className="fw-bold text-black">
          Date:
        </Form.Label>
        <Col sm="4">
          <Form.Control
            id="date"
            type="date"
            className="rounded-1"
            name="date"
            value={formData.date}
            onChange={formInputHandler}
            required
          />
        </Col>
      </Form.Group>

      <div className="text-center pt-3 mt-2">
        <Button variant="info" type="submit" className="fw-bold px-4 rounded-4">
          {!props.isEdit ? "Add expense" : "Edit"}
        </Button>
        <Button
          variant="outline-info"
          type="submit"
          className="fw-bold px-4 ms-2 rounded-4"
          onClick={props.onClose}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default ExpenseInput;
