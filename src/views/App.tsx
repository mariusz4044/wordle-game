import "../assets/App.css";
import Input from "../components/Input";

import { createContext } from "react";

interface Config {
  worlds: string[];
  maxGuesses: number;
  worldLength: number;
  getRandomWorld: () => string;
}

const config: Config = {
  worlds: ["test1", "test3", "test4"],
  maxGuesses: 5,
  worldLength: 5,
  getRandomWorld: function () {
    return this.worlds[Math.floor(Math.random() * this.worlds.length)];
  },
};

function Board() {
  const fields = [];

  for (let i = 0; i < config.worldLength * 6; i++) {
    fields.push(<Input key={i} value={i} />);
  }

  return <div className={"row"}>{fields}</div>;
}

function App() {
  return (
    <>
      <h1>Wordle game</h1>
      <div id="game-box">
        <Board />
      </div>
    </>
  );
}

export default App;
