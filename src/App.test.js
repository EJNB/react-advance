import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("Render a form", () => {
  render(<App />);
  const form = document.querySelector("form");
  expect(form).not.toBeNull();
  expect(form).toBeInTheDocument();
});
