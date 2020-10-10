import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Input from "../components/input";

let container = null;
beforeEach(() => {
  // configurar un elemento del DOM como objetivo del renderizado
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // limpieza al salir
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// Input render.
describe("<Input />", () => {
  test("Input html de tipo text debe estar en el DOM", () => {
    act(() => {
      render(
        <Input
          name="name"
          type="text"
          className="form-control"
          placeholder="Email"
          value=""
          onChange={(e) => jest.fn(e)}
          error=""
        />,
        container
      );
      expect(container.querySelector("input").nodeName).toBe("INPUT");
      expect(container.querySelector("input").getAttribute("type")).toEqual(
        "text"
      );
      expect(container.querySelector("input").getAttribute("class")).toEqual(
        "form-control"
      );
    });
  });
  test("test input component text", () => {
    act(() => {
      render(
        <Input
          name="email"
          type="text"
          className="form-control"
          placeholder="Email"
          value=""
          onChange={(e) => jest.fn(e)}
          error="error"
        />,
        container
      );
    });
    expect(container.querySelector(".alert").textContent).toEqual("error");
  });
  test("No debe contener el elemento html con la clase alert", () => {
    act(() => {
      render(
        <Input
          name="email"
          type="text"
          className="form-control"
          placeholder="Email"
          value=""
          onChange={(e) => jest.fn(e)}
          error=""
        />,
        container
      );
    });
    expect(container.querySelector(".alert")).toBeNull();
  });
});
