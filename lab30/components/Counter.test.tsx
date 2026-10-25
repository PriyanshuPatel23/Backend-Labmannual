
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter Component", () => {
  it("displays the initial count", () => {
    render(<Counter />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  it("increments the count when clicked", () => {
    render(<Counter />);
    fireEvent.click(screen.getByRole("button", {
      name: "Increment"
    }));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
