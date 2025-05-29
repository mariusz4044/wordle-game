import "../assets/App.css";
import { useEffect, useReducer } from "react";
import Board from "../components/Board";
import { ConfigContext, defaultConfig } from "../assets/ConfigContext.tsx";
import { BoardReducer } from "../assets/BoardReducer.ts";

type WordStatus = "correct" | "incorretPosition" | "incorrect" | null;

export interface WordInput {
  char: string | null;
  status: WordStatus;
}

const initialState: WordInput[] = Array.from(
  { length: defaultConfig.wordLength * 6 },
  () => ({ char: null, status: null }),
);

function App() {
  const [wordsArray, dispatch] = useReducer(BoardReducer, initialState);

  function changeFirstEmptyCell(char: string) {
    dispatch({
      type: "SET_CHAR",
      char,
    });
  }

  function removeLastChar() {
    dispatch({
      type: "REMOVE_LAST_CHAR",
    });
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key;
      if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
        changeFirstEmptyCell(key.toUpperCase());
      }
      if (key === "Backspace") {
        removeLastChar();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <h1>Wordle game</h1>
      <div id="game-box">
        <ConfigContext.Provider value={defaultConfig}>
          <Board wordsArray={wordsArray} />
        </ConfigContext.Provider>
      </div>
    </>
  );
}

export default App;
