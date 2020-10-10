// Funcion devuelve 3 juegos completos
export const threeGamesComplete = () => {
  let decks = [];
  for (let i = 0; i < 3; i++) {
    for (let j of ["clubs", "spades", "diamonds", "hearts"]) {
      for (let cart of [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]) {
        let element = {
          suit: j,
          value: cart,
        };
        decks.push(element);
      }
    }
  }
  //console.log(decks);
  return decks;
};

// Funcion devuelve 0 juegos completos y sin cartas de corazones.
export const decksWithOutHeartCarts = () => {
  let decks = [];
  for (let i = 0; i < 2; i++) {
    for (let j of ["clubs", "spades", "diamonds"]) {
      for (let cart of [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]) {
        let element = {
          suit: j,
          value: cart,
        };
        decks.push(element);
      }
    }
  }
  return decks;
};
