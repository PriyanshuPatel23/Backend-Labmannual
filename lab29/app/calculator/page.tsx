"use client";

import { useState } from "react";

export default function Calculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState<string | number>("");

  function calculate(operator: string) {
    const x = Number(a);
    const y = Number(b);

    if (a.trim() === "" || b.trim() === "") {
      setResult("Enter both numbers");
      return;
    }

    switch (operator) {
      case "+":
        setResult(x + y);
        break;
      case "-":
        setResult(x - y);
        break;
      case "*":
        setResult(x * y);
        break;
      case "/":
        setResult(y === 0 ? "Cannot divide by zero" : x / y);
        break;
    }
  }

  return (
    <div>
      <h1>Basic Calculator</h1>

      <input
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
        placeholder="First number"
      />

      <input
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
        placeholder="Second number"
      />

      <div>
        <button onClick={() => calculate("+")}>+</button>
        <button onClick={() => calculate("-")}>-</button>
        <button onClick={() => calculate("*")}>*</button>
        <button onClick={() => calculate("/")}>/</button>
      </div>

      <h2>Result: {result}</h2>

      <button
        onClick={() => {
          setA("");
          setB("");
          setResult("");
        }}
      >
        Clear
      </button>
    </div>
  );
}