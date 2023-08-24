import { render, screen } from "@testing-library/react";
import Expenses from "./Expenses";

// describe("Expense", () => {
//   test("should render correctly", () => {
//     // Arrange
//     render(<Expenses />);

//     // Act
//     // ... nothing

//     // Assert
//     const amountInput = screen.getByText("Add Expense");
//     expect(amountInput).toBeInTheDocument();
//     // expect(amountInput.value).toBe("");
//   });

//   // test("validates the amount field", () => {
//   //   // Arrange
//   //   render(<ExpenseInput />);

//   //   // Act
//   //   amountInput.simulate("change", { target: { value: "abc" } });

//   //   // Assert
//   //   const errorElement = screen.getByText("Please enter a valid amount.");
//   //   expect(errorElement).toBeInTheDocument();
//   // });

//   // test("calls the formInputData function on submit", () => {
//   //   // Arrange
//   //   const formInputData = jest.fn();
//   //   render(<ExpenseInput onSubmit={formInputData} />);

//   //   // Act
//   //   amountInput.simulate("change", { target: { value: "100" } });
//   //   const submitButton = screen.getByRole("button");
//   //   submitButton.click();

//   //   // Assert
//   //   expect(formInputData).toBeCalledWith({
//   //     amount: "100",
//   //     description: "",
//   //     category: "",
//   //     date: "",
//   //   });
//   // });
// });

test("should render correctly", () => {
  // Arrange
  render(<Expenses />);

  // Act
  // ... nothing

  // Assert
  const amountInput = screen.getByText("Add Expense");
  expect(amountInput).toBeInTheDocument();
  // expect(amountInput.value).toBe("");
});
