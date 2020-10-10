import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import {
  getDecks,
  groupDecksByType,
  countCompleteDecks,
} from "./services/decksFakeService";
import _ from "lodash";

import {
  threeGamesComplete,
  decksWithOutHeartCarts,
} from "./services/decks.moks";

describe("Pruebas de componente <App />", () => {
  const text = "hola mundo";
  test("el texto debe ser hola mundo", () => {
    expect(text).toBe("hola mundo");
  });

  test("renders learn react link", () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/El numero de juegos completos es/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe("Pruebas del servicio decks", () => {
  test("Funcion getDecks: se espera un array", () => {
    const result = getDecks();
    expect(_.isArray(result)).toBeTruthy();
  });

  describe("Pruebas a la funcion countCompleteDecks", () => {
    test("countCompleteDecks: Debe devolver 2", () => {
      const desk = getDecks();
      const categories = ["clubs", "spades", "diamonds", "hearts"];
      const result = countCompleteDecks(desk, categories);
      expect(result).toBe(2);
    });

    test("countCompleteDecks: Debe devolver 0 ", () => {
      const desk = getDecks();
      const categories = [];
      const result = countCompleteDecks(desk, categories);
      expect(result).toBe(0);
    });
    test("countCompleteDecks: Argumento decks como array vacio y espero restultado 0", () => {
      const desk = [];
      const categories = ["clubs", "spades", "diamonds", "hearts"];
      const result = countCompleteDecks(desk, categories);
      expect(result).toBe(0);
    });
    test("countCompleteDecks: Le paso tres juegos completos y espero restultado 3", () => {
      const desk = threeGamesComplete();
      const categories = ["clubs", "spades", "diamonds", "hearts"];
      const result = countCompleteDecks(desk, categories);
      expect(result).toBe(3);
    });

    test("countCompleteDecks: Recibo juego sin cartas de corazones y devuelvo 0", () => {
      const desks = decksWithOutHeartCarts();
      const categories = ["clubs", "spades", "diamonds", "hearts"];
      const result = countCompleteDecks(desks, categories);
      expect(result).toEqual(0);
    });
  });

  describe("Pruebas a la funcion groupDecksByType", () => {
    test("Recibo juego sin cartas faltantes y espero un grupo desde el 2 hasta el A", () => {
      const decks = getDecks();
      const groupDeck = groupDecksByType(decks, "clubs");
      console.log(groupDeck);
      const group = {
        2: 3,
        3: 2,
        4: 2,
        5: 2,
        6: 2,
        7: 2,
        8: 2,
        9: 2,
        10: 2,
        J: 2,
        Q: 3,
        K: 2,
        A: 2,
      };
      expect(groupDeck).toEqual(group);
    });
  });
});
