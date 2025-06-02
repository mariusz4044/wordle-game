import type { WordInput } from "../views/App.tsx";

type BoardAction =
  | { type: "SET_CHAR"; char: string; randomWord: string }
  | { type: "REMOVE_LAST_CHAR" }
  | { type: "RESET_GAME" };

function checkWorlds(words: WordInput[], word: string): WordInput[] {
  word = word.toUpperCase();

  //we need to get only the last six words
  const filtered = words.filter((item) => item.char !== null);
  const lastSix = filtered.slice(-5);

  for (let i = 0; i < lastSix.length; i++) {
    if (!lastSix[i].char) continue;
    const char = lastSix[i].char;

    // in words with multiple letters, we need to check all letters,
    // for example, "maybe", if the user writes 2 times "m" letter, it should show only one correct
    // without this check user can see status for 2 "m" letters correct and incorrect-position
    const charsInWord = word.split("").filter((item) => item === char);
    const correctChars = lastSix.filter(
      (item) => item.char === char && item.status !== null,
    );

    if (char === word[i]) lastSix[i].status = "correct";
    else if (
      char &&
      word.includes(char) &&
      correctChars.length < charsInWord.length
    )
      lastSix[i].status = "incorrect-position";
    else lastSix[i].status = "incorrect";
  }

  const correctChars = lastSix.filter((item) => item.status === "correct");

  //show a user win and block other inputs
  if (correctChars.length === 5) {
    words.forEach((item) => {
      if (item.status === null) item.status = "endgame";
    });
  }

  return words;
}

export function BoardReducer(
  state: WordInput[],
  action: BoardAction,
): WordInput[] {
  switch (action.type) {
    case "RESET_GAME": {
      const words = [...state];
      words.forEach((item) => {
        item.char = null;
        item.status = null;
      });
      return words;
    }

    case "SET_CHAR": {
      const words = [...state];
      const firstEmptyCell = words.find(
        (word) => word.char === null && word.status === null,
      );

      if (!firstEmptyCell) return state;
      firstEmptyCell.char = action.char;

      //check the worlds if user has entered the last word
      if (firstEmptyCell.position % 5 === 0)
        return checkWorlds(words, action.randomWord);

      return words;
    }
    case "REMOVE_LAST_CHAR": {
      const words = [...state.reverse()];
      const firstNotEmptyCall = words.find(
        (word) => word.char != null && word.status === null,
      );

      if (!firstNotEmptyCall) return state.reverse();
      firstNotEmptyCall.char = null;
      firstNotEmptyCall.status = null;
      return words.reverse();
    }
  }
}
