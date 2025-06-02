import "../assets/App.css";
import { useEffect, useReducer, useRef, useState } from "react";
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
  const randomWord = useRef<string>("");

  const endStatisExist = !!wordsArray.find((item) => item.status === "endgame");
  const emptyFields =
    wordsArray.filter((item) => item.char !== null).length - 30;

  let gamesIsEnd = false;

  if (endStatisExist || emptyFields === 0) {
    gamesIsEnd = true;
  }

  async function getRandomWord() {
    const rndWord = await defaultConfig.getRandomWorld();
    randomWord.current = rndWord;
    console.log(`Random word: ${rndWord} :-)`);
  }

  async function resetGame() {
    await getRandomWord();
    dispatch({
      type: "RESET_GAME",
    });
  }

  useEffect(() => {
    async function initGame() {
      await getRandomWord();

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
    }
    initGame();
  }, []);

  return (
    <>
      <h1>Wordle game</h1>
      <div id="game-box">
        <ConfigContext.Provider value={defaultConfig}>
          <Board wordsArray={wordsArray} />
          {gamesIsEnd ? (
            <button className={"reset-btn"} onClick={resetGame}>
              reset game
            </button>
          ) : (
            ""
          )}
        </ConfigContext.Provider>
      </div>
    </>
  );
}

export default App;
