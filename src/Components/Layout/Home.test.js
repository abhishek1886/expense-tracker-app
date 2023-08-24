import { render, screen } from "react-dom";
import Home from "./Home";

describe("Home component", () => {
  test("renders home", () => {
    // Arrange
    render(<Home />);

    const homeElement = screen.getByText("Welcome to Expense Tracker");
    expect(homeElement).toBeInTheDocument();
  });
});
