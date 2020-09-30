import React, { Component } from "react";
import "./App.css";
import { countCompleteDecks, getDecks } from "./services/decksFakeService";

class App extends Component {
  state = {
    decks: [],
    countDecks: 0,
  };

  componentDidMount() {
    // Get to all decks
    // Group by type "clubs", "diamons"
    // Count how many complete decks

    const decks = getDecks();
    const categories = ["clubs", "spades", "diamonds", "hearts"];
    const countDecks = countCompleteDecks(decks, categories);
    this.setState({ countDecks });
  }

  render() {
    return <h1>El numero de juegos completos es {this.state.countDecks}</h1>;
  }
}

export default App;
