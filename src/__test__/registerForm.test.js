import React from "react";
import RegisterUser from "../components/registerUser";
import { render, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

afterEach(cleanup);

const setup = () => {
  const { getByLabelText, getByText } = render(<RegisterUser />);
  return {
    sumitButton: getByText("Enviar"),
    nameInput: getByLabelText("Name"),
    usernameInput: getByLabelText("Username"),
    emailInput: getByLabelText("Email"),
    ageInput: getByLabelText("Age"),
    linkInput: getByLabelText("Link"),
  };
};

describe("<registerForm />", () => {
  describe("Validaciones del formulario", () => {
    test("Los valores de los inputs deben estar seteados correctamente", () => {
      const {
        nameInput,
        usernameInput,
        emailInput,
        ageInput,
        linkInput,
      } = setup();

      fireEvent.change(nameInput, { target: { value: "Enio Javier" } });
      fireEvent.change(usernameInput, { target: { value: "javier" } });
      fireEvent.change(emailInput, {
        target: { value: "javiernieto1989@gmail.comr" },
      });
      fireEvent.change(ageInput, { target: { value: 31 } });
      fireEvent.change(linkInput, {
        target: {
          value:
            "https://https://www.linkedin.com/in/enio-javier-nieto-basnueva-456020117",
        },
      });

      expect(nameInput.value).toBe("Enio Javier");
      expect(usernameInput.value).toBe("javier");
      expect(emailInput.value).toBe("javiernieto1989@gmail.comr");
      expect(ageInput.value).toEqual("31");
      expect(linkInput.value).toBe(
        "https://https://www.linkedin.com/in/enio-javier-nieto-basnueva-456020117"
      );
    });

    // Validar q se muestren los div con class alert con los errores
    test("Muesra errores debajo de los input name cuando no cumplen con las reglas", () => {
      const {
        nameInput,
        usernameInput,
        emailInput,
        ageInput,
        linkInput,
        sumitButton,
      } = setup();

      fireEvent.change(nameInput, { target: { value: "" } });
      fireEvent.change(usernameInput, { target: { value: "" } });
      fireEvent.change(emailInput, {
        target: { value: "" },
      });
      fireEvent.change(ageInput, { target: { value: "" } });
      fireEvent.change(linkInput, {
        target: {
          value: "",
        },
      });
      fireEvent.click(sumitButton);

      expect(document.querySelectorAll(".alert").length).toBe(5);
      for (let errorDiv in document.querySelectorAll(".alert")) {
        expect(errorDiv.textContent).not.toBeNull();
      }
    });
    // Este test es adicional para probar el evento type sobre algunos inputs
    test("Debe mostrarse el error mientras se escribe", () => {
      const { nameInput } = setup();

      userEvent.type(nameInput, "Javi");

      expect(document.querySelectorAll(".alert").length).toBe(1);
      expect(document.querySelector(".alert").textContent).toBe(
        '"Name" length must be at least 6 characters long'
      );

      userEvent.type(nameInput, "Javier{space}Nieto{space}Basnueva");

      expect(document.querySelectorAll(".alert").length).toBe(0);
      expect(document.querySelector(".alert")).toBeNull();
    });
  });
});
