
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter Component using Jest", () => {
  test("renders the initial count", () => {
    render(<Counter />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  test("increments count on button click", () => {
    render(<Counter />);
    fireEvent.click(
      screen.getByRole("button", { name: "Increment" })
    );
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
