import "../assets/App.css";
import { useEffect, useReducer, useRef } from "react";
import Board from "../components/Board";
import { ConfigContext, defaultConfig } from "../assets/ConfigContext.tsx";
import { BoardReducer } from "../assets/BoardReducer.ts";

type WordStatus =
  | "correct"
  | "incorrect-position"
  | "incorrect"
  | "endgame"
  | null;

export interface WordInput {
  char: string | null;
  status: WordStatus;
  position: number;
}

const initialState: WordInput[] = Array.from(
  { length: defaultConfig.wordLength * 6 },
  (_v: number, index: number) => ({
    char: null,
    status: null,
    position: index + 1,
  }),
);

function App() {
  const [wordsArray, dispatch] = useReducer(BoardReducer, initialState);
  const randomWord = useRef(defaultConfig.getRandomWorld());

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key;
      if (key.length === 1 && /^[a-zA-Z]$/.test(key)) {
        dispatch({
          type: "SET_CHAR",
          char: key.toUpperCase(),
          randomWord: randomWord.current,
        });
      }
      if (key === "Backspace") {
        dispatch({
          type: "REMOVE_LAST_CHAR",
        });
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
